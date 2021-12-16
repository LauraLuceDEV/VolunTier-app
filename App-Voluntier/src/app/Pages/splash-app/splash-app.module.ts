import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashAppPageRoutingModule } from './splash-app-routing.module';

import { SplashAppPage } from './splash-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashAppPageRoutingModule
  ],
  declarations: [SplashAppPage]
})
export class SplashAppPageModule {}
