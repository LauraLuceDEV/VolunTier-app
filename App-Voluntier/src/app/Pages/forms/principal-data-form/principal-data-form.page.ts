import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { VoluntaryRegisterService } from 'src/app/Providers/voluntary-register.service';
import { Countries, registrationVar, TypeSexList, updateVar, userTypeVoluntary } from '../../../Models/Globals';
import { DataItemModelsService } from '../../../Providers/data-item-model.service';
import { PetitionerRegisterService } from '../../../Providers/petitioner-register.service';
import { DatabaseService } from '../../../Providers/database.service';
import { Voluntary } from 'src/app/Models/Clases/Voluntary';
import { Petitioner } from 'src/app/Models/Clases/Petitioner';

// Formulario principal, donde irán los datos del usuario haya escogido Solicitante o Voluntario
@Component({
  selector: 'app-principal-data-form',
  templateUrl: './principal-data-form.page.html',
  styleUrls: ['./principal-data-form.page.scss'],
})
export class PrincipalDataFormPage implements OnInit {
  public principalDataForm: FormGroup;
  public currentUser;
  public userType: string;
  public styleInputDataForm:  string;
  public styleForm: string;
  public countries: string[];
  public typeSexList: string[];
  isInRegistrationFormMode: boolean;
  private countrySelected: string;

  // Constructor
  constructor(private router: Router,
    private dbService: DatabaseService,
    private dimService: DataItemModelsService,
    private voluntaryRegisterService: VoluntaryRegisterService,
    private petitionerRegService : PetitionerRegisterService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private alertCtrl: AlertController) {
    this.userType = this.dimService.getUserType();
    this.styleInputDataForm = this.dimService.getStyleInputDataForm();
    this.countrySelected = `Spain`;

    //registro
    if(this.styleInputDataForm === "register"){
      this.principalDataForm = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required),
        sex: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(9)]),
        ID: new FormControl('', [Validators.required,  Validators.maxLength(9), Validators.pattern("[0-9]{8}[A-Za-z]{1}")]),
        country: new FormControl('Spain', Validators.required),
        city: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        postalCode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      });
      // actualización de datos
    }else{
      this.principalDataForm = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required),
        sex: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(9)]),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        postalCode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      });
    }
  }

  // Nos obtiene el tipo de usuarios para poer personalizar el formulario
  ngOnInit() {
    //Cargamos los listados de opciones
    this.countries = Countries;
    this.typeSexList = TypeSexList;
  }

  ionViewWillEnter(){
    this.setDataPage();
  }

  //--------------------------
  //        Métodos
  //--------------------------

  async setDataPage(){
      if(this.styleInputDataForm == "register"){
        this.styleForm = registrationVar;
        this.isInRegistrationFormMode = true;

      }else{
        this.styleForm = updateVar;
        this.isInRegistrationFormMode = false;

        // si el formulario no es de tipo 'registro' nos crearemos una instancia del
        // usuario actual para así poder obtener todos sus datos desde nuestra Base de Datos de Firebase
        if(this.userType == userTypeVoluntary){
          this.currentUser = await this.dbService.getProfileVoluntary() as Voluntary;
        }else{
          this.currentUser = await this.dbService.getProfilePetitioner() as Petitioner;
        }
        this.principalDataForm.controls.name.setValue(this.currentUser.name);
        this.principalDataForm.controls.surname.setValue(this.currentUser.surname);
        this.principalDataForm.controls.birthdate.setValue(this.currentUser.birthdate);
        this.principalDataForm.controls.sex.setValue(this.currentUser.sex);
        this.principalDataForm.controls.phoneNumber.setValue(this.currentUser.phoneNumber);
        this.principalDataForm.controls.country.setValue(this.currentUser.address.country);
        this.principalDataForm.controls.address.setValue(this.currentUser.address.street);
        this.principalDataForm.controls.city.setValue(this.currentUser.address.city);
        this.principalDataForm.controls.postalCode.setValue(this.currentUser.address.postalCode);
      }
      console.log(this.styleInputDataForm)
  }

 //Método para volver atrás
 goBackPage(){
  this.navController.back();
}

// Cambiar el valor del país
onChangeCountry(event: any){
  this.countrySelected = event.target.value;
  console.log(this.countrySelected)

}

  /* Nos lleva a la siguiente aprte del formulario,
  pero primero nos comprobará que están todos los campos de éste correctamente rellenos.
  Luego nos recuperará de un servicio que tipo de usuario tenemos y a que formulario nos llevará */
  goToNextForm(){
   if(this.principalDataForm.valid){
     this.dimService.setUserSex(this.principalDataForm.controls.sex.value);
     if(this.userType == "voluntary"){
      this.voluntaryRegisterService.createVoluntaryInstance();

      // Datos personales
      this.voluntaryRegisterService.insertVoluntaryPersonaltData(
        this.principalDataForm.controls.name.value,
        this.principalDataForm.controls.surname.value,
        this.principalDataForm.controls.birthdate.value,
        this.principalDataForm.controls.sex.value);

       // Contacto
      this.voluntaryRegisterService.insertVoluntaryInformationData(
        this.principalDataForm.controls.phoneNumber.value,
        this.principalDataForm.controls.ID.value);

       // Dirección
       this.voluntaryRegisterService.insertAddressData(
         this.principalDataForm.controls.address.value,
         this.countrySelected,
         this.principalDataForm.controls.city.value,
         this.principalDataForm.controls.postalCode.value,);

       this.router.navigateByUrl('voluntary-form-strengths');

     }else{
       this.petitionerRegService.insertPetitionerPersonalData(
         this.principalDataForm.controls.name.value,
        this.principalDataForm.controls.surname.value,
        this.principalDataForm.controls.birthdate.value,
        this.principalDataForm.controls.sex.value);

        this.petitionerRegService.insertPetitionerInformationData1(
          this.principalDataForm.controls.phoneNumber.value,
          this.principalDataForm.controls.ID.value);

          this.petitionerRegService.insertAddressData(
            this.principalDataForm.controls.address.value,
            this.countrySelected,
            this.principalDataForm.controls.city.value,
            this.principalDataForm.controls.postalCode.value);

          this.router.navigateByUrl('petitioner-problems');
     }
      this.principalDataForm.reset();
      this.countrySelected = ``;

    }else{
      let errorMessage = `You forget to add this fields: `;
      let errors: string[] = [];

      if(this.principalDataForm.controls.name.hasError('required')){
        errors.push('Name');
      }

      if(this.principalDataForm.controls.surname.hasError('required')){
        errors.push('Surname');
      }

      if(this.principalDataForm.controls.birthdate.hasError('required')){
        errors.push('Birthdate');
      }

      if(this.principalDataForm.controls.sex.hasError('required')){
        errors.push('Sex');
      }

      if(this.principalDataForm.controls.phoneNumber.hasError('required')){
        errors.push('PhoneNumber');
      }else if(this.principalDataForm.controls.phoneNumber.hasError('maxLength')){
        errors.push('PhoneNumber incorrect format');
      }

      if(this.principalDataForm.controls.ID.hasError('required')){
        errors.push('ID number');
      }else if(this.principalDataForm.controls.ID.hasError('pattern')){
        errors.push('ID/DNI incorrect format');
      }

      if(this.principalDataForm.controls.city.hasError('required')){
        errors.push('City');
      }

      if(this.principalDataForm.controls.address.hasError('required')){
        errors.push('Complete address');
      }

      if(this.principalDataForm.controls.postalCode.hasError('required')){
        errors.push('Postal Code');
      }
      if(errors.length > 0){
        errors.forEach(wrongField => {
          errorMessage += `<br/>` + wrongField;
        });
        this.presen_Information_Form(errorMessage);
      }
    }
  }

  // Método para poder actualizar los datos del registro
  updateData(){
    if(this.principalDataForm.valid){
      if(this.userType == "voluntary"){
       this.voluntaryRegisterService.createVoluntaryInstance();
       this.voluntaryRegisterService.insertVoluntaryPersonaltData(
         this.principalDataForm.controls.name.value,
        this.principalDataForm.controls.surname.value,
        this.principalDataForm.controls.birthdate.value,
        this.principalDataForm.controls.sex.value);

       this.voluntaryRegisterService.insertVoluntaryInformationData(
        this.principalDataForm.controls.phoneNumber.value,
        this.currentUser.getID());

        this.voluntaryRegisterService.insertAddressData(
          this.principalDataForm.controls.address.value,
          this.countrySelected,
          this.principalDataForm.controls.city.value,
          this.principalDataForm.controls.postalCode.value);


        this.dbService.updateProfileVoluntary(this.voluntaryRegisterService.getVoluntary());
        this.router.navigateByUrl('edit-profile-menu');

      }else{
        this.petitionerRegService.insertPetitionerPersonalData(
          this.principalDataForm.controls.name.value,
         this.principalDataForm.controls.surname.value,
         this.principalDataForm.controls.birthdate.value,
         this.principalDataForm.controls.sex.value);

         this.petitionerRegService.insertPetitionerInformationData1(
           this.principalDataForm.controls.phoneNumber.value,
           this.currentUser.getID());

           this.petitionerRegService.insertAddressData(
            this.principalDataForm.controls.address.value,
            this.countrySelected,
            this.principalDataForm.controls.city.value,
            this.principalDataForm.controls.postalCode.value);

        this.dbService.updateProfilePetitioner(this.petitionerRegService.getPetitioner());
        this.router.navigateByUrl('edit-profile-menu');
      }
       this.principalDataForm.reset();
       this.countrySelected = ``;

     }else{
      let errorMessage = `You forget to add this fields: `;
       let errors: string[] = [];

       if(this.principalDataForm.controls.name.hasError('required')){
         errors.push('Name');
       }

       if(this.principalDataForm.controls.surname.hasError('required')){
         errors.push('Surname');
       }

       if(this.principalDataForm.controls.birthdate.hasError('required')){
         errors.push('Birthdate');
       }

       if(this.principalDataForm.controls.sex.hasError('required')){
         errors.push('Sex');
       }

       if(this.principalDataForm.controls.phoneNumber.hasError('required')){
         errors.push('PhoneNumber');
       }else if(this.principalDataForm.controls.phoneNumber.hasError('maxLength')){
         errors.push('PhoneNumber incorrect format');
       }

       if(this.principalDataForm.controls.city.hasError('required')){
         errors.push('City');
       }

       if(this.principalDataForm.controls.address.hasError('required')){
         errors.push('Complete address');
       }

       if(this.principalDataForm.controls.postalCode.hasError('required')){
         errors.push('Postal Code');
       }

       if(errors.length > 0){
        errors.forEach(wrongField => {
          errorMessage += `<br/>` + wrongField;
        });
        this.presen_Information_Form(errorMessage);
      }
    }
  }

  // Nos muestra si hemos tenido errores al validar el formulario
  async presen_Information_Form(msg: string){
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message: '<p class="color-white">' + msg + '</p>',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'alert-btn-style'
        }
      ]
    });
    await alert.present();
  }

  // Nos presenta la información acerca de porqué dar tus datos
  async presenID_Information(){
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message: '<p class="color-white">This information is necesary due to we do not want some people try to take advantage of another. If this happens, legal measures will be taken.</p><p class="color-white">I would like to thank you for your understanding</p>',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'alert-btn-style',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
    await alert.present();
  }
}
