import { userTypeVoluntary, userTypePetitioner } from './../../../Models/Globals';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { DatabaseService } from '../../../Providers/database.service';
import { NavController } from '@ionic/angular';
import { modeRegisterForm } from '../../../Models/Globals';

@Component({
  selector: 'app-choose-profile-form',
  templateUrl: './choose-profile-form.page.html',
  styleUrls: ['./choose-profile-form.page.scss'],
})
export class ChooseProfileFormPage implements OnInit {

  //Constructor
  constructor(
    private router: Router,
    private dimService: DataItemModelsService,
    private navController: NavController) { }

  ngOnInit() {}

  //Método para volver atrás
  goBackPage(){
    this.navController.back();
  }


  // Con este método actualizamos las variables de nuestro servicio DataItemModelsService
  // Que el tipo de usuario será voluntario y estará en modo registro (para así actualizar el contenido de los próximos formularios)
  // Y nos leva al formulario del Voluntario
  goToVoluntaryForm(){
    this.dimService.setStyleInputDataForm(modeRegisterForm);
    this.dimService.setUserType(userTypeVoluntary);

    this.router.navigateByUrl('principal-data-form');
  }


  // Con este método actualizamos las variables de nuestro servicio DataItemModelsService
  // Que el tipo de usuario será solicitante y estará en modo registro (para así actualizar el contenido de los próximos formularios)
  // Y nos leva al formulario de elección de tutor del solicitante
  goToPetitionerForm(){
    this.dimService.setStyleInputDataForm(modeRegisterForm);
    this.dimService.setUserType(userTypePetitioner);

    this.router.navigateByUrl('petitioner-choose-tutor');
  }
}
