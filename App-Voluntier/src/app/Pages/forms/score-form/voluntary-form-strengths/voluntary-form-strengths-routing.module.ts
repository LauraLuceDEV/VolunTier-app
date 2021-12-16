import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntaryFormStrengthsPage } from './voluntary-form-strengths.page';

const routes: Routes = [
  {
    path: '',
    component: VoluntaryFormStrengthsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntaryFormStrengthsPageRoutingModule {}
