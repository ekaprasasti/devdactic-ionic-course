import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { People } from './people';

@NgModule({
  declarations: [
    People,
  ],
  imports: [
    IonicPageModule.forChild(People),
  ],
  exports: [
    People
  ]
})
export class PeopleModule {}
