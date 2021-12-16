import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalDataFormPage } from './principal-data-form.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalDataFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalDataFormPageRoutingModule {}
