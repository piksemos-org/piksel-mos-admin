import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  const styles = {
    layout: {
      display: 'flex',
      flexDirection: 'row',
    },
    // Memberi ruang kosong di kiri seukuran sidebar
    contentContainer: {
      paddingLeft: '250px', // Sesuaikan dengan lebar sidebar saat terbuka
      width: '100%',
      transition: 'padding-left 0.3s ease-in-out',
    },
    mainContent: {
      padding: '20px',
    },
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.contentContainer} id="content-container">
         <main style={styles.mainContent}>
            {children}
         </main>
      </div>
    </div>
  );
}
