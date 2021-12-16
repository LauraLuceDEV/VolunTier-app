import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { PetitionerRegisterService } from '../../../Providers/petitioner-register.service';

// Página dónde el solicitante insertará el tipo de problemas que tiene
@Component({
  selector: 'app-petitioner-problems',
  templateUrl: './petitioner-problems.page.html',
  styleUrls: ['./petitioner-problems.page.scss'],
})
export class PetitionerProblemsPage implements OnInit {
  // Var para guardar los problemas
  private petitionerIssues: string[];

  // Var para no sobrepasar el número de cualidades
  private numIssues: number;

  // Variables de las rutas de las imágenes
  public childrensPic: string;
  public elderlyPersonPic: string;
  public noTimePic: string;
  public healthProblemsPic: string;
  public responsabilitiesPic: string;
  public needCaresPic: string;
  public homeAlonePic: string;
  public homeworkHelpPic: string;
  public reducedMobilityPic: string;
  public feelLonelyPic: string;

  //Variables de los booleanos de activacion
  public selectedChildrens: boolean;
  public selectedElderlyPerson: boolean;
  public selectedNoTime: boolean;
  public selectedNeedCare: boolean;
  public selectedHealthProblems: boolean;
  public selectedResponsabilities: boolean;
  public selectedHomeAlone: boolean;
  public selectedFeelLonely: boolean;
  public selectedReducedMobility: boolean;
  public selectedHomeworkHelp: boolean;

  ngOnInit() { }

  //Constructor
  constructor(private router: Router,
    private navController: NavController,
    private petitionerRegServ: PetitionerRegisterService,
    private alertController: AlertController) {
    this.petitionerIssues = [];
    this.numIssues = 0;

    this.childrensPic = 'assets/icons/boy-aqua.png';
    this.elderlyPersonPic = 'assets/icons/delighted-granny-aqua.png';
    this.noTimePic = 'assets/icons/no-aqua.png';
    this.needCaresPic = 'assets/icons/carer-aqua.png';
    this.healthProblemsPic = 'assets/icons/patient-aqua.png';
    this.responsabilitiesPic = 'assets/icons/responsability-aqua.png';
    this.homeAlonePic = 'assets/icons/home-aqua.png';
    this.feelLonelyPic = 'assets/icons/lonely-aqua.png';
    this.reducedMobilityPic = 'assets/icons/mobility-scooter-aqua.png';
    this.homeworkHelpPic = 'assets/icons/sleep-alone-aqua.png';

    this.selectedChildrens = false;
    this.selectedElderlyPerson = false;
    this.selectedNoTime = false;
    this.selectedNeedCare = false;
    this.selectedHealthProblems = false;
    this.selectedResponsabilities = false;
    this.selectedHomeAlone = false;
    this.selectedFeelLonely = false;
    this.selectedReducedMobility = false;
    this.selectedHomeworkHelp = false;
  }



  //-------------------------------------
  // Métodos para añadir los problemas al listado
  //-------------------------------------


  //Método para volver atrás
  goBackPage(){
    this.navController.back();
  }

  // Añadir niños a problemas
  addChildrenToIssues() {
    if (this.childrensPic == 'assets/icons/boy-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.childrensPic = 'assets/icons/boy.png';
      this.selectedChildrens = !this.selectedChildrens;
      this.numIssues += 1;
      this.petitionerIssues.push("boy.png");
    }
    else if (this.childrensPic == 'assets/icons/boy.png') {
      this.childrensPic = 'assets/icons/boy-aqua.png';
      this.selectedChildrens = !this.selectedChildrens;
      this.numIssues -= 1;
      this.removeItemFromArr("boy.png");
    }
  }

  // Añadir persona mayor a problemas
  addElderlyPerson() {
    if (this.elderlyPersonPic == 'assets/icons/delighted-granny-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.elderlyPersonPic = 'assets/icons/delighted-granny.png';
      this.selectedElderlyPerson = !this.selectedElderlyPerson;
      this.numIssues += 1;
      this.petitionerIssues.push("delighted-granny.png");

    } else if (this.elderlyPersonPic == 'assets/icons/delighted-granny.png') {
      this.elderlyPersonPic = 'assets/icons/delighted-granny-aqua.png';
      this.selectedElderlyPerson = !this.selectedElderlyPerson;
      this.numIssues -= 1;
      this.removeItemFromArr("delighted-granny.png");
    }
  }

  // Añadir falta de tiempo a problemas
  addNoTimeToIssues() {
    console.log(`event ok`)
    if (this.noTimePic == 'assets/icons/no-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      console.log(this.noTimePic)
      this.noTimePic = 'assets/icons/no.png';
      this.selectedNoTime = !this.selectedNoTime;
      this.numIssues += 1;
      this.petitionerIssues.push("no.png");

    } else if (this.noTimePic == 'assets/icons/no.png') {
      console.log(this.noTimePic)
      this.noTimePic = 'assets/icons/no-aqua.png';
      this.selectedNoTime = !this.selectedNoTime;
      this.numIssues -= 1;
      this.removeItemFromArr("no.png");
    }
  }

  // Añadir necesidad de cuidados a problemas
  addNeedCaresToIssues() {
    if (this.needCaresPic == 'assets/icons/carer-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.needCaresPic = 'assets/icons/carer.png';
      this.selectedNeedCare = !this.selectedNeedCare;
      this.numIssues += 1;
      this.petitionerIssues.push("carer.png");

    } else if (this.needCaresPic == 'assets/icons/carer.png') {
      this.needCaresPic = 'assets/icons/carer-aqua.png';
      this.selectedNeedCare = !this.selectedNeedCare;
      this.numIssues -= 1;
      this.removeItemFromArr("carer.png");
    }
  }


