import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashAppPage } from './splash-app.page';

const routes: Routes = [
  {
    path: '',
    component: SplashAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashAppPageRoutingModule {}
