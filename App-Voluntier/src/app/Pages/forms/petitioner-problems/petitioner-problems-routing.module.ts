import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetitionerProblemsPage } from './petitioner-problems.page';

const routes: Routes = [
  {
    path: '',
    component: PetitionerProblemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetitionerProblemsPageRoutingModule {}
