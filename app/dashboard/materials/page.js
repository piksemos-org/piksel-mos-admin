// app/dashboard/materials/page.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient'; // Sesuaikan path jika perlu

export default function MaterialsPage() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      const { data, error } = await supabase
        .from('print_materials')
        .select('*')
        .order('name', { ascending: true });

      if (data) {
        setMaterials(data);
      }
      setLoading(false);
    }
    fetchMaterials();
  }, []);

  if (loading) {
    return <div>Memuat data material...</div>;
  }

  return (
    <div>
      <h1>Manajemen Material Cetak</h1>
      <p>Di sini Anda bisa menambah, mengubah, dan menghapus bahan cetak yang tersedia di aplikasi.</p>
      
      <button style={{ margin: '20px 0', padding: '10px' }}>
        + Tambah Material Baru
      </button>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px' }}>Nama Bahan</th>
            <th style={{ padding: '8px' }}>Kategori</th>
            <th style={{ padding: '8px' }}>Jumlah Varian</th>
            <th style={{ padding: '8px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id}>
              <td style={{ padding: '8px' }}>{material.name}</td>
              <td style={{ padding: '8px' }}>{material.category}</td>
              <td style={{ padding: '8px' }}>{material.variants?.length || 0}</td>
              <td style={{ padding: '8px' }}>
                <button>Edit</button> <button>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}