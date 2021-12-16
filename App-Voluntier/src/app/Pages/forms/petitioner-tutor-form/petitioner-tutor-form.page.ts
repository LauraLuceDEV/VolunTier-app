import { Component, OnInit } from '@angular/core';
import {TypeSexList, updateVar, registrationVar,} from '../../../Models/Globals';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PetitionerRegisterService } from '../../../Providers/petitioner-register.service';
import { FormGroup, FormBuilder, FormControl, Validators,} from '@angular/forms';
import { Tutor } from '../../../Models/Clases/PetitionerTutor';
import { DataItemModelsService } from '../../../Providers/data-item-model.service';
import { DatabaseService } from '../../../Providers/database.service';
import { Petitioner } from '../../../Models/Clases/Petitioner';
import { AlertController } from '@ionic/angular';

// Página que será el formulario del tutor
// Variará de su contenido dependiendo de si es para
// Registro o para modificar los datos
@Component({
  selector: 'app-petitioner-tutor-form',
  templateUrl: './petitioner-tutor-form.page.html',
  styleUrls: ['./petitioner-tutor-form.page.scss'],
})
export class PetitionerTutorFormPage implements OnInit {
  public tutorForm: FormGroup;
  public typeSexList: string[];
  public styleInputDataForm: string;
  public styleFormHead: string;
  public isInRegistrationFormMode: boolean;

  //Constructor al que se le inyecta la clase 'Router'
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private navController: NavController,
    private petitionerRegServ: PetitionerRegisterService,
    private dimService: DataItemModelsService,
    private dbService: DatabaseService,
    private fb: FormBuilder
  ) {
    this.settingPageData();

    //Validaciones del formulario, dependiendo si es de tipo registro o ctualización, será uno u otro distinto
    if (this.styleInputDataForm == 'register') {
      this.tutorForm = this.fb.group({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required),
        sex: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.maxLength(9),
        ]),
        ID: new FormControl('', [
          Validators.required,
          Validators.maxLength(9),
          Validators.pattern('[0-9]{8}[A-Za-z]{1}'),
        ]),
      });
    } else {
      this.tutorForm = this.fb.group({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required),
        sex: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.maxLength(9),
        ]),
      });
    }
  }

  //TODO: primero tendremos que obtener todos los datos desde nuestra DB
  // y reflejarlos en los input si es del tipo update
  ngOnInit() {}

  //--------------------------
  // Métodos
  //--------------------------
  ionViewWillEnter() {
    this.settingPageData();
  }

  settingPageData() {
    this.typeSexList = TypeSexList;

    this.styleInputDataForm = this.dimService.getStyleInputDataForm();

    if (this.styleInputDataForm == 'register') {
      this.styleFormHead = registrationVar;
      this.isInRegistrationFormMode = true;
    } else {
      this.styleFormHead = updateVar;
      this.isInRegistrationFormMode = false;
    }
  }

  // Nos presenta la información acerca de porqué dar tus datos
  async presenID_Information() {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message:
        '<p class="color-white">This information is necesary due to we do not want some people try to take advantage of another. If this happens, legal measures will be taken.</p><p class="color-white">I would like to thank you for your understanding</p>',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'alert-btn-style',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
      ],
    });
    await alert.present();
  }

  // Nos muestra si hemos tenido errores al validar el formulario
  async presen_Information_Form(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Information',
      message: '<p class="color-white">' + msg + '</p>',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'alert-btn-style',
        },
      ],
    });
    await alert.present();
  }
  //Método para volver atrás
  goBackPage() {
    this.navController.back();
  }

  saveDataForm() {
    // Var para los errores
    let errorMessage = `You forget to add this fields: `;
    let errors: string[] = [];

    // Modo Registro
    if (this.styleInputDataForm == 'register') {
      if (this.tutorForm.valid) {
        this.dbService.getUserDocID().then((docID) => {
          let tutor = new Tutor(
            this.tutorForm.controls.name.value,
            this.tutorForm.controls.surname.value,
            this.tutorForm.controls.birthdate.value,
            this.tutorForm.controls.sex.value,
            this.tutorForm.controls.phoneNumber.value,
            this.tutorForm.controls.ID.value,
            docID
          );

          console.log(tutor);

          this.petitionerRegServ.assingTutor(tutor);
          this.router.navigateByUrl('principal-data-form');
        });
      } else {
        if (this.tutorForm.controls.name.hasError('required')) {
          errors.push('Name');
        }

        if (this.tutorForm.controls.surname.hasError('required')) {
          errors.push('Surname');
        }

        if (this.tutorForm.controls.birthdate.hasError('required')) {
          errors.push('Birthdate');
        }

        if (this.tutorForm.controls.sex.hasError('required')) {
          errors.push('Sex');
        }

        if (this.tutorForm.controls.phoneNumber.hasError('required')) {
          errors.push('PhoneNumber');
        } else if (this.tutorForm.controls.phoneNumber.hasError('maxLength')) {
          errors.push('PhoneNumber incorrect format');
        }

        // DNI/ID
        if (this.tutorForm.controls.ID.hasError('required')) {
          errors.push('ID number');
        } else if (this.tutorForm.controls.ID.hasError('pattern')) {
          errors.push('ID/DNI incorrect format');
        }

        if (errors.length > 0) {
          errors.forEach((wrongField) => {
            errorMessage += `<br/>` + wrongField;
          });
          this.presen_Information_Form(errorMessage);
        }
      }

      // Modo Actualización
    } else {
      if (this.tutorForm.valid) {
        // TODO: Obtener el DNI del actual tutor para eso obtendremos antes al tutor completo con todos sus datos
        this.dbService.getUserDocID().then((docID) => {
          console.log(docID)
          let tutor = new Tutor(
            this.tutorForm.controls.name.value,
            this.tutorForm.controls.surname.value,
            this.tutorForm.controls.birthdate.value,
            this.tutorForm.controls.sex.value,
            this.tutorForm.controls.phoneNumber.value,
            this.tutorForm.controls.ID.value,
            docID
          );
          console.log(tutor);
          this.petitionerRegServ.assingTutor(tutor);
          this.router.navigateByUrl('principal-data-form');
        });
      } else {
        if (this.tutorForm.controls.name.hasError('required')) {
          errors.push('Name');
        }

        if (this.tutorForm.controls.surname.hasError('required')) {
          errors.push('Surname');
        }

        if (this.tutorForm.controls.birthdate.hasError('required')) {
          errors.push('Birthdate');
        }

        if (this.tutorForm.controls.sex.hasError('required')) {
          errors.push('Sex');
        }

        if (this.tutorForm.controls.phoneNumber.hasError('required')) {
          errors.push('PhoneNumber');
        } else if (this.tutorForm.controls.phoneNumber.hasError('maxLength')) {
          errors.push('PhoneNumber incorrect format');
        }

        if (errors.length > 0) {
          errors.forEach((wrongField) => {
            errorMessage += `<br/>` + wrongField;
          });
          this.presen_Information_Form(errorMessage);
        }
      }
    }
  }

  // Nos aparecerá una ventana modal en la que confirmaremos siq euremos seguir teniendo tutor o no
  deleteMyTutor() {}
}
