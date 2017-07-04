import { Api } from './../../providers/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
	films: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public apiProvider:Api) {
		this.films = this.apiProvider.getFilms();
	}

	openDetails(film) {
		this.navCtrl.push('FilmDetails', {film: film});
	}

	goToPlanets(){
		this.navCtrl.parent.select(2);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Films');
  }

}
