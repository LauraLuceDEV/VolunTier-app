import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplainRegretFormPage } from './complain-regret-form.page';

const routes: Routes = [
  {
    path: '',
    component: ComplainRegretFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplainRegretFormPageRoutingModule {}
