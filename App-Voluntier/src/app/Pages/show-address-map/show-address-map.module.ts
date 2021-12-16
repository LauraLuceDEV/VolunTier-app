import { HereMapComponent } from './../../Components/here-map/here-map.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowAddressMapPageRoutingModule } from './show-address-map-routing.module';

import { ShowAddressMapPage } from './show-address-map.page';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowAddressMapPageRoutingModule
  ],
  declarations: [ShowAddressMapPage, HereMapComponent]
})
export class ShowAddressMapPageModule {}
