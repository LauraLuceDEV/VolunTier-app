import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetitionerFinishTaskPageRoutingModule } from './petitioner-finish-task-routing.module';

import { PetitionerFinishTaskPage } from './petitioner-finish-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetitionerFinishTaskPageRoutingModule
  ],
  declarations: [PetitionerFinishTaskPage]
})
export class PetitionerFinishTaskPageModule {}