  // Añadir problemas de salud/persona dependiente a problemas
  addHealthProblemsToIssues() {
    if (this.healthProblemsPic == 'assets/icons/patient-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.healthProblemsPic = 'assets/icons/patient.png';
      this.selectedHealthProblems = !this.selectedHealthProblems;
      this.numIssues += 1;
      this.petitionerIssues.push("patient.png");

    } else if (this.healthProblemsPic == 'assets/icons/patient.png') {
      this.healthProblemsPic = 'assets/icons/patient-aqua.png';
      this.selectedHealthProblems = !this.selectedHealthProblems;
      this.numIssues -= 1;
      this.removeItemFromArr("patient.png");
    }
  }

  // Añadir muchas responsabilidades a problemas
  addResponsabilitiesToIssues() {
    if (this.responsabilitiesPic == 'assets/icons/responsability-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.responsabilitiesPic = 'assets/icons/responsability.png';
      this.selectedResponsabilities = !this.selectedResponsabilities;
      this.numIssues += 1;
      this.petitionerIssues.push("responsability.png");

    } else if (this.responsabilitiesPic == 'assets/icons/responsability.png') {
      this.responsabilitiesPic = 'assets/icons/responsability-aqua.png';
      this.selectedResponsabilities = !this.selectedResponsabilities;
      this.numIssues -= 1;
      this.removeItemFromArr("responsability.png");
    }
  }

  // Añadir que la persona vive sóla a problemas
  addLiveAloneToIssues() {
    if (this.homeAlonePic == 'assets/icons/home-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.homeAlonePic = 'assets/icons/home.png';
      this.selectedHomeAlone = !this.selectedHomeAlone;
      this.numIssues += 1;
      this.petitionerIssues.push("home.png");

    } else if (this.homeAlonePic == 'assets/icons/home.png') {
      this.homeAlonePic = 'assets/icons/home-aqua.png';
      this.selectedHomeAlone = !this.selectedHomeAlone;
      this.numIssues -= 1;
      this.removeItemFromArr("home.png");
    }
  }

   // Añadir que la persona tiene problemas/inconvenientes para realizar tareas, a problemas
   addNeedHelpWithHomeworkToIssues() {
    if (this.homeworkHelpPic == 'assets/icons/sleep-alone-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.homeworkHelpPic = 'assets/icons/sleep-alone.png';
      this.selectedHomeworkHelp = !this.selectedHomeworkHelp;
      this.numIssues += 1;
      this.petitionerIssues.push("sleep-alone.png");

    } else if (this.homeworkHelpPic == 'assets/icons/sleep-alone.png') {
      this.homeworkHelpPic = 'assets/icons/sleep-alone-aqua.png';
      this.selectedHomeworkHelp = !this.selectedHomeworkHelp;
      this.numIssues -= 1;
      this.removeItemFromArr("sleep-alone.png");
    }
  }

  // Añadir mobilidad reducida a problemas
  addReducedMobilityToIssues() {
    if (this.reducedMobilityPic == 'assets/icons/mobility-scooter-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.reducedMobilityPic = 'assets/icons/mobility-scooter.png';
      this.selectedReducedMobility = !this.selectedReducedMobility;
      this.numIssues += 1;
      this.petitionerIssues.push("mobility-scooter.png");

    } else if (this.reducedMobilityPic == 'assets/icons/mobility-scooter.png') {
      this.reducedMobilityPic = 'assets/icons/mobility-scooter-aqua.png';
      this.selectedReducedMobility = !this.selectedReducedMobility;
      this.numIssues -= 1;
      this.removeItemFromArr("mobility-scooter.png");
    }
  }

  // Añadir que la persona se siente sóla a problemas
  addFeelingLonelyToIssues() {
    if (this.feelLonelyPic == 'assets/icons/lonely-aqua.png' && this.numIssues >= 0 && this.numIssues < 3) {
      this.feelLonelyPic = 'assets/icons/lonely.png';
      this.selectedFeelLonely = !this.selectedFeelLonely;
      this.numIssues += 1;
      this.petitionerIssues.push("lonely.png");

    } else if (this.feelLonelyPic == 'assets/icons/lonely.png') {
      this.feelLonelyPic = 'assets/icons/lonely-aqua.png';
      this.selectedFeelLonely = !this.selectedFeelLonely;
      this.numIssues -= 1;
      this.removeItemFromArr("lonely.png");
    }
  }


  // Método que nos llevará a la subida de foto de perfil
  goToPetitionerFinalForm(){
    console.log(this.petitionerIssues)

    if(this.petitionerIssues.length >= 3){
      this.petitionerRegServ.insertPetitionerIssues(this.petitionerIssues);
      this.router.navigateByUrl('last-details');

    }else{
      this.presentAlertNoFormComplete();
    }
  }

  //------------------
  // Métodos auxiliares
  //------------------

  // Nos elimina un item del array
  removeItemFromArr(item: string) {
    let index = this.petitionerIssues.indexOf(item);
    this.petitionerIssues.splice(index, 1);
  }

  // Nos envía una alerta de que debe completar
  async presentAlertNoFormComplete() {
    const alert = await this.alertController.create({
      cssClass: 'bg-pinkie',
      header: 'Information',
      message: 'You must put 3 problems minimum',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
