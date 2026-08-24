import React from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah } from '../../utils/formatters';

export const ProductCard = ({ product }) => {
  const { setSelectedProduct, addToCart, wishlist, toggleWishlist } = useStore();
  const isFavorited = wishlist.includes(product.id);

  const discountPercent = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="touch-feedback"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--elevation-1)',
        border: '1px solid var(--border-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', width: '100%', height: '140px', backgroundColor: '#F8FAFC', overflow: 'hidden' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: '#EA580C',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: '800',
            padding: '2px 6px',
            borderRadius: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
          }}>
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="touch-feedback"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            cursor: 'pointer'
          }}
        >
          <Heart size={14} color={isFavorited ? '#EA580C' : '#94A3B8'} fill={isFavorited ? '#EA580C' : 'none'} />
        </button>
      </div>

      {/* Content Info */}
      <div style={{ padding: '10px 10px 12px 10px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h4 style={{
            fontSize: '12.5px',
            fontWeight: '700',
            color: '#0F172A',
            lineHeight: 1.3,
            marginBottom: '4px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '32px'
          }}>
            {product.name}
          </h4>

          {/* Rating & Sold count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#64748B', marginBottom: '8px' }}>
            <Star size={11} fill="#F59E0B" color="#F59E0B" />
            <span style={{ fontWeight: '700', color: '#0F172A' }}>{product.rating}</span>
            <span>•</span>
            <span>{product.soldCount}+ terjual</span>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '2px' }}>
          <div>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '10px', color: '#94A3B8', textDecoration: 'line-through', lineHeight: 1 }}>
                {formatRupiah(product.originalPrice)}
              </div>
            )}
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#15803D', lineHeight: 1.2, marginTop: '2px' }}>
              {formatRupiah(product.price)}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="touch-feedback"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: '#15803D',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(21, 128, 61, 0.25)',
              cursor: 'pointer'
            }}
            title="Tambah ke Keranjang"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
