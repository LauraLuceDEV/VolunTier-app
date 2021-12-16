import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { userTypePetitioner } from 'src/app/Models/Globals';
import { DataItemModelsService } from '../../Providers/data-item-model.service';
import { DatabaseService } from '../../Providers/database.service';
import { Petitioner } from '../../Models/Clases/Petitioner';
import { Voluntary } from '../../Models/Clases/Voluntary';

// Página que será el perfil de nuestro usuario logeado
@Component({
  selector: 'app-volutary-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  public userData;
  public userName: string;
  public userSurname: string;
  public userBiography: string;
  public userProfilePhoto: string;
  public showComments: boolean;
  public showPuntuation: boolean;
  public qualities: string[];
  public userType: string;
  public numberCommentsScore: number;
  public mediaScore: number;

  // Constructor
  constructor(private menuCtrl: MenuController,
    private navController: NavController,
    private toastController: ToastController,
    private dimService: DataItemModelsService,
    private dbService: DatabaseService) {
      console.log('constructor')
      this.showComments = true;
      this.showPuntuation = false;
   }


  // OnInit
  ngOnInit() {
    console.log('ngOnInit')
    // this.chargeData();
  }

  // Nos carga los datos. Actualizamos los datos de la vista y posteriormente los pintamos en el Template.
  ionViewWillEnter(){
    console.log('IonviewWillEnter')
    this.chargeData();
  }


  // MÉTODOS

  // Nos prepara los datos de la página
  // TODO: [TEST-7] Obtener foto desde FB, mientras tanto
  // TODO: [TEST-8] Obtener media de puntuacion de los 'scores' para plasmarlo en la imagen
  async chargeData(){
    console.log('Charge Data')
    const user = await this.dbService.getUser().catch();
    const userUID = await this.dbService.getUserUID().catch();
    this.mediaScore = await this.dbService.getUserMediaScore();

    this.dimService.setUserType(user.userType);
    this.userType = this.dimService.getUserType();

    if(user.userType == userTypePetitioner){
        const petitioner = await this.dbService.getPetitionerByUID(userUID);

        console.log(petitioner)
        this.userData = petitioner;
        this.userName = (this.userData as Petitioner).name;
        this.userSurname = (this.userData as Petitioner).surname;
        this.userBiography = (this.userData as Petitioner).biography;
        this.qualities =  await this.dbService.getUserImages(user.userType, petitioner.issues);
        this.userProfilePhoto = this.dbService.getProfilePhoto((this.userData as Petitioner).sex);
    } else {
        const voluntary = await this.dbService.getVoluntaryByUID(userUID);

        this.userData = voluntary;
        this.userName = (this.userData as Voluntary).name;
        this.userSurname = (this.userData as Voluntary).surname;
        this.userBiography = (this.userData as Voluntary).biography;
        this.qualities =  await this.dbService.getUserImages(user.userType, voluntary.qualities);
        this.userProfilePhoto = this.dbService.getProfilePhoto((this.userData as Voluntary).sex);
    }
    this.numberCommentsScore = (await this.dbService.getScores()).length;
    this.checkCommentsQuantity(this.numberCommentsScore);
  }

  //Método que nos permite ir a a la página anterior
  goBackPage(){
    this.navController.back();
  }

  openSideBarMenu(){
    this.menuCtrl.toggle();
  }

  // Nos comprueba si existen o no comentarios, sino fuera así no los mostraría
  checkCommentsQuantity(numComments: number){
    if(numComments == 0){
      this.showComments = false;
    }
  }
  // Nos cambia el valor del booleano para mostrar/dejar de mostrar la puntuación final del usuario
  showPuntuationToggle(){ this.showPuntuation = !this.showPuntuation;}


  // Nos cambia el valor del booleano para mostrar/dejar de mostrar
  // los comentarios y valoraciones que tiene el usuario
  showCommentsToggle(){
    if(this.numberCommentsScore >= 1){
      this.showComments = !this.showComments;
    }else{
      this.commentToast();
    }
  }

  async commentToast() {
    const toast = await this.toastController.create({
      message: 'This user hasn´t comments yet',
      cssClass: 'comment-toast-class',
      duration: 2000
    });
    toast.present();
  }

}
