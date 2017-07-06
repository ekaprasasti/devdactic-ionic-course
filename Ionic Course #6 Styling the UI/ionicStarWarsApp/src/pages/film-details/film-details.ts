import { Favorite } from './../../providers/favorite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer'; 

@IonicPage()
@Component({
  selector: 'page-film-details',
  templateUrl: 'film-details.html',
})
export class FilmDetails {
				film: any;
				isFavorite = false;

  constructor(public navCtrl: NavController, public favoriteProvider: Favorite,  public navParams: NavParams, private emailComposer: EmailComposer) {
		this.film = this.navParams.get('film');
		this.favoriteProvider.isFavorite(this.film.episode_id).then(isFav => {
			this.isFavorite = isFav;
		})
	}

	favoriteFilm() {
		this.favoriteProvider.favoriteFilm(this.film.episode_id).then(() => {
			this.isFavorite = true;
		})
	}

	unfavoriteFilm() {
			this.favoriteProvider.unfavoriteFilm(this.film.episode_id).then(() => {
			this.isFavorite = false;
		})
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
