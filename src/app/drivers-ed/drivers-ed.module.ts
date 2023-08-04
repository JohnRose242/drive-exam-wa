import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversEdComponent } from './drivers-ed.component';
import { DriversEdRoutingModule } from './drivers-ed-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { ExamsModule } from '../exams/exams.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DriversEdComponent,
  ],
  imports: [
    CommonModule,
    DriversEdRoutingModule,
    MatButtonModule,
    ExamsModule,
    MatCardModule,
    MatIconModule
  ]
})
export class DriversEdModule { }
