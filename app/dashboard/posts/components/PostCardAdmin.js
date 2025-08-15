// app/dashboard/posts/components/PostCardAdmin.js
'use client';

import ReactPlayer from 'react-player'; // Impor ReactPlayer

export default function PostCardAdmin({ post, onDelete }) {
  const isVideo = post.media_type === 'video';

  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      color: '#1f2937',
    },
    mediaContainer: {
      width: '100%',
      aspectRatio: `${post.media_aspect_ratio || 1}`,
      backgroundColor: '#e2e8f0',
      position: 'relative',
    },
    content: {
      padding: '15px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '15px',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: 'auto',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.mediaContainer}>
        {isVideo ? (
          <ReactPlayer url={post.media_url} width="100%" height="100%" controls={true} light={true} />
        ) : (
          <img src={post.media_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>
      <div style={styles.content}>
        <h3 style={styles.title} title={post.title}>{post.title}</h3>
        <div style={styles.stats}>
          <span>❤️ {post.love_count} Suka</span>
          <span>🔗 {post.share_count} Dibagikan</span>
        </div>
        <button style={styles.deleteButton} onClick={() => onDelete(post.id, post.media_url)}>
          Hapus
        </button>
      </div>
    </div>
  );
}
