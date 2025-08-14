// app/components/Sidebar.js
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  // Daftar menu Anda. Bisa ditambahkan nanti.
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Manajemen Postingan', path: '/dashboard/posts', icon: '📰' },
    { name: 'Manajemen Pengguna', path: '/dashboard/users', icon: '👥' },
    { name: 'Pengaturan', path: '/dashboard/settings', icon: '⚙️' },
  ];

  const styles = {
    sidebar: {
      width: isOpen ? '250px' : '60px',
      backgroundColor: '#1a202c', // Warna gelap untuk sidebar
      color: 'white',
      padding: '15px',
      transition: 'width 0.3s',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    toggleButton: {
      textAlign: isOpen ? 'right' : 'center',
      cursor: 'pointer',
      fontSize: '24px',
      marginBottom: '20px',
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '5px',
      textDecoration: 'none',
      color: 'white',
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '‹' : '›'}
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} style={{ listStyle: 'none' }}>
              <Link href={item.path} style={styles.menuItem}>
                <span style={{ marginRight: isOpen ? '10px' : '0' }}>{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}