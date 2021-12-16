import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseProfileFormPageRoutingModule } from './choose-profile-form-routing.module';

import { ChooseProfileFormPage } from './choose-profile-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseProfileFormPageRoutingModule
  ],
  declarations: [ChooseProfileFormPage]
})
export class ChooseProfileFormPageModule {}
