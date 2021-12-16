import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Task } from 'src/app/Models/Clases/Extra_Clases';
import { Petitioner } from 'src/app/Models/Clases/Petitioner';
import { modeUpdateForm, taskDone, taskInProgress, taskUnassigned, userTypeVoluntary } from 'src/app/Models/Globals';
import { User } from 'src/app/Models/Interfaces/AllInterfaces';
import { ChatService } from 'src/app/Providers/chat.service';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { DatabaseService } from 'src/app/Providers/database.service';
import { MapServiceService } from 'src/app/Providers/map-service.service';
import { CitiesLocationService } from '../../Providers/cities-location.service';

// Página para ver con detalle los datos de una tarea
// TODO: Crear un botón de desaisgnación de la tarea ya sea para solicitantes o voluntarios
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
  public petitioner: Petitioner;
  public petitionerIssues: string[] = [];
  public task: Task;
  public currentUser : User;

  // Var para recoger los parametros de la URL
  public taskId : string;
  public petitionerDocID : string;

  //Var para la latitud y la longitud del mapado
  public latitude : number;
  public longitude : number;

  // ----------------------------------------------------
  // CICLO DE VIDA DE LA PÁGINA
  // ----------------------------------------------------

  constructor(
    private navController: NavController,
    private actRoute: ActivatedRoute,
    private cityService : CitiesLocationService,
    private map: MapServiceService,
    private dbService : DatabaseService,
    private dimService : DataItemModelsService,
    private chatService: ChatService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private router: Router) {}

   ngOnInit() {
    console.log(`TaskDetailsPage onInit`);

  }

  // Obtenemos el ID de la tarea desde la URL y cargamos los datos
  ionViewWillEnter(){
    console.log('TaskDetailsPage ionViewWillEnter');
    this.taskId = this.actRoute.snapshot.paramMap.get('taskid');
    this.petitionerDocID = this.actRoute.snapshot.paramMap.get('petitionerdocid');
    this.petitionerIssues = [];

    // Cargamos los datos
    this.loadData();
  }


  //Método que nos permite ir a a la página anterior
  goBackPage(){
    this.navController.back();
  }

  //=============================================
  // MÉTODOS PARA CARGAR LOS DATOS DE LA PÁGINA
  //=============================================

  // Método para cargar los datos de la página
  async loadData() {
    // console.log(`TaskDetailsPage loadCurrentTask`);

    // Datos del usuario actual
    this.currentUser = await this.dbService.getUser();

    // Datos de la tarea
    this.task = await this.dbService.getTaskByDocId(this.taskId);
    this.task.docID = this.taskId;

    // Datos del Solicitante/Petitioner
    this.petitioner = await this.dbService.getPetitionerByDocID(this.petitionerDocID)

    console.log(this.petitioner)

    // Problemas del solicitante
    this.petitioner.issues.forEach(issue => {
      this.petitionerIssues.push(`assets/icons/${issue}`);
    });
    this.loadMapAdress();
  }


  // Método con el que construimos el mapa con la latitud y longitud
  async loadMapAdress() {
    let address = `${this.petitioner.address.street} ${this.petitioner.address.postalCode}`;

    let adress$ = this.cityService.getCoordinatesFromAddress(address);
    adress$.subscribe( (resp) =>{
      this.latitude = resp.data[0].latitude
      this.longitude = resp.data[0].longitude

      this.map.buildMapParams(this.latitude, this.longitude);
    } );
  }

  //=============================================
  // MÉTODOS/EVENTOS DE LA PÁGINA
  //=============================================

  // Se le asigna a nuestro voluntario una tarea
  async addTaskToVoluntary(){
    this.task.state = taskInProgress;
    this.task.voluntaryDOC_ID = ( await this.dbService.getProfileVoluntary() ).getDocID();

    let response = await this.dbService.updateTask(this.task);

    if(response){
      this.startChatConversation;
      this.responseAlert(response);
    }else{
      this.responseAlert(response);
    }
  }

  // Se inicia una ventana de chat con el usuario
  async startChatConversation(){
    const currentUserUID = await this.dbService.getUserUID();

    const response = await Promise.all([
      this.dbService.addChatRoomOnDatabase(currentUserUID, this.petitioner.uid),
      this.dbService.addChatRoomOnDatabase(this.petitioner.uid, currentUserUID)

    ]);
    console.log(response);

    if(!response){
      this.showToast('Cannot contact with this user');
    }else{
      this.router.navigateByUrl(`chat/${currentUserUID}/${this.petitioner.uid}`);
    }
  }



  // Se cambiará el estado de la tarea a finalizado
  // (sólo lo podrán hacer los usuarios de tipo voluntario)
  finishTask(){
    if(this.task.state != taskDone){
      this.alertVoluntaryFinishtask();
    }
  }

  // Nos edita la tarea.
  // (sólo lo podrán hacer los usuarios de tipo solicitante)
  editTask(){
    this.dimService.setCurrentTaskDocID(this.task.docID);
    this.dimService.setStyleInputDataForm(modeUpdateForm);
    this.router.navigateByUrl(`petitioner-task-form`);
  }


  // Se eliminará una tarea dependiendo de las condiciones del tipo de usuario
  // y de sí está o no finalizada la tarea
  deleteTask(){
    // Ususario Voluntario
    if(this.currentUser.userType.toLowerCase() == userTypeVoluntary){
      console.log(`delete task as voluntary`);
      this.optionVoluntaryDeleteTask();

      // Ususario Solicitante
      }else{
        console.log(`delete task as petitioner`);
        let msg : string = `Are you sure you want to delete it?`;
        // TODO: Se le mandará una notificación al voluntario por las molestias ocasionadas
        if(this.task.state.toLowerCase() != taskUnassigned.toLowerCase()){
          msg = `This task is being carried out by a voluntary. Are you sure you want to delete it?`;
        }
        this.alertPetitionerDeleteTask(msg);
      }
  }

  // cuando el voluntario quiere elminar la tarea definitivamente de su 'to-Do-List'
  async optionVoluntaryDeleteTask() {
    // Tarea realizada
    if(this.task.state == taskDone){
      let res = await this.dbService.deleteTask(this.task).catch( () =>{
        this.showToast('there was a problem and we cannot delete this task!');
      });

      if(res){
        this.showToast('this task has been deleted');
        this.dbService.createTaskOnTaskDone(this.task);
        this.router.navigateByUrl(`user-task-list`);
      }else{
        this.showToast('there was a problem and we cannot delete this task.');
      }
    }
    // Tarea sin realizar
    else{
      this.alertVoluntaryDeleteUnfinishedTask();
    }
  }


  // Nos lleva a la página donde realizamos los comentarios y puntuamos a los usuarios
  leaveComment(){
    this.router.navigateByUrl(`/score-form/${this.task.docID}`);
  }


  //----------------------------------------
  // ALERTAS - ALERTS
  //----------------------------------------

  // Cuando el Voluntario quiere dar la tarea por finalizada.
  // Se le madará una notificación al Solicitante
  async alertVoluntaryFinishtask() {
    let imgURL: string = '../../../../assets/img/ok-response.png';

    const alert = await this.alertCtrl.create({
      header: 'Information',
      cssClass: 'bg-pinkie',
      message: "<p class='fs-115rem fw-500'>You are going to mark this task as done. The Petitioner'll receive a notification. Are you sure?</p>" +
      `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL}/></div>`,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: (x) => {
            this.task.state = taskDone;
            this.dbService.updateTask(this.task)
              .then((resp) =>{
                console.log(resp);

                if(resp){
                  this.dbService.getVoluntaryByUID(this.currentUser.uuid)
                    .then((vol) => {
                      const volName = `${vol.name} ${vol.surname}`;
                      const msgContent = `Hey ${this.petitioner.name}! This task has been done! Do not forget to give ${volName} a valoration!`;
                      this.chatService.addChatMessage(msgContent, this.petitioner.uid, volName);
                      this.router.navigateByUrl(`/voluntary-finish-task/${this.task.docID}`);
                    })
                    .catch((err)=> {
                      console.log(`We cannot find the voluntary: ${err}`);
                      this.showToast("Something went wrong and we cannot find your data");
                    });
                }else{
                  console.log('responseAlert ELSE');
                  let msg = "Something went wrong and we cannot change the task status";
                  this.showToast(msg);
                }

              })
              .catch( () =>{
                let msg = "Something went wrong and we cannot change the task status";
                this.showToast(msg);
              });
          },
        },
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (x) => {
            console.log('cancel');
          }
        }
      ],
    });
    await alert.present();
  }

  // El solicitante borrará la tarea, este o no asignada a un voluntario
  async alertPetitionerDeleteTask(msg : string) {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      cssClass: 'bg-pinkie',
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (x) => {
            console.log('ok');

            // Si está asignada a un voluntario
            if(this.task.state.toLowerCase() != taskUnassigned.toLowerCase()){
              this.dbService.deleteTask(this.task)
              .then( (resp) =>{
                if(resp){
                  // TODO: Notif
                  this.showToast('The task has been deleted successfully!!');
                  this.router.navigateByUrl(`user-task-list`);
                }else{
                  this.showToast('There was a problem and we could not delete the task!');
                }
              })
              .catch( (err) =>{
                this.showToast('There was a problem and we could not delete the task!');
              });
            }
            // si todavía no tiene ningún voliuntario asignado
            else{
              this.dbService.deleteTask(this.task)
              .then( (resp) =>{
                if(resp){
                  this.showToast('The task has been deleted successfully!');
                  this.router.navigateByUrl(`user-task-list`);
                }else{
                  this.showToast('There was a problem and we could not delete the task!');
                }
              })
              .catch( (err) =>{
                this.showToast('There was a problem and we could not delete the task!');
              });
            }
          },
        },
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (x) => {
            console.log('cancel');
          }
        }
      ],
    });
    await alert.present();
  }


  // Alerta en la que el voluntario si lo desea o no puede dar una tarea por finalizada
  async alertVoluntaryDeleteUnfinishedTask(){
    console.log(`alert Voluntary deleteTask`);

    let imgURL: string = '../../../../assets/img/bad-response.png';

    const alert = await this.alertCtrl.create({
      header: 'Information',
      cssClass: 'bg-pinkie',
      message: "<p class='fs-115rem fw-500'>This task is not finished. Do you want to put it first as finished or excuse yourself? </p>" +
      `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL}/></div>`,
      buttons: [
        {
          text: 'Task done',
          cssClass: 'secondary',
          handler: (x) => {
            console.log(`finish it`);
            this.task.state = taskDone;
            this.dbService.deleteTask(this.task);
            this.dbService.createTaskOnTaskDone(this.task);

          },
        },
        {
          text: 'Leave an excuse',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (x) => {
            console.log('excuse');
            this.task.voluntaryDOC_ID = '';
            this.router.navigateByUrl(`/choose-complain-regret-form/${this.task.docID}`);
          }
        }
      ],
    });
    await alert.present();
  }

  // Nos crea un alert que notificará al usuario si la tarea se ha actualizado con éxito o no
  async responseAlert(resp: boolean) {
    let alertContent: string = '';
    let imgURL: string = '../../../../assets/img/ok-response.png';

    if(resp){
      alertContent = "<p class='fs-115rem fw-500'>This task has been added successfully to your To Do List!</p>" +
      `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL}/></div>`;
    }else{
      imgURL = '../../../../assets/img/bad-response.png';
      alertContent = "<p class='fs-115rem fw-500'>We cannot add this task to your To Do List at this moment. If this problem keeps happening please contact with us.</p>" +
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
            this.router.navigateByUrl('user-profile');
          },
        },
      ],
    });
    await alert.present();
  }

   // Nos muestra un toast con un pequeño mensaje
   async showToast(msg: string) {
    console.log('show toast')
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
