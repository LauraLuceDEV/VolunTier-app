import { DatabaseService } from '../../Providers/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Task } from '../../Models/Clases/Extra_Clases';
import { Router } from '@angular/router';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { modeUpdateForm, taskDone, userTypeVoluntary } from 'src/app/Models/Globals';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ChatService } from 'src/app/Providers/chat.service';
import { User } from 'src/app/Models/Interfaces/AllInterfaces';
import { Voluntary } from 'src/app/Models/Clases/Voluntary';
import { Petitioner } from 'src/app/Models/Clases/Petitioner';


/*Componente que nos muestra un listado de las tareas pendientes.*/


@Component({
  selector: 'task-list',
  templateUrl: './task-list-profile.component.html',
  styleUrls: ['./task-list-profile.component.scss'],
})
export class TaskListProfileComponent implements OnInit {
  public userTasks$: Observable<Task[]>;
  public userType: string;
  public userTasks: Task[] = [];
  public currentUser: User;
  public currentUserType: any;


  //--------------------------------
  // MÉTODOS DEL CICLO DE VIDA
  //--------------------------------

  //Constructor
  constructor(private databaseService: DatabaseService,
    private dimService: DataItemModelsService,
    private chatService: ChatService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private router: Router) {
    console.log('TaskListProfileComponent constructor');
   }

   // ngOnInit
   ngOnInit(): void {
    console.log('TaskListProfileComponent ngOnInit');

    this.userType = this.dimService.userType;
    this.loadTasks();

    //Cargar las tareas cada vez que se añade una nueva
    this.databaseService.newTaskUploaded$.subscribe((resp)=>{
      if(resp){
        this.loadTasks();
      }
    });
  }

  //--------------------------------
  // MÉTODOS DE LA CLASE
  //--------------------------------

  // Método que llama al servicio para que nos cargue las tareas del usuario actual
  loadTasks() {
    this.databaseService.getUser()
      .then((user) => {
        this.currentUser = user;

        if(this.userType === userTypeVoluntary){
          this.databaseService.getVoluntaryByUID(this.currentUser.uuid)
            .then((vol)=>{
              this.currentUserType = vol as Voluntary;
            })
            .catch((err)=>{
              console.log('We cannot load voluntary data properly');
            });
        }else{
          this.databaseService.getPetitionerByUID(this.currentUser.uuid)
            .then((pet)=>{
              this.currentUserType = pet as Petitioner;
            })
            .catch((err)=>{
              console.log('We cannot load petitioner data properly');
            });
        }
      })
      .catch((err)=>{
        console.log('Cannot load data properly');
      });
    this.userTasks$ = from(this.databaseService.getUserTask());
    this.userTasks$.subscribe(resp=>{
      console.log(resp)
      this.userTasks = resp;
    });
  }

  // Nos lleva a la página de los detalles de la tarea
  goToTaskDetails(taskID, taskPetitionerUID){
    this.router.navigateByUrl(`/task-details/${taskID}/${taskPetitionerUID}`);
  }

  // Método que nos borra una tarea.
  // Si nuestro usuario es de tipo Voluntario/Voluntary la borrará de nuestro listado
  // Si nuestro usuario es de tipo Solicitante/Petitioner la borrará de nuestra Base de Datos
  deleteTask(task: Task){
    // Comprobamos el tipo de usuario
    if(this.userType == 'voluntary'){
      // Comprobamos si primero esta la tarea finalizada
      if(task.state == taskDone){
        this.switchModeAlert('delete-voluntary-task-done', task);

        // Si la tarea no está finalizada sugerimos el cambio
      }else{
        this.switchModeAlert('delete-voluntary-unfinished-task', task);
      }
      // Usuario Petitioner
    }else{
      if(task.state == taskDone){
        this.switchModeAlert('delete-petitioner-task-done', task);
      }else{
        this.switchModeAlert('delete-petitioner-task-disrupt', task);
      }
    }
    // this.databaseService.deleteTask(task).then(() => {
    //   this.loadTasks();
    // });
  }

  // Método que llama al servicio para que podamos editar las tareas de nuestra base de datos.
  // Opción sólo como usuario de tipo Solicitante/Petitioner
  editTask(task: Task){
    this.dimService.setCurrentTaskDocID(task.docID);
    this.dimService.setStyleInputDataForm(modeUpdateForm);
    this.router.navigateByUrl(`petitioner-task-form`);
  }

  // Método que llama al servicio para que podamos marcar las tareas como finalizadas
  // en nuestra base de datos.
  // Opción sólo como usuario de tipo Voluntario/Voluntary
  markTaskAsDone(task: Task){
    this.switchModeAlert('voluntary-mark-task-done', task);
  }


