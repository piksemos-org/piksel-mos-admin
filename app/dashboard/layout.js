// app/dashboard/layout.js
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  const styles = {
    layout: {
      display: 'flex',
      flexDirection: 'row',
    },
    mainContent: {
      flexGrow: 1, // Mengisi sisa ruang
      padding: '20px',
      height: '100vh',
      overflowY: 'auto', // Membuat konten bisa di-scroll
    },
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <main style={styles.mainContent}>
        {children} {/* Di sinilah konten halaman akan ditampilkan */}
      </main>
    </div>
  );
}