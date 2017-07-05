import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer'; 

/**
 * Generated class for the FilmDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-film-details',
  templateUrl: 'film-details.html',
})
export class FilmDetails {
	film: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer) {
		this.film = this.navParams.get('film');
	}

	goBack() {
		this.navCtrl.pop();
	}

	shareFilm() {
		let email = {
			to: 'ekaputraprasasti@gmail.com',
			subject: 'I love this one: ' + this.film.title,
			body: 'Can remamber the opening?<br><br>\"' + this.film.opening_crawl + '\"',
			isHtml: true
		};

		this.emailComposer.open(email);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmDetails');
  }

}
