# Design System — Smart Maintenance Router
**FMIPA UHO · Helpdesk Fasilitas Berbasis Komunitas**
Versi 1.0 | Tailwind CSS + React

---

## 1. Design Philosophy

### Konsep Utama: *"Deep Water Clarity"*

Smart Maintenance Router membawa nuansa **transparansi institusional** — seperti air jernih yang memperlihatkan apa yang ada di bawahnya. Palet biru laut yang dalam hingga biru es mencerminkan tiga nilai inti sistem ini:

| Nilai | Makna Visual |
|---|---|
| **Transparansi** | Laporan terbuka ke publik, tidak ada yang disembunyikan |
| **Kepercayaan** | Biru institusional yang tegas & kredibel |
| **Kemudahan** | Gradasi terang ke permukaan yang lembut & ramah pengguna |

Arah estetika: **Civic-Tech Minimal** — profesional, bersih, tidak terasa seperti aplikasi korporat generik. Terasa seperti produk yang memang dibuat untuk warga kampus, bukan sekadar sistem ticketing biasa.

---

## 2. Color Palette

Seluruh warna bersumber dari palet utama `Oceanic Blue Scale`.

### 2.1 Skala Warna Utama

```css
:root {
  --color-navy:     #03045E; /* Deep Navy    */
  --color-ocean:    #0077B6; /* Ocean Blue   */
  --color-cyan:     #00B4D8; /* Cyan Bright  */
  --color-sky:      #90E0EF; /* Sky Blue     */
  --color-ice:      #CAF0F8; /* Ice / Frost  */
}
```

### 2.2 Peran Tiap Warna dalam UI

| Token | Hex | Peran Utama |
|---|---|---|
| `--color-navy` | `#03045E` | Primary action, Navbar background, heading berat, badge AI |
| `--color-ocean` | `#0077B6` | Primary button, link aktif, icon interaktif, status "Diproses" |
| `--color-cyan` | `#00B4D8` | Hover state, highlight, tag kategori IT/MEP, progress bar |
| `--color-sky` | `#90E0EF` | Border, divider, input focus ring, surface secondary |
| `--color-ice` | `#CAF0F8` | Background halaman, card surface, input background |

### 2.3 Warna Semantik (Status & Urgensi)

Warna semantik tetap berakar pada palet utama + satu-dua aksen netral agar tidak keluar dari sistem.

```css
:root {
  /* Urgensi */
  --urgency-high:    #03045E; /* Navy gelap — kritis, serius      */
  --urgency-medium:  #0077B6; /* Ocean — perlu perhatian          */
  --urgency-low:     #90E0EF; /* Sky — tidak mendesak             */

  /* Status Tiket */
  --status-new:      #00B4D8; /* Cyan — laporan baru masuk        */
  --status-process:  #0077B6; /* Ocean — sedang diproses          */
  --status-done:     #03045E; /* Navy — selesai                   */

  /* Netral Sistem */
  --color-white:     #FFFFFF;
  --color-surface:   #CAF0F8; /* Ice — background utama           */
  --color-border:    #90E0EF; /* Sky — border & divider           */
  --color-text-main: #03045E; /* Navy — teks utama                */
  --color-text-muted:#0077B6; /* Ocean — teks sekunder/label      */
}
```

### 2.4 Gradient Resmi

```css
/* Background halaman utama & hero section */
--gradient-hero: linear-gradient(160deg, #CAF0F8 0%, #90E0EF 40%, #00B4D8 100%);

/* Navbar & sidebar admin */
--gradient-nav: linear-gradient(135deg, #03045E 0%, #0077B6 100%);

/* Card hover & AI badge */
--gradient-ai-badge: linear-gradient(90deg, #0077B6 0%, #00B4D8 100%);

/* Shimmer loading skeleton */
--gradient-skeleton: linear-gradient(90deg, #CAF0F8 25%, #90E0EF 50%, #CAF0F8 75%);
```

