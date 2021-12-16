import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetitionerChooseTutorPageRoutingModule } from './petitioner-choose-tutor-routing.module';

import { PetitionerChooseTutorPage } from './petitioner-choose-tutor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetitionerChooseTutorPageRoutingModule
  ],
  declarations: [PetitionerChooseTutorPage]
})
export class PetitionerChooseTutorPageModule {}
