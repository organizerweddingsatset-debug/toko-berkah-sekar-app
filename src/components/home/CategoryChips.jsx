import React from 'react';
import { CATEGORIES } from '../../data/initialProducts';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ShoppingBag, Utensils, Cookie, Coffee, Flame, Sparkle, Gift } from 'lucide-react';

const iconMap = {
  Sparkles,
  ShoppingBag,
  Utensils,
  Cookie,
  Coffee,
  Flame,
  Sparkle,
  Gift
};

export const CategoryChips = () => {
  const { activeCategory, setActiveCategory, products } = useStore();

  const getCount = (catId) => {
    if (catId === 'semua') return products.length;
    return products.filter(p => p.category === catId).length;
  };

  return (
    <div style={{ marginTop: '18px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px 10px 16px'
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#14532D', letterSpacing: '-0.2px' }}>
          Kategori Belanja
        </h3>
        <span style={{ fontSize: '12px', color: '#15803D', fontWeight: '700' }}>
          {products.length} Pilihan Produk
        </span>
      </div>

      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          padding: '0 16px 6px 16px',
          scrollSnapType: 'x mandatory'
        }}
      >
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Sparkles;
          const isActive = activeCategory === cat.id;
          const count = getCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="btn-touch"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '8px 14px',
                borderRadius: '24px',
                border: isActive ? '1.5px solid #15803D' : '1px solid #E2E8F0',
                backgroundColor: isActive ? '#15803D' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#334155',
                boxShadow: isActive ? '0 4px 12px rgba(21, 128, 61, 0.25)' : 'var(--shadow-sm)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '12.5px',
                fontWeight: isActive ? '700' : '500',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                scrollSnapAlign: 'start'
              }}
            >
              <Icon size={15} color={isActive ? '#FEF08A' : '#15803D'} strokeWidth={2.2} />
              <span>{cat.label}</span>
              <span style={{
                fontSize: '10px',
                padding: '1px 6px',
                borderRadius: '10px',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F1F5F9',
                color: isActive ? '#FFFFFF' : '#64748B',
                fontWeight: '800'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
