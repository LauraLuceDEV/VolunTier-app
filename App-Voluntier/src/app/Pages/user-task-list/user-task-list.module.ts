import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { UserTaskListPageRoutingModule } from './user-task-list-routing.module';
import { UserTaskListPage } from './user-task-list.page';

import{TaskListProfileComponent} from '../../Components/task-list-profile/task-list-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTaskListPageRoutingModule
  ],
  declarations: [UserTaskListPage, TaskListProfileComponent]
})
export class UserTaskListPageModule {}
