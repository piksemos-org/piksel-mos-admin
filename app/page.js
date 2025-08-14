'use client'; // Baris ini wajib ada untuk halaman interaktif

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Mengimpor koneksi Supabase

export default function LoginPage() {
  // Mirip seperti TextEditingController di Flutter, untuk menyimpan input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ini adalah fungsi yang akan dijalankan saat tombol "Masuk" diklik
  async function handleLogin() {
    setLoading(true); // Mulai loading
    setError(null); // Bersihkan pesan error lama
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error; // Jika Supabase memberi error, lemparkan agar ditangkap di 'catch'
      }

      // Jika tidak ada error, arahkan ke halaman dashboard
      window.location.href = '/dashboard'; // Halaman ini akan kita buat di tahap selanjutnya

    } catch (error) {
      // Jika terjadi error, simpan pesannya untuk ditampilkan ke pengguna
      setError(error.message);
    } finally {
      setLoading(false); // Hentikan loading, baik sukses maupun gagal
    }
  }

  // Ini adalah tampilan UI-nya, mirip seperti widget build() di Flutter
  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>Admin Login</h1>
      <p>Masuk untuk mengelola konten Piksel Mos.</p>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box' }}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }}
      />
      
      <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '12px', cursor: 'pointer' }}>
        {loading ? 'Memproses...' : 'Masuk'}
      </button>

      {/* Bagian ini akan menampilkan pesan error jika login gagal */}
      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  );
}