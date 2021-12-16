import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadPhotoModalPageRoutingModule } from './upload-photo-modal-routing.module';

import { UploadPhotoModalPage } from './upload-photo-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPhotoModalPageRoutingModule
  ],
  declarations: [UploadPhotoModalPage]
})
export class UploadPhotoModalPageModule {}
