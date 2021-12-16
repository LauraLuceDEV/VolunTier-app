import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComplainRegretFormPageRoutingModule } from './complain-regret-form-routing.module';
import { ComplainRegretFormPage } from './complain-regret-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComplainRegretFormPageRoutingModule
  ],
  declarations: [ComplainRegretFormPage]
})
export class ComplainRegretFormPageModule {}
