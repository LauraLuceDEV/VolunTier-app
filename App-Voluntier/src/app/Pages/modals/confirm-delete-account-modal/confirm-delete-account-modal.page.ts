import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../Providers/database.service';
import { DataItemModelsService } from '../../../Providers/data-item-model.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirm-delete-account-modal',
  templateUrl: './confirm-delete-account-modal.page.html',
  styleUrls: ['./confirm-delete-account-modal.page.scss'],
})
export class ConfirmDeleteAccountModalPage implements OnInit {
  public userType: string;

  constructor(
    private navCtrl: NavController,
    private dbService: DatabaseService,
    private dimService: DataItemModelsService,
    private router: Router) { }

  ngOnInit() {
    this.userType = this.dimService.getUserType();

  }


  // Métodos

  //Método para volver atrás
  goBackPage(){
    this.navCtrl.back();
  }


  // Método que nos permitirá borrar nuestra cuenta
  deleteAccount(){
    this.router.navigateByUrl('login-menu');
  }

  //Método que nos hará volver al menu de edición
  exitThisPage(){
    this.navCtrl.back();
  }

}
