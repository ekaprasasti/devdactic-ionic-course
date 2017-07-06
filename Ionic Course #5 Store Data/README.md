# How to Store Data inside Ionic Apps

Untuk tutorial lengkap dari devdactic.com silahkan klik [di sini](https://ionicacademy.com/store-data-inside-ionic/). Ionic sudah menyiapkan package yang memungkin kan kita untuk menggunakan penyimpanan local dari browser atau bahkan memory dari native device.

## Setting ionic storage

[Ionic Storage](http://ionicframework.com/docs/storage/) adalah sebuah package untuk memudahkan pengelolaan data. Dengan Ionic Storage kita dapat menyimpan objek JSON dan menghubungkan key/value ke berbagai storage engines, di satukan melalui satu interface.

Storage secara internal akan memilih storage engine yang tersedia dan memilih solusi terbaik untuk kita.

Permasalahan menggunakan local storage secara umum adalah dapat di bersihkan/dihilangkan dari OS pada mobile device dan kita akan kehilangan semua data.

Solusi terbaik pada device adalah kita perlu menambahkan plugin Cordova baru yang memungkinkan akses ke penyimpanan SQLite yang kemudian di gunakan oleh Ionic Storage secara internal.

Jalankan perintah berikut pada terminal:

```bash
ionic cordova plugin add cordova-sqlite-storage --save
``` 

Kita harus men-generate sebuah provider baru yang akan menghandle koneksi ke storage, jalankan perintah berikut:

```bash
ionic g provider favorite
```

Buka file **src/app/app.module.ts**, kita harus memasukan provider baru dan juga module **IonicStorageModule**:

```javascript
import { Api } from './../providers/api';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { EmailComposer } from '@ionic-native/email-composer';

import { Favorite } from './../providers/favorite';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    Favorite,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

## 2. Bekerja dengan Ionic Storage

Kita membuat `FavoriteProvider`, karena kita ingin menjalankan film yang paling kita suka.

Jadi kita butuh untuk menyimpan ID film tersebut, mengecek apakah film tersebut sudah menjadi favorite dan tentu saja mengembalikannya lagi.

Dengan Ionic Storage kita dapat memanggil di antara `set()` atau `get()` dan keduanya akan mengembalikan sebuah **Promise**. Tidak seperti biasanya pada Observable seperti sebelumnya, ini hanya meng-handle block `then()`, tetapi operasi tetap async.

Untuk menghapus sebuah film kita menggunakan logika yang kurang lebih sama, tapi sekarang kita mendapatkan indeks film kita di dalam array dan memanggil method splice untuk menghapusnya dari array sebelum kita menyimpannya kembali.

Buka file **src/providers/favorite.ts** dan ganti dengan kode berikut:

```javascript
import { Injectable } from '@angular/core';

const STORAGE_KEY = 'favoriteFilms';

@Injectable()
export class Favorite {
  constructor(public storage: Storage) { }

  isFavorite(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      return result && result.indexOf(filmId) !== -1;
    })
  }

  favoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        result.push(filmId);
        return this.storage.set(STORAGE_KEY, result);
      }
      else {
        return this.storage.set(STORAGE_KEY, [filmId]);
      }
    });
  }

  unfavoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        var index = result.indexOf(filmId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  getAllFavoriteFilms() {
    return this.storage.get(STORAGE_KEY);
  }
}
```

Jika kita hanya ingin memeriksa apakah sebuah film sudah tersimpan, kita akan mengambil array dan memeriksa apakah key tersebut dapat ditemukan di dalamnya.

## 3. Menggunakan favorite provider

Ketika kita membuka page FilmDetails kita ingin mengecek film tersebut sudah menjadi favorite atau belum.

Karena di dalam view kita menggunakan syntax baru `*ngIf` yang memungkin kita untuk mengetahui apakah kondisi bernilai true atau false. Kita akan membuat 2 button yang berbeda, tetapi hanya satu yang akan di tampilkan.

Kondisi akan di cek di dalam class, dimulai dengan merubah view **src/pages/film-details/film-details.html** dengan kode berikut:

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>{{ film.title }}</ion-title>
    <ion-buttons end>
      <button ion-button icon-only (click)="unfavoriteFilm()" *ngIf="isFavorite"><ion-icon name="star"></ion-icon></button>
      <button ion-button icon-only (click)="favoriteFilm()" *ngIf="!isFavorite"><ion-icon name="star-outline"></ion-icon></button>
    </ion-buttons>
  </ion-navbar>
</ion-header>
 
<ion-content padding>
  <ion-card>
    <ion-card-content>
      {{ film.opening_crawl }}
    </ion-card-content>
  </ion-card>
 
  <button ion-button full (click)="shareFilm()">Share by Email</button>
</ion-content>
```

Setelah kita mendapatkan data dari film tersebut kita melewatkan ID ke provider dan pertama cek apakah film sudah menjadi favorite. Didalam block `then()` kita bisa menggunakan hasil dan mengesetnya menjadi variabel untuk kondisi.

Buka file **src/pages/film-details/film-details.ts** dan ubah menjadi seperti berikut:

```javascript
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
```

Sekarang kita bisa menavigasi page detail dan bisa memberi start atau unstar film.

![star film](https://i2.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-star.gif?resize=367%2C400&ssl=1)

Tentu ini bukan hanya efek kecil, mereka sebenarnya tersimpan di dalam database. Anda menavigasi ke film lain, memulainya dan Anda akan melihat bahwa pilihan Anda akan disimpan setiap saat, bahkan jika Anda me-refresh browser!

## 4. Langkah selanjutnya

Di tutorial selanjutnya kita akan styling aplikasi kita dan merubah tampilannya.