---

## 3. Typography

### 3.1 Font Pairing

| Peran | Font | Import |
|---|---|---|
| **Display / Heading** | `Sora` | Google Fonts |
| **Body / UI** | `DM Sans` | Google Fonts |
| **Monospace / AI Label** | `JetBrains Mono` | Google Fonts |

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Alasan pemilihan:**
- **Sora** — geometric sans dengan karakter kuat, cocok untuk heading publik yang perlu terasa modern-institusional
- **DM Sans** — lebih hangat dari Inter, lebih bersahabat untuk body teks laporan komunitas
- **JetBrains Mono** — untuk label AI (`Kategori: IT`, `Urgensi: Tinggi`), menciptakan kontras "mesin vs manusia"

### 3.2 Type Scale (Tailwind CSS)

```css
/* Tailwind custom fontSize di tailwind.config.js */
fontSize: {
  'display':  ['2.25rem', { lineHeight: '1.2', fontWeight: '800' }],  /* 36px */
  'heading':  ['1.5rem',  { lineHeight: '1.3', fontWeight: '700' }],  /* 24px */
  'subhead':  ['1.125rem',{ lineHeight: '1.4', fontWeight: '600' }],  /* 18px */
  'body':     ['0.9375rem',{ lineHeight: '1.6', fontWeight: '400' }], /* 15px */
  'caption':  ['0.8125rem',{ lineHeight: '1.5', fontWeight: '500' }], /* 13px */
  'mono-sm':  ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],  /* 12px */
}
```

### 3.3 Hierarki Teks dalam Konteks App

```
Page Title      → Sora 800, 36px, #03045E
Section Heading → Sora 700, 24px, #03045E
Card Title      → Sora 600, 18px, #03045E
Body / Deskripsi → DM Sans 400, 15px, #03045E
Label / Meta     → DM Sans 500, 13px, #0077B6
AI Tag / Badge   → JetBrains Mono 500, 12px, #FFFFFF on #0077B6
Timestamp        → DM Sans 400, 13px, #90E0EF
```

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Berbasis `4px` grid. Tailwind default sudah cocok, tidak perlu override.

| Token Tailwind | Nilai | Penggunaan |
|---|---|---|
| `space-1` | 4px | Micro gap (icon-to-text) |
| `space-2` | 8px | Padding dalam badge/chip |
| `space-3` | 12px | Gap antar elemen inline |
| `space-4` | 16px | Padding card, gap antar item list |
| `space-6` | 24px | Margin section dalam card |
| `space-8` | 32px | Gap antar card di feed |
| `space-12` | 48px | Margin antar section halaman |
| `space-16` | 64px | Padding hero / header area |

### 4.2 Layout Grid

**Halaman Publik (Feed):**
```
Max-width: 680px (centered, single-column seperti Twitter/Threads)
Padding horizontal: 16px (mobile), 24px (tablet+)
```

**Dashboard Admin:**
```
Layout: Sidebar (240px fixed) + Main Content area
Main max-width: 1200px
Sidebar background: --gradient-nav (#03045E → #0077B6)
Content background: #CAF0F8
```

### 4.3 Border Radius

```css
borderRadius: {
  'sm':   '6px',   /* input, small badge */
  'md':   '10px',  /* button */
  'lg':   '16px',  /* card laporan */
  'xl':   '20px',  /* modal, panel */
  'pill': '9999px' /* tag kategori, status chip */
}
```

---

## 5. Component Design Spec

### 5.1 Report Card (Kartu Laporan di Feed)

```
┌─────────────────────────────────────────────────┐
│  [Avatar]  Nama Pelapor           12 mnt lalu    │
│            Mahasiswa · FMIPA                     │
├─────────────────────────────────────────────────┤
│  [Foto Bukti 16:9, border-radius: 12px]         │
├─────────────────────────────────────────────────┤
│  Deskripsi kerusakan... (maks 3 baris, clamp)   │
├─────────────────────────────────────────────────┤
│  [🖥 IT & Jaringan]  [● Urgensi Sedang]         │
├─────────────────────────────────────────────────┤
│  [▲ 45]  [💬 12]  [···]          [Status Chip] │
└─────────────────────────────────────────────────┘
```

**Styling:**
- Background: `#FFFFFF`
- Border: `1px solid #90E0EF`
- Border-radius: `16px`
- Shadow: `0 2px 12px rgba(0, 119, 182, 0.08)`
- Hover shadow: `0 6px 24px rgba(0, 119, 182, 0.16)`, border → `#00B4D8`
- Hover transition: `all 200ms ease`

### 5.2 Button System

**Primary Button** — Aksi utama (Submit Laporan, Simpan Perubahan)
```css
background: #0077B6;
color: #FFFFFF;
font: DM Sans 600, 15px;
padding: 10px 24px;
border-radius: 10px;
hover: { background: #03045E; transform: translateY(-1px); }
active: { transform: translateY(0); }
```

**Secondary Button** — Aksi sekunder (Batal, Lihat Detail)
```css
background: transparent;
border: 1.5px solid #0077B6;
color: #0077B6;
hover: { background: #CAF0F8; }
```

**Upvote Button** — State aktif vs non-aktif
```css
/* Default */
background: #CAF0F8;
color: #0077B6;
border: 1.5px solid #90E0EF;

/* Active / Voted */
background: #0077B6;
color: #FFFFFF;
border: 1.5px solid #0077B6;
transition: all 150ms ease;
```

**Danger Button** — Tutup laporan (Admin only)
```css
background: #03045E;
color: #FFFFFF;
hover: { background: #00B4D8; }
```

### 5.3 Badge & Tag

**Kategori AI Badge:**
```css
background: linear-gradient(90deg, #0077B6, #00B4D8);
color: #FFFFFF;
font: JetBrains Mono 500, 12px;
padding: 4px 10px;
border-radius: 9999px;
```

Contoh output:
- `🖥 IT & Jaringan` → gradient biru
- `⚡ Kelistrikan & MEP` → gradient biru
- `🏗 Infrastruktur` → gradient biru
- `🪑 Perabotan` → gradient biru

*(Semua kategori pakai warna sistem yang sama, dibedakan oleh icon)*

**Urgensi Badge:**
```
Tinggi  → bg: #03045E, text: #CAF0F8, border: none
Sedang  → bg: transparent, text: #0077B6, border: 1.5px solid #0077B6
Rendah  → bg: #CAF0F8, text: #90E0EF, border: 1px solid #90E0EF
```

**Status Chip:**
```
Baru      → bg: #CAF0F8,  text: #00B4D8, dot: #00B4D8
Diproses  → bg: #0077B6,  text: #FFFFFF, dot: #CAF0F8 (pulse animation)
Selesai   → bg: #03045E,  text: #FFFFFF, dot: #90E0EF
```

### 5.4 AI Suggestion Panel (Admin Only)

Panel tersembunyi yang tampil hanya di view Admin saat membuka detail laporan.

```
┌─────────────────────────────────────────────────┐
│  ┊  SARAN AI  ·  IndoBERT v2                    │
│  ┊                                               │
│  ┊  Kategori   : IT & Jaringan     [98.35%]     │
│  ┊  Urgensi    : Sedang            [69.02%]     │
│  ┊                                               │
│  ┊  "Confidence rendah pada urgensi.             │
│  ┊   Validasi manual disarankan."                │
└─────────────────────────────────────────────────┘
```

**Styling:**
```css
background: rgba(3, 4, 94, 0.04);
border-left: 3px solid #00B4D8;
border-radius: 0 10px 10px 0;
font-family: JetBrains Mono;
font-size: 12px;
color: #0077B6;
padding: 12px 16px;
```

### 5.5 Input & Form

**Text Area (Laporan Baru):**
```css
background: #FFFFFF;
border: 1.5px solid #90E0EF;
border-radius: 10px;
font: DM Sans 400, 15px, #03045E;
padding: 14px 16px;

focus: {
  border-color: #00B4D8;
  box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.15);
  outline: none;
}

placeholder: { color: #90E0EF; }
```

**Upload Foto (Mandatory):**
```css
/* Dashed drop zone */
border: 2px dashed #90E0EF;
border-radius: 16px;
background: #CAF0F8;
color: #0077B6;

hover: {
  border-color: #00B4D8;
  background: rgba(0, 180, 216, 0.06);
}

/* Saat ada foto */
border-style: solid;
border-color: #0077B6;
```

---

## 6. Navigation & Layout Shells

### 6.1 Navbar Publik

```
┌─────────────────────────────────────────────────────────┐
│  [Logo SMR]  Smart Maintenance Router      [Avatar ▼]   │
│  bg: linear-gradient(135deg, #03045E → #0077B6)        │
│  height: 60px; shadow: 0 2px 16px rgba(3,4,94,0.3)    │
└─────────────────────────────────────────────────────────┘
```

Tab navigasi (Feed page):
```
[Terbaru]  [Trending]  [Laporan Saya]
active tab: border-bottom 2px solid #CAF0F8; color: #FFFFFF
inactive: color: rgba(202, 240, 248, 0.6)
```

### 6.2 Sidebar Admin

```
Width: 240px (fixed)
Background: linear-gradient(180deg, #03045E 0%, #0077B6 100%)
Text: #CAF0F8

Menu items:
  active:   bg rgba(202,240,248,0.15), border-left 3px solid #00B4D8
  hover:    bg rgba(202,240,248,0.08)

Divisi filter (badge count):
  [IT]           [12] ← badge bg: #00B4D8, text: #03045E
  [Kelistrikan]  [4]
  [Infrastruktur][7]
  [Perabotan]    [3]
```

---

## 7. Motion & Animation

### 7.1 Prinsip Animasi

- **Purposeful** — animasi hanya jika memberikan konteks (loading, state change, feedback)
- **Cepat** — durasi max 300ms untuk transisi UI, 500ms untuk entrance
- **Subtil** — tidak mengganggu alur baca laporan

### 7.2 Token Durasi

```css
--duration-fast:   150ms; /* hover button, toggle */
--duration-base:   200ms; /* card hover, input focus */
--duration-enter:  300ms; /* modal open, panel slide */
--duration-load:   500ms; /* page entrance stagger */
--easing-default:  cubic-bezier(0.4, 0, 0.2, 1);
--easing-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 7.3 Animasi Kunci

**Feed Card Entrance (stagger):**
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card { animation: slideUp 300ms var(--easing-default) both; }
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 60ms; }
.card:nth-child(3) { animation-delay: 120ms; }
```

**Upvote Button Click (pop):**
```css
@keyframes votePopActive {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.25); }
  100% { transform: scale(1); }
}
.btn-upvote.voted { animation: votePopActive 250ms var(--easing-spring); }
```

