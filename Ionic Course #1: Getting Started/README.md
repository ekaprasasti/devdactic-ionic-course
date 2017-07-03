# How to Get Started with Ionic and Angular

Tutorial ini merupakan seri pertama dari tutorial ionic crash course dari devdactic.com. Tutorial dapat di akses [disini](https://ionicacademy.com/get-started-with-ionic/).

## 1. What is Ionic

Pada bagian ini akan di jelaskan secara singkat mengenai Ionic yang merujuk pada [Website Official Ionic](http://ionicframework.com/)

## 2. Installing Ionic & Environment

### Node.js

Kita harus menginstall [Node.js](https://nodejs.org/en/) terlebih dahulu. Untuk mendownload dan menginstall lihat pada [Official Documentasi Node.js](https://nodejs.org/en/)

### Ionic

Ionic dapat di install menggunakan package Node.js menggunakan **Node Package Manager** (npm). Kita juga harus menginstall cordova untuk dapat menjalankan ionic pada device.

```bash
npm install -g cordova ionic
``` 

Kita menggunakan `-g` untuk menginstallnya secara global, bukan hanya pada *working directory*.

### Code Editor

Kita bisa menggunakan editor apapun, tetapi di sarankan menggunakan [Visual Studio](https://code.visualstudio.com/).

### Setelah menginstall

Setelah menginstall jalankan perintah berikut pada terminal

```bash
ionic info
``` 

Jika muncul tampilan seperti ini berarti ionic anda telah terinstall

```bash
ordova CLI: 7.0.1                                                              
Ionic CLI Version: 2.1.18                                                       
Ionic App Lib Version: 2.1.7                                                    
ios-deploy version: 1.9.1                                                       
ios-sim version: 6.0.0                                                          
OS: macOS Sierra                                                                
Node Version: v6.9.4                                                            
Xcode version: Xcode 8.0 Build version 8A218a
```

## 3. Starting Your Ionic App

Kita akan membuat project Ionic baru menggunakan perintah berikut pada terminal

```bash
ionic start ionicStarWarsApp blank
```

Setelah itu jalankan aplikasi dengan meng-compile-nya menggunakan perintah berikut

```bash
ionic lab
```

Maka browser secara otomatis akan membuka aplikasi dengan port 8100

![ionic serve](https://i2.wp.com/ionicacademy.com/wp-content/uploads/2017/05/ionic-lab-crash-course.png?resize=706%2C1024&ssl=1)

## 4. Ionic Project Structure

### config.xml

Di gunakan setelah native project di buat dari project ionic tersebut. Jika Anda memerlukan izin khusus di aplikasi asli atau mengubah hal-hal lain, Anda harus mengaturnya di dalam file ini.

### hooks

Directory yang berisi *actions* yang otomatis di jalankan pada *lifecycle events* dari aplikasi.

### ionic.config.json

Berisi beberapa informasi dasar tentang proyek Anda dan digunakan jika Anda mengupload aplikasi Anda ke [Ionic platform](https://apps.ionic.io/).

### plugins

Berisi plugin Cordova yang kita install.

### resource

Merupakan ionic folder yang berisi icon aplikasi dan splash screen.

### src

Folder ini merupakan folder yang paling penting, karena 99% pekerjaan kita berada pada folder ini.

### tsconfig.json & tslint.json

File ini berhubungan dengan TypeScript dan bagaimana aplikasi kita di compile. Kita tidak perlu perduli dengan 2 file ini, biarkan saja maka semuanya akan baik-baik saja.

### www

Folder ini berisi build yang di generate secara otomatis ketika kita menjalankan preview ionic pada browser.

## Working with Angular

Folder `app` merupakan **entry point** dari aplikasi kita. 

```html
<!-- Ionic's root component and where the app will load -->
<ion-app></ion-app>
```

Ditempat inilah aplikasi kita akan di load. Kita jarang menyentuh file ini, tapi ada baiknya mengetahui bagaimana semuanya bekerja.

Aplikasi kita terdiri dari **pages** yang berbeda-beda, dan ketika kita memulai aplikasi ini, aplikasi kita sudah memiliki **page** yang bernama `home`.

Setiap page memiliki foldernya sendiri dengan file HTML, CSS, dan ts.

## Typescript

Typescript merupakan superset dari javascript. Kita selalu melakukan koding dengan menggunakan TypeScript dan build system akan di **transpile** kedalam javascript biasa, sehingga browser dapat mengerti kode kita.

## Angular Data Binding

Kita akan melihatnya dalam 3 bagian, dan mereka semua terkoneksi. Didalamnya terdapat file CSS yang mendifinisikan styling dari tampilan, HTML yang mempresentasikan tampilan, dan TypeScript yang berisi class yang berkaitan dengan tampilan. File `home.ts` akan terlihat seperti berikut ini:

```javascript
mport { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  constructor(public navCtrl: NavController) {
 
  }
 
}
```

Decorator `@Component` di gunakan internal pada Ionic dan Angular dan kita tidak merubah apapun disini, `imports` di bagian atas memasukan component yang berbeda dari package NPM. Dan pada bagian bawah kita mendapatkan class `HompePage` dengan Constructor.

Di dalam class kita bisa mendefinisikan sebuat variabel. Tambahkan variabel pada code berikut:

```javascript
export class HomePage {
 
  myVariable: string = 'The force is with me!';
  
  constructor(public navCtrl: NavController) { }
 
}
```

Sekarang tampilkan di dalam view. Kita dapat mengakses variabel di atas menggunakan tanda kurung ganda di dalam file HTML. Buka file `home.html` dan rubah dengan kode berikut.:

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content padding>
{{ myVariable }}
</ion-content>
``` 

Ionic akan melakukan otomatis reload ketika project kita mengalami perubahan.

## Angular Events

Kita akan memulai dari class di mana kita akan mengimplementasikan function yang dapat merubah variabel kita. Kita dapat mengakses semua variabel dengan menggunakan keyword `this`, rubah class kita menjadi seperti berikut ini:

```javascript
export class HomePage {
 
  myVariable: string = 'The force is with me!';
 
  constructor(public navCtrl: NavController) { }
 
  updateMyValue() {
    this.myVariable = 'Now the force is even stronger!';
  }
 
}
```

Panggil di dalam view. Buka file home.html kembali dan ubah kode menjadi seperti ini:

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-navbar>
</ion-header>
 
<ion-content padding>
  <button ion-button full (click)="updateMyValue()">Click me!</button>
{{ myVariable }}
</ion-content>
```

Aplikasi sekarang menjadi seperti ini:

![Angular event](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crashcourse-angular-binding.gif?resize=370%2C164&ssl=)