  switchModeAlert(mode: string, task: Task) {
    console.log(`Switch Mode altert - ${mode} `);
    let alertContent: string = '';
    let imgURL_OK: string = '../../../../assets/img/ok-response.png';
    let imgURL_KO: string = '../../../../assets/img/bad-response.png';

    switch(mode){
      // Nos quita una tarea del voluntario del cuando está terminada.
      // Avisa al solicitante de ello
      case 'delete-voluntary-task-done' :{
        console.log('Switch delete-voluntary-task-done');
        alertContent = "<p class='fs-115rem fw-500'>You are going to delete this task from your 'To Do List'! this task will never appear again.</p>" +
        `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL_OK}/></div>`;

        this.responseAlert(mode, alertContent, task);
        break;
      }
      // Nos quita una tarea del voluntario del cuando esta no está terminada.
      // Se le desasigna y avisa al solicitante de ello
      case 'delete-voluntary-unfinished-task' :{
        console.log('Switch delete-voluntary-unfinished-task');
        alertContent = "<p class='fs-115rem fw-500'>This task is not finished! If the task is made, do you want to mark it first as done?</p>" +
        `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL_KO}/></div>`;

        this.responseAlert(mode, alertContent, task);
        break;
      }
      // El solicitante borra la tarea que ha sido finalizada
      case 'delete-petitioner-task-done' :{
        console.log('Switch delete-petitioner-task-done');
        alertContent = "<p class='fs-115rem fw-500'>This task will be removed from your to do list! Do you want to delete this task?</p>" +
        `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL_KO}/></div>`;

        this.responseAlert(mode, alertContent, task);
        break;
      }
      // El solicitante borra la tarea que no ha sido finalizada
      case 'delete-petitioner-task-disrupt' :{
        console.log('Switch delete-petitioner-task-disrupt');
        alertContent = "<p class='fs-115rem fw-500'>Do you really want to delete this 'In Progress' task?</p>" +
        `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL_KO}/></div>`;

        this.responseAlert(mode, alertContent, task);
        break;
      }
      // El voluntario marca la tarea como marcada
      case 'voluntary-mark-task-done' :{
        console.log('Switch voluntary-mark-task-done');
        alertContent = "<p class='fs-115rem fw-500'>You are going to mark this task as done. The Petitioner'll receive a notification. Are you sure?</p>" +
        `<div class='aling-items-center-webkit'><img class='alert-img' src=${imgURL_OK}/></div>`;

        this.responseAlert(mode, alertContent, task);
        break;
      }
    }
  }

  async responseAlert(mode:string, alertContent: string, task: Task){
    console.log('responseAlert');
    const alert = await this.alertCtrl.create({
      header: 'Information',
      cssClass: 'bg-pinkie',
      message: alertContent,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: (x) => {
            console.log('switch mode')
            console.log(mode)

            switch(mode){
              // Nos cambia el estado de la tarea a finalizado
              case 'voluntary-mark-task-done' :{
                console.log('voluntary-mark-task-done BTN - OK')
                task.state = taskDone;
                Promise.all([this.databaseService.updateTask(task),
                  this.databaseService.getPetitionerByDocID(task.petitionerDOC_ID)])
                  .then((resp) =>{
                    if(resp[0]){
                      const volName = `${this.currentUserType.name} ${this.currentUserType.surname}`;
                      const msgContent = `Hey ${resp[1].name}! This task has been done! Do not forget to give ${volName} a valoration!`;
                      this.chatService.addChatMessage(msgContent, resp[1].uid, volName);
                      this.router.navigateByUrl(`/voluntary-finish-task/${task.docID}`);
                    }else{
                      console.log('responseAlert ELSE');
                      let msg = "Something went wrong and we cannot change the task status";
                      this.showToast(msg);
                    }
                    console.log('after if-else');
                  })
                  .catch();
                break;
              }
              // FIN -- Nos cambia el estado de la tarea a finalizado


              // Nos elimina la tarea, ya finalizada, del perfil del voluntario
              case 'delete-voluntary-task-done' :{
                this.deleteTaskAndCreateTaskOnTaskDone(task);
                break;
              }

              // Nos elimina la tarea del perfil del voluntario, pero antes nos pregunta si
              // deseamos finalizarla
              case 'delete-voluntary-unfinished-task' :{
                console.log('delete-voluntary-unfinished-task');
                task.state = taskDone;
                this.deleteTaskAndCreateTaskOnTaskDone(task);
                this.router.navigateByUrl(`/voluntary-finish-task/${task.docID}`);
                break;
              }

              // Nos elimina una tarea realizada y deja que dejemos una puntuación al voluntario
              case 'delete-petitioner-task-done' :{
                console.log('delete-petitioner-task-done');
                this.deleteTaskAndCreateTaskOnTaskDone(task);
                this.router.navigateByUrl(`/petitioner-finish-task/${task.docID}`);
                break;
              }

              // Eliminamos definitivamente una tarea que está en proceso o sin asignar
              case 'delete-petitioner-task-disrupt' :{
                console.log('delete-petitioner-task-disrupt');
                this.deleteTask(task);
                break;
              }
            }
          },
        },
        {
          text: 'CANCEL',
          cssClass: 'secondary',
          handler: () => {
            console.log('I do nothing BTN - CANCEL');
          }
        }
      ],
    });
    await alert.present();
  }


  // Nos elimina nuestra tarea de nuestra Base de datos
  // y nos vuelca la tarea finalizada en otra tabla,
  // pero antes nos comprobará si la tarea está finalizada para pdoer realizarlo
  deleteTaskAndCreateTaskOnTaskDone(task: Task){
    if(task.state === taskDone){
      this.databaseService.deleteTask(task).then(
        (response) => {
          console.log(response)
          if(response){
            this.databaseService.createTaskOnTaskDone(task).then(
              (resp) => {
                console.log(resp);
              }
            ).catch( (err) => {
              console.log(err);
            })
          }
        }
      ).catch( (resp) =>{
        console.log(resp);
      });
    }else{
      this.showToast('Imposible to delete this task');
    }
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
