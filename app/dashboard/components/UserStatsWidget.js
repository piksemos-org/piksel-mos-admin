// app/dashboard/components/UserStatsWidget.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient'; // Sesuaikan path jika perlu

export default function UserStatsWidget() {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserCount() {
      // Mengambil data jumlah pengguna
      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (count !== null) {
        setUserCount(count);
      }
      setLoading(false);
    }
    fetchUserCount();
  }, []);

  // Style untuk kartu widget
  const styles = {
    card: {
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      minWidth: '250px',
    },
    title: {
      marginTop: 0,
      color: '#333',
    },
    count: {
      fontSize: '36px',
      fontWeight: 'bold',
      margin: '10px 0',
      color: '#069494', // Warna Teal Anda
    },
    description: {
      color: '#666',
      margin: 0,
    },
  };

  if (loading) {
    return <div style={styles.card}>Memuat statistik...</div>;
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Pengguna Terdaftar</h3>
      <p style={styles.count}>{userCount}</p>
      <p style={styles.description}>Total pengguna di dalam sistem.</p>
    </div>
  );
}