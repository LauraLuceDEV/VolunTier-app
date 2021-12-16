import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseComplainRegretFormPage } from './choose-complain-regret-form.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseComplainRegretFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseComplainRegretFormPageRoutingModule {}
