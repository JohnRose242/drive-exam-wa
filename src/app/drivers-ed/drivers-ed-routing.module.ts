import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversEdComponent } from './drivers-ed.component';

const routes: Routes = [
  {
    path: '',
    component: DriversEdComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversEdRoutingModule {}
