import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PetitionerTaskFormPageRoutingModule } from './petitioner-task-form-routing.module';
import { PetitionerTaskFormPage } from './petitioner-task-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetitionerTaskFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PetitionerTaskFormPage]
})
export class PetitionerTaskFormPageModule {}
