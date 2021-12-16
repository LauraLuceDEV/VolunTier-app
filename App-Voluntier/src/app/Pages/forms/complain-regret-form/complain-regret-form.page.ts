import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DatabaseService } from 'src/app/Providers/database.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { userTypeVoluntary } from 'src/app/Models/Globals';
import { Petitioner } from 'src/app/Models/Clases/Petitioner';
import { Voluntary } from 'src/app/Models/Clases/Voluntary';
import { Task } from 'src/app/Models/Clases/Extra_Clases';

@Component({
  selector: 'app-complain-regret-form',
  templateUrl: './complain-regret-form.page.html',
  styleUrls: ['./complain-regret-form.page.scss'],
})
export class ComplainRegretFormPage implements OnInit {
  public complainRegretForm : FormGroup;
  public modeForm : string;
  public taskID: string;
  public currentTask: Task;
  public userType: string;
  public currentUser: Voluntary | Petitioner;
  public currentUserAccused: Voluntary | Petitioner;
  public reportable = false;

  //--------------------------
  // CICLO DE VIDA
  //--------------------------

  // Constructor
  constructor(private router : Router,
    private actRoute : ActivatedRoute,
    private navCtrl : NavController,
    private dbService: DatabaseService,
    private dimService : DataItemModelsService,
    private alertCtrl: AlertController,
    private formBuilder : FormBuilder) {

      this.complainRegretForm = this.formBuilder.group({
        description: new FormControl('', Validators.required)
      });
  }

  // OnInit
  ngOnInit(): void {
    this.taskID = this.actRoute.snapshot.paramMap.get('taskid');

    Promise.all([
      this.dbService.getTaskByDocId(this.taskID),
      this.dbService.getUser()
    ])
      .then((values) => {
        console.log(values);
        this.currentTask = values[0];

        this.userType = values[1].userType;
        if(values[1].userType === userTypeVoluntary){
          Promise.all([
            this.dbService.getVoluntaryByUID(values[1].uuid),
            this.dbService.getPetitionerByDocID(this.currentTask.petitionerDOC_ID)
          ])
            .then((values2) => {
              console.log(values2);
              this.currentUser = values2[0];
              this.currentUserAccused = values2[1];
            })
            .catch((err) => {
              console.log(err);
            })
        }else{
          Promise.all([
            this.dbService.getPetitionerByUID(values[1].uuid),
            this.dbService.getVoluntaryByDocID(this.currentTask.voluntaryDOC_ID)
          ])
            .then((values2) => {
              this.currentUser = values2[0];
              this.currentUserAccused = values2[1];
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //--------------------------
  // MÉTODOS
  //--------------------------

  goBackPage() {
    this.navCtrl.back();
  }

  reportableClaim(event){
    console.log(event.detail.checked);
    this.reportable = event.detail.checked;
  }

  addNewComplainOrRegret(){
    let msg = '';
    if(this.complainRegretForm.valid){

      console.log(this.currentUser)
      console.log(this.currentUserAccused)

      console.log(this.complainRegretForm.controls.description.value)
      console.log(this.currentUser.uid)
      console.log(this.currentUserAccused.uid)
      console.log(this.reportable)

      this.dbService.createComplain(
        this.complainRegretForm.controls.description.value,
        this.currentUser.uid,
        this.currentUserAccused.uid,
        this.reportable,
      );
      msg = '<p class="color-white">Thank you for sending us your complain. We will study it as soon as posible and you will receive answers from us!</p>';
    }else{
      msg = '<p class="color-white">We cannot update the complain. Please write all the information and try it again!</p>';
    }
    this.complainResponseAlert(msg);
  }

  async complainResponseAlert(msg: string){
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'alert-btn-style',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }

}
