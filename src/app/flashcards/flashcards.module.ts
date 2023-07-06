import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardsComponent } from './flashcards.component';
import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FlashcardsComponent
  ],
  imports: [
    CommonModule,
    FlashcardsRoutingModule,
    MatButtonModule
  ]
})
export class FlashcardsModule { }
