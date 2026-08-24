import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah, generateWhatsAppOrderMessage } from '../../utils/formatters';
import { 
  PackageCheck, 
  Search, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  FileText, 
  MessageCircle, 
  ChevronRight,
  MapPin,
  Calendar,
  Zap,
  ShoppingBag
} from 'lucide-react';

export const OrderTracker = () => {
  const { orders, setActiveReceiptOrder, storeSettings, setActiveTab } = useStore();
  const [searchInvoice, setSearchInvoice] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  const statusSteps = [
    { key: 'received', title: 'Pesanan Diterima', desc: 'Pesanan masuk ke sistem kasir warung' },
    { key: 'processing', title: 'Belanjaan Sedang Disiapkan', desc: 'Staf sedang mempacking sembako & snack' },
    { key: 'shipping', title: 'Kurir Menuju Alamat Rumah', desc: 'Kurir warung dalam perjalanan kilat' },
    { key: 'completed', title: 'Belanjaan Diterima & Selesai', desc: 'Barang sembako telah diterima dengan baik' }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipping': return 2;
      case 'completed': return 3;
      default: return 1;
    }
  };

  const filteredOrders = searchInvoice.trim() === ''
    ? orders
    : orders.filter(o => o.id.toLowerCase().includes(searchInvoice.toLowerCase()) || o.recipientName.toLowerCase().includes(searchInvoice.toLowerCase()));

  const activeOrder = selectedOrder || orders[0];

  return (
    <div style={{ padding: '16px 16px 30px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '20px',
          fontWeight: '800',
          color: '#14532D',
          letterSpacing: '-0.3px'
        }}>
          Pelacakan Belanjaan 📦
        </h2>
        <p style={{ fontSize: '12px', color: '#64748B' }}>
          Pantau status penyiapan dan pengantaran sembako secara langsung
        </p>
      </div>

      {/* Search Invoice Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        padding: '8px 12px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border-color)',
        marginBottom: '16px'
      }}>
        <Search size={16} color="#15803D" style={{ marginRight: '8px' }} />
        <input
          type="text"
          placeholder="Cari No. Invoice (misal: BS-2026-9012)..."
          value={searchInvoice}
          onChange={(e) => setSearchInvoice(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            fontSize: '12.5px',
            fontFamily: 'inherit',
            color: '#0F172A'
          }}
        />
      </div>

      {/* If No Orders */}
      {orders.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px dashed #CBD5E1'
        }}>
          <div style={{ fontSize: '42px', marginBottom: '8px' }}>🛒</div>
          <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#14532D' }}>Belum ada pesanan aktif</h4>
          <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
            Sembako yang Anda pesan akan tampil di sini untuk dilacak status pengantarannya.
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="btn-touch"
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#15803D',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Mulai Belanja Sembako
          </button>
        </div>
      ) : (
        <>
          {/* Active Selected Order Tracking Card */}
          {activeOrder && (
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '22px',
              padding: '18px 16px',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '18px'
            }}>
              {/* Top Banner Status */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '12px',
                borderBottom: '1px solid #E2E8F0',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                    NO. INVOICE
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#14532D' }}>
                    #{activeOrder.id}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    {activeOrder.date}
                  </div>
                </div>

                <span style={{
                  backgroundColor: activeOrder.status === 'completed' ? '#DCFCE7' : '#FEF3C7',
                  color: activeOrder.status === 'completed' ? '#15803D' : '#B45309',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '4px 10px',
                  borderRadius: '20px'
                }}>
                  {activeOrder.statusText || 'Sedang Disiapkan'}
                </span>
              </div>

              {/* Progress Stepper */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
                  {statusSteps.map((step, idx) => {
                    const currentIndex = getStepIndex(activeOrder.status);
                    const isDone = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div key={step.key} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: isDone ? '#15803D' : '#F1F5F9',
                          color: isDone ? '#FFFFFF' : '#94A3B8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '800',
                          flexShrink: 0,
                          zIndex: 2,
                          boxShadow: isCurrent ? '0 0 0 4px #DCFCE7' : 'none'
                        }}>
                          {isDone ? '✓' : idx + 1}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: '12.5px',
                            fontWeight: isCurrent ? '800' : isDone ? '700' : '500',
                            color: isDone ? '#0F172A' : '#94A3B8'
                          }}>
                            {step.title}
                          </div>
                          <div style={{ fontSize: '11px', color: isDone ? '#64748B' : '#CBD5E1' }}>
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recipient & Schedule Info */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '14px',
                padding: '12px',
                fontSize: '11.5px',
                color: '#334155',
                marginBottom: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="#15803D" />
                  <span><strong>Tujuan:</strong> {activeOrder.deliveryAddress}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={13} color="#EA580C" />
                  <span><strong>Layanan:</strong> {activeOrder.deliveryType === 'express' ? 'Kurir Antar Kilat 30 Menit' : activeOrder.deliveryType === 'pickup' ? 'Ambil di Warung' : 'Kurir Reguler'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => setActiveReceiptOrder(activeOrder)}
                  className="btn-touch"
                  style={{
                    padding: '9px',
                    borderRadius: '12px',
                    border: '1px solid #15803D',
                    backgroundColor: '#FFFFFF',
                    color: '#15803D',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <FileText size={14} />
                  <span>Lihat Struk</span>
                </button>

                <button
                  onClick={() => {
                    const url = generateWhatsAppOrderMessage(activeOrder, storeSettings);
                    window.open(url, '_blank');
                  }}
                  className="btn-touch"
                  style={{
                    padding: '9px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <MessageCircle size={14} />
                  <span>Hubungi Toko</span>
                </button>
              </div>
            </div>
          )}

          {/* Orders History List */}
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '10px' }}>
            Riwayat Belanjaan ({filteredOrders.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredOrders.map(order => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="btn-touch"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  border: activeOrder?.id === order.id ? '2px solid #15803D' : '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                    #{order.id} • {order.customerName}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    {order.items.length} jenis belanjaan • {formatRupiah(order.total)} • {order.date.split(' ')[0]}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: '700',
                    color: order.status === 'completed' ? '#15803D' : '#EA580C',
                    backgroundColor: order.status === 'completed' ? '#DCFCE7' : '#FFEDD5',
                    padding: '2px 8px',
                    borderRadius: '8px'
                  }}>
                    {order.statusText || 'Diproses'}
                  </span>
                  <ChevronRight size={16} color="#94A3B8" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
