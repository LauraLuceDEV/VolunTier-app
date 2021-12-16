import { Component, OnInit } from '@angular/core';
import { DataItemModelsService } from '../../Providers/data-item-model.service';
import { Router } from '@angular/router';
import { modeRegisterForm, userTypeVoluntary } from 'src/app/Models/Globals';

// Página que será el listado de tareas que tiene un usuario
// Si el usuario es Voluntario mostrará las que ha aceptado realizar
// Si el usuario es un Solicitante mostrará las que ha creado
@Component({
  selector: 'app-user-task-list',
  templateUrl: './user-task-list.page.html',
  styleUrls: ['./user-task-list.page.scss'],
})
export class UserTaskListPage implements OnInit {
  userType: string;
  userName: string;
  showButonCreateTask: boolean;

  constructor(private dimService: DataItemModelsService,
    private router: Router) { }

  async ngOnInit() {
    console.log('fron onInit')
    this.userType = this.dimService.getUserType();

    // Tipo de usuario
    if(this.userType == userTypeVoluntary)
      this.showButonCreateTask = false;
    else
      this.showButonCreateTask = true;
  }
  //--------------------------
  //        Métodos
  //--------------------------

 //Método para volver atrás
 goBackPage(){
   this.router.navigateByUrl('user-profile');
}

goToCreateTaskForm(){
  this.dimService.setStyleInputDataForm(modeRegisterForm);
  this.router.navigateByUrl('petitioner-task-form');
}

doRefresh(aaa){
  console.log(aaa)
}


}
