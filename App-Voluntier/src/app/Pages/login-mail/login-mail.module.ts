import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LoginMailPageRoutingModule } from './login-mail-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginMailPage } from './login-mail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginMailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginMailPage]
})
export class LoginMailPageModule {}
