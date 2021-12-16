import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetitionerTaskFormPage } from './petitioner-task-form.page';

const routes: Routes = [
  {
    path: '',
    component: PetitionerTaskFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetitionerTaskFormPageRoutingModule {}
