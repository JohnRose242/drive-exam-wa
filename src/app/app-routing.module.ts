import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(
        (mod) => mod.LoginModule
      )
  },
  {
    path: 'home',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./home/home.module').then(
        (mod) => mod.HomeModule
      )
  },
  {
    path: 'exams',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./exams/exams.module').then(
        (mod) => mod.ExamsModule
      )
  },
  {
    path: 'flashcards',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./flashcards/flashcards.module').then(
        (mod) => mod.FlashcardsModule
      )
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
