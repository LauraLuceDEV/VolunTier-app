import { DatabaseService } from '../../Providers/database.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/Interfaces/AllInterfaces';

// Página dónde el usuario se puede registrar/iniciar sesión vía email
@Component({
  selector: 'app-login-mail',
  templateUrl: './login-mail.page.html',
  styleUrls: ['./login-mail.page.scss'],
})
export class LoginMailPage implements OnInit {
  userMailDataForm: FormGroup;

  constructor(private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private navController: NavController,
    private databaseService: DatabaseService,
    private alertController: AlertController,
    private router: Router) {
    this.userMailDataForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
  }


  //Método para volver atrás
  goBackPage(){
    this.navController.back();
  }

  //SIGN IN
  singInMail(email:string, password: string){
    if(this.userMailDataForm.valid){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password).then((credential) => {
          this.checkSignIn(credential.user.uid);
        }, (error) => {
          //mostrar mensaje de error si algo falla en el login
          this.presentAlertLogin(`Email y/o contraseña incorrectas`);
        });
      });
    }else{
      this.presentAlertLogin('Falta email y/o contraseña por completar');
    }
  }

  checkSignIn(uuid: string){
    this.databaseService.existsUser(uuid).then((existeUsuario) => {
      if(existeUsuario){
        this.databaseService.getUser().then( (user) => {
          if(user.userType != null && user.userType.length > 0){
            this.router.navigateByUrl('user-profile');
          } else {
            this.router.navigateByUrl('choose-profile');
          }
        });
      } else {
        this.presentAlertLogin(`El usuario no existe con el correo solicitado. Por favor, registrese o intentelo con otro correo`);
      }
    });
  }

  //SIGN UP
  singUpMail(email:string, password: string){
    if(this.userMailDataForm.valid){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        this.afAuth.createUserWithEmailAndPassword(email, password).then((credential) => {
          var userDB = {uuid: credential.user.uid, userType: "", email: credential.user.email};
          this.checkSignUp(userDB);
        }, (error) => {
          //mostrar mensaje de error si algo falla en el login
          console.log(error);
          this.presentAlertLogin(`El usuario ya existe con el correo solicitado. Por favor, intentelo con otro correo`);
        });
      });
    }else{
      this.presentAlertLogin('Error, cannot signup by mail');
    }
  }

  checkSignUp(user: User){
    this.databaseService.existsUser(user.uuid).then((existeUsuario) => {
      if(!existeUsuario){
        this.databaseService.createNewUser(user)
        this.router.navigateByUrl('choose-profile');
      } else {
        this.presentAlertLogin(`El usuario ya existe con el correo solicitado. Por favor, intentelo con otro correo`);
      }
    });
  }


  // ALERTAS
  async presentAlertLogin(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'bg-pinkie',
      header: 'Information',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
