// app/dashboard/posts/components/UploadPanel.js
'use client';

import { useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';

export default function UploadPanel({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [aspectRatio, setAspectRatio] = useState(1 / 1);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Silakan pilih file media terlebih dahulu.');
      return;
    }
    setUploading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Anda harus login untuk mengunggah.');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 1. Upload file ke Storage
      let { error: uploadError } = await supabase.storage
        .from('media_posts')
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      // 2. Dapatkan URL publik
      const { data } = supabase.storage
        .from('media_posts')
        .getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      // 3. Simpan data ke tabel 'posts'
      const { error: insertError } = await supabase.from('posts').insert({
        title,
        caption,
        media_url: publicUrl,
        media_type: file.type.startsWith('video') ? 'video' : 'image',
        media_aspect_ratio: aspectRatio,
        user_id: user.id,
      });
      if (insertError) throw insertError;

      alert('Unggahan berhasil!');
      // Reset form
      setFile(null);
      setPreviewUrl(null);
      setTitle('');
      setCaption('');
      onUploadSuccess(); // Refresh gallery
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const styles = {
    panel: {
      flex: 1,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      height: 'fit-content',
    },
    preview: {
      width: '100%',
      aspectRatio: '16 / 9',
      backgroundColor: '#e2e8f0',
      borderRadius: '4px',
      marginBottom: '15px',
      objectFit: 'cover',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '12px',
      cursor: 'pointer',
      backgroundColor: '#069494',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.panel}>
      <h2 style={{ marginTop: 0, color: '#333' }}>Unggah Postingan Baru</h2>
      {previewUrl && <img src={previewUrl} style={styles.preview} alt="Preview" />}
      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,video/mp4"
          style={{ ...styles.input, padding: '4px' }}
        />
        <input
          type="text"
          placeholder="Judul Postingan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ ...styles.input, height: '80px' }}
        />
        <select
          value={aspectRatio}
          onChange={(e) => setAspectRatio(Number(e.target.value))}
          style={styles.input}
        >
          <option value={4 / 5}>Potret (4:5)</option>
          <option value={1 / 1}>Persegi (1:1)</option>
          <option value={1.91 / 1}>Lanskap (1.91:1)</option>
        </select>
        <button type="submit" disabled={uploading} style={styles.button}>
          {uploading ? 'Mengunggah...' : 'Unggah Postingan'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
