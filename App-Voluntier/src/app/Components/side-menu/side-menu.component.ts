import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMenu } from '../../Models/Interfaces/AllInterfaces';
import { DataItemModelsService } from '../../Providers/data-item-model.service';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

/*Componente Menu Lateral.
Sólo está activado en la pantalla/página de profile/perfil*/
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public items: Observable<ItemMenu[]>;
  userType: string;

  // Constructor
  constructor(
    private dimService: DataItemModelsService,
    private router: Router,
    private menu: MenuController,
    private alertController: AlertController
  ) {}

  // OnInit: Dependiendo del tipo de perfil/usuario cargará un menú diferente con distintos items
  ngOnInit() {
    this.dimService.getUserTypeSubject().subscribe((res) => {
      this.userType = res;
      if (res == 'voluntary') {
        this.items = this.dimService.getVoluntaryMenuItems();
      } else {
        this.items = this.dimService.getPetitionerMenuItems();
      }
    });
  }


  // Evento onclick
  onClickItemMenu(event: string) {
    switch (event) {
      case 'goToMessage':
        this.goToMessage();
        break;

      case 'goToTask':
        this.goToTask();
        break;

      case 'goToSearchTask':
        this.goToSearchTask();
        break;

      case 'goToEditProfile':
        this.goToEditProfile();
        break;

      case 'goToSignOff':
        this.goToSignOff();
        break;
      case 'goToMessage':
        this.goToMessage();
        break;
    }
    this.menu.close();
  }

  //-------------------------------------
  //Métodos de las opciones del menu lateral
  //-------------------------------------

  // Nos lleva a la pantalla de mensajes
  goToMessage() {
    this.router.navigateByUrl('chat-users-list');
  }

  // Nos lleva a la página de las tareas
  goToTask() {
    this.router.navigateByUrl('user-task-list');
  }

  // Nos lleva a la pantalla de búsqueda de tareas
  goToSearchTask() {
    this.router.navigateByUrl('voluntary-search-task-menu');
  }


  // Nos lleva a la página de editar nuestro perfil
  goToEditProfile() {
    this.router.navigateByUrl('edit-profile-menu');
  }

  // Nos deslogea y lleva a la pantalla de inicio
  goToSignOff() {
    console.log('logout');
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          this.router.navigateByUrl('login-menu');
        },
        (error) => {
          this.presentAlertCannotSignOff();
        }
      );
  }


  // Sign off
  async presentAlertCannotSignOff() {
    const alert = await this.alertController.create({
      cssClass: 'bg-pinkie',
      header: 'Information',
      message: 'There was a problem and you cannot log out your session by the moment',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
