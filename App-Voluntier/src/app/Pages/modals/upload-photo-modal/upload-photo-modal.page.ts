import { Component, OnInit } from '@angular/core';
import { ProfilePhotoService } from '../../../Providers/profile-photo.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-upload-photo-modal',
  templateUrl: './upload-photo-modal.page.html',
  styleUrls: ['./upload-photo-modal.page.scss'],
})
export class UploadPhotoModalPage implements OnInit {
  modalTitle: string;
  modelId: number;

  constructor(private photoServ: ProfilePhotoService,
    private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  // Método que nos ayudará a la hora de subir imágenes que lo hará desde nuestra cámara
  uploadPhotoFromCamera(){
    this.photoServ.addNewToGallery();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  // Método que nos ayudará a la hora de subir imágenes que lo hará desde la galería de nuestro móvil
  uploadPhotoFromGallery(){

  }

}
