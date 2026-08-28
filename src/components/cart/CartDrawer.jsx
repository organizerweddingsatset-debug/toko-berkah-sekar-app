import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah } from '../../utils/formatters';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Check, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal,
    cartTotalItems,
    setIsCheckoutOpen,
    setActiveTab,
    showToast
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponName, setCouponName] = useState('');

  if (!isCartOpen) return null;

  const validCoupons = {
    'BERKAHSEMBKO': { discount: 15000, name: 'Voucher Sembako Murah' },
    'SNACKHEMAT': { discount: 10000, name: 'Diskon Snack & Biskuit' },
    'PAKETBERKAH': { discount: 20000, name: 'Promo Paket Sembako Sedekah' }
  };

  const handleApplyCoupon = () => {
    const trimmed = couponCode.trim().toUpperCase();
    if (validCoupons[trimmed]) {
      setAppliedDiscount(validCoupons[trimmed].discount);
      setCouponName(validCoupons[trimmed].name);
      showToast(`Kupon "${trimmed}" berhasil dipasang! Diskon ${formatRupiah(validCoupons[trimmed].discount)} 🎉`);
    } else {
      showToast('Kode kupon tidak valid atau sudah kadaluarsa', 'warning');
    }
  };

  const grandTotal = Math.max(0, cartSubtotal - appliedDiscount);

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 998,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }}>
      <div 
        className="animate-slide-up"
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '100%',
          maxHeight: '90vh',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header Drawer */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              backgroundColor: '#DCFCE7',
              color: '#15803D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#14532D', lineHeight: 1.1 }}>
                Keranjang Belanjaan
              </h3>
              <span style={{ fontSize: '11px', color: '#64748B' }}>
                {cartTotalItems} item sembako & snack dipilih
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="btn-touch"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="#64748B" />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{
          padding: '16px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛒</div>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#14532D', marginBottom: '6px' }}>
                Keranjang belanjaanmu kosong
              </h4>
              <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
                Yuk belanja sembako murah atau racik paket belanja keluarga di Toko Berkah Sekar!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('catalog');
                }}
                className="btn-touch"
                style={{
                  padding: '10px 20px',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: '#15803D',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Mulai Belanja Sembako
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    gap: '12px'
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#F8FAFC',
                    flexShrink: 0
                  }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', lineHeight: 1.2, marginBottom: '4px' }}>
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EA580C',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Custom Package Details */}
                      {item.customDetails && (
                        <div style={{
                          fontSize: '10.5px',
                          color: '#15803D',
                          backgroundColor: '#DCFCE7',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          marginBottom: '4px',
                          lineHeight: 1.3
                        }}>
                          📦 {item.customDetails.rice} • {item.customDetails.oil} • {item.customDetails.noodle}
                        </div>
                      )}

                      {/* Note snippet */}
                      {item.note && (
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontStyle: 'italic', marginBottom: '4px' }}>
                          📝 "{item.note}"
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: '#15803D' }}>
                        {formatRupiah(item.price * item.quantity)}
                      </span>

                      {/* Quantity Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#F8FAFC', padding: '3px 6px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <Minus size={13} color="#64748B" />
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <Plus size={13} color="#15803D" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Code Box */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '16px',
                padding: '12px',
                border: '1px dashed #CBD5E1',
                marginTop: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Tag size={14} color="#15803D" />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#14532D' }}>
                    Kupon Promo Belanja Sembako
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    placeholder="Contoh: BERKAHSEMBKO"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '8px 10px',
                      fontSize: '12px',
                      fontFamily: 'inherit',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="btn-touch"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: '#15803D',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Pakai
                  </button>
                </div>

                {appliedDiscount > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '11px', color: '#15803D', fontWeight: '700' }}>
                    <Check size={12} strokeWidth={3} />
                    <span>{couponName} (-{formatRupiah(appliedDiscount)})</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout Button */}
        {cart.length > 0 && (
          <div style={{
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--border-color)',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Total Belanjaan:</span>
                <strong style={{ color: '#0F172A' }}>{formatRupiah(cartSubtotal)}</strong>
              </div>

              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EA580C' }}>
                  <span>Diskon Kupon:</span>
                  <strong>-{formatRupiah(appliedDiscount)}</strong>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Ongkos Antar:</span>
                <span style={{ color: '#15803D', fontWeight: '700' }}>Pilih saat Checkout</span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px',
                fontWeight: '800',
                color: '#14532D',
                paddingTop: '6px',
                borderTop: '1px dashed #E2E8F0'
              }}>
                <span>Total Bayar:</span>
                <span style={{ color: '#15803D' }}>{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="btn-touch"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '16px',
                border: 'none',
                background: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 18px rgba(21, 128, 61, 0.35)'
              }}
            >
              <span>Lanjut ke Pengantaran & Bayar</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
