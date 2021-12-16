import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginMenuPageRoutingModule } from './login-menu-routing.module';

import { LoginMenuPage } from './login-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginMenuPageRoutingModule
  ],
  declarations: [LoginMenuPage]
})
export class LoginMenuPageModule {}
