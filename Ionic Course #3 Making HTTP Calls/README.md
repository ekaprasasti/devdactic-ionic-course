# How to Make HTTP Calls with Ionic

Kali ini kita akan belajar mengenai **HTTP request** dan bagaimana menggunakan **providers**. Untuk menuju tutorial original dari devdactic.com silahkan klik [disini](https://ionicacademy.com/http-calls-ionic/).  Kita akan menggunakan [Star Wars API](http://swapi.co/) yang mana API adalah free dan public API dengan data JSON yang kita butuhkan.

## 1. Basic HTTP Calls

Import module HTTP pada **src/app/app.module.ts** seperti pada contoh di bawah ini:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
 
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

Jika kita menggunakan external resource seperti ini, operasi merupakan **asynchronous**.

Apapun yang kita panggil nanti membutuhkan waktu, dan ini terjadi di *background* dari aplikasi kita dan beberapa hal tertentu akan mereturn sebuah data.

Dengan menggunakan Angular kita bisa menggunakan **Promise** **dan Observables**. Jika anda sudah pernah menggunakan AngularJS anda mungkin mengenal yang namanya Promis, yang mana akan di panggil dan pada point tertentu akan mengembalikan *result* atau *error*.

Observable sedikit lebih baru dan memungkinkan lebih banyak kontrol, misal kita bisa meng-cancel sebuah observable atau menerima return nilai secara bersamaan sekaligus.

Jadi request yang kita buat pada Swapi akan me-return kepada kita sebuah observable yang mana kita bisa *assign* kedalam local variabel. Kita menggunakan standard **Angular Http service** untuk membuat **GET request**.

Setelah pemanggilan kita juga **map** hasilnya, keuntungan lain dari observable adalah memungkinkan untuk **transform** hasilnya dengan cepat. 

Promise yang classic di tangani menggunakan **then()**, yang di trigger begitu hasilnya masuk.

Sekarang buka file **src/pages/films/films.ts** dan edit kodenya menjadi seperti ini.

```javascript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@IonicPage()
@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class Films {
  films: Observable<any>;
 
  constructor(public navCtrl: NavController, public http: Http) { 
    this.films = this.http.get('http://swapi.co/api/films');
    this.films
    .map(res => res.json())
    .subscribe(data => {
      console.log('my data: ', data);
    })
  }
}
```

Jalankan kembali aplikasi, pada console kita akan melihat hasilnya seperti ini:

![console](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2017/05/ionic-json-result.png?w=992&ssl=1);

## 2. Displaying Asynchronous Data

Dengan Angular kita dapat dengan mudah menggunakan observables langsung pada view. Kita tidak bisa menunggu hasilnya lalu baru meng-assign nya, tapi kita bisa secara mudah mengatur variabel kepada hasil dari pemanggilan HTTP dan menangani rest API di dalam view.

Ubah file **src/pages/films/films.ts**, untuk versi yang lebih ringkas:

```javascript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@IonicPage()
@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class Films {
  films: Observable<any>;
 
  constructor(public navCtrl: NavController, public http: Http) { 
    this.films = this.http.get('http://swapi.co/api/films').map(res => res.json());
  }
 
  openDetails(film) {
    this.navCtrl.push('FilmDetails', {film: film});
  }
}
```

Sekarang kita mem-passing sebuah object film, yang berasal dari function `openDetails()`.

Buka file **src/pages/films/films.html** dan ubah kodenya menjadi seperti ini:

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>Films</ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content>
<ion-list>
  <button ion-item *ngFor="let film of (films | async)?.results" (click)="openDetails(film)">
    {{ film.title }}
  </button>
</ion-list>
 
</ion-content>
```

Di dalam kode di atas kita menemukan beberapa element baru:

- `*ngFor`: Syntax untuk melooping array dan membuat multiple element dengan tipe yang sama.
- | async: Memanggil simbol Pipe `( | )`, dan memberitahukan Angular untuk *obeserve* variabel ini karena akan berubah nanti.
- ? : Operator yang memberitahukan Angular bahwa variabel tersebut bisa saja `null`, maka tolong jangan crash.

Kita telah melewatkan data ke page dengan function push, kita akan menanganinya dengan baik. Maka, ubah file **src/pages/film-details/film-details.ts** menjadi seperti berikut:

```javascript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-film-details',
  templateUrl: 'film-details.html',
})
export class FilmDetails {
  film: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.film = this.navParams.get('film');
  }
}
```

Buka file **src/pages/film-details/film-details.html** dan ubah view untuk membaca nilai dari variabel yang sudah di buat:

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
</ion-content>
```

Saat ini aplikasi akan menjadi seperti berikut ini:

![Swapi](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crashcourse-ionic-list.gif?resize=370%2C404&ssl=1)

## 3. Using Providers

Provider merupakan sebuah component Angular yang dapat di **inject** kedalam page lain yang mana memungkinkan kita untuk memanggil beberapa function.

Provider tidak memiliki view, ia hanya **me-return data** kepada kita. Merupakan ide yang bagus untuk tetap memisahkan pemanggilan HTTP dari view dan class, karena bisa di maintain dengan lebih mudah dan tidak di distribusikan di keseleruhan project.

### Creating a Provider

Kita menggunakan Ionic CLI untuk memanggil generator membuat kan provider baru untuk kita. Buka terminal dan ketikan perintah berikut:

```bash
ionic g provider api
``` 

Ini akan membuat sebuah file baru **src/providers**, dan kita pastikan juga provider yang baru saja kita buat di tambahkan pada array dalam **src/app/app.module.ts**.

```javascript
import { Api } from './../providers/api/api';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
 
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

### Implementing the Provider

Provider kita mempunyai tugas kecil yaitu me-return data dari Swapi.

Buka dan ubah file **src/providers/api.ts** menjadi seperti berikut:

```javascript
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class ApiProvider {
 
  constructor(public http: Http) { }
 
  getFilms() {
    return this.http.get('http://swapi.co/api/films').map(res => res.json());
  }
}
```

### Using the Provider

Kita harus mengimport file dan meng-inject nya pada constructor. Dengan melakukan ini, kita bisa menggunakannya secara langsung dan memanggil fungsinya, seperti sebelumnya yang pernah kita lakukan.

Buka file **src/pages/films/films.ts** dan rubah menjadi seperti ini:

```javascript
import { Api } from './../../providers/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
 
@IonicPage()
@Component({
  selector: 'page-films',
  templateUrl: 'films.html',
})
export class Films {
  films: Observable<any>;
 
  constructor(public navCtrl: NavController, public apiProvider: Api) { 
    this.films = this.apiProvider.getFilms();
  }
 
  openDetails(film) {
    this.navCtrl.push('FilmDetails', {film: film});
  }
}
```

## 4. Next Steps

Di tutorial berikutnya kita akan belajar:

- Menambahkan 2 fungsi pada provider untuk me-load **people** dan **planets**.
- Mengimplementasikan page Peoples dan page Planets dengan data yang di dapat dari apiProvider.
- Mengenerate 2 page lagi untuk peopleDetails dan planetDetails. 
