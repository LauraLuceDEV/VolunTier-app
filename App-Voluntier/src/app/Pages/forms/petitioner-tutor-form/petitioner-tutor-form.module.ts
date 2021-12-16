import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { PetitionerTutorFormPageRoutingModule } from './petitioner-tutor-form-routing.module';
import { PetitionerTutorFormPage } from './petitioner-tutor-form.page';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetitionerTutorFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PetitionerTutorFormPage]
})
export class PetitionerTutorFormPageModule {}
