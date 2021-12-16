import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadPhotoModalPage } from './upload-photo-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UploadPhotoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadPhotoModalPageRoutingModule {}
