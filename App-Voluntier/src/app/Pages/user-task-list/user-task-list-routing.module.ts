import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTaskListPage } from './user-task-list.page';

const routes: Routes = [
  {
    path: '',
    component: UserTaskListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTaskListPageRoutingModule {}
