import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/initialProducts';
import { ProductCard } from '../products/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';

export const CatalogScreen = () => {
  const { products, activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useStore();
  const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high, rating
  const [selectedTagFilter, setSelectedTagFilter] = useState('all');

  // Filter products by category, search query, and tag
  let filtered = products.filter(product => {
    const matchesCategory = activeCategory === 'semua' || product.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTagFilter === 'all' || 
      (selectedTagFilter === 'promo' && product.isPromo) ||
      (selectedTagFilter === 'bestseller' && product.tag?.toLowerCase().includes('laris')) ||
      (selectedTagFilter === 'grosir' && product.tag?.toLowerCase().includes('grosir'));

    return matchesCategory && matchesSearch && matchesTag;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'popular') {
    filtered.sort((a, b) => b.soldCount - a.soldCount);
  }

  return (
    <div style={{ padding: '16px 16px 24px 16px' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '20px',
          fontWeight: '800',
          color: '#14532D',
          letterSpacing: '-0.3px'
        }}>
          Katalog Sembako & Snack 🛒
        </h2>
        <p style={{ fontSize: '12px', color: '#64748B' }}>
          Belanja kebutuhan pokok dapur, makanan instan & camilan keluarga
        </p>
      </div>

      {/* Search Input Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        padding: '10px 14px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-color)',
        marginBottom: '12px'
      }}>
        <Search size={16} color="#15803D" style={{ marginRight: '8px' }} />
        <input
          type="text"
          placeholder="Cari beras, minyak, indomie, telur, snack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            fontSize: '13px',
            fontFamily: 'inherit',
            color: '#0F172A'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8' }}
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Category Pills Scroller */}
      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className="btn-touch"
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: activeCategory === cat.id ? '1.5px solid #15803D' : '1px solid #E2E8F0',
              backgroundColor: activeCategory === cat.id ? '#15803D' : '#FFFFFF',
              color: activeCategory === cat.id ? '#FFFFFF' : '#334155',
              fontSize: '12px',
              fontWeight: activeCategory === cat.id ? '700' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort & Quick Tag Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '10px 0 14px 0',
        fontSize: '12px'
      }}>
        <span style={{ color: '#64748B', fontWeight: '600' }}>
          Menampilkan <strong style={{ color: '#15803D' }}>{filtered.length}</strong> produk
        </span>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ArrowUpDown size={13} color="#15803D" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '11.5px',
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              outline: 'none',
              fontFamily: 'inherit',
              fontWeight: '600'
            }}
          >
            <option value="popular">Paling Laris</option>
            <option value="price-low">Harga: Rendah ke Tinggi</option>
            <option value="price-high">Harga: Tinggi ke Rendah</option>
            <option value="rating">Rating Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px dashed #CBD5E1',
          marginTop: '10px'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#14532D', marginBottom: '4px' }}>
            Produk tidak ditemukan
          </h3>
          <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
            Coba kata kunci lain seperti "beras", "minyak", "mie", "snack", atau gunakan Studio Racik Paket!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('semua');
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#15803D',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};
