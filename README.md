# RT Digital — Vercel + Firebase

Starter aplikasi administrasi RT berbasis Next.js, Vercel dan Firebase.

## Fitur yang sudah tersedia
- Login Firebase Authentication
- Dashboard
- CRUD data warga
- CRUD inventaris
- Pencatatan peminjaman inventaris
- Persetujuan peminjaman
- Halaman awal Kas, Surat, Kegiatan, Pengumuman

## 1. Instalasi

```bash
npm install
npm run dev
```

## 2. Firebase

Buat project di Firebase lalu aktifkan:
- Authentication > Sign-in method > Email/Password
- Firestore Database
- Storage

Salin konfigurasi Web App Firebase ke `.env.local` berdasarkan `.env.example`.

## 3. Firestore

Deploy rules:

```bash
firebase deploy --only firestore:rules,storage
```

Jika Firebase CLI belum dipakai, Anda bisa menyalin isi `firestore.rules` dan `storage.rules` ke Firebase Console.

## 4. Vercel

Push project ke GitHub, import repository ke Vercel, lalu masukkan semua variabel `NEXT_PUBLIC_FIREBASE_*` pada Environment Variables.

## Catatan keamanan

Rules starter sengaja sederhana agar MVP dapat langsung diuji. Sebelum produksi, ubah rules menjadi berbasis role (admin/pengurus/bendahara/warga), validasi kepemilikan data, dan batasi operasi sensitif.
