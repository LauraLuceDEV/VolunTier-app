import { Component, OnInit } from '@angular/core';
import { Score, Task } from 'src/app/Models/Clases/Extra_Clases';
import { DatabaseService } from '../../../Providers/database.service';
import { DataItemModelsService } from '../../../Providers/data-item-model.service';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/Interfaces/AllInterfaces';
import { userTypePetitioner, userTypeVoluntary } from 'src/app/Models/Globals';

@Component({
  selector: 'app-score-form',
  templateUrl: './score-form.page.html',
  styleUrls: ['./score-form.page.scss'],
})
export class ScoreFormPage implements OnInit {
  // Obtendremos los datos de la tarea actual
  user : User;
  currentTask: Task;
  taskID: string;
  userHasPuntuation: boolean;
  starPuntuation: number;
  userProfileImg: string;
  userName: string;
  textAreaComment: string;
  buttonValues: number[];

  //-----------------------------------
  // CICLO DE VIDA DE LA CLASE
  //-----------------------------------

  // Constructor
  constructor(
    private dbServ: DatabaseService,
    private dimService : DataItemModelsService,
    private router : Router,
    private navController: NavController,
    private actRoute: ActivatedRoute,
    private alertCtrl: AlertController) {}

  // OnInit
  ngOnInit() { }

   // Nos carga los datos. Actualizamos los datos de la vista y posteriormente los pintamos en el Template.
   ionViewWillEnter(){
    console.log('IonviewWillEnter')
    this.chargeData();
  }


  //-----------------------------------
  // MÉTODOS DE LA CLASE
  //-----------------------------------

  goBackPage(){
    this.navController.back();
  }


  // Nos carga los datos previos de la página
  async chargeData(){
    // Obtenemos el ID/docID de la tarea
    this.taskID = this.actRoute.snapshot.paramMap.get('taskid');

    // Obtenemos los datos de la tarea actual a través del Doc_ID
    this.currentTask = await this.dbServ.getTaskByDocId(this.taskID).catch();

    console.log(this.currentTask);

    // Obtener los datos del usuario al que vamos a puntuar, ya sea Solicitante o Voluntario
    this.user = await this.dbServ.getUser() as User;

    // Puntuamos a un solicitante
    if(this.user.userType.toLowerCase() == userTypeVoluntary.toLowerCase()){
      console.log(`Lets Score a Petitioner!`);

      console.log(this.currentTask.petitionerDOC_ID)

      this.dbServ.getPetitionerByDocID(this.currentTask.petitionerDOC_ID)
      .then((petitioner) => {
        console.log(petitioner);
        this.userName = petitioner.name;

        // Obtenemos la imagen del perfil del usuario que queremos puntuar
        this.userProfileImg = this.dbServ.getUserProfileImage(this.currentTask.petitionerDOC_ID);
      });
      // Puntuamos a un voluntario
    }else{
      console.log(`Lets Score a Voluntary!`);

      this.dbServ.getVoluntaryByDocID(this.currentTask.voluntaryDOC_ID)
      .then((voluntary) => {
        this.userName = voluntary.getName();

        // Obtenemos la imagen del perfil del usuario que queremos puntuar
        this.userProfileImg = this.dbServ.getUserProfileImage(this.currentTask.voluntaryDOC_ID);
      });
    }

    //Valores por defecto de las variables
    this.userHasPuntuation = false;
    this.textAreaComment = '';
    this.starPuntuation = 0;
    this.buttonValues = [1, 2, 3, 4, 5];
  }


  // Método que cambiará la puntuación de las estrellas recibidas por el usuario
  setPuntuation(puntuation: number) {
    console.log(puntuation);
    this.userHasPuntuation = true;
    this.starPuntuation = puntuation;
  }

  // Método que cambiará la puntuación a una estrella
  setPuntuationOneStar() {
    this.starPuntuation = 1;
  }

  // Método que cambiará la puntuación a dos estrellas
  setPuntuationTwoStars() {
    this.starPuntuation = 2;
  }

// Método que cambiará la puntuación a tres estrellas
  setPuntuationThreeStars() {
    this.starPuntuation = 3;
  }

  // Método que cambiará la puntuación a cuatro estrellas
  setPuntuationFourStars() {
    this.starPuntuation = 4;
  }

  // Método que cambiará la puntuación a cinco estrellas
  setPuntuationFiveStars() {
    this.starPuntuation = 5;
  }

  // Nos crea la puntuación ocmpleta junto con el comentario
  addAPuntuation(comment: string) {
    this.textAreaComment = comment;

    if (this.starPuntuation == 0) {
      this.presentPuntutationAlert();
    } else {
      this.submitPuntuation();
    }
  }

  // Nos crea la puntuación completa para subirla a nuestra base de Datos en FB
  async submitPuntuation() {
    let userScoreEmisor: string; // DOC_ID del usuario que deja el comentario;
    let userScoreReceptor: string; // DOC_ID del usuario del que se deja el comentario
    let userType: string;

    // Solicitante
    if(this.user.userType.toLowerCase() == userTypeVoluntary.toLowerCase()){
      userScoreEmisor = this.currentTask.petitionerDOC_ID;
      userScoreReceptor = this.currentTask.voluntaryDOC_ID
      userType = userTypeVoluntary;

      // Voluntario
    }else{
      userScoreEmisor = this.currentTask.voluntaryDOC_ID;
      userScoreReceptor = this.currentTask.petitionerDOC_ID;
      userType = userTypePetitioner;
    }

    let userValoration : string = this.dimService.getValorationbyPunctuation(this.starPuntuation);
    let res = await this.dbServ.createNewScore(
      new Score(
        this.currentTask.docID,
        userScoreEmisor,
        userScoreReceptor,
        userType,
        this.textAreaComment,
        this.starPuntuation,
        userValoration
      )
    );

    if(res){
      let msg = 'Your score has been submitted successfully';
      this.submittedScoreAlert(msg);
    }else{
      let msg = 'Something went wrong and we cannot submit you score';
      this.submittedScoreAlert(msg);
    }
  }

  // Alerta que saldrá cuando la puntuación es '0'
  // Ya sea porque le han dado una mala puntuación o el usuario no se la ha dado
  async presentPuntutationAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message:
        'Are you sure that this person deserves <strong>such a bad puntuation?</strong>',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Confirmation Okay');
            this.submitPuntuation();
          },
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
      ],
    });
    await alert.present();
  }



  async submittedScoreAlert(msg : string) {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Confirmation Okay');
            this.router.navigateByUrl('user-profile');
          },
        },
      ],
    });
    await alert.present();
  }
}
