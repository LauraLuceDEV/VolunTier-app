import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VolutaryProfilePageRoutingModule } from './user-profile-routing.module';
import { UserProfilePage } from './user-profile.page';
import{ProfileCommentsComponent} from '../../../app/Components/profile-comments/profile-comments.component';
import {UserPuntuationComponent} from '../../../app/Components/user-puntuation/user-puntuation.component'
import{CommentComponent} from '../../../app/Components/comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolutaryProfilePageRoutingModule
  ],
  declarations: [UserProfilePage, ProfileCommentsComponent, CommentComponent, UserPuntuationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserProfilePageModule {}
