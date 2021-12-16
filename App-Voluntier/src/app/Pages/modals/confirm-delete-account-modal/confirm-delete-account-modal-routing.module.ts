import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmDeleteAccountModalPage } from './confirm-delete-account-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmDeleteAccountModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmDeleteAccountModalPageRoutingModule {}
