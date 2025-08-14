'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // State baru untuk menyimpan data postingan
  const [loading, setLoading] = useState(true);

  // useEffect akan berjalan otomatis saat halaman pertama kali dimuat
  useEffect(() => {
    async function loadInitialData() {
      // 1. Periksa sesi login pengguna
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/';
      } else {
        setUser(session.user);

        // 2. Ambil semua data dari tabel 'posts', urutkan dari yang terbaru
        const { data: postsData, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (postsData) {
          setPosts(postsData);
        }
        
        // 3. Hentikan loading setelah semua data siap
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  // Tampilan loading
  if (loading) {
    return <div>Memuat data...</div>;
  }

  // Tampilan utama dashboard
  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Admin Dashboard</h1>
      <p>Selamat datang, <b>{user?.email}</b></p>
      <button onClick={handleLogout} style={{ cursor: 'pointer', padding: '10px' }}>
        Logout
      </button>
      
      <hr style={{ margin: '20px 0' }}/>
      
      <h2>Manajemen Konten</h2>
      
      {/* Nanti kita akan tambahkan tombol "Tambah Postingan Baru" di sini */}

      {/* Tabel untuk menampilkan data postingan */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px' }}>Judul</th>
            <th style={{ padding: '8px' }}>Caption</th>
            <th style={{ padding: '8px' }}>Tanggal Dibuat</th>
            {/* Kolom untuk Aksi (Edit/Hapus) */}
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr key={post.id}>
                <td style={{ padding: '8px' }}>{post.title}</td>
                <td style={{ padding: '8px' }}>{post.caption}</td>
                <td style={{ padding: '8px' }}>{new Date(post.created_at).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ padding: '8px', textAlign: 'center' }}>
                Belum ada postingan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}