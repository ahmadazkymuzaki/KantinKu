# KantinKu — Tugas 2 Front-End

Implementasi halaman **Menu** dari rancangan Tugas 1 KantinKu menggunakan HTML5, CSS3, dan JavaScript murni.

## Deskripsi
KantinKu merupakan antarmuka aplikasi pemesanan makanan kantin. Halaman Menu membantu pengguna mencari makanan, memilih kategori, melihat informasi produk, dan menambahkan produk ke keranjang.

## Struktur proyek
```text
kantinku-tugas2/
├── index.html   # Struktur halaman dan komponen HTML semantik
├── styles.css   # Desain, design token, dan responsive layout
├── script.js    # Data menu, filter, pencarian, dan keranjang\n├── assets/      # Ilustrasi menu lokal (tidak bergantung URL eksternal)
└── README.md    # Dokumentasi proyek
```

## Komponen yang diimplementasikan
1. Header dan navigasi utama.
2. Banner sambutan.
3. Kolom pencarian menu.
4. Filter kategori menu.
5. Kartu produk beserta harga, rating, dan estimasi persiapan.
6. Panel keranjang dengan pengubah kuantitas, subtotal, biaya layanan, dan total.
7. Notifikasi (toast) setelah produk ditambahkan.

## Fitur JavaScript
- Pencarian menu berdasarkan nama dan deskripsi.
- Filter kategori: Semua, Makanan, Minuman, dan Camilan.
- Reset pencarian dan kategori.
- Tambah produk ke keranjang.
- Tambah atau kurangi jumlah produk di keranjang.
- Perhitungan subtotal, biaya layanan, dan total otomatis.
- Buka/tutup panel keranjang dengan tombol, klik area luar, atau tombol Escape.
- Pesan notifikasi setelah aksi pengguna.

## Design system
- Emerald utama: `#15966A`
- Emerald gelap: `#107D58`
- Hijau gelap: `#172E26`
- Abu kehijauan: `#68776F`
- Hijau pucat: `#EAF6EF`
- Latar netral: `#F7F9F7`
- Font: Inter
- Spacing utama: 8, 16, 24, 32, dan 48 px
- Radius komponen: 12, 16, dan 24 px

## Cara menjalankan
1. Ekstrak folder proyek.
2. Buka `index.html` menggunakan browser (Chrome, Edge, atau Firefox).
3. Buka `index.html` menggunakan browser. Ilustrasi menu tersimpan lokal di folder `assets`, sehingga tetap tampil tanpa mengandalkan URL gambar eksternal. Google Fonts membutuhkan internet; jika offline, browser menggunakan font cadangan.

Tidak membutuhkan instalasi framework atau package tambahan.
