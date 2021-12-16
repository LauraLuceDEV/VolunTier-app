import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseProfileFormPage } from './choose-profile-form.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseProfileFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseProfileFormPageRoutingModule {}
