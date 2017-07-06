# How to Style the UI of Ionic Apps

Kita akan melihat 2 bagian styling yang berbeda, yaitu styling umum menggunakan Sass dan styling yang lebih rinci dengan klasik CSS. Tutorial original dari devdactic.com dapat di lihat [di sini](https://ionicacademy.com/style-ui-ionic/).

## 1. Tempat untuk merubah UI

Kita dapat merubah tampilan aplikasi kita menggunakan **CSS** dan juga **Sass**. 

Jika anda perhatikan setiap page baru menghasilkan file Sass (dengan ekstensi .scss), yang dari file itu secara langsung dapat di gunakan untuk merubah tampilan dengan spesifik page.

Dalam project terdapat folder theme, folder ini merupakan tempat untuk meng-override variabel Ionic dan meng-import custom font atau file styling  individual lainnya.

Kita juga mendapatkan file Sass **src/app/app.scss** dimana kita bisa menerapkan **global styling** pada aplikasi kita. 

## 2. Overriding variabel ionic

Kita telah menggunakan styling Ionic pada beberapa tempat, kita mungkin bisa memperhatikan ekspresi seperti ini:

```html
<ion-navbar color="primary">
```

Jika bertanya dari mana datangnya warna biru, jawabannya adalah *map colors* berada di dalam **src/theme/variables.scss**.

Ubah color map menjadi seperti ini:

```css
$colors: (
  primary:    #1c1e22,
  secondary:  #FFE300,
  danger:     #f53d3d,
  light:      #c8c8c8,
  dark:       #272b30
);
```

Perubahan ini akan membuat sedikit perubahan pada tampilan aplikasi kita.

Yang bisa kita lakukan adalah [meng-override lebih banyak variabel ionic](http://ionicframework.com/docs/theming/overriding-ionic-variables/). Ada banyak variabel (sebenarnya hampir semuanya) yang bisa kita atur secara langsung agar aplikasi kita terlihat seperti yang kita inginkan.

Tentu saja kita tidak dapat mengetahui nama semua variabel ini, namun dokumentasi memiliki kolom penelusuran sehingga cobalah mencari elemen yang ingin kita ubah style nya dan cobalah.

Dalam kasus ini, kita tambahkan statement override berikut di bawah color map:

```css
$tabs-tab-color-active: color($colors, secondary);
$tabs-background: color($colors, primary);
$background-color: color($colors, dark);
$list-border-color: color($colors, light);
$text-color: #fff;
$card-md-header-color: #fff;
$card-ios-header-color: #fff;
```

Kita telah menambahkan 2 hal yaitu:

- `color()`: Fungsi ini memungkinkan kita untuk mengakses map $color dari mana saja.
- `-md` atau `-ios`: Styling ini spesifik pada platform dan tidak general.

Setting platform adalah:

- iOS: "ios" ketika di lihat pada iPhone, iPad, atau iPod.
- Android: "md" merupakan Material Design.
- Windows: "wp" windows phone styling.
- Core: "md" jika platform kita berbeda dari tiga di atas, md akan di gunakan sebagai fallback.

Aplikasi kita menjadi seperti ini:

![black app](https://i0.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-styled.png?w=468&ssl=1)

## 3. Custom CSS

Sekarang kita akan fokus hanya pada spesifik page. Tentu kita tidak akan membuat global styling, karena pada beberapa kondisi kita dapat merusak semuannya.

Buka file **src/pages/film-details/film-details.html** dan ubah kodenya menjadi seperti ini:

```html
<ion-header>
  <ion-navbar color="primary">
    <ion-title>{{ film.title }}</ion-title>
    <ion-buttons end>
      <button ion-button icon-only color="secondary" (click)="unfavoriteFilm()" *ngIf="isFavorite"><ion-icon name="star"></ion-icon></button>
      <button ion-button icon-only color="secondary" (click)="favoriteFilm()" *ngIf="!isFavorite"><ion-icon name="star-outline"></ion-icon></button>
    </ion-buttons>
  </ion-navbar>
</ion-header>
 
<ion-content padding>
  <ion-card class="movie-card">
    <ion-card-header>Episode {{ film.episode_id }}: {{ film.title }}</ion-card-header>
    <ion-card-content>
      {{ film.opening_crawl }}
    </ion-card-content>
 
    <ion-item class="movie-info">
      <ion-icon name="film" item-left></ion-icon>
      Director: {{ film.director }}
    </ion-item>
 
    <ion-item class="movie-info">
      <ion-icon name="calendar" item-left></ion-icon>
      Release Date: {{ film.release_date | date }}
    </ion-item>
  </ion-card>
 
  <button ion-button full color="secondary" (click)="shareFilm()">Share by Email</button>
</ion-content>
```

Kita akan mendefinisikan class pada file Sass di dalam **src/pages/film-details/film-details.scss** dengan kode berikut:

```css
page-film-details {
    .movie-card {
        background: #545454;
        border: 1px solid color($colors, secondary);
    }
    .movie-info {
        background: #4a4a4a;
    }
}
```

Aplikasi kita sekarang menjadi seperti ini:

![styling scss](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-finished.gif?resize=367%2C652&ssl=1)

## 4. Langkah selanjutnya

Pada tutorial selanjutnya kita akan belajar **debugging**.
