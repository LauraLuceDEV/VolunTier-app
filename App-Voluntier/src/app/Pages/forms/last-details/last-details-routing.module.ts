import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastDetailsPage } from './last-details.page';

const routes: Routes = [
  {
    path: '',
    component: LastDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LastDetailsPageRoutingModule {}
