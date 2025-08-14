'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    // Mencegah form untuk me-refresh halaman
    e.preventDefault(); 
    
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Objek untuk styling (CSS-in-JS) agar lebih rapi
  const styles = {
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif',
    },
    card: {
      padding: '40px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      textAlign: 'center',
      marginBottom: '10px',
      color: '#333',
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#666',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      boxSizing: 'border-box',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '12px',
      cursor: 'pointer',
      backgroundColor: '#069494', // Warna Teal Anda
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '16px',
    },
    error: {
      color: 'red',
      marginTop: '15px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Piksel Mos</h1>
        <p style={styles.subtitle}>Admin Panel</p>
        
        {/* Menggunakan <form> untuk best practice */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
