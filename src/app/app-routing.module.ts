import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(
        (mod) => mod.HomeModule
      )
  },
  {
    path: 'exams',
    loadChildren: () =>
      import('./exams/exams.module').then(
        (mod) => mod.ExamsModule
      )
  },
  {
    path: 'flashcards',
    loadChildren: () =>
      import('./flashcards/flashcards.module').then(
        (mod) => mod.FlashcardsModule
      )
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
