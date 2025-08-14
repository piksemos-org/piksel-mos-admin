'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
// Impor ikon dari library react-icons
import { FiHome, FiFileText, FiBox, FiUsers, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [userCount, setUserCount] = useState(0);

  // Daftar menu baru dengan ikon profesional
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Manajemen Postingan', path: '/dashboard/posts', icon: <FiFileText /> },
    { name: 'Manajemen Material', path: '/dashboard/materials', icon: <FiBox /> },
    { name: 'Manajemen Pengguna', path: '/dashboard/users', icon: <FiUsers /> },
    { name: 'Pengaturan', path: '/dashboard/settings', icon: <FiSettings /> },
  ];
  
  // Ambil data jumlah pengguna saat komponen dimuat
  useEffect(() => {
    async function fetchUserCount() {
      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      if (count !== null) {
        setUserCount(count);
      }
    }
    fetchUserCount();
  }, []);


  const styles = {
    sidebar: {
      width: isOpen ? '250px' : '80px',
      backgroundColor: '#1a202c',
      color: 'white',
      transition: 'width 0.3s',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
    },
    toggleButton: {
      textAlign: 'right',
      cursor: 'pointer',
      fontSize: '24px',
      marginBottom: '20px',
      color: '#a0aec0',
    },
    menuLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 15px',
      borderRadius: '8px',
      marginBottom: '8px',
      textDecoration: 'none',
      color: '#a0aec0', // Warna ikon dan teks menu
      transition: 'background-color 0.2s',
    },
    menuText: {
        marginLeft: '15px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.2s',
    },
    statsContainer: {
        marginTop: 'auto', // Mendorong statistik ke bawah
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    statsCount: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#069494', // Warna Teal
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <Link href={item.path} style={styles.menuLink}>
                <span style={{ fontSize: '22px' }}>{item.icon}</span>
                <span style={styles.menuText}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Widget Statistik Pengguna dipindahkan ke sini */}
      <div style={styles.statsContainer}>
          {isOpen ? (
              <>
                <div style={{ color: '#a0aec0', fontSize: '14px' }}>Pengguna Aktif</div>
                <div style={styles.statsCount}>{userCount}</div>
              </>
          ) : (
              <div style={styles.statsCount}>{userCount}</div>
          )}
      </div>
    </div>
  );
}
