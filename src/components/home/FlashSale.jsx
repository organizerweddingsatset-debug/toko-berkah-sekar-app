import React, { useState, useEffect } from 'react';
import { Flame, Clock, Plus, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah } from '../../utils/formatters';

export const FlashSale = () => {
  const { products, setSelectedProduct, addToCart } = useStore();
  
  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const promoProducts = products.filter(p => p.isPromo || p.originalPrice > p.price).slice(0, 4);

  if (promoProducts.length === 0) return null;

  return (
    <div style={{
      marginTop: '18px',
      padding: '14px 16px',
      background: 'linear-gradient(180deg, #FEF3C7 0%, #FFFFFF 100%)',
      borderTop: '1px solid #FDE68A',
      borderBottom: '1px solid #FDE68A'
    }}>
      {/* Header Flash Sale */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{
            backgroundColor: '#EA580C',
            color: '#FFFFFF',
            borderRadius: '8px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame size={16} />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#9A3412', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
              Flash Sale Sembako
            </h3>
            <span style={{ fontSize: '10.5px', color: '#C2410C', fontWeight: '700' }}>
              Harga Paling Murah Hari Ini
            </span>
          </div>
        </div>

        {/* Countdown Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={13} color="#EA580C" />
          <div style={{ display: 'flex', gap: '3px' }}>
            <span style={{ backgroundColor: '#0F172A', color: '#FFF', fontSize: '11px', fontWeight: '700', padding: '2px 5px', borderRadius: '4px' }}>
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span style={{ fontWeight: 'bold', color: '#0F172A' }}>:</span>
            <span style={{ backgroundColor: '#0F172A', color: '#FFF', fontSize: '11px', fontWeight: '700', padding: '2px 5px', borderRadius: '4px' }}>
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span style={{ fontWeight: 'bold', color: '#0F172A' }}>:</span>
            <span style={{ backgroundColor: '#EA580C', color: '#FFF', fontSize: '11px', fontWeight: '700', padding: '2px 5px', borderRadius: '4px' }}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        {promoProducts.map(product => {
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

          return (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="btn-touch"
              style={{
                width: '150px',
                flexShrink: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid #FEF08A',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ position: 'relative', height: '115px', backgroundColor: '#F8FAFC' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  left: '6px',
                  backgroundColor: '#EA580C',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 6px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                  -{discountPercent}%
                </span>
              </div>

              <div style={{ padding: '8px 10px 10px 10px' }}>
                <h4 style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#0F172A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  marginBottom: '4px'
                }}>
                  {product.name}
                </h4>

                <div style={{ fontSize: '13px', fontWeight: '800', color: '#15803D', lineHeight: 1.1 }}>
                  {formatRupiah(product.price)}
                </div>

                <div style={{
                  fontSize: '10.5px',
                  color: '#94A3B8',
                  textDecoration: 'line-through',
                  marginTop: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>{formatRupiah(product.originalPrice)}</span>
                  <div style={{
                    backgroundColor: '#15803D',
                    color: '#FFF',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  >
                    <Plus size={14} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
