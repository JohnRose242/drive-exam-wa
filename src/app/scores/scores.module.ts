import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresComponent } from './scores.component';
import { ScoresRoutingModule } from './scores-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ScoresComponent
  ],
  imports: [
    CommonModule,
    ScoresRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class ScoresModule { }
