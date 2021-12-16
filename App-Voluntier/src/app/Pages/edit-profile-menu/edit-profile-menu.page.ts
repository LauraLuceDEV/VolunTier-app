import { Component, OnInit } from '@angular/core';
import { DataItemModelsService } from '../../Providers/data-item-model.service';
import { ButtonEditProfileOptions } from 'src/app/Models/Interfaces/AllInterfaces';
import { modeRegisterForm } from 'src/app/Models/Globals';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile-menu',
  templateUrl: './edit-profile-menu.page.html',
  styleUrls: ['./edit-profile-menu.page.scss'],
})
export class EditProfileMenuPage implements OnInit {
  editProfileButtons: Observable<ButtonEditProfileOptions[]>;
  userType: string;

  constructor(
    private dimService: DataItemModelsService,
    private router: Router
  ) {}

  // Obtenemos el tipo de susario y dependiendo de este cargaremos de diferente forma los botones del menu
  ngOnInit() {
    this.userType = this.dimService.getUserType();

    if (this.userType == 'voluntary') {
      this.editProfileButtons =
        this.dimService.getVoluntaryEditProfileMenuItems();
    } else {
      this.editProfileButtons =
        this.dimService.getPetitionerEditProfileMenuItems();
    }
  }

  //Método para volver atrás
  goBackPage() {
    this.router.navigateByUrl('user-profile');
  }

  // Método del evento click
  // Dependiendo del botón será uno u otro
  selectMenuOption(event: string) {
    switch (event) {
      case 'changeTutorData':
        this.changeTutorData();
        break;

      case 'changePetitionerData':
        this.changePetitionerData();
        break;

      case 'changeMyData':
        this.changeMyData();
        break;

      case 'deleteAccount':
        this.deleteAccount();
        break;
    }
  }

  //Nos lleva al formulario del tutor, donde podremos cambiar los datos o borrar el tutor
  changeTutorData() {
    this.dimService.setStyleInputDataForm(modeRegisterForm);
    this.router.navigateByUrl('petitioner-tutor-form');
  }

  // Cambiaremos los datos del solicitante
  changePetitionerData() {
    this.router.navigateByUrl('principal-data-form');
  }

  // Camibaremos los datos del voluntario
  changeMyData() {
    this.router.navigateByUrl('principal-data-form');
  }

  // Un modal nos preguntará si deseamos borrar la cuenta o no
  deleteAccount() {
    this.router.navigateByUrl('confirm-delete-account');
  }
}
