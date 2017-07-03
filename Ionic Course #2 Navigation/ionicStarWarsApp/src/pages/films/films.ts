import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Films page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class Films {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

	openDetails() {
		this.navCtrl.push('FilmDetails', {filmId: 2});
	}

	goToPlanets(){
		this.navCtrl.parent.select(2);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Films');
  }

}
