# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Nama Proyek:** Smart Maintenance Router (Sistem Pelaporan Kerusakan Fasilitas Kampus Berbasis Komunitas & NLP)

**Ruang Lingkup (Scope):** Fakultas MIPA (FMIPA) Universitas Halu Oleo (UHO)

**Platform:** Web Application (Single Page Application)

**AI Engine:** IndoBERT (PyTorch) untuk NLP Klasifikasi Teks

**Penulis/Engineer:** \[Nama Anda / Iyang\]

**Versi Dokumen:** 1.0 (Final Architecture)

## 1\. Project Overview

**Smart Maintenance Router** adalah platform _Helpdesk_ publik bernuansa sosial media yang dirancang khusus untuk mengelola pelaporan kerusakan fasilitas di lingkungan FMIPA UHO. Alih-alih menggunakan sistem _ticketing_ tertutup (_one-to-one_) yang kaku dan rawan duplikasi, sistem ini membuka pelaporan menjadi sebuah _feed_ publik (_many-to-many_).

Sistem ini ditenagai oleh kecerdasan buatan (NLP - IndoBERT) yang memproses teks keluhan secara _real-time_ untuk secara otomatis menyortir laporan ke dalam divisi yang relevan, serta memberikan rekomendasi tingkat urgensi. Sistem ini bertindak sebagai asisten cerdas bagi Admin Kampus, mempercepat birokrasi, dan meningkatkan transparansi pemeliharaan fasilitas di mata warga fakultas.

## 2\. Requirements (Kebutuhan Sistem)

### A. Business & Operational Requirements

- **Reduksi Laporan Ganda (_Duplicate Tickets_):** Mengatasi penumpukan laporan untuk satu kerusakan yang sama. Jika proyektor rusak, mahasiswa tidak perlu membuat laporan baru, melainkan cukup memberikan _Upvote_ (dukungan) pada laporan yang sudah ada di _feed_.
- **Efisiensi Validasi Lokasi:** Mencegah teknisi kebingungan mencari lokasi kerusakan tanpa membuat _form_ UI yang rumit bagi pengguna.
- **Pendelegasian Otoritas (Human-in-the-Loop):** Merespons kelemahan AI pada klasifikasi urgensi yang subjektif (Akurasi 69%). Sistem tidak boleh mengambil keputusan final terkait prioritas perbaikan, melainkan menyerahkannya kepada Admin Kampus berdasarkan rekomendasi AI dan data _upvote_ komunitas.

### B. Technical Requirements

- **Bukti Autentik (Mandatory Evidence):** Sistem wajib menolak _submission_ laporan yang tidak menyertakan foto fisik kerusakan.
- **Microservices Architecture:** Memisahkan beban kerja antara _rendering_ UI (Frontend), manajemen data (Backend), dan inferensi model matriks (AI Engine) agar sistem tidak _crash_ atau melambat.
- **Latency:** Waktu respons API pemrosesan AI (dari menerima teks hingga mengembalikan JSON Kategori & Urgensi) harus < 2 detik.

## 3\. User Flow (Alur Pengguna)

Koordinasi dengan teknisi lapangan dipindahkan ke luar sistem (misal: via WhatsApp/HT) untuk menjaga sistem tetap ramping. Oleh karena itu, aktor disederhanakan menjadi dua peran utama.

### A. Aktor 1: Pelapor (Mahasiswa, Dosen, Staf FMIPA)

Aktor ini bertindak sebagai mata dan telinga komunitas FMIPA.

- **Autentikasi:** _Login_ ke dalam aplikasi web.
- **Eksplorasi:** Dialihkan ke halaman utama (_Public Feed_) untuk melihat daftar kerusakan yang sedang terjadi di FMIPA.
- **Interaksi Sosial:** Dapat memberikan komentar (untuk menambah konteks) atau menekan tombol _Upvote_ pada laporan warga lain.
- **Buat Laporan Baru:** \* Mengunggah **Foto Bukti** (Wajib).
  - Menulis keluhan di kolom teks yang sudah dilengkapi _placeholder_ panduan. (Contoh _Placeholder_: "Sebutkan ruangannya, misal: Di Lab Dasar Komputer FMIPA, kabel proyektor putus").
  - Klik _Submit_.
- **Monitoring:** Menerima _update_ visual secara _real-time_ ketika status laporannya diubah oleh Admin Kampus.

### B. Aktor 2: Admin Kampus (Command Center)

Aktor ini adalah pengambil keputusan absolut dan jembatan ke teknisi lapangan.

- **Monitoring Dashboard:** Membuka panel Admin. Laporan baru secara otomatis masuk ke dalam _tab_ atau filter divisi yang sesuai (Infrastruktur, Kelistrikan, IT, Perabotan) hasil penyortiran AI dengan akurasi 98.35%.
- **Review & Validasi:** \* Admin mengecek foto yang diunggah dan membaca deskripsi pelapor.
  - Admin melihat _draft_ tersembunyi berbunyi: "Saran AI: Urgensi Sedang".
  - Admin melihat data sosial: _"Laporan ini mendapat 45 Upvotes dalam 1 jam"_.
  - Admin juga bisa berkonstribusi, pada intraksi sosial untuk memberikan balasan pada laporan yang ada feed halaman interaksi sosial. jadi pada tiap laporan yang di buat, terdapat interaksi dari seluruh pihak.
- **Override & Eksekusi:** Berdasarkan bukti foto dan data sosial, Admin secara manual mengesahkan tingkat Urgensi (mengikuti saran AI atau mengubahnya menjadi 'Tinggi').
- **Distribusi External:** Admin membagikan detail laporan ke grup WhatsApp teknisi dan mengubah status laporan di sistem menjadi "Diproses".
- **Penyelesaian:** Setelah teknisi konfirmasi via WhatsApp, Admin mengubah status tiket menjadi "Selesai".

## 4\. Core Features (Fitur Utama)

- **Public Issue Timeline (Feed):** Beranda bergaya sosial media yang mengurutkan laporan berdasarkan waktu terbaru (_Latest_) atau popularitas dukungan (_Trending/Top Voted_).
- **AI Auto-Categorization (Akurasi 98.35%):** Model IndoBERT secara instan membaca teks keluhan pelapor dan melabelinya ke salah satu dari 4 kelas: _Teknologi Informasi & Jaringan (IT), Kelistrikan & Tata Udara (MEP), Infrastruktur & Sipil, atau Perabotan & Inventaris_.
- **AI Urgency Assistant (Akurasi 69.02%):** Model IndoBERT menganalisis sentimen kedaruratan dari teks dan memberikan saran awal prioritas (Tinggi/Sedang/Rendah) khusus untuk mata Admin.
- **Community Validation Tools:** Tombol _Upvote_ (satu _user_, satu _vote_ per laporan) dan kolom balasan/komentar _thread_.
- **Contextual Text Area:** UI input yang cerdas, memaksa pengguna menyertakan lokasi spesifik langsung di dalam deskripsi teks menggunakan pancingan _placeholder_, yang pada gilirannya akan memperkaya konteks kalimat untuk dibaca oleh model NLP.
- **Command Dashboard:** Panel interaktif khusus Admin dengan kemampuan _filtering_ tingkat lanjut, manipulasi status, dan _override_ parameter urgensi.

## 5\. Architecture (Arsitektur Sistem)

Sistem ini menggunakan pola **Decoupled Architecture (Microservices)** yang memecah _monolithic codebase_ menjadi tiga _node_ utama yang saling berkomunikasi via HTTP/REST API.

- **Node 1: Client Browser (Frontend SPA)**  
   Menangani seluruh antarmuka interaktif, _state management_ (seperti perubahan warna tombol _upvote_ instan), dan validasi form di sisi _client_.
- **Node 2: Core API (Backend)**  
   Bertindak sebagai "Polisi Lalu Lintas". Node ini menerima data dari Frontend, memvalidasi keamanan, menyimpan gambar, dan berkomunikasi dengan Database relasional.
- **Node 3: NLP Inference Engine (AI Microservice)**  
   Server Python terisolasi yang hanya memiliki satu tugas: memuat _file_ .safetensors berukuran besar ke dalam RAM, menerima teks keluhan (_string_) dari Node 2, melakukan tokenisasi, dan mengembalikan JSON hasil probabilitas IndoBERT.

## 6\. Database Schema (Skema Basis Data)

Dirancang menggunakan pola relasional (RDBMS) untuk mendukung integritas data fitur sosial media.

Tabel
Deskripsi
Kolom Utama (Fields)
Relasi

profiles
Data identitas pengguna (Pelapor/Admin)
id (PK), nama_lengkap, role (Enum), avatar_url, created_at
Induk dari reports, comments, upvotes

reports
Tabel sentral penyimpanan laporan & hasil AI
id (PK), author_id (FK), raw_text (Wajib), image_url (Wajib), ai_kategori, ai_urgensi, ai_confidence, admin_urgensi (Opsional), status (Enum), created_at
Dimiliki oleh 1 profile. Memiliki banyak comments & upvotes

comments
Diskusi/balasan pada sebuah laporan
id (PK), report_id (FK), author_id (FK), content, created_at
Menghubungkan reports & profiles

upvotes
Tabel penghubung (Junction) untuk sistem likes
id (PK), report_id (FK), user_id (FK), created_at
Unique Constraint pada kombinasi (report_id, user_id) untuk mencegah spam.                                    |

## 7\. Tech Stack (Teknologi Utama)

Kombinasi teknologi dipilih berdasarkan efisiensi _development_, performa _real-time_, dan standar industri untuk integrasi model PyTorch.

### A. Frontend (Antarmuka Pengguna)

- **Framework:** **React + Vite** (Membangun _Single Page Application_ yang super ringan, cepat, dan interaktif tanpa kerumitan _Server-Side Rendering_).
- **Styling:** **Tailwind CSS** (Pembuatan UI modern secara cepat dan responsif).

### B. Core Backend & Database (Sisi Server Utama)

- **Runtime & Framework:** **Node.js + Express** (Membuat REST API utama untuk aplikasi web).
- **ORM (Object-Relational Mapping):** **Prisma** (Sistem modern untuk menjembatani Node.js dengan database secara _Type-Safe_ tanpa menulis _query_ SQL panjang).
- **Database Engine:** **MySQL** lokal (via XAMPP / Laragon) untuk kemudahan _testing_ dan _debugging_ selama proses skripsi/penelitian.
- **Storage:** File sistem lokal (/public/uploads) untuk menyimpan file foto kerusakan.

### C. AI Microservice (Sisi Kecerdasan Buatan)

- **Framework:** **FastAPI (Python)**. Standar emas untuk _deployment Machine Learning_. Berjalan asinkronus, sangat cepat, dan memproduksi dokumentasi API otomatis.
- **Library ML:** torch, transformers, scikit-learn (untuk me-_load_ IndoBERT, Tokenizer, dan Pickle Label Encoder).





