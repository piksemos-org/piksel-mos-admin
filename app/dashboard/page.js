// app/dashboard/page.js
'use client';

// Impor komponen widget yang baru saja kita buat
import UserStatsWidget from './components/UserStatsWidget';

export default function DashboardHomePage() {
  const styles = {
    widgetContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px', // Memberi jarak antar widget
      marginTop: '30px',
    },
  };
  
  return (
    <div>
      <h1>Selamat Datang di Dashboard</h1>
      <p>Pilih menu di samping kiri untuk mulai mengelola konten.</p>

      {/* "Papan" tempat Anda menempelkan semua widget */}
      <div style={styles.widgetContainer}>
        
        {/* Menampilkan widget statistik pengguna */}
        <UserStatsWidget />

        {/* CONTOH: Jika nanti Anda punya widget lain (misal: PostStatsWidget), 
          Anda tinggal menambahkannya di sini:
          
          <PostStatsWidget /> 
        */}
        
      </div>
    </div>
  );
}