# Aplikasi Koperasi Simpan Pinjam

Aplikasi manajemen koperasi simpan pinjam berbasis web yang dibangun dengan teknologi modern.

## 🚀 Teknologi

- ⚡ Vite + React + TypeScript
- 🎨 shadcn/ui (Radix UI + Tailwind)
- 🔄 React Router
- 📊 TanStack Table
- 🏗️ Zustand (State Management)
- 🔄 Axios (HTTP Client)

## 📁 Struktur Folder

/*
src/
 ├─ components/
 │   ├─ ui/            // shadcn
 │   ├─ layout/
 │   │   ├─ AppShell.tsx
 │   │   └─ Sidebar.tsx
 │   └─ tables/
 │       └─ AngsuranTable.tsx
 ├─ features/
 │   ├─ auth/
 │   ├─ pinjaman/
 │   │   ├─ PinjamanForm.tsx
 │   │   ├─ PinjamanList.tsx
 │   │   └─ simulasi.ts
 │   └─ anggota/
 ├─ pages/
 │   ├─ Dashboard.tsx
 │   ├─ Pinjaman.tsx
 │   └─ Angsuran.tsx
 ├─ lib/
 │   ├─ api.ts
 │   └─ utils.ts
 ├─ main.tsx
 └─ index.css
*/

## 🚀 Memulai

1. **Install Dependensi**
   ```bash
   npm install

2. **Start Development Server**
   ```bash
   npm run dev

## Fitur
🏦 Simulasi Pinjaman
Perhitungan bunga flat
Simulasi angsuran
Pilihan tenor fleksibel
👥 Manajemen Anggota
Pendaftaran anggota baru
Data profil lengkap
Riwayat transaksi
📊 Dashboard
Ringkasan keuangan
Grafik performa
Notifikasi jatuh tempo

## Fitur Mendatang
 Login & Role (Admin / Kasir)
 Master Anggota
 Approval Pinjaman
 Cetak Kwitansi
 Export PDF
 Backend API (Laravel / CI4)