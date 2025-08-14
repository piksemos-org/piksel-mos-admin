// app/dashboard/posts/page.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import PostsTable from './components/PostsTable';
// Nanti kita akan tambahkan import untuk PostsGallery di sini

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Manajemen Postingan</h1>
      <p>Lihat dan kelola semua konten yang ada di feed aplikasi.</p>

      {/* Nanti kita akan tampilkan PostsGallery di sini */}

      <PostsTable posts={posts} isLoading={loading} />
    </div>
  );
}
