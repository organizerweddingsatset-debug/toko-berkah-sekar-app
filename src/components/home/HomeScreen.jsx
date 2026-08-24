import React from 'react';
import { HeroBanner } from './HeroBanner';
import { CategoryChips } from './CategoryChips';
import { FlashSale } from './FlashSale';
import { ProductCard } from '../products/ProductCard';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Star, Award, Gift, ShoppingCart } from 'lucide-react';

export const HomeScreen = () => {
  const { products, activeCategory, setActiveCategory, setActiveTab } = useStore();

  const filteredProducts = activeCategory === 'semua'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingBottom: '20px' }}>
      {/* Hero Banner Promo */}
      <HeroBanner />

      {/* Category Chips Scroller */}
      <CategoryChips />

      {/* Flash Sale Section */}
      <FlashSale />

      {/* Main Catalog Showcase */}
      <div style={{ padding: '20px 16px 0 16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '14px'
        }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#14532D',
              letterSpacing: '-0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>Sembako & Snack Terlaris</span>
              <Sparkles size={16} color="#F59E0B" />
            </h3>
            <p style={{ fontSize: '11.5px', color: '#64748B' }}>
              Stok baru, harga warung bersahabat & siap antar
            </p>
          </div>

          <button
            onClick={() => setActiveTab('catalog')}
            style={{
              background: 'none',
              border: 'none',
              color: '#15803D',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span>Semua</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 2-Column Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {filteredProducts.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Custom Bundle Sembako Studio Call-to-Action Card */}
      <div style={{ padding: '20px 16px 0 16px' }}>
        <div 
          onClick={() => setActiveTab('custom')}
          className="btn-touch"
          style={{
            background: 'linear-gradient(135deg, #14532D 0%, #15803D 50%, #166534 100%)',
            borderRadius: '24px',
            padding: '20px 18px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#FEF08A',
              color: '#14532D',
              fontSize: '10.5px',
              fontWeight: '800',
              padding: '3px 10px',
              borderRadius: '20px',
              marginBottom: '10px'
            }}>
              <Gift size={12} color="#15803D" />
              <span>STUDIO RACIK PAKET</span>
            </span>

            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: '800',
              marginBottom: '6px',
              lineHeight: 1.25
            }}>
              Racik Paket Sembako & Sedekah Sesuai Budget 📦
            </h3>

            <p style={{ fontSize: '11.5px', opacity: 0.92, lineHeight: 1.4, maxWidth: '245px', marginBottom: '14px' }}>
              Pilih takaran beras, minyak goreng, mie instan, aneka snack, jenis kemasan tas spunbond, serta pesan doa sedekah.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              color: '#15803D',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '800',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              <span>Mulai Racik Paket Sembako</span>
              <ArrowRight size={14} strokeWidth={2.5} />
            </div>
          </div>

          <div style={{
            position: 'absolute',
            right: '-15px',
            bottom: '-20px',
            fontSize: '95px',
            opacity: 0.2,
            userSelect: 'none',
            pointerEvents: 'none'
          }}>
            📦
          </div>
        </div>
      </div>

      {/* Customer Trust & Reviews Preview */}
      <div style={{
        margin: '20px 16px 0 16px',
        padding: '16px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            backgroundColor: '#DCFCE7',
            color: '#15803D',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#14532D' }}>
              Toko Kelontong Berkah Sekar
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748B' }}>
              <div style={{ display: 'flex', color: '#F59E0B' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <strong style={{ color: '#0F172A' }}>4.9/5.0</strong>
              <span>(3.800+ Pelanggan Warung Puas)</span>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          padding: '10px 12px',
          fontSize: '11.5px',
          color: '#334155',
          fontStyle: 'italic',
          lineHeight: 1.4,
          borderLeft: '3px solid #15803D'
        }}>
          "Belanja sembako bulanan di Berkah Sekar praktis banget! Berasnya pulen, minyak dan telurnya fresh, 30 menit udah sampai dianter kurir. Harganya lebih murah dari minimarket!"
          <span style={{ display: 'block', fontWeight: '700', fontStyle: 'normal', color: '#15803D', marginTop: '4px' }}>
            — Ibu Ratna S., Cilandak
          </span>
        </div>
      </div>
    </div>
  );
};
