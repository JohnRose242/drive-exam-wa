import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    data: {
      headerLinks: [
        {
          text: `Prep2Test`
        }
      ],
      pageTitle: 'Login'
    },
    loadChildren: () =>
      import('./login/login.module').then(
        (mod) => mod.LoginModule
      )
  },
  {
    path: 'home',
    canActivate: [LoggedInGuard],
    data: {
      headerLinks: [
        {
          text: `Prep2Test`
        }
      ],
      pageTitle: 'Home'
    },
    loadChildren: () =>
      import('./home/home.module').then(
        (mod) => mod.HomeModule
      )
  },
  {
    path: 'drivers-ed',
    canActivate: [LoggedInGuard],
    data: {
      headerLinks: [
        {
          route: '/home',
          text: `Prep2Test`
        },
        {
          text: `Driver's Ed`
        }
      ],
      pageTitle: `Driver's Ed`
    },
    loadChildren: () =>
      import('./drivers-ed/drivers-ed.module').then(
        (mod) => mod.DriversEdModule
      )
  },
  {
    path: 'exams',
    canActivate: [LoggedInGuard],
    data: {
      headerLinks: [
        {
          route: '/drivers-ed',
          text: `Driver's Ed`
        },
        {
          text: `Exams`
        },
      ],
      pageTitle: 'Exams'
    },
    loadChildren: () =>
      import('./exams/exams.module').then(
        (mod) => mod.ExamsModule
      )
  },
  {
    path: 'flashcards',
    canActivate: [LoggedInGuard],
    data: {
      headerLinks: [
        {
          route: '/drivers-ed',
          text: `Driver's Ed`
        },
        {
          text: `Flashcards`
        },
      ],
      pageTitle: 'Flashcards'
    },
    loadChildren: () =>
      import('./flashcards/flashcards.module').then(
        (mod) => mod.FlashcardsModule
      )
  },
  {
    path: 'scores',
    canActivate: [LoggedInGuard],
    data: {
      headerLinks: [
        {
          route: '/drivers-ed',
          text: `Driver's Ed`
        },
        {
          text: `Scores`
        },
      ],
      pageTitle: 'Scores'
    },
    loadChildren: () =>
      import('./scores/scores.module').then(
        (mod) => mod.ScoresModule
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
