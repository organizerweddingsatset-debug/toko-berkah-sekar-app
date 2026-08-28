import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, MapPin, ChevronDown, Zap, X, ShoppingCart, Bell } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileHeader = () => {
  const { 
    storeSettings, 
    cartTotalItems, 
    setIsCartOpen, 
    wishlist, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [selectedLocation, setSelectedLocation] = useState('Cilandak, Jakarta Selatan');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const locations = [
    'Cilandak, Jakarta Selatan (Antar 30 Menit)',
    'Kebayoran Baru & Gandaria (Antar 45 Menit)',
    'Fatmawati & Pondok Labu (Antar 30 Menit)',
    'Pasar Minggu & Jagakarsa (Antar 45 Menit)',
    'Ambil Sendiri di Toko Berkah Sekar'
  ];

  return (
    <>
      <header className="native-app-header">
        {/* Top bar: Deliver to & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          {/* Location Selector */}
          <div 
            onClick={() => setShowLocationModal(true)}
            className="touch-feedback"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              maxWidth: '65%'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MapPin size={13} color="#FFFFFF" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '10px', opacity: 0.85, fontWeight: '500', lineHeight: 1 }}>
                Alamat Pengantaran
              </div>
              <div style={{
                fontSize: '12px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                marginTop: '1px'
              }}>
                <span>{selectedLocation.split(' (')[0]}</span>
                <ChevronDown size={13} />
              </div>
            </div>
          </div>

          {/* Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('catalog')}
              className="touch-feedback"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
              title="Favorit"
            >
              <Heart size={18} fill={wishlist.length > 0 ? '#FEF08A' : 'none'} color={wishlist.length > 0 ? '#FEF08A' : '#FFFFFF'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  backgroundColor: '#EA580C',
                  color: '#FFF',
                  fontSize: '9px',
                  fontWeight: '800',
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #15803D'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="touch-feedback"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: '#FEF08A',
                border: 'none',
                color: '#14532D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
              }}
              title="Keranjang Belanja"
            >
              <ShoppingBag size={19} />
              {cartTotalItems > 0 && (
                <span 
                  className="badge-pulse"
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#EA580C',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: '800',
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 4px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF'
                  }}
                >
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Integrated Native Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '8px 12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
        }}>
          <Search size={16} color="#15803D" style={{ marginRight: '8px', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Cari beras 5kg, minyak, indomie, snack..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim() !== '') {
                setActiveTab('catalog');
              }
            }}
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
              style={{
                border: 'none',
                background: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '2px'
              }}
            >
              <X size={15} />
            </button>
          )}
        </div>
      </header>

      {/* Location Modal */}
      {showLocationModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div 
            className="animate-sheet-up"
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '100%',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '20px',
              maxHeight: '75vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#14532D' }}>Pilih Lokasi Pengantaran</h3>
                <p style={{ fontSize: '12px', color: '#64748B' }}>Kurir Toko Berkah Sekar siap mengantar belanjaan ke rumah</p>
              </div>
              <button 
                onClick={() => setShowLocationModal(false)}
                style={{ border: 'none', background: '#F1F5F9', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {locations.map((loc, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationModal(false);
                  }}
                  className="touch-feedback"
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    backgroundColor: selectedLocation === loc ? '#DCFCE7' : '#F8FAFC',
                    border: selectedLocation === loc ? '1.5px solid #15803D' : '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MapPin size={16} color={selectedLocation === loc ? '#15803D' : '#94A3B8'} />
                    <span style={{ fontSize: '13px', fontWeight: selectedLocation === loc ? '700' : '500', color: '#0F172A' }}>
                      {loc}
                    </span>
                  </div>
                  {selectedLocation === loc && (
                    <span style={{ color: '#15803D', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
