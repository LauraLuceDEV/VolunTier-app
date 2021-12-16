import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetitionerChooseTutorPage } from './petitioner-choose-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: PetitionerChooseTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetitionerChooseTutorPageRoutingModule {}
