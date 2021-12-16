import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { VoluntaryRegisterService } from 'src/app/Providers/voluntary-register.service';
import { DataItemModelsService } from '../../../../Providers/data-item-model.service';

// Página dónde el Voluntario elige sus 3 características más destacables
@Component({
  selector: 'app-voluntary-form-strengths',
  templateUrl: './voluntary-form-strengths.page.html',
  styleUrls: ['./voluntary-form-strengths.page.scss'],
})
export class VoluntaryFormStrengthsPage implements OnInit {
  // Var para guardar las cualidades
  private voluntQualities: string[];

  // Var para no sobrepasar el número de cualidades
  private numQualities: number;

  // Variables de las rutas de las imágenes
  public cleaningPic: string;
  public buyingPic: string;
  public trickyPic: string;
  public fastPic: string;
  public conversationPic: string;
  public helpPic: string;
  public strongPic: string;
  public babySitterPic: string;
  public kindPic: string;
  public firstAidsPic: string;
  public organizationPic: string;
  public medicPic: string;

  //Variables de los booleanos de activacion
  public selectedCleaning: boolean;
  public selectedBuying: boolean;
  public selectedTricky: boolean;
  public selectedFast: boolean;
  public selectedGoodConversation: boolean;
  public selectedHelp: boolean;
  public selectedStrong: boolean;
  public selectedBabySitter: boolean;
  public selectedKind: boolean;
  public selectedFirstAid: boolean;
  public selectedOrganization: boolean;
  public selectedMedic: boolean;

  //--------------------------
  //        Métodos
  //--------------------------
  //Constructor
  constructor(private router: Router,
    private navController: NavController,
    private dimService: DataItemModelsService,
    private alertController: AlertController,
    private voluntaryRegisterService: VoluntaryRegisterService) {

    this.voluntQualities = new Array();
    this.numQualities = 0;

    this.cleaningPic = "assets/icons/cleaning-aqua.png";
    this.buyingPic = "assets/icons/buying-aqua.png";
    this.trickyPic = "assets/icons/tricky-aqua.png";
    this.fastPic = "assets/icons/fast-aqua.png";
    this.conversationPic = "assets/icons/goodconversation-aqua.png";
    this.helpPic = "assets/icons/help-aqua.png";
    this.strongPic = "assets/icons/strong-aqua.png";
    this.babySitterPic = "assets/icons/babysitter-aqua.png";
    this.kindPic = "assets/icons/kind-aqua.png";
    this.firstAidsPic = "assets/icons/firstaid-aqua.png";
    this.organizationPic = "assets/icons/organization-aqua.png";
    this.medicPic = "assets/icons/medic-aqua.png";

    this.selectedCleaning = false;
    this.selectedBuying = false;
    this.selectedTricky = false;
    this.selectedFast = false;
    this.selectedGoodConversation = false;
    this.selectedHelp = false;
    this.selectedStrong = false;
    this.selectedBabySitter = false;
    this.selectedKind = false;
    this.selectedFirstAid = false;
    this.selectedOrganization = false;
    this.selectedMedic = false;
   }

  ngOnInit() {}


  //-------------------------
  // Métodos para añadir cualidades al voluntario
  // Y cambiar el estilo de los contenedores
  //-------------------------


  //Método para volver atrás
  goBackPage(){
    this.navController.back();
  }


  //Añadir limpieza
  addCleaningToQualities(){
    if (this.cleaningPic == "assets/icons/cleaning-aqua.png" && (this.numQualities >= 0 && this.numQualities < 3)){
      this.cleaningPic = "assets/icons/cleaning.png";
      this.selectedCleaning = !this.selectedCleaning;
      this.numQualities += 1;
      this.voluntQualities.push("cleaning.png");
    }

    else if(this.cleaningPic == "assets/icons/cleaning.png"){
      this.cleaningPic = "assets/icons/cleaning-aqua.png";
      this.selectedCleaning = !this.selectedCleaning;
      this.numQualities -= 1;
      this.removeItemFromArr("cleaning.png");
    }
  }

  //Añadir compra
  addToBuyToQualities(){
    if (this.buyingPic == "assets/icons/buying-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.buyingPic = "assets/icons/buying.png";
      this.selectedBuying = !this.selectedBuying;
      this.numQualities += 1;
      this.voluntQualities.push("buying.png");
    }
    else if(this.buyingPic == "assets/icons/buying.png"){
      this.buyingPic = "assets/icons/buying-aqua.png";
      this.selectedBuying = !this.selectedBuying;
      this.numQualities -= 1;
      this.removeItemFromArr("buying.png");
    }
  }

  // Añadir habilidad de 'mañoso'
  addTrickyToQualities(){
    if (this.trickyPic == "assets/icons/tricky-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.trickyPic = "assets/icons/tricky.png";
      this.selectedTricky = !this.selectedTricky;
      this.numQualities += 1;
      this.voluntQualities.push("tricky.png");
    }
    else if(this.trickyPic == "assets/icons/tricky.png"){
      this.trickyPic = "assets/icons/tricky-aqua.png";
      this.selectedTricky = !this.selectedTricky;
      this.numQualities -= 1;
      this.removeItemFromArr("tricky.png");
    }
  }


  //Añadir habilidad 'rápidez
  addFastToQualities(){
    if (this.fastPic == "assets/icons/fast-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.fastPic = "assets/icons/fast.png";
      this.selectedFast = !this.selectedFast;
      this.numQualities += 1;
      this.voluntQualities.push("fast.png");

    }
    else if(this.fastPic == "assets/icons/fast.png"){
      this.fastPic = "assets/icons/fast-aqua.png";
      this.selectedFast = !this.selectedFast;
      this.numQualities -= 1;
      this.removeItemFromArr("fast.png");
    }
  }


  //Añadir habilidad de buena conversacion
  addGiveGoodConversationToQualities(){
    if (this.conversationPic == "assets/icons/goodconversation-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.conversationPic = "assets/icons/goodconversation.png";
      this.selectedGoodConversation = !this.selectedGoodConversation;
      this.numQualities += 1;
      this.voluntQualities.push("goodconversation.png");

    }
    else if(this.conversationPic == "assets/icons/goodconversation.png"){
      this.conversationPic = "assets/icons/goodconversation-aqua.png";
      this.selectedGoodConversation = !this.selectedGoodConversation;
      this.numQualities -= 1;
      this.removeItemFromArr("goodconversation.png");
    }
  }


  //Añadir cualidad de voluntarioso
  addHelpfullToQualities(){
    if (this.helpPic == "assets/icons/help-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.helpPic = "assets/icons/help.png";
      this.selectedHelp = !this.selectedHelp;
      this.numQualities += 1;
      this.voluntQualities.push("help.png");

    }
    else if(this.helpPic == "assets/icons/help.png"){
      this.helpPic = "assets/icons/help-aqua.png";
      this.selectedHelp = !this.selectedHelp;
      this.numQualities -= 1;
      this.removeItemFromArr("help.png");
    }
  }


  //Añadir habilidad de fuerza
  addStrongToQualities(){
    if (this.strongPic == "assets/icons/strong-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.strongPic = "assets/icons/strong.png";
      this.selectedStrong = !this.selectedStrong;
      this.numQualities += 1;
      this.voluntQualities.push("strong.png");

    }
    else if(this.strongPic == "assets/icons/strong.png"){
      this.strongPic = "assets/icons/strong-aqua.png";
      this.selectedStrong = !this.selectedStrong;
      this.numQualities -= 1;
      this.removeItemFromArr("strong.png");
    }
  }


  //Añadir cualidad de cuidar niños
  addBabySittingToQualities(){
    if (this.babySitterPic == "assets/icons/babysitter-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.babySitterPic = "assets/icons/babysitter.png";
      this.selectedBabySitter = !this.selectedBabySitter;
      this.numQualities += 1;
      this.voluntQualities.push("babysitter.png");

    }
    else if(this.babySitterPic == "assets/icons/babysitter.png"){
      this.babySitterPic = "assets/icons/babysitter-aqua.png";
      this.selectedBabySitter = !this.selectedBabySitter;
      this.numQualities -= 1;
      this.removeItemFromArr("babysitter.png");
    }
  }

  //Añadir cualidad de amabilidad
  addKindToQualities(){
    if (this.kindPic == "assets/icons/kind-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.kindPic = "assets/icons/kind.png";
      this.selectedKind = !this.selectedKind;
      this.numQualities += 1;
      this.voluntQualities.push("kind.png");

    }
    else if(this.kindPic == "assets/icons/kind.png"){
      this.kindPic = "assets/icons/kind-aqua.png";
      this.selectedKind = !this.selectedKind;
      this.numQualities -= 1;
      this.removeItemFromArr("kind.png");
    }
  }

  //Añadir cualidad de conocer primeros auxilios
  addFirstAidsToQualities(){
    if (this.firstAidsPic == "assets/icons/firstaid-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.firstAidsPic = "assets/icons/firstaid.png";
      this.selectedFirstAid = !this.selectedFirstAid;
      this.numQualities += 1;
      this.voluntQualities.push("firstaid.png");

    }
    else if(this.firstAidsPic == "assets/icons/firstaid.png"){
      this.firstAidsPic = "assets/icons/firstaid-aqua.png";
      this.selectedFirstAid = !this.selectedFirstAid;
      this.numQualities -= 1;
      this.removeItemFromArr("firstaid.png");
    }
  }


  //Añadir cualidad de organización
  addOrganizationToQualities(){
    if (this.organizationPic == "assets/icons/organization-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.organizationPic = "assets/icons/organization.png";
      this.selectedOrganization = !this.selectedOrganization;
      this.numQualities += 1;
      this.voluntQualities.push("organization.png");

    }
    else if(this.organizationPic == "assets/icons/organization.png"){
      this.organizationPic = "assets/icons/organization-aqua.png";
      this.selectedOrganization = !this.selectedOrganization;
      this.numQualities -= 1;
      this.removeItemFromArr("organization.png");
    }
  }


  //Añadir algun estudio/conocimiento relacionado con la medicina
  addMedicineStudiesToQualities(){
    if (this.medicPic == "assets/icons/medic-aqua.png"  && (this.numQualities >= 0 && this.numQualities < 3)){
      this.medicPic = "assets/icons/medic.png";
      this.selectedMedic = !this.selectedMedic;
      this.numQualities += 1;
      this.voluntQualities.push("medic.png");

    }
    else if(this.medicPic == "assets/icons/medic.png"){
      this.medicPic = "assets/icons/medic-aqua.png";
      this.selectedMedic = !this.selectedMedic;
      this.numQualities -= 1;
      this.removeItemFromArr("medic.png");
    }
  }


  //------------------
  //Parte Final del Formulario
  //------------------
  goToVoluntaryFinalForm(){
    if(this.numQualities >= 3){
      this.voluntaryRegisterService.insertVoluntaryqualities(this.voluntQualities);
      this.router.navigateByUrl('last-details');
    }else{
      this.presentAlertChooseQualities();
    }
  }


  //------------------
  // Métodos auxiliares
  //------------------

  // Nos elimina un item del array
  removeItemFromArr(item: string) {
    let index = this.voluntQualities.indexOf( item );
    this.voluntQualities.splice( index, 1 );
  }

  // Alerta de
  async presentAlertChooseQualities() {
    const alert = await this.alertController.create({
      cssClass: 'bg-pinkie',
      header: 'Information',
      message: 'You must choose 3 qualities minimum',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}





