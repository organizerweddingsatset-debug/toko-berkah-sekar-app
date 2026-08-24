import React from 'react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah, generateWhatsAppOrderMessage } from '../../utils/formatters';
import { 
  X, 
  Printer, 
  Send, 
  PackageCheck, 
  CheckCircle2, 
  ShoppingCart,
  MapPin,
  Calendar,
  Phone
} from 'lucide-react';

export const ReceiptModal = () => {
  const { 
    activeReceiptOrder, 
    setActiveReceiptOrder, 
    storeSettings, 
    setActiveTab, 
    showToast 
  } = useStore();

  if (!activeReceiptOrder) return null;

  const handlePrint = () => {
    window.print();
    showToast('Membuka dialog cetak struk...');
  };

  const handleSendWhatsApp = () => {
    const waUrl = generateWhatsAppOrderMessage(activeReceiptOrder, storeSettings);
    window.open(waUrl, '_blank');
  };

  const handleTrackOrder = () => {
    setActiveReceiptOrder(null);
    setActiveTab('orders');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div 
        className="animate-slide-up"
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '400px',
          maxHeight: '92vh',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}
      >
        {/* Header Close */}
        <div style={{
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #E2E8F0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={18} color="#15803D" />
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#14532D' }}>
              Pesanan Sembako Diterima
            </span>
          </div>
          <button
            onClick={() => setActiveReceiptOrder(null)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#F8FAFC',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Receipt Slip Content */}
        <div style={{
          padding: '18px 20px',
          overflowY: 'auto',
          flex: 1,
          fontFamily: 'monospace'
        }}>
          {/* Store Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <div style={{ fontSize: '26px', marginBottom: '2px' }}>🛒</div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '17px',
              fontWeight: '800',
              color: '#14532D',
              letterSpacing: '-0.2px'
            }}>
              {storeSettings.name}
            </h3>
            <p style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.3, marginTop: '2px' }}>
              {storeSettings.address}
            </p>
            <p style={{ fontSize: '10.5px', color: '#64748B' }}>
              WA: +{storeSettings.phone} • {storeSettings.openingHours}
            </p>
          </div>

          <div style={{ borderTop: '1px dashed #94A3B8', margin: '10px 0' }} />

          {/* Invoice Meta */}
          <div style={{ fontSize: '11.5px', color: '#0F172A', lineHeight: 1.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>No. Invoice:</span>
              <strong>#{activeReceiptOrder.id}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Waktu Belanja:</span>
              <span>{activeReceiptOrder.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Pembayaran:</span>
              <strong style={{ textTransform: 'uppercase', color: '#15803D' }}>{activeReceiptOrder.paymentMethod}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Status:</span>
              <strong style={{ color: '#15803D' }}>{activeReceiptOrder.statusText || 'Disiapkan'}</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #94A3B8', margin: '10px 0' }} />

          {/* Recipient & Schedule */}
          <div style={{ fontSize: '11.5px', color: '#0F172A', lineHeight: 1.5, backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px' }}>
            <div><strong>Pembeli:</strong> {activeReceiptOrder.customerName} ({activeReceiptOrder.customerPhone})</div>
            <div><strong>Pengantaran:</strong> {activeReceiptOrder.deliveryAddress}</div>
            <div><strong>Waktu Antar:</strong> {activeReceiptOrder.deliveryDate} ({activeReceiptOrder.deliverySlot})</div>
            {activeReceiptOrder.courierNote && (
              <div style={{ fontStyle: 'italic', color: '#64748B', marginTop: '2px' }}>
                Note: "{activeReceiptOrder.courierNote}"
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px dashed #94A3B8', margin: '10px 0' }} />

          {/* Items Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px' }}>
            {activeReceiptOrder.items.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>{formatRupiah(item.price * item.quantity)}</span>
                </div>
                {item.customDetails && (
                  <div style={{ fontSize: '10px', color: '#15803D', paddingLeft: '8px' }}>
                    • {item.customDetails.rice}, {item.customDetails.oil}, {item.customDetails.noodle}
                  </div>
                )}
                {item.greetingCard && (
                  <div style={{ fontSize: '10px', color: '#64748B', fontStyle: 'italic', paddingLeft: '8px' }}>
                    💌 Pesan: "{item.greetingCard}"
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px dashed #94A3B8', margin: '10px 0' }} />

          {/* Totals */}
          <div style={{ fontSize: '11.5px', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>{formatRupiah(activeReceiptOrder.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Ongkir:</span>
              <span>{activeReceiptOrder.deliveryFee === 0 ? 'Gratis' : formatRupiah(activeReceiptOrder.deliveryFee)}</span>
            </div>
            {activeReceiptOrder.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#EA580C' }}>
                <span>Diskon:</span>
                <span>-{formatRupiah(activeReceiptOrder.discount)}</span>
              </div>
            )}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              fontWeight: '800',
              color: '#14532D',
              paddingTop: '4px',
              borderTop: '1px solid #0F172A'
            }}>
              <span>TOTAL BAYAR:</span>
              <span style={{ color: '#15803D' }}>{formatRupiah(activeReceiptOrder.total)}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '10.5px', color: '#64748B' }}>
            Terima kasih telah berbelanja di <strong>Toko Berkah Sekar</strong>. Semoga berkah! 🛒
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <button
            onClick={handleSendWhatsApp}
            className="btn-touch"
            style={{
              padding: '10px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontSize: '12.5px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Send size={15} />
            <span>Kirim Struk ke WhatsApp Toko Berkah Sekar</span>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={handlePrint}
              className="btn-touch"
              style={{
                padding: '8px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                color: '#0F172A',
                fontSize: '11.5px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Printer size={14} />
              <span>Cetak Struk</span>
            </button>

            <button
              onClick={handleTrackOrder}
              className="btn-touch"
              style={{
                padding: '8px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#15803D',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <PackageCheck size={14} />
              <span>Lacak Belanjaan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
