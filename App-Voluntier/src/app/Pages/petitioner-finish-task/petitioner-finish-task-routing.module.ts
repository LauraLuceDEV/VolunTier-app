import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetitionerFinishTaskPage } from './petitioner-finish-task.page';

const routes: Routes = [
  {
    path: '',
    component: PetitionerFinishTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetitionerFinishTaskPageRoutingModule {}
