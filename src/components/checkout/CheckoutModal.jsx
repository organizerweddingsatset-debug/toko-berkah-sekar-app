import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah, generateWhatsAppOrderMessage } from '../../utils/formatters';
import QRCode from 'qrcode';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  CreditCard, 
  Send, 
  Copy, 
  Check, 
  User, 
  QrCode as QrIcon, 
  Zap, 
  Store,
  Banknote
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    cart, 
    cartSubtotal, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    createOrder, 
    storeSettings,
    showToast 
  } = useStore();

  // Form State
  const [customerName, setCustomerName] = useState('Ibu Rahmawati');
  const [customerPhone, setCustomerPhone] = useState('081298765432');
  const [recipientName, setRecipientName] = useState('Ibu Rahmawati');
  const [recipientPhone, setRecipientPhone] = useState('081298765432');
  const [deliveryAddress, setDeliveryAddress] = useState('Jl. Melati 3 No. 24 RT 04/RW 02 (Pagar Hitam, Depan Pos Ronda), Cilandak');
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState('Sekarang (30-60 Menit Langsung Antar)');
  const [deliveryType, setDeliveryType] = useState('express'); // express (10k), regular (5k), pickup (0)
  const [courierNote, setCourierNote] = useState('Pagar warna hitam, kalau pagar tertutup tolong pencet bel');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, qris, bank
  const [copiedBank, setCopiedBank] = useState(null);
  const [qrisDataUrl, setQrisDataUrl] = useState('');

  // Delivery Fee (Free shipping if belanja >= Rp 150.000)
  const isFreeDelivery = cartSubtotal >= 150000;
  const deliveryFee = deliveryType === 'pickup' 
    ? 0 
    : isFreeDelivery 
      ? 0 
      : deliveryType === 'express' ? 10000 : 5000;

  const discount = 0;
  const totalPayment = Math.max(0, cartSubtotal + deliveryFee - discount);

  // Generate QRIS QR code image
  useEffect(() => {
    if (paymentMethod === 'qris') {
      const qrisPayload = `00020101021226610016ID.CO.QRIS.WWW011893600000000000000002150000000000000000520458125303360540${totalPayment}5802ID5923TOKO BERKAH SEKAR6007JAKARTA6304`;
      QRCode.toDataURL(qrisPayload, { width: 220, margin: 1 }, (err, url) => {
        if (!err) setQrisDataUrl(url);
      });
    }
  }, [paymentMethod, totalPayment]);

  if (!isCheckoutOpen) return null;

  const handleCopyAccount = (number, bankName) => {
    navigator.clipboard.writeText(number);
    setCopiedBank(bankName);
    showToast(`Nomor Rekening ${bankName} berhasil disalin! 📋`);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleCompleteOrder = (openWhatsApp = false) => {
    if (!recipientName.trim() || !recipientPhone.trim() || (deliveryType !== 'pickup' && !deliveryAddress.trim())) {
      showToast('Mohon lengkapi nama, no WhatsApp, dan alamat antar rumah', 'warning');
      return;
    }

    const orderData = {
      customerName,
      customerPhone,
      recipientName,
      recipientPhone,
      deliveryAddress: deliveryType === 'pickup' ? 'Ambil di Toko/Warung Berkah Sekar' : deliveryAddress,
      deliveryDate,
      deliverySlot,
      deliveryType,
      courierNote,
      items: cart,
      subtotal: cartSubtotal,
      deliveryFee,
      discount,
      total: totalPayment,
      paymentMethod
    };

    const newOrder = createOrder(orderData);

    if (openWhatsApp) {
      const waUrl = generateWhatsAppOrderMessage(newOrder, storeSettings);
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.65)',
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
          maxHeight: '94vh',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#FFFFFF'
        }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#14532D' }}>
              Pengantaran & Pembayaran 📦
            </h3>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              Toko Kelontong Berkah Sekar
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
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

        {/* Form Body Scrollable */}
        <div style={{
          padding: '16px',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* SECTION 1: DATA PEMESAN */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '14px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#14532D', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="#15803D" />
              <span>Data Pembeli</span>
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    setRecipientName(e.target.value);
                  }}
                  placeholder="Nama Pembeli"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                  No. WhatsApp *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    setRecipientPhone(e.target.value);
                  }}
                  placeholder="08xxxxxxxxxx"
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: LOKASI & JENIS PENGANTARAN */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '14px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#14532D', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={15} color="#15803D" />
              <span>Metode Pengantaran</span>
            </h4>

            {/* Delivery Type Option */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '12px' }}>
              {[
                { id: 'express', title: 'Antar Kilat', subtitle: '30-60 Menit', fee: isFreeDelivery ? 0 : 10000, icon: '⚡' },
                { id: 'regular', title: 'Reguler', subtitle: 'Jadwal Hari Ini', fee: isFreeDelivery ? 0 : 5000, icon: '🚚' },
                { id: 'pickup', title: 'Ambil Sendiri', subtitle: 'Di Warung', fee: 0, icon: '🏪' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDeliveryType(opt.id)}
                  className="btn-touch"
                  style={{
                    padding: '8px 4px',
                    borderRadius: '12px',
                    border: deliveryType === opt.id ? '2px solid #15803D' : '1px solid #E2E8F0',
                    backgroundColor: deliveryType === opt.id ? '#DCFCE7' : '#FFFFFF',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '15px' }}>{opt.icon}</div>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{opt.title}</div>
                  <div style={{ fontSize: '9.5px', color: '#64748B' }}>{opt.subtitle}</div>
                  <div style={{ fontSize: '10px', color: '#15803D', fontWeight: '700', marginTop: '2px' }}>
                    {opt.fee === 0 ? 'Gratis Ongkir' : formatRupiah(opt.fee)}
                  </div>
                </button>
              ))}
            </div>

            {deliveryType !== 'pickup' ? (
              <>
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                    Alamat Rumah & Patokan *
                  </label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Nama Jalan, No. Rumah, RT/RW, Warna Pagar / Patokan Warung..."
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '3px' }}>
                    Catatan Untuk Kurir
                  </label>
                  <input
                    type="text"
                    value={courierNote}
                    onChange={(e) => setCourierNote(e.target.value)}
                    placeholder="Contoh: Titip di teras jika rumah kosong / Telepon jika sampai"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                </div>
              </>
            ) : (
              <div style={{
                backgroundColor: '#DCFCE7',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '11.5px',
                color: '#14532D',
                lineHeight: 1.4
              }}>
                📍 <strong>Alamat Toko:</strong> {storeSettings.address} (Buka {storeSettings.openingHours})
              </div>
            )}
          </div>

          {/* SECTION 3: METODE PEMBAYARAN */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '14px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#14532D', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={15} color="#15803D" />
              <span>Pilihan Pembayaran</span>
            </h4>

            {/* Payment Options Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '12px' }}>
              {[
                { id: 'cod', label: 'Bayar Tunai (COD)', icon: '💵' },
                { id: 'qris', label: 'QRIS Instan', icon: '📲' },
                { id: 'bank', label: 'Transfer Bank', icon: '🏦' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPaymentMethod(opt.id)}
                  className="btn-touch"
                  style={{
                    padding: '8px 4px',
                    borderRadius: '12px',
                    border: paymentMethod === opt.id ? '2px solid #15803D' : '1px solid #E2E8F0',
                    backgroundColor: paymentMethod === opt.id ? '#DCFCE7' : '#FFFFFF',
                    fontSize: '11.5px',
                    fontWeight: paymentMethod === opt.id ? '800' : '500',
                    color: '#0F172A',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '16px' }}>{opt.icon}</div>
                  <div style={{ marginTop: '2px' }}>{opt.label}</div>
                </button>
              ))}
            </div>

            {/* COD Info */}
            {paymentMethod === 'cod' && (
              <div style={{
                backgroundColor: '#FEF3C7',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#92400E',
                lineHeight: 1.4
              }}>
                💵 <strong>Bayar di Tempat (COD):</strong> Bayar langsung ke abang kurir saat sembako & belanjaan tiba di rumah Anda.
              </div>
            )}

            {/* QRIS Interactive Box */}
            {paymentMethod === 'qris' && (
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                padding: '14px',
                textAlign: 'center',
                border: '1px solid #CBD5E1'
              }} className="animate-fade-in">
                <div style={{ display: 'inline-block', backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', marginBottom: '8px' }}>
                  {qrisDataUrl ? (
                    <img src={qrisDataUrl} alt="QRIS Berkah Sekar" style={{ width: '160px', height: '160px', display: 'block' }} />
                  ) : (
                    <div style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrIcon size={48} color="#15803D" />
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#14532D' }}>
                  {storeSettings.name.toUpperCase()}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Bisa di-scan dari BCA, Mandiri, BRI, GoPay, OVO, ShopeePay & DANA
                </div>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginTop: '8px'
                }}>
                  Nominal Pas: {formatRupiah(totalPayment)}
                </div>
              </div>
            )}

            {/* Bank Transfer Box */}
            {paymentMethod === 'bank' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} className="animate-fade-in">
                {storeSettings.bankAccounts.map((b, idx) => (
                  <div 
                    key={idx}
                    style={{
                      backgroundColor: '#F8FAFC',
                      padding: '10px 12px',
                      borderRadius: '12px',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#15803D', backgroundColor: '#DCFCE7', padding: '2px 6px', borderRadius: '4px' }}>
                        {b.bank}
                      </span>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A', marginTop: '3px' }}>
                        {b.number}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                        a.n {b.owner}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyAccount(b.number, b.bank)}
                      className="btn-touch"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid #15803D',
                        backgroundColor: copiedBank === b.bank ? '#15803D' : '#FFFFFF',
                        color: copiedBank === b.bank ? '#FFFFFF' : '#15803D',
                        fontSize: '11px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {copiedBank === b.bank ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedBank === b.bank ? 'Tersalin' : 'Salin Rekening'}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 4: PAYMENT SUMMARY */}
          <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '18px',
            padding: '14px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '12.5px', fontWeight: '700', color: '#14532D', marginBottom: '8px' }}>
              Ringkasan Pembayaran
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Subtotal ({cart.length} barang):</span>
                <span>{formatRupiah(cartSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Ongkos Kirim:</span>
                <span>{deliveryFee === 0 ? 'Gratis Ongkir' : formatRupiah(deliveryFee)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px',
                fontWeight: '800',
                color: '#14532D',
                paddingTop: '8px',
                borderTop: '1px dashed #CBD5E1',
                marginTop: '4px'
              }}>
                <span>TOTAL AKHIR:</span>
                <span style={{ color: '#15803D' }}>{formatRupiah(totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div style={{
          padding: '14px 16px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Main Primary: Send Order to WhatsApp */}
          <button
            onClick={() => handleCompleteOrder(true)}
            className="btn-touch"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '14px',
              border: 'none',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontSize: '13.5px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 6px 16px rgba(37, 211, 102, 0.35)'
            }}
          >
            <Send size={16} />
            <span>Kirim Pesanan ke WhatsApp Toko Berkah Sekar</span>
          </button>

          {/* Secondary: Instant Confirmation & Digital Receipt */}
          <button
            onClick={() => handleCompleteOrder(false)}
            className="btn-touch"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '14px',
              border: '1.5px solid #15803D',
              backgroundColor: '#FFFFFF',
              color: '#15803D',
              fontSize: '12.5px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Konfirmasi & Cetak Struk Belanja</span>
          </button>
        </div>
      </div>
    </div>
  );
};
