import React, { useState } from 'react';
import { 
  MAIN_STAPLES, 
  OIL_OPTIONS, 
  NOODLE_OPTIONS, 
  PACKAGING_OPTIONS, 
  SNACK_ADDONS, 
  CARD_TEMPLATES 
} from '../../data/customizerOptions';
import { useStore } from '../../context/StoreContext';
import { formatRupiah } from '../../utils/formatters';
import { 
  Gift, 
  Plus, 
  Minus, 
  Check, 
  ShoppingBag, 
  Layers, 
  Sparkles, 
  Box, 
  FileText 
} from 'lucide-react';

export const BouquetBuilder = () => {
  const { addToCart, setIsCartOpen } = useStore();

  // Customization States
  const [selectedRice, setSelectedRice] = useState(MAIN_STAPLES[0]);
  const [packageCount, setPackageCount] = useState(1);
  const [selectedOil, setSelectedOil] = useState(OIL_OPTIONS[0]);
  const [selectedNoodle, setSelectedNoodle] = useState(NOODLE_OPTIONS[0]);
  const [selectedPackaging, setSelectedPackaging] = useState(PACKAGING_OPTIONS[0]);
  const [selectedAddons, setSelectedAddons] = useState(['add_sugar', 'add_tea']);
  const [cardMessage, setCardMessage] = useState(
    'Bismillah, semoga paket sembako berkah ini bermanfaat dan membawa rezeki berlimpah untuk keluarga.'
  );
  const [activeStep, setActiveStep] = useState(1);

  // Toggle Addon
  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  // Price Calculation per packet
  const ricePrice = selectedRice.price;
  const oilPrice = selectedOil ? selectedOil.price : 0;
  const noodlePrice = selectedNoodle ? selectedNoodle.price : 0;
  const packagingPrice = selectedPackaging ? selectedPackaging.extraPrice : 0;
  const addonsPrice = selectedAddons.reduce((sum, id) => {
    const addon = SNACK_ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const pricePerPackage = ricePrice + oilPrice + noodlePrice + packagingPrice + addonsPrice;
  const totalPrice = pricePerPackage * packageCount;

  // Handle Add to Cart
  const handleAddToCart = () => {
    const customItem = {
      id: `custom-package-${Date.now()}`,
      name: `Paket Sembako Berkah (${selectedRice.name.split(' (')[0]})`,
      price: pricePerPackage,
      image: selectedRice.image,
      isCustom: true
    };

    const customDetails = {
      rice: selectedRice.name,
      oil: selectedOil ? selectedOil.name : 'Tanpa Minyak',
      noodle: selectedNoodle ? selectedNoodle.name : 'Tanpa Mie',
      packaging: selectedPackaging.name,
      addons: selectedAddons.map(id => SNACK_ADDONS.find(a => a.id === id)?.name).filter(Boolean)
    };

    addToCart(customItem, packageCount, customDetails, '', cardMessage);
    setIsCartOpen(true);
  };

  return (
    <div style={{ padding: '16px 16px 30px 16px' }}>
      {/* Header Studio */}
      <div style={{
        background: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        borderRadius: '20px',
        padding: '18px 16px',
        color: '#FFFFFF',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '20px' }}>📦</span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '19px',
            fontWeight: '800',
            letterSpacing: '-0.2px'
          }}>
            Studio Racik Paket Sembako
          </h2>
        </div>
        <p style={{ fontSize: '12px', opacity: 0.92, lineHeight: 1.35 }}>
          Buat sendiri paket sembako sedekah Jum'at Berkah atau belanja bulanan sesuai kebutuhan & budgetmu!
        </p>
      </div>

      {/* Real-time Dynamic Package Preview Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '22px',
        padding: '16px',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '18px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '800',
            color: '#15803D',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Rincian Paket Racikan
          </span>
          <span style={{
            fontSize: '16px',
            fontWeight: '800',
            color: '#15803D'
          }}>
            {formatRupiah(totalPrice)} {packageCount > 1 && `(${packageCount} Paket)`}
          </span>
        </div>

        {/* Visual Simulated Mockup Box */}
        <div style={{
          borderRadius: '16px',
          backgroundColor: selectedPackaging.id === 'pack_spunbond' ? '#DCFCE7' : '#FEF3C7',
          border: '2px solid rgba(21, 128, 61, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '14px 12px'
        }}>
          {/* Main Staple Image & Badge */}
          <div style={{
            width: '75px',
            height: '75px',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '2px solid #FFFFFF',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            marginBottom: '8px'
          }}>
            <img 
              src={selectedRice.image} 
              alt={selectedRice.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* Details Pill */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11.5px',
            fontWeight: '700',
            color: '#0F172A',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>🍚 {selectedRice.weight}</span>
            <span>•</span>
            <span style={{ color: '#15803D' }}>{selectedOil?.name.split(' ')[2] || 'Minyak'}</span>
            <span>•</span>
            <span style={{ color: '#EA580C' }}>{selectedNoodle?.name.split(' ')[0]}</span>
          </div>

          {/* Packaging Tag */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '12px',
            backgroundColor: '#15803D',
            color: '#FFFFFF',
            fontSize: '9.5px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: '6px'
          }}>
            🛍️ {selectedPackaging.name.split(' ')[0]} {selectedPackaging.name.split(' ')[1]}
          </div>

          {/* Add-ons Icons */}
          {selectedAddons.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              display: 'flex',
              gap: '4px'
            }}>
              {selectedAddons.map(id => (
                <span key={id} style={{
                  backgroundColor: '#FFFFFF',
                  padding: '3px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {id === 'add_sugar' ? '🍬' : id === 'add_egg' ? '🥚' : id === 'add_biscuit' ? '🍪' : id === 'add_coffee' ? '☕' : '🫖'}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Specs Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
          marginTop: '12px',
          fontSize: '11px',
          color: '#64748B'
        }}>
          <div>• Beras: <strong style={{ color: '#0F172A' }}>{selectedRice.name.split(' ')[0]} {selectedRice.weight}</strong></div>
          <div>• Minyak: <strong style={{ color: '#0F172A' }}>{selectedOil?.name.split(' ')[2]} {selectedOil?.name.split(' ')[4]}</strong></div>
          <div>• Mie: <strong style={{ color: '#0F172A' }}>{selectedNoodle?.name.split(' (')[0]}</strong></div>
          <div>• Tambahan: <strong style={{ color: '#0F172A' }}>{selectedAddons.length} item dipilih</strong></div>
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginBottom: '16px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }} className="hide-scrollbar">
        {[
          { step: 1, label: '1. Pilihan Beras', icon: '🍚' },
          { step: 2, label: '2. Minyak & Mie', icon: '🍳' },
          { step: 3, label: '3. Kemasan & Snack', icon: '🛍️' },
          { step: 4, label: '4. Kartu Pesan/Doa', icon: '💌' }
        ].map(item => (
          <button
            key={item.step}
            onClick={() => setActiveStep(item.step)}
            className="btn-touch"
            style={{
              padding: '8px 12px',
              borderRadius: '12px',
              border: activeStep === item.step ? '1.5px solid #15803D' : '1px solid #E2E8F0',
              backgroundColor: activeStep === item.step ? '#DCFCE7' : '#FFFFFF',
              color: activeStep === item.step ? '#15803D' : '#64748B',
              fontSize: '12px',
              fontWeight: activeStep === item.step ? '700' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* STEP 1: PILIHAN BERAS & JUMLAH PAKET */}
      {activeStep === 1 && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '14px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '4px' }}>
              Pilih Beras Pokok
            </h4>
            <p style={{ fontSize: '11.5px', color: '#64748B' }}>
              Pilih ukuran beras yang ingin dimasukkan ke dalam paket
            </p>
          </div>

          {/* Rice Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {MAIN_STAPLES.map(rice => {
              const isSelected = selectedRice.id === rice.id;
              return (
                <div
                  key={rice.id}
                  onClick={() => setSelectedRice(rice)}
                  className="btn-touch"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '10px 8px',
                    border: isSelected ? '2px solid #15803D' : '1px solid var(--border-color)',
                    boxShadow: isSelected ? '0 4px 12px rgba(21, 128, 61, 0.18)' : 'var(--shadow-sm)',
                    cursor: 'pointer',
                    position: 'relative',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ height: '55px', borderRadius: '8px', overflow: 'hidden', marginBottom: '6px' }}>
                    <img src={rice.image} alt={rice.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h5 style={{ fontSize: '11.5px', fontWeight: '700', color: '#0F172A', lineHeight: 1.2, marginBottom: '2px' }}>
                    {rice.weight}
                  </h5>
                  <div style={{ fontSize: '11px', color: '#15803D', fontWeight: '800' }}>
                    {formatRupiah(rice.price)}
                  </div>

                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      backgroundColor: '#15803D',
                      color: '#FFF',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Package Count Stepper */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                  Jumlah Paket yang Dipesan
                </h5>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Total: {packageCount} paket ({formatRupiah(pricePerPackage * packageCount)})
                </span>
              </div>

              {/* Stepper Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setPackageCount(Math.max(1, packageCount - 1))}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Minus size={15} />
                </button>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#15803D', minWidth: '24px', textAlign: 'center' }}>
                  {packageCount}
                </span>
                <button
                  onClick={() => setPackageCount(packageCount + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#15803D',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingTop: '6px' }} className="hide-scrollbar">
              {[1, 3, 5, 10, 20, 50].map(count => (
                <button
                  key={count}
                  onClick={() => setPackageCount(count)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '10px',
                    border: packageCount === count ? '1.5px solid #15803D' : '1px solid #E2E8F0',
                    backgroundColor: packageCount === count ? '#15803D' : '#F8FAFC',
                    color: packageCount === count ? '#FFFFFF' : '#334155',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {count} Paket {count === 10 ? '⭐ Sedekah' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: MINYAK & MIE INSTAN */}
      {activeStep === 2 && (
        <div className="animate-fade-in">
          {/* Oils */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '6px' }}>
              Pilih Minyak Goreng
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {OIL_OPTIONS.map(oil => {
                const isSelected = selectedOil?.id === oil.id;
                return (
                  <div
                    key={oil.id}
                    onClick={() => setSelectedOil(oil)}
                    className="btn-touch"
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      backgroundColor: isSelected ? '#DCFCE7' : '#FFFFFF',
                      border: isSelected ? '1.5px solid #15803D' : '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                        {oil.name}
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>
                        {oil.tag}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#15803D' }}>
                        +{formatRupiah(oil.price)}
                      </div>
                      {isSelected && <span style={{ color: '#15803D', fontSize: '11px', fontWeight: 'bold' }}>✓ Terpilih</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Noodles */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '6px' }}>
              Pilih Mie Instan
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {NOODLE_OPTIONS.map(noodle => {
                const isSelected = selectedNoodle?.id === noodle.id;
                return (
                  <div
                    key={noodle.id}
                    onClick={() => setSelectedNoodle(noodle)}
                    className="btn-touch"
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      backgroundColor: isSelected ? '#DCFCE7' : '#FFFFFF',
                      border: isSelected ? '1.5px solid #15803D' : '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                        {noodle.name}
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>
                        {noodle.tag}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#15803D' }}>
                        +{formatRupiah(noodle.price)}
                      </div>
                      {isSelected && <span style={{ color: '#15803D', fontSize: '11px', fontWeight: 'bold' }}>✓ Terpilih</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: KEMASAN & SNACK ADDONS */}
      {activeStep === 3 && (
        <div className="animate-fade-in">
          {/* Packaging */}
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '8px' }}>
              Jenis Kemasan Paket
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PACKAGING_OPTIONS.map(pack => {
                const isSelected = selectedPackaging.id === pack.id;
                return (
                  <div
                    key={pack.id}
                    onClick={() => setSelectedPackaging(pack)}
                    className="btn-touch"
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      backgroundColor: isSelected ? '#DCFCE7' : '#FFFFFF',
                      border: isSelected ? '1.5px solid #15803D' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>
                        {pack.id === 'pack_spunbond' ? '🛍️' : pack.id === 'pack_box' ? '📦' : '📜'}
                      </span>
                      <span style={{ fontSize: '12.5px', fontWeight: isSelected ? '700' : '500', color: '#0F172A' }}>
                        {pack.name}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#15803D' }}>
                      {pack.extraPrice > 0 ? `+${formatRupiah(pack.extraPrice)}` : 'Gratis'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Snack & Sembako Add-ons */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '6px' }}>
              Tambahan Sembako, Snack & Bumbu
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SNACK_ADDONS.map(addon => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className="btn-touch"
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      backgroundColor: isChecked ? '#FEF9C3' : '#FFFFFF',
                      border: isChecked ? '1.5px solid #F59E0B' : '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '18px' }}>
                        {addon.id === 'add_sugar' ? '🍬' : addon.id === 'add_egg' ? '🥚' : addon.id === 'add_biscuit' ? '🍪' : addon.id === 'add_coffee' ? '☕' : addon.id === 'add_tea' ? '🫖' : '🧂'}
                      </span>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#0F172A' }}>
                          {addon.name}
                        </div>
                        <span style={{ fontSize: '11px', color: '#B45309', fontWeight: '700' }}>
                          +{formatRupiah(addon.price)}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: isChecked ? 'none' : '2px solid #CBD5E1',
                      backgroundColor: isChecked ? '#15803D' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF'
                    }}>
                      {isChecked && <Check size={14} strokeWidth={3} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: KARTU PESAN / DOA SEDEKAH */}
      {activeStep === 4 && (
        <div className="animate-fade-in">
          <div style={{ marginBottom: '12px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '4px' }}>
              Pesan / Doa Sedekah & Hadiah 💌
            </h4>
            <p style={{ fontSize: '11.5px', color: '#64748B' }}>
              Pilih template doa sedekah atau tulis sendiri pesan untuk penerima
            </p>
          </div>

          {/* Templates Quick Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
            {CARD_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                onClick={() => setCardMessage(tmpl.text)}
                className="btn-touch"
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: cardMessage === tmpl.text ? '#DCFCE7' : '#FFFFFF',
                  color: '#0F172A',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <strong>{tmpl.title}</strong>
              </button>
            ))}
          </div>

          {/* Text Area Card Message */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '12px',
            border: '1.5px solid #15803D',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#15803D', display: 'block', marginBottom: '6px' }}>
              Teks yang Dicantumkan di Paket:
            </label>
            <textarea
              rows={4}
              value={cardMessage}
              onChange={(e) => setCardMessage(e.target.value)}
              placeholder="Tulis pesan atau doa di sini..."
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '12.5px',
                lineHeight: 1.4,
                color: '#0F172A',
                resize: 'none',
                backgroundColor: 'transparent'
              }}
            />
          </div>
        </div>
      )}

      {/* Floating Bottom Action Bar */}
      <div style={{
        marginTop: '22px',
        padding: '14px',
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Total ({packageCount} Paket):</span>
          <span style={{ fontSize: '17px', fontWeight: '800', color: '#15803D', lineHeight: 1 }}>
            {formatRupiah(totalPrice)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-touch"
          style={{
            flex: 1,
            padding: '12px 18px',
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
            gap: '8px',
            boxShadow: '0 6px 16px rgba(21, 128, 61, 0.35)'
          }}
        >
          <ShoppingBag size={18} />
          <span>Masukkan ke Keranjang</span>
        </button>
      </div>
    </div>
  );
};
