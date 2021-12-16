import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileMenuPage } from './edit-profile-menu.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileMenuPageRoutingModule {}
