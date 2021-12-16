import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmDeleteAccountModalPageRoutingModule } from './confirm-delete-account-modal-routing.module';

import { ConfirmDeleteAccountModalPage } from './confirm-delete-account-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmDeleteAccountModalPageRoutingModule
  ],
  declarations: [ConfirmDeleteAccountModalPage]
})
export class ConfirmDeleteAccountModalPageModule {}