**Status "Diproses" — Pulse dot:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.4); }
}
.dot-process { animation: pulse 1.5s ease-in-out infinite; }
```

**AI Badge Skeleton Loading:**
```css
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
.skeleton {
  background: linear-gradient(90deg, #CAF0F8 25%, #90E0EF 50%, #CAF0F8 75%);
  background-size: 200% auto;
  animation: shimmer 1.4s linear infinite;
}
```

---

## 8. Iconography

Gunakan library **Lucide React** (konsisten dengan Tailwind + React stack).

| Konteks | Icon Lucide | Warna |
|---|---|---|
| Upvote | `<ChevronUp />` | `#0077B6` (default), `#FFFFFF` (voted) |
| Komentar | `<MessageCircle />` | `#0077B6` |
| Upload Foto | `<ImagePlus />` | `#0077B6` |
| IT & Jaringan | `<Monitor />` | sesuai badge |
| Kelistrikan | `<Zap />` | sesuai badge |
| Infrastruktur | `<Building2 />` | sesuai badge |
| Perabotan | `<Armchair />` | sesuai badge |
| Status Baru | `<CircleDot />` | `#00B4D8` |
| Status Diproses | `<RefreshCw />` | `#0077B6` |
| Status Selesai | `<CheckCircle2 />` | `#03045E` |
| AI / Robot | `<Bot />` | `#0077B6` |
| Admin / Override | `<ShieldCheck />` | `#03045E` |

---

## 9. Responsive Breakpoints

```css
/* Tailwind breakpoints yang digunakan */
sm:   640px  /* Mobile landscape, single column feed */
md:   768px  /* Tablet, mulai tampil sidebar admin */
lg:   1024px /* Desktop, full admin dashboard layout */
xl:   1280px /* Wide desktop */
```

**Perilaku per breakpoint:**

| Elemen | Mobile (<640px) | Tablet (768px+) | Desktop (1024px+) |
|---|---|---|---|
| Feed | Full width, 1 kolom | Max 600px center | Max 680px center |
| Navbar | Logo + Avatar saja | Full | Full |
| Admin sidebar | Bottom sheet / drawer | 200px collapsed | 240px expanded |
| Report card foto | Aspect ratio 4:3 | 16:9 | 16:9 |
| AI Panel | Collapsible accordion | Collapsible | Selalu visible |

---

## 10. Tailwind Config Reference

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy:  '#03045E',
        ocean: '#0077B6',
        cyan:  '#00B4D8',
        sky:   '#90E0EF',
        ice:   '#CAF0F8',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'pill': '9999px',
      },
      boxShadow: {
        'card':       '0 2px 12px rgba(0, 119, 182, 0.08)',
        'card-hover': '0 6px 24px rgba(0, 119, 182, 0.16)',
        'nav':        '0 2px 16px rgba(3, 4, 94, 0.30)',
        'ai-panel':   'inset 3px 0 0 #00B4D8',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(160deg, #CAF0F8 0%, #90E0EF 40%, #00B4D8 100%)',
        'gradient-nav':  'linear-gradient(135deg, #03045E 0%, #0077B6 100%)',
        'gradient-ai':   'linear-gradient(90deg, #0077B6 0%, #00B4D8 100%)',
      },
    },
  },
}
```

---

## 11. Do's & Don'ts

### ✅ DO

- Gunakan `#03045E` (Navy) untuk semua teks penting dan elemen yang butuh otoritas visual
- Gunakan `#CAF0F8` (Ice) sebagai background area konten utama — tidak boleh putih polos
- Tampilkan AI badge **selalu** dengan `JetBrains Mono` agar terasa "mesin"
- Beri **border kiri `#00B4D8`** pada semua panel informasi AI
- Pastikan upvote button punya state visual yang jelas (voted vs unvoted)
- Gunakan `Sora` untuk semua heading, `DM Sans` untuk body teks laporan

### ❌ DON'T

- Jangan gunakan warna merah/hijau semaphore di luar konteks semantik yang sudah didefinisikan
- Jangan gunakan `#FFFFFF` sebagai background halaman utama — pakai `#CAF0F8`
- Jangan tampilkan AI Urgency panel ke aktor Pelapor, hanya untuk Admin
- Jangan gunakan font selain yang didefinisikan (hindari `Inter`, `Roboto`, `Arial`)
- Jangan buat animasi > 500ms di komponen yang muncul berulang (card, badge)
- Jangan gunakan warna di luar palet untuk kategori/status baru tanpa updating token

---

*Design System ini adalah dokumen hidup. Setiap penambahan komponen baru wajib mengacu pada token warna, spacing, dan tipografi yang telah didefinisikan di atas.*
