import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversEdComponent } from './drivers-ed.component';
import { DriversEdRoutingModule } from './drivers-ed-routing.module';
import { WashingtonComponent } from './states/washington/washington.component';
import { MatButtonModule } from '@angular/material/button';
import { ExamsModule } from '../exams/exams.module';

@NgModule({
  declarations: [
    DriversEdComponent,
    WashingtonComponent,
  ],
  imports: [
    CommonModule,
    DriversEdRoutingModule,
    MatButtonModule,
    ExamsModule
  ]
})
export class DriversEdModule { }
