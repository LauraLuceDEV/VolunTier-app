import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetitionerTutorFormPage } from './petitioner-tutor-form.page';

const routes: Routes = [
  {
    path: '',
    component: PetitionerTutorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetitionerTutorFormPageRoutingModule {}
