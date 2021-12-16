import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrincipalDataFormPageRoutingModule } from './principal-data-form-routing.module';
import { PrincipalDataFormPage } from './principal-data-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalDataFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PrincipalDataFormPage]
})
export class PrincipalDataFormPageModule {}
