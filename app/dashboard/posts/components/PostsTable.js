// app/dashboard/posts/components/PostsTable.js
'use client';

export default function PostsTable({ posts, isLoading }) {
  if (isLoading) return <p>Memuat tabel data...</p>;
  if (!posts || posts.length === 0) return <p>Tidak ada data postingan untuk ditampilkan.</p>;

  // PERBAIKAN: Style diperbarui agar teks bisa dibaca
  const styles = {
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', color: '#333' }, // Warna teks default untuk tabel
    th: { backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' },
    td: { padding: '12px', borderBottom: '1px solid #ddd', verticalAlign: 'top' },
    link: { color: '#069494', textDecoration: 'none', fontWeight: 'bold' },
    idText: { fontSize: '12px', color: '#666' }
  };

  return (
    <div>
      <h2 style={{ marginTop: '40px' }}>Data Rinci Postingan</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Judul</th>
            <th style={styles.th}>Media URL</th>
            <th style={styles.th}>❤️ Suka</th>
            <th style={styles.th}>🔗 Dibagikan</th>
            <th style={styles.th}>Admin ID</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td style={styles.td}>{post.title}</td>
              <td style={styles.td}>
                <a href={post.media_url} target="_blank" rel="noopener noreferrer" style={styles.link}>
                  Lihat Media
                </a>
              </td>
              <td style={styles.td}>{post.love_count}</td>
              <td style={styles.td}>{post.share_count}</td>
              <td style={styles.td} title={post.user_id}>
                <span style={styles.idText}>{post.user_id}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
