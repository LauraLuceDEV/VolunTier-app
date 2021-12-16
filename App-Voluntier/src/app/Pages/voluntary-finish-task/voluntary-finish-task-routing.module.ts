import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntaryFinishTaskPage } from './voluntary-finish-task.page';

const routes: Routes = [
  {
    path: '',
    component: VoluntaryFinishTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntaryFinishTaskPageRoutingModule {}
