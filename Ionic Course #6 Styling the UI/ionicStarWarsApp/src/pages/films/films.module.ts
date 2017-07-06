import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Films } from './films';

@NgModule({
  declarations: [
    Films,
  ],
  imports: [
    IonicPageModule.forChild(Films),
  ],
  exports: [
    Films
  ]
})
export class FilmsModule {}
