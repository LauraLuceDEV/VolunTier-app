import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LastDetailsPageRoutingModule } from './last-details-routing.module';

import { LastDetailsPage } from './last-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LastDetailsPageRoutingModule
  ],
  declarations: [LastDetailsPage]
})
export class LastDetailsPageModule {}
