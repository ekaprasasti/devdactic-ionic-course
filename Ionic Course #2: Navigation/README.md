# How to Navigate through Pages of Ionic Apps

## 1. Changing Our Project Structure

Kita akan menghapus file `src/home`. Page tersebut di buat tanpa menggunakan **module file** dan tidak dapat bekerja dengan baik menggunakan *lazy loading*.

Kita juga akan menghapus referensi ke `HomePage` dari module kita. Jadi buka file **src/app/app.module.ts** dan ubah file tersebut menjadi seperti berikut:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';
 
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
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

Saat ini aplikasi tidak berjalan, dan kita mendapatkan beberapa pesan error. Hal ini akan tidak ada masalah jika kita sudah menginstall dan mengubah beberapa hal berikut.

Sekarang kita akan menggunakan Ionic CLI untuk men-generate `pages`. Buka terminal lalu ketikan perintah berikut satu per satu:

```bash
ionic g page tabs
ionic g page people
ionic g page planets
ionic g page films
ionic g page filmDetails
```

Sekarang sudah ada 5 pages dalam aplikasi kita. Seperti yang kita ketahui entry point aplikasi kita berada pada folder app, dan direferensikan pada file **src/app/app.components.ts**. Buka file tersebut dan set **rootPage** menjadi `TabsPage`:

```javascript
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'Tabs';
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
```

 Anda mungkin bertanya, mengapa kita set rootPage menjadi string?

Inilah yang di sebut Ionic lazy loading.

Jika kita hanya menggunakan nama seperti `TabsPage` kita juga perlu mengimpor modul lengkap page tersebut, dan semua ini akan terjadi sebelum kita benar-benar menggunakan page!

Hal ini akan mempercepat aplikasi kita. Terutama pada saat starting.

## 2. Creating a Tab Bar

Kita akan menggunakan sintaks untuk membuat [Ionic Tab Bar](http://ionicframework.com/docs/components/#tabs)

Setiap page akan kita sepesfikasikan root page, dan kita akan menambahkan title dan icon. Buka file **src/pages/tabs/tabs.html** dan ubah semua kodenya menjadi seperti ini:

```html
<ion-tabs>
	<ion-tab [root]="tab1" tabTitle="Films" tabIcon="film"></ion-tab>
	<ion-tab [root]="tab2" tabTitle="People" tabIcon="people"></ion-tab>
	<ion-tab [root]="tab3" tabTitle="Planets" tabIcon="planet"></ion-tab>
</ion-tabs>
```

Ini artinya kita membutuhkan 3 variabel yang akan kita gunakan di dalam view. Masing-masing akan diatur ke salah satu page yang kami buat - seperti yang kita lakukan di awal di mana kita merujuk TabsPage kita sebagai page pertama!

Buka file **src/pages/tabs/tabs.ts** dan ubah menjadi seperti ini:

```javascript
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1 = 'Films';
  tab2 = 'People';
  tab3 = 'Planets';
 
  constructor(public navCtrl: NavController, public navParams: NavParams) { }
}
```

Sekarang tab sudah mempunyai page yang sudah di assign, dan kita lihat  view Tab Bar kita dan bisa di navigasi ke 3 page seperti gambar berikut ini.

![3 tabs](https://i0.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crashcourse-angular-tabs.gif?resize=370%2C663&ssl=1)

## 3. Change Views

Untuk dapat menavigasi pages yang berbeda kita tambahkan 2 buttton pada view **FilmsPage**.

### Using the NavController
 	
