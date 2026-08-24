import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah } from '../../utils/formatters';
import { 
  X, 
  Heart, 
  Star, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ShoppingBag as CartIcon
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    setIsCheckoutOpen,
    wishlist, 
    toggleWishlist 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  if (!selectedProduct) return null;

  const isFavorited = wishlist.includes(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice > selectedProduct.price
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, null, note);
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, null, note);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <div 
        className="animate-slide-up"
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '440px',
          maxHeight: '92vh',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          overflowY: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Header Buttons */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px 16px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)'
        }}>
          <button
            onClick={() => setSelectedProduct(null)}
            className="btn-touch"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} color="#0F172A" />
          </button>

          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            className="btn-touch"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Heart size={18} color={isFavorited ? '#EA580C' : '#64748B'} fill={isFavorited ? '#EA580C' : 'none'} />
          </button>
        </div>

        {/* Hero Image */}
        <div style={{
          position: 'relative',
          height: '250px',
          backgroundColor: '#F8FAFC',
          marginTop: '-50px',
          zIndex: 1
        }}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {selectedProduct.tag && (
            <span 
              className={`badge-tag badge-${selectedProduct.tagType || 'fresh'}`}
              style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '12px', padding: '4px 12px' }}
            >
              {selectedProduct.tag}
            </span>
          )}

          {discountPercent > 0 && (
            <span style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: '#EA580C',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: '800',
              padding: '3px 8px',
              borderRadius: '8px'
            }}>
              HEMAT {discountPercent}%
            </span>
          )}
        </div>

        {/* Product Details Body */}
        <div style={{ padding: '18px 16px 80px 16px' }}>
          {/* Title & Rating */}
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '19px',
            fontWeight: '800',
            color: '#14532D',
            lineHeight: 1.25,
            marginBottom: '8px'
          }}>
            {selectedProduct.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#F59E0B', fontWeight: '700', fontSize: '13px' }}>
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span>{selectedProduct.rating}</span>
            </div>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>{selectedProduct.soldCount}+ Terjual di Toko</span>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <span style={{ fontSize: '11.5px', color: '#15803D', fontWeight: '700', backgroundColor: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>
              Stok: {selectedProduct.stock} Tersedia
            </span>
          </div>

          {/* Price Box */}
          <div style={{
            backgroundColor: '#F8FAFC',
            padding: '12px 14px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px'
          }}>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#15803D' }}>
              {formatRupiah(selectedProduct.price)}
            </span>
            {selectedProduct.originalPrice > selectedProduct.price && (
              <span style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'line-through' }}>
                {formatRupiah(selectedProduct.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
              Deskripsi Produk:
            </h4>
            <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.5 }}>
              {selectedProduct.description}
            </p>
          </div>

          {/* Features */}
          {selectedProduct.features && (
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Keunggulan & Detail Kemasan:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedProduct.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#1E293B' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes for Shop / Delivery */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', display: 'block', marginBottom: '4px' }}>
              Catatan Pembelian (Opsional):
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: Gulaku yang kemasan kuning / Biskuit rasa cokelat"
              style={{
                width: '100%',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '12px',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
          </div>

          {/* Quantity Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderTop: '1px dashed #E2E8F0'
          }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
              Jumlah Beli
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Minus size={15} />
              </button>
              <span style={{ fontSize: '16px', fontWeight: '800', color: '#15803D', minWidth: '20px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#15803D',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-color)',
          padding: '12px 16px',
          display: 'flex',
          gap: '10px',
          zIndex: 20
        }}>
          <button
            onClick={handleAddToCart}
            className="btn-touch"
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '14px',
              border: '1.5px solid #15803D',
              backgroundColor: '#F0FDF4',
              color: '#15803D',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <ShoppingBag size={16} />
            <span>+ Keranjang</span>
          </button>

          <button
            onClick={handleBuyNow}
            className="btn-touch"
            style={{
              flex: 1.5,
              padding: '12px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(21, 128, 61, 0.35)'
            }}
          >
            <span>Beli Sekarang</span>
          </button>
        </div>
      </div>
    </div>
  );
};
