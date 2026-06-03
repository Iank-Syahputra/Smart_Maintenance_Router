# Panduan Instalasi Smart Maintenance Router

Dokumen ini berisi panduan langkah demi langkah untuk menjalankan proyek **Smart Maintenance Router** di komputer lokal setelah Anda melakukan *git clone*. 

Karena proyek ini menggunakan arsitektur **Microservices**, Anda perlu menyiapkan dan menjalankan 3 komponen secara terpisah: **Backend (Node.js)**, **AI Service (Python)**, dan **Frontend (React)**.

---

## Persyaratan Sistem (Prerequisites)

Sebelum memulai, pastikan komputer Anda telah terinstal perangkat lunak berikut:
1. **Node.js** (Versi 18 atau lebih baru)
2. **Python** (Versi 3.9 hingga 3.11)
3. **XAMPP / Laragon** (Untuk menjalankan MySQL Server)
4. **Git**

---

## Langkah 1: Persiapan Database (MySQL)

1. Buka **XAMPP** atau **Laragon** dan jalankan modul **MySQL**.
2. Buka browser dan akses **phpMyAdmin** (biasanya di `http://localhost/phpmyadmin`).
3. Buat database baru dengan nama: `smart_maintenance`.
   *(Tidak perlu membuat tabel secara manual, Prisma akan melakukannya untuk Anda).*

---

## Langkah 2: Setup Backend (Node.js & Prisma)

Backend bertugas mengelola data, keamanan, dan menyimpan gambar.

1. Buka terminal baru dan masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Instal semua *dependencies* (paket) yang dibutuhkan:
   ```bash
   npm install
   ```
3. Buat file *Environment Variables*:
   - Gandakan (copy) file `.env.example` dan ubah namanya menjadi `.env`.
   - Buka file `.env` tersebut dan pastikan konfigurasinya mengarah ke MySQL Anda:
     ```env
     DATABASE_URL="mysql://root:@localhost:3306/smart_maintenance"
     JWT_SECRET="ganti_dengan_rahasia_anda_yang_panjang"
     AI_SERVICE_URL="http://localhost:8000"
     PORT=5000
     ```
4. Jalankan Migrasi Database (Ini akan membuat tabel-tabel di phpMyAdmin):
   ```bash
   npx prisma db push
   ```
5. *(Opsional tapi disarankan)* Masukkan data awal (seperti akun Admin):
   ```bash
   npm run seed
   ```
6. Jalankan Server Backend:
   ```bash
   npm run dev
   ```
   *(Biarkan terminal ini tetap menyala. Backend berjalan di `http://localhost:5000`)*

---

## Langkah 3: Setup AI Service (Python & FastAPI)

AI Service bertugas memuat model AI (IndoBERT) untuk memprediksi kategori dan urgensi dari teks keluhan.

1. Buka **terminal baru** (jangan tutup terminal backend), lalu masuk ke folder AI:
   ```bash
   cd ai_service
   ```
2. *(Sangat Disarankan)* Buat *Virtual Environment* Python agar *library* tidak bentrok:
   ```bash
   python -m venv env
   ```
3. Aktifkan Virtual Environment:
   - **Windows:** `env\Scripts\activate`
   - **Mac/Linux:** `source env/bin/activate`
4. Instal semua *library* Machine Learning (PyTorch, Transformers, dll):
   ```bash
   pip install -r requirements.txt
   ```
5. **Penting: Pastikan Model AI Tersedia.**
   Karena file model sangat besar (ratusan MB), file `.safetensors` atau `.bin` biasanya tidak ikut ter-push ke GitHub (`.gitignore`).
   - Pastikan folder `models/` di *root* direktori proyek Anda sudah berisi model yang telah dilatih.
   - jalanakan `train_klasifikasi_laporan.ipynb` untuk merender hasil latihan dan merendernya ke folder `models/` jika laptop anda tidak memungkinkan silahkan jalankan di colab dengan accelarator GPU T4
6. Jalankan Server AI:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   *(Biarkan terminal ini tetap menyala. Tunggu hingga muncul tulisan "Application startup complete". AI berjalan di `http://localhost:8000`)*

---

## Langkah 4: Setup Frontend (React & Vite)

Frontend adalah antarmuka web (UI) yang akan dilihat oleh pengguna.

1. Buka **terminal baru** lagi (sekarang Anda memiliki 3 terminal yang menyala), lalu masuk ke folder frontend:
   ```bash
   cd frontend
   ```
2. Instal semua *dependencies*:
   ```bash
   npm install
   ```
3. Jalankan Aplikasi Web:
   ```bash
   npm run dev
   ```
   *(Terminal akan memunculkan URL lokal, biasanya `http://localhost:5173`)*

---

## Selesai! 🎉

Sekarang Anda bisa membuka browser dan mengunjungi `http://localhost:5173`. 
- Sistem sudah siap digunakan.
- Coba buat akun baru atau login menggunakan akun yang dibuat dari proses `seed` di Langkah 2.
- Saat membuat laporan, Backend (Port 5000) akan otomatis menghubungi AI Service (Port 8000) untuk memberikan label otomatis pada laporan Anda.

### Troubleshooting Singkat
* **Laporan gagal dibuat / Error "fetch failed":** Berarti AI Service (Python) Anda mati atau belum siap. Cek kembali Terminal 3.
* **Tidak bisa login / Error Database:** Berarti MySQL Anda mati atau URL di `backend/.env` salah. Cek Terminal 2 dan XAMPP Anda.
