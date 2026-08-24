import React, { useState, useEffect } from 'react';
import { PROMO_BANNERS } from '../../data/initialProducts';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Copy, Check, Zap, BadgePercent, ShieldCheck, Banknote } from 'lucide-react';

export const HeroBanner = () => {
  const { setActiveTab, setActiveCategory, showToast } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Kode kupon "${code}" berhasil disalin! 🏷️`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleBannerClick = (banner) => {
    if (banner.categoryTarget === 'custom') {
      setActiveTab('custom');
    } else {
      setActiveCategory(banner.categoryTarget);
      setActiveTab('catalog');
    }
  };

  const current = PROMO_BANNERS[currentSlide];

  return (
    <div style={{ padding: '12px 16px 0 16px' }}>
      {/* Main Promo Carousel Card */}
      <div 
        onClick={() => handleBannerClick(current)}
        className="btn-touch"
        style={{
          background: current.bgGradient,
          borderRadius: '22px',
          padding: '20px 18px',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 24px rgba(21, 128, 61, 0.2)',
          cursor: 'pointer',
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Grocery Watermark Background */}
        <div style={{
          position: 'absolute',
          right: '-10px',
          bottom: '-20px',
          fontSize: '90px',
          opacity: 0.15,
          pointerEvents: 'none',
          userSelect: 'none',
          transform: 'rotate(-10deg)'
        }}>
          🛒
        </div>

        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '10.5px',
            fontWeight: '700',
            letterSpacing: '0.3px',
            marginBottom: '8px'
          }}>
            <span>KODE KUPON:</span>
            <span style={{ color: '#FEF08A' }}>{current.code}</span>
            <button
              onClick={(e) => handleCopyCode(current.code, e)}
              style={{
                background: 'rgba(255,255,255,0.3)',
                border: 'none',
                borderRadius: '6px',
                padding: '2px 5px',
                color: '#FFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {copiedCode === current.code ? <Check size={11} color="#A7F3D0" /> : <Copy size={11} />}
            </button>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '19px',
            fontWeight: '800',
            lineHeight: 1.25,
            marginBottom: '6px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            {current.title}
          </h2>

          <p style={{
            fontSize: '12px',
            opacity: 0.92,
            lineHeight: 1.35,
            maxWidth: '250px'
          }}>
            {current.subtitle}
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '14px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FEF08A',
            color: '#14532D',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '11.5px',
            fontWeight: '800'
          }}>
            <span>{current.buttonText}</span>
            <ArrowRight size={13} strokeWidth={2.5} />
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '5px' }}>
            {PROMO_BANNERS.map((_, idx) => (
              <span
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                style={{
                  width: currentSlide === idx ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: currentSlide === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feature Service Badges Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginTop: '14px'
      }}>
        {[
          { icon: Zap, title: '30 Menit', subtitle: 'Antar Rumah', color: '#15803D', bg: '#DCFCE7' },
          { icon: BadgePercent, title: 'Grosir & Ecer', subtitle: 'Harga Warung', color: '#EA580C', bg: '#FFEDD5' },
          { icon: ShieldCheck, title: '100% Asli', subtitle: 'Kualitas Segar', color: '#0F766E', bg: '#CCFBF1' },
          { icon: Banknote, title: 'Bisa COD', subtitle: 'Bayar di Tempat', color: '#D97706', bg: '#FEF3C7' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '10px 6px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '10px',
                backgroundColor: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '4px'
              }}>
                <Icon size={16} color={item.color} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#0F172A', lineHeight: 1.1 }}>
                {item.title}
              </span>
              <span style={{ fontSize: '9.5px', color: '#64748B', marginTop: '1px' }}>
                {item.subtitle}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
