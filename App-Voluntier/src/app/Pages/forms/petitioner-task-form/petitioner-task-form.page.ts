import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { modeUpdateForm, TaskCategories, taskUnassigned } from 'src/app/Models/Globals';
import { MapServiceService } from 'src/app/Providers/map-service.service';
import { Task } from '../../../Models/Clases/Extra_Clases';
import { DatabaseService } from '../../../Providers/database.service';
import { Router } from '@angular/router';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';

@Component({
  selector: 'app-petitioner-task-form',
  templateUrl: './petitioner-task-form.page.html',
  styleUrls: ['./petitioner-task-form.page.scss'],
})
export class PetitionerTaskFormPage implements OnInit {
  formStyle : string = '';
  taskForm: FormGroup;
  categories: string[];
  taskUpdate : Task;

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private dbService: DatabaseService,
    private dimService: DataItemModelsService,
    private map: MapServiceService,
    private alertCtrl: AlertController,
    private router: Router) {
      console.log('constructor');
    this.categories = TaskCategories;
    this.formStyle = this.dimService.getStyleInputDataForm();

    this.taskForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });

    if(this.formStyle === modeUpdateForm){
      this.chargeformData();
    }
  }

  // onInit
  ngOnInit() {
    console.log('onInit');
  }

  ionViewWillEnter(){
    console.log('ionViewWillenter');
    this.map.buildMap();
  }

  //--------------------------
  //        Métodos
  //--------------------------

  //Método para volver atrás
  goBackPage() {
    this.router.navigateByUrl('user-task-list');
  }

  // Nos añade al formulario los datos de la tarea
  async chargeformData() {
    const taskDOC_ID = this.dimService.getCurrentTaskDocID();
    this.taskUpdate = await this.dbService.getTaskByDocId(taskDOC_ID);

    this.taskForm.controls.title.setValue(this.taskUpdate.name);
    this.taskForm.controls.description.setValue(this.taskUpdate.description);
    this.taskForm.controls.category.setValue(this.taskUpdate.category);
  }

  // Nos añade una nueva tarea que se subirá a nuestra DB de Firebase y se publicará para que sea buscada
  // por los usuarios que son 'voluntarios'
  async addNewTask() {
    let addressString: string = '';

    if (this.taskForm.valid) {
      //Obtenemos el valor del input de la dirección del mapa
      addressString = (<HTMLInputElement>(document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0])).value;
      console.log(addressString)

        let petitionerUser = await this.dbService.getProfilePetitioner();
        console.log(petitionerUser);
        let petitionerID = petitionerUser.doc_id;

        console.log(petitionerID);

        //Para los elementos de la dirección
        let addressItems = addressString.split(",");
        console.log(addressItems)

        //Obtener Ciudad y Código Postal
        let addressPC_City =  addressItems[1].trim().split(' ');

        //Obtener nombre Completo Ciudad
        let cityCompleteName = (): string => {
          let result = '';
          for (let i = 1; i < addressPC_City.length; i++) {
            result += addressPC_City[i] + ' ';
         }
         return result.trim();
        }
        //Se crea y se publica la tarea
        let task = new Task(
          this.taskForm.controls.title.value,
          this.taskForm.controls.description.value,
          Date.now(),
          this.taskForm.controls.category.value,
          addressString,
          petitionerID,
          taskUnassigned,
          addressItems[0].trim(),
          cityCompleteName(), // Ciudad
          addressPC_City[0].trim(), // PC - Cód Postal
          addressItems[3].trim()
        );

        let operationResult = this.dbService.createTask(task);

        operationResult.then((resp) => {
          console.log(resp);
          this.responseAlert(resp);
        });

      // Error formulario
      // Comprobación completa al rellenar los campos
    } else {
      let errors: string[] = [];

      if (this.isEmpty(addressString)) {
        errors.push('Address');
      }

      if (this.taskForm.controls.title.hasError('required')) {
        errors.push('Title');
      }

      if (this.taskForm.controls.description.hasError('required')) {
        errors.push('Description');
      }

      if (this.taskForm.controls.category.hasError('required')) {
        errors.push('Category');
      }
      console.log(errors);
      this.formErrorsAlert(errors);
    }
  }

  // Nos actualiza una de las tareas
  updateTask(){

  }

  // Nos crea un alert que notificará al usuario los campos que faltan del formulario
  async formErrorsAlert(errors: string[]) {
    let alertContent = '';

    for (let error of errors) {
      alertContent += "<br>-" + error;
    }

    const alert = await this.alertCtrl.create({
      header: 'Information',
      cssClass: 'bg-pinkie',
      message: "This form requires:" + alertContent,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary'
        },
      ],
    });
    await alert.present();
  }

  // Nos crea un alert que notificará al usuario si la tarea se ha creado con éxito o no
  async responseAlert(resp: boolean) {
    let alertContent: string = '';
    let imgURL: string = '../../../../assets/img/ok-response.png';

    if(resp){
      alertContent = "<p class='fs-115rem fw-500'>Your task has been uploaded successfully!</p>" +
      `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL}/></div>`;
    }else{
      imgURL = '../../../../assets/img/bad-response.png';
      alertContent = "<p class='fs-115rem fw-500'>We cannot upload your task at this moment. If this problem keeps happening please contact with us.</p>" +
      `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL}/></div>`;
    }

    const alert = await this.alertCtrl.create({
      header: 'Information',
      cssClass: 'bg-pinkie',
      message: alertContent,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (x) => {
            this.taskForm.controls.category.reset('');
            this.taskForm.controls.description.reset('');
            this.taskForm.controls.title.reset('');
            document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].innerHTML = '';
            this.router.navigateByUrl('user-task-list');
            //console.log(x);
          },
        },
      ],
    });
    await alert.present();
  }

  //Método auxiliar que nos comprueba si el string está vacío, es nulo o sin declarar (empty, null or undefined)
  isEmpty(str): boolean {
    return !str || str.length === 0;
  }
}
