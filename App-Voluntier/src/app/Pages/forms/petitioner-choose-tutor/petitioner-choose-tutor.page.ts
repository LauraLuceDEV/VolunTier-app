import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PetitionerRegisterService } from '../../../Providers/petitioner-register.service';

/// Página donde decidiremos si el solicitante tiene o no tutor
@Component({
  selector: 'app-petitioner-choose-tutor',
  templateUrl: './petitioner-choose-tutor.page.html',
  styleUrls: ['./petitioner-choose-tutor.page.scss'],
})
export class PetitionerChooseTutorPage implements OnInit {
  petitioterHasTutor: boolean;

  //Constructor
  constructor(private router: Router,
    private navController: NavController,
    private petitionerRegisterService: PetitionerRegisterService
    ) {
    this.petitioterHasTutor = false;
    this.petitionerRegisterService.createPetitionerInstance();
   }

  ngOnInit() {}

  //Métodos

  //Método para volver atrás
  goBackPage(){
    this.navController.back();
  }

  //Cambia el valor del booleano 'petitioterHasTutor' a verdadero y te lleva al formulario siguiente
  changePetitionerHasTutor(){
    this.petitioterHasTutor = true;
    this.petitionerRegisterService.insertIfPetitionerHasTutor(this.petitioterHasTutor);
    this.goToNextPetitionerForm();

  }

   //Cambia el valor del booleano 'petitioterHasTutor' a falso y te lleva al formulario siguiente
  changePetitionerHasNoTutor(){
    this.petitioterHasTutor = false;
    this.petitionerRegisterService.insertIfPetitionerHasTutor(this.petitioterHasTutor);
    this.goToNextPetitionerForm();
  }


 // Te lleva al siguiente formulario dependiendo si tiene o no tutor
  goToNextPetitionerForm(){
    if(this.petitioterHasTutor){
      this.router.navigateByUrl('petitioner-tutor-form');
    }else{
      this.router.navigateByUrl('principal-data-form');
    }
  }


}

