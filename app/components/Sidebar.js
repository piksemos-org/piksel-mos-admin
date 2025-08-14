'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FiHome, FiFileText, FiBox, FiUsers, FiSettings, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [userCount, setUserCount] = useState(0);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Manajemen Postingan', path: '/dashboard/posts', icon: <FiFileText /> },
    { name: 'Manajemen Material', path: '/dashboard/materials', icon: <FiBox /> },
    { name: 'Manajemen Pengguna', path: '/dashboard/users', icon: <FiUsers /> },
    { name: 'Pengaturan', path: '/dashboard/settings', icon: <FiSettings /> },
  ];

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
      backgroundColor: '#1f2937', // Warna gelap yang lebih modern
      color: 'white',
      transition: 'width 0.3s ease-in-out',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '15px',
      position: 'fixed', // Agar tetap di tempat saat konten di-scroll
      top: 0,
      left: 0,
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
      color: '#d1d5db',
      transition: 'background-color 0.2s, color 0.2s',
    },
    menuText: {
        marginLeft: '15px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.2s',
    },
    statsContainer: {
        marginTop: 'auto',
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
        <ul style={{ padding: 0 }}>
          {menuItems.map((item) => (
            <li key={item.name} style={{ listStyle: 'none' }}>
              <Link href={item.path} style={styles.menuLink} className="sidebar-link">
                <span style={{ fontSize: '22px' }}>{item.icon}</span>
                <span style={styles.menuText}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
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
