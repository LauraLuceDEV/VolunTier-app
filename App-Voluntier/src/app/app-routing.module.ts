import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'splash-app',
    loadChildren: () => import('./Pages/splash-app/splash-app.module').then( m => m.SplashAppPageModule)
  },
  {
    path: 'login-menu',
    loadChildren: () => import('./Pages/login-menu/login-menu.module').then( m => m.LoginMenuPageModule)
  },
  {
    path: 'voluntary-form-strengths',
    loadChildren: () => import('./Pages/forms/score-form/voluntary-form-strengths/voluntary-form-strengths.module').then( m => m.VoluntaryFormStrengthsPageModule)
  },
  {
    path: 'choose-profile',
    loadChildren: () => import('./Pages/forms/choose-profile-form/choose-profile-form.module').then( m => m.ChooseProfileFormPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./Pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'petitioner-problems',
    loadChildren: () => import('./Pages/forms/petitioner-problems/petitioner-problems.module').then( m => m.PetitionerProblemsPageModule)
  },
  {
    path: 'petitioner-tutor-form',
    loadChildren: () => import('./Pages/forms/petitioner-tutor-form/petitioner-tutor-form.module').then( m => m.PetitionerTutorFormPageModule)
  },
  {
    path: 'petitioner-choose-tutor',
    loadChildren: () => import('./Pages/forms/petitioner-choose-tutor/petitioner-choose-tutor.module').then( m => m.PetitionerChooseTutorPageModule)
  },
  {
    path: 'principal-data-form',
    loadChildren: () => import('./Pages/forms/principal-data-form/principal-data-form.module').then( m => m.PrincipalDataFormPageModule)
  },
  {
    path: 'login-mail',
    loadChildren: () => import('./Pages/login-mail/login-mail.module').then( m => m.LoginMailPageModule)
  },
  {
    path: 'petitioner-task-form',
    loadChildren: () => import('./Pages/forms/petitioner-task-form/petitioner-task-form.module').then( m => m.PetitionerTaskFormPageModule)
  },
  {
    path: 'user-task-list',
    loadChildren: () => import('./Pages/user-task-list/user-task-list.module').then( m => m.UserTaskListPageModule)
  },
  {
    path: 'voluntary-search-task-menu',
    loadChildren: () => import('./Pages/voluntary-search-task-menu/voluntary-search-task-menu.module').then( m => m.VoluntarySearchTaskMenuPageModule)
  },
  {
    path: 'show-address-map',
    loadChildren: () => import('./pages/show-address-map/show-address-map.module').then( m => m.ShowAddressMapPageModule)
  },
  {
    path: 'last-details',
    loadChildren: () => import('./Pages/forms/last-details/last-details.module').then( m => m.LastDetailsPageModule)
  },
  {
    path: 'edit-profile-menu',
    loadChildren: () => import('./Pages/edit-profile-menu/edit-profile-menu.module').then( m => m.EditProfileMenuPageModule)
  },
  {
    path: 'task-details/:taskid/:petitionerdocid',
    loadChildren: () => import('./Pages/task-details/task-details.module').then( m => m.TaskDetailsPageModule)
  },
  {
    path: 'confirm-delete-account',
    loadChildren: () => import('./Pages/modals/confirm-delete-account-modal/confirm-delete-account-modal.module').then( m => m.ConfirmDeleteAccountModalPageModule)
  },
  {
    path: 'score-form/:taskid',
    loadChildren: () => import('./Pages/forms/score-form/score-form.module').then( m => m.ScoreFormPageModule)
  },
  {
    path: 'voluntary-finish-task/:taskid',
    loadChildren: () => import('./Pages/voluntary-finish-task/voluntary-finish-task.module').then( m => m.VoluntaryFinishTaskPageModule)
  },
  {
    path: 'complain-regret-form/:taskid',
    loadChildren: () => import('./Pages/forms/complain-regret-form/complain-regret-form.module').then( m => m.ComplainRegretFormPageModule)
  },
  {
    path: 'choose-complain-regret-form/:taskid',
    loadChildren: () => import('./Pages/forms/choose-complain-regret-form/choose-complain-regret-form.module').then( m => m.ChooseComplainRegretFormPageModule)
  },
  {
    path: 'petitioner-finish-task/:taskid',
    loadChildren: () => import('./Pages/petitioner-finish-task/petitioner-finish-task.module').then( m => m.PetitionerFinishTaskPageModule)
  },
  {
    path: 'chat/:transmitterUID/:receptorUID',
    loadChildren: () => import('./Pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chat-users-list',
    loadChildren: () => import('./Pages/chat-users-list/chat-users-list.module').then( m => m.ChatUsersListPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
