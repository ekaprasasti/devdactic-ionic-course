# How to Debug Your Ionic App

Terkadang kita membutuhkan **debug** agar aplikasi berjalan sebagai mana mestinya. Ini adalah final tutorial pada Ionic Crash dari devdactic.com, lihat tutorial original [disini](https://ionicacademy.com/debug-ionic-app/).

## 1. Poor Mans Logging

Kita bisa menggunakan ini untuk menampilkan values atau informasi pada kode di console:

```javascript
console.log('my message');
```

Saya menyebutnya ini sebagai **poor mans logging**, karena hal ini merupakan yang paling basic untuk mencoba mencari bug.

Tools ini adalah teman baik ketika mengembangkan aplikasi Ionic. Cara yang lebih baik untuk mengontrol statement log dengan Angular bisa menggunakan package seperti [angular2-logger](https://www.npmjs.com/package/angular2-logger).

Dengan ini kita bisa menggunakan log level yang berbeda untuk menampilkan pesan kesalahan, sehingga kita bisa hanya mendapatkan pesan yang benar-benar kita butuhkan dengan waktu yang singkat.

## 2. Inspect source & element

Dengan developer tools dari browser kita dapa inspect element dari DOM, styling dan bahkan menjalankan sourcecode.

### Breakpoints

Breakpoints adalah salah satu cara untuk men-debug aplikasi, karena dengan selalu *printing out* value bisa menghemat waktu.

Jika developer tools terbuka, navigasi ke Source dan kita dapat membuka folder dari aplikasi kita dan menemukan kode dari page yang berbeda-beda, providers dan apapun yang kita punya dalam aplikasi.

Dari situ kita bisa mengatur breakpoint seperti pada gambar di bawah ini yang akan membuat aplikasi kita berhenti begitu kita menekannya.

![breakpoints debug](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-breakpoint.png?resize=1024%2C638&ssl=1)

Di dalam gambar kita bisa lihat code kita **stop pada breakpoint** sebelum kita push details page film.

Di sisi kanan kita sekarang melihat semua informasi, dan kita dapat dengan mudah memeriksa objek yang dilewatkan ke fungsi yang kemudian kita sampaikan ke parameter view transisi.

Jika aplikasi kita memberikan pesan kesalahan karena beberapa alasan, cobalah untuk set breakpoint sebelum masalah terjadi dan selesaikan setiap baris atau sampai breakpoint kode kita berikutnya untuk melihat di mana kesalahan berada. Knda akan menemukan bug Anda 10x lebih cepat dibandingkan dengan meletakkan console log di mana-mana.

### Element & Styling

Dengan ini kita bisa inspect DOM element dan merubah tampilannya, dari mengetahui datangnya class dan kode mana yang membuat perubahan.

Di dalam developer tools gunakan **box kecil dengan cursor** di pojok kanan atas untuk memulai mode dan pilih element dari view. Kita akan menemukan item yang tepat di dalam HTML yang di highlight.

![nspect html](https://i2.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-debug-inspect.png?resize=1024%2C640&ssl=1)

## 3. Inspecting database

Pada tutorial [#5 Store Data](https://github.com/ekaprasasti/devdactic-ionic-course/tree/master/Ionic%20Course%20%235%20Store%20Data) kita belajar menggunakan storage engine, tapi apakah kamu benar-benar yakin bahwa segalanya telah di simpan? Kita akan buktikan!

Jika kita navigasi developer tools ke **Application** pada sisi kiri dari menu drill down ke dalam IndexedDB kita bisa menemukan storage kita pada aplikasi.

![storage engine](https://i1.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-debug-storage.png?resize=1024%2C464&ssl=1)

## 4. Remote debugging

Jika aplikasi kita berjalan pada simulator atau pada device kita bisa menggunakan apa yang di sebut **Remote Debugging**. Sebagai aplikasi yang berjalan di dalam webview, kita bisa mengkoneksikan browser dari PC dengan device kita.

### iOS

Jika aplikasi berjalan pada iOS kita dengan mudah mengkoneksikannya lewat Safari. Jalankan aplikasi melalui simulator, buka Safari dan dari top menu pilih **Develop -> Simulator** dan pilih view yang active dari aplikasi.

![iOS debug](https://i2.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-debug-safari.png?resize=1024%2C624&ssl=1)

Sekarang kita bisa menggunakan **Safari developer tools** untuk melakukukan apa saja yang sudah kita lakukan sebelumnya di dalam Chrome.

### Android

Untuk Andorid, deploy aplikasi ke dalam device dan dari Chrome browser di dalam developer tools klik **three dots** -> More tools -> **Remote devices**.

![Android debug](https://i0.wp.com/ionicacademy.com/wp-content/uploads/2017/05/crash-course-debug-android.png?w=758&ssl=1)

Di dalam area tersebut kita bisa menemukan device yang terkoneksi, dan seperti halnya Safari kita bisa inspect webview pada remote device.

## 5. Recap

Selamat kita telah menyelesaikan Ionic Crash Course!

Sekarang kita telah mempelajari dasar dari:

1. Navigations
2. HTTP calls
3. Cordova Plugins
4. Data storage
5. Styling & Theming
6. Debugging
