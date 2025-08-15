// app/dashboard/posts/page.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import PostCardAdmin from './components/PostCardAdmin';
import UploadPanel from './components/UploadPanel';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('love_count', { ascending: false });

    if (data) {
      setPosts(data);
    }
    setLoading(false);
  }

  // ===== PERBAIKAN ADA DI DALAM FUNGSI INI =====
  async function deletePost(id, mediaUrl) {
    if (window.confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
      try {
        // 1. Dapatkan user ID dari sesi yang sedang aktif
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Tidak bisa mendapatkan data admin.");

        // 2. Ekstrak nama file dari URL
        const fileName = mediaUrl.split('/').pop();
        
        // 3. Buat path yang lengkap: 'folder_userId/nama_file.jpg'
        const filePath = `${user.id}/${fileName}`;
        
        // 4. Hapus file dari Storage menggunakan path yang lengkap
        const { error: storageError } = await supabase.storage
          .from('media_posts')
          .remove([filePath]);
          
        // Tetap lanjutkan meskipun ada error di storage (misal: file sudah terhapus)
        if (storageError) {
          console.warn("Peringatan saat menghapus file di storage:", storageError.message);
        }

        // 5. Hapus data dari tabel 'posts'
        const { error: dbError } = await supabase.from('posts').delete().eq('id', id);
        if (dbError) throw dbError;
        
        alert('Postingan berhasil dihapus.');
        fetchPosts(); // Refresh galeri

      } catch (error) {
        alert(`Gagal menghapus: ${error.message}`);
      }
    }
  }

  const styles = {
    container: { display: 'flex', gap: '30px', alignItems: 'flex-start' },
    gallery: { flex: 3, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  };

  return (
    <div>
      <h1>Manajemen Postingan</h1>
      <p>Kelola semua konten yang ada di feed aplikasi.</p>
      <hr style={{ margin: '20px 0' }}/>
      <div style={styles.container}>
        <div style={styles.gallery}>
          {loading ? <p>Memuat galeri...</p> : 
            posts.map((post) => (
              <PostCardAdmin key={post.id} post={post} onDelete={deletePost} />
            ))
          }
        </div>
        <UploadPanel onUploadSuccess={fetchPosts} />
      </div>
    </div>
  );
}
