
import { PetitionerRegisterService } from '../../../Providers/petitioner-register.service';
import { VoluntaryRegisterService } from 'src/app/Providers/voluntary-register.service';
import { userTypePetitioner, userTypeVoluntary } from '../../../Models/Globals';
import { DatabaseService } from '../../../Providers/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { UploadPhotoModalPage } from '../../modals/upload-photo-modal/upload-photo-modal.page';

// Última página del formulario global.
// Dónde subiremos la foto y una pequeña biografía
@Component({
  selector: 'app-last-details',
  templateUrl: './last-details.page.html',
  styleUrls: ['./last-details.page.scss'],
})
export class LastDetailsPage implements OnInit {
  public userType: string;
  public userSex: string;
  public imageProfile: string;
  public imgProfileName: string;
  public userName: string;
  public dataReturned: any;
  public userBioExample : string; // Biografía predefinida para el usuario

  constructor(private router: Router,
    private navController: NavController,
    private databaseService: DatabaseService,
    private dimService: DataItemModelsService,
    private voluntaryRegisterService: VoluntaryRegisterService,
    private petitionerRegisterService: PetitionerRegisterService,
    private modalCtrl: ModalController,
    private alertCrt: AlertController) {}


    // Cargaremos una imagen por defecto dependiendo del tipo de sexo/género que haya descrito previamente el usuario
  async ngOnInit() {
    this.userType = this.dimService.getUserType();
    this.imageProfile = await this.databaseService.getProfileImagePredeterminated(this.dimService.getSexUserType());
    console.log(this.imageProfile);

    if(this.userType === userTypeVoluntary){
      this.imgProfileName = `profile-photo-` + this.voluntaryRegisterService.getVoluntary().getUID();
      this.userName = this.voluntaryRegisterService.getVoluntary().getName();

      this.userBioExample = `Hello my name is ${this.userName}, I am a kind person and my desire is to help people...`;
    }else{
      this.imgProfileName = `profile-photo-` + this.petitionerRegisterService.getPetitioner().getUID();
      this.userName = this.petitionerRegisterService.getPetitioner().getName();

      this.userBioExample = `Hello my name is ${this.userName}, I am a kind person and I like some nice people would help me with some labors...`;
    }
  }

   //Método para volver atrás
   goBackPage(){
    this.navController.back();
  }

  /*Seleccionaremos una foto de perfil desde nuestra galería y la subiremos a nuestro almacenamiento de Firebase*/
  async uploadImage(){
    const modal = await this.modalCtrl.create({
      component: UploadPhotoModalPage,
    });
    await modal.present();
  }


  /// Nos llevará a la página correspondiente
  goToProfilePage(biography: string){
    let biogr = '';

    if(biography == undefined || biography.length <= 0 || biography == ''){
      biogr = this.userBioExample;
    }else{
      biogr = biography
    }

    if(this.userType == userTypeVoluntary){
      this.voluntaryRegisterService.insertPetitionerInformationData2(this.imgProfileName, biogr);
      this.voluntaryRegisterService.createVoluntary().then((isCreated) => {
        this.databaseService.updateCurrentUserType(userTypeVoluntary).then((isUpdated) => {
          this.router.navigateByUrl('user-profile');
        });
      });

    } else {
      this.petitionerRegisterService.insertPetitionerInformationData2(this.imgProfileName, biogr);
      this.petitionerRegisterService.createPetitioner()
        .then((isUpdated) => {
          console.log(isUpdated);

        this.petitionerRegisterService.createTutorOnFB().then( () => {
          this.databaseService.updateCurrentUserType(userTypePetitioner)

          .then((isUpdated) => {
              this.router.navigateByUrl('user-profile');
            });
          });
        });
    }
  }

}
