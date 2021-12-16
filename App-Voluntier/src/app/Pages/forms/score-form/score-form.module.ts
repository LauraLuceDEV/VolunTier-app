import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScoreFormPageRoutingModule } from './score-form-routing.module';

import { ScoreFormPage } from './score-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScoreFormPageRoutingModule
  ],
  declarations: [ScoreFormPage]
})
export class ScoreFormPageModule {}
