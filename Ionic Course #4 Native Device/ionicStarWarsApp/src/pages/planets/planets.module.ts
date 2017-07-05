import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Planets } from './planets';

@NgModule({
  declarations: [
    Planets,
  ],
  imports: [
    IonicPageModule.forChild(Planets),
  ],
  exports: [
    Planets
  ]
})
export class PlanetsModule {}
