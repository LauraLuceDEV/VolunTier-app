import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoluntaryFormStrengthsPageRoutingModule } from './voluntary-form-strengths-routing.module';

import { VoluntaryFormStrengthsPage } from './voluntary-form-strengths.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntaryFormStrengthsPageRoutingModule
  ],
  declarations: [VoluntaryFormStrengthsPage]
})
export class VoluntaryFormStrengthsPageModule {}
