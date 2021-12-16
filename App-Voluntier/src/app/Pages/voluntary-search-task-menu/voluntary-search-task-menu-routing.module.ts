import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntarySearchTaskMenuPage } from './voluntary-search-task-menu.page';

const routes: Routes = [
  {
    path: '',
    component: VoluntarySearchTaskMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntarySearchTaskMenuPageRoutingModule {}
