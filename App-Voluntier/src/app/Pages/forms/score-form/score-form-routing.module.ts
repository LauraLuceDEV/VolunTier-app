import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoreFormPage } from './score-form.page';

const routes: Routes = [
  {
    path: '',
    component: ScoreFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreFormPageRoutingModule {}
