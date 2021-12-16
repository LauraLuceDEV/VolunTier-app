import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseComplainRegretFormPageRoutingModule } from './choose-complain-regret-form-routing.module';

import { ChooseComplainRegretFormPage } from './choose-complain-regret-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseComplainRegretFormPageRoutingModule
  ],
  declarations: [ChooseComplainRegretFormPage]
})
export class ChooseComplainRegretFormPageModule {}
