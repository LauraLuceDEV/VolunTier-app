import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileMenuPageRoutingModule } from './edit-profile-menu-routing.module';

import { EditProfileMenuPage } from './edit-profile-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileMenuPageRoutingModule
  ],
  declarations: [EditProfileMenuPage]
})
export class EditProfileMenuPageModule {}
