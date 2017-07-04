import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilmDetails } from './film-details';

@NgModule({
  declarations: [
    FilmDetails,
  ],
  imports: [
    IonicPageModule.forChild(FilmDetails),
  ],
  exports: [
    FilmDetails
  ]
})
export class FilmDetailsModule {}
