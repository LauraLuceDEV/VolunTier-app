import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VoluntaryFinishTaskPageRoutingModule } from './voluntary-finish-task-routing.module';
import { VoluntaryFinishTaskPage } from './voluntary-finish-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntaryFinishTaskPageRoutingModule
  ],
  declarations: [VoluntaryFinishTaskPage]
})
export class VoluntaryFinishTaskPageModule {}
