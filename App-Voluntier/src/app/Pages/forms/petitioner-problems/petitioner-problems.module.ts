import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetitionerProblemsPageRoutingModule } from './petitioner-problems-routing.module';

import { PetitionerProblemsPage } from './petitioner-problems.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetitionerProblemsPageRoutingModule
  ],
  declarations: [PetitionerProblemsPage]
})
export class PetitionerProblemsPageModule {}
