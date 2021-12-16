import { DatabaseService } from '../../Providers/database.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/Interfaces/AllInterfaces';
import { DataItemModelsService } from '../../Providers/data-item-model.service';

// Página inicial después del splash
// Dónde el usuario inicia sesión o se registra
@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.page.html',
  styleUrls: ['./login-menu.page.scss'],
})
export class LoginMenuPage implements OnInit {
  public modalityMenu: string;

  //Constructor
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private dbService: DatabaseService,
    private dimService: DataItemModelsService
  ) {
    this.modalityMenu = `principal`;
  }

  ngOnInit() {}

  //--------------------------
  //        Métodos
  //--------------------------

  //-------------------------
  // Métodos de cambio de menú
  //-------------------------
  //Cambia al menú de inicio-sesión
  changeToSignInContainer() {
    this.modalityMenu = `sign-in`;
  }

  //Cambia al menú de registro
  changeToSignUpContainer() {
    this.modalityMenu = `sign-up`;
  }

  //Cambia al menú principal
  changeToPrincipalContainer() {
    this.modalityMenu = `principal`;
  }

  //-------------------------
  // Métodos de inicio de sesión
  //-------------------------
  // Inicio de sesión con Google a través de FireBase
  async signInGoogle() {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        this.afAuth
          .signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(
            (credential) => {
              this.checkSignIn(credential.user.uid);
            },
            (error) => {
              //mostrar mensaje de error si algo falla en el login
              alert(`Error. Vuelvelo a intentar`);
            }
          );
      });
  }

  // Inicio de sesión con Facebook a través de FireBase
  signInFacebook() {
    alert(`Proximamente`);
  }

  // Inicio de sesión con Apple
  signInApple() {
    alert(`Proximamente`);
  }

  // Inicio de sesión con Correo
  signInMail() {
    this.router.navigateByUrl('login-mail');
  }

  checkSignIn(uuid: string) {
    this.dbService.existsUser(uuid).then((existeUsuario) => {
      if (existeUsuario) {
        this.dbService.getUser().then((user) => {
          if (user.userType != null && user.userType.length > 0) {
            this.dimService.setUserType(user.userType);
            this.router.navigateByUrl('user-profile');
          } else {
            this.router.navigateByUrl('choose-profile');
          }
        });
      } else {
        alert(
          `El usuario no existe con el correo solicitado. Por favor, registrese o intentelo con otro correo`
        );
      }
    });
  }
  //-------------------------
  // Métodos de registro usuario
  //-------------------------

  //Registro con Google
  signUpGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (credential) => {
        var userDB = {
          uuid: credential.user.uid,
          userType: '',
          email: credential.user.email,
        };
        this.checkSignUp(userDB);
      },
      (error) => {
        //mostrar mensaje de error si algo falla en el login
        alert(`Error. Vuelvelo a intentar`);
      }
    );
  }

  // Registro con Facebook a través de FireBase
  signUpFacebook() {
    alert(`Proximamente`);
  }

  // Registro con Apple
  signUpApple() {
    alert(`Proximamente`);
  }

  // Registro con Correo
  signUpMail() {
    this.router.navigateByUrl('login-mail');
  }

  checkSignUp(user: User) {
    this.dbService.existsUser(user.uuid).then((existeUsuario) => {
      if (!existeUsuario) {
        this.dbService.createNewUser(user);
        this.router.navigateByUrl('choose-profile');
      } else {
        alert(
          `El usuario ya existe con el correo solicitado. Por favor, intentelo con otro correo`
        );
      }
    });
  }
}
