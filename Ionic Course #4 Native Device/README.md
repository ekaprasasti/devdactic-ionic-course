# Bagaimana Menggunakan Cordova dan Device Feature pada Ionic

Untuk tutorial dari devadactic.com bisa di lihat [di sini](https://ionicacademy.com/cordova-features-inside-ionic/). Saat ini aplikasi Ionic kita hanya berjalan di dalam webview, kita butuh suatu akses ke fitur device seperti kamera atau gyroscope. 

## 1. Apa itu plugin cordova?

Cordova membungkus kode native (Swift, Objective-C, Java) ke dalam Javascript yang bertindak sebagai jembatan untuk kode kita. Dengan Ionic kita bisa menggunakan plugin Cordova secara langsung atau, di sarankan menggunakan sebuah package bernama [Ionic Native](http://ionicframework.com/docs/native/).

## 2. Menambahkan plugin Cordova menggunakan Ionic Native

Kapanpun kita membutuhkan plugin yang spesifik kita dapat mencarinya pada library Ionic Native. 

Pada contoh kasus, kita ingin *share* film dengan orang lain dengan membuka **native Email client** dari device. Kedengarannya simpel, tapi kita tetap membutuhkan plugin untuk hal ini.

Ada 2 hal yang kita harus install:
Pertama plugin Cordova, yang akan menambahkan plugin tersebut ke native IOS atau project Android ketika pertama kali kita *build*.

Kedua kita harus menginstall sub package dari Ionic Native. Jalankan perintah berikut pada terminal kita

```bash
ionic cordova plugin add cordova-plugin-email
npm install --save @ionic-native/email-composer
```

Seperti yang sudah-sudah kita harus me-load dan menambahkan nya pada array providers di dalam **src/app/app.module.ts**:

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

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

## 3. Menggunakan functional native

Di mulai dengan menambahkan button pada page detail dari film yang akan memanggil funtion yang meload email client.

Buka file **src/pages/film-details/film-detail.html** dan edit filenya menjadi seperti ini:

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>{{ film.title }}</ion-title>
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

Di dalam class kita akan import package yang tepat untuk email client dan juga ke constructor kita.

Buka file **src/pages/film-details/film-details.ts** dan ubah kodenya menjadi seperti berikut:

```javascript
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
```

Untuk properties dan function di atas dan yang tersedia pada plugin, kita bisa mengunjungi [list page Ionic Native untuk plugin](http://ionicframework.com/docs/native/email-composer/)

### Plugin cordova tidak dapat bekerja pada browser

Jika kita ingin mengetest fungsi ini kita harus **mendeploy** aplikasi kita pada simulator atau device fisik.

Ketika kita sudah deploye dan menggunakan fungsi share, kita akan mendapatkan native email client seperti berikut:

![native email client](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2017/05/ionic-crash-course-cordova-email.png?w=468&ssl=1)

## 4. Langkah selanjutnya

Di tutorial selanjutnya kita akan belajar store data local menggunakan ionic package.
