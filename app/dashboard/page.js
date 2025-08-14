// app/dashboard/page.js
'use client';
// Tidak perlu lagi memeriksa sesi di sini karena layout sudah melindunginya

export default function DashboardHomePage() {
  return (
    <div>
      <h1>Selamat Datang di Dashboard</h1>
      <p>Pilih menu di samping kiri untuk mulai mengelola konten.</p>
    </div>
  );
}