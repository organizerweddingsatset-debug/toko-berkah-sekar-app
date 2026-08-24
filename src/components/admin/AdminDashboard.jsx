import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatRupiah } from '../../utils/formatters';
import { 
  UserCog, 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  CheckCircle2, 
  Clock, 
  Store, 
  DollarSign,
  AlertCircle,
  X,
  Phone,
  MapPin,
  Sparkles,
  Truck
} from 'lucide-react';

export const AdminDashboard = () => {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus,
    storeSettings,
    setStoreSettings,
    showToast 
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState('orders'); // stats, products, orders, settings
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('sembako');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdTag, setNewProdTag] = useState('Produk Baru');
  const [newProdStock, setNewProdStock] = useState('50');

  // Store Settings Form State
  const [settingsPhone, setSettingsPhone] = useState(storeSettings.phone);
  const [settingsAddress, setSettingsAddress] = useState(storeSettings.address);
  const [settingsOpeningHours, setSettingsOpeningHours] = useState(storeSettings.openingHours);

  // Statistics Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;

  const handleSaveNewProduct = (e) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) {
      showToast('Mohon lengkapi nama sembako/snack dan harga', 'warning');
      return;
    }

    const newProd = {
      name: newProdName,
      category: newProdCategory,
      price: parseInt(newProdPrice, 10),
      originalPrice: newProdOriginalPrice ? parseInt(newProdOriginalPrice, 10) : parseInt(newProdPrice, 10),
      image: newProdImage,
      description: newProdDescription || 'Kebutuhan pokok dan camilan segar Toko Berkah Sekar.',
      tag: newProdTag,
      tagType: 'fresh',
      rating: 5.0,
      soldCount: 0,
      stock: parseInt(newProdStock, 10) || 50,
      features: ['Kualitas Terjamin & Fresh', 'Kemasan Rapi & Bersih', 'Harga Grosir/Eceran Murah']
    };

    addProduct(newProd);
    setShowAddProductModal(false);
    // Reset
    setNewProdName('');
    setNewProdPrice('');
    setNewProdOriginalPrice('');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setStoreSettings(prev => ({
      ...prev,
      phone: settingsPhone,
      address: settingsAddress,
      openingHours: settingsOpeningHours
    }));
    showToast('Pengaturan Toko Berkah Sekar berhasil disimpan! ⚙️');
  };

  return (
    <div style={{ padding: '16px 16px 30px 16px' }}>
      {/* Admin Header */}
      <div style={{
        background: 'linear-gradient(135deg, #14532D 0%, #15803D 100%)',
        borderRadius: '20px',
        padding: '18px 16px',
        color: '#FFFFFF',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <UserCog size={18} color="#FEF08A" />
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#FEF08A', letterSpacing: '0.5px' }}>
                KASIR & PENGELOLA WARUNG
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '19px',
              fontWeight: '800'
            }}>
              Admin Berkah Sekar 👑
            </h2>
          </div>

          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '700'
          }}>
            Toko Buka Online
          </div>
        </div>
      </div>

      {/* Admin Subtabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '6px',
        marginBottom: '16px'
      }}>
        {[
          { id: 'orders', label: 'Pesanan', count: pendingOrders },
          { id: 'products', label: 'Stok Barang', count: products.length },
          { id: 'stats', label: 'Omset' },
          { id: 'settings', label: 'Warung' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id)}
            className="btn-touch"
            style={{
              padding: '8px 4px',
              borderRadius: '12px',
              border: activeAdminTab === tab.id ? '1.5px solid #15803D' : '1px solid #E2E8F0',
              backgroundColor: activeAdminTab === tab.id ? '#15803D' : '#FFFFFF',
              color: activeAdminTab === tab.id ? '#FFFFFF' : '#475569',
              fontSize: '12px',
              fontWeight: activeAdminTab === tab.id ? '700' : '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{
                fontSize: '9.5px',
                padding: '1px 5px',
                borderRadius: '8px',
                backgroundColor: activeAdminTab === tab.id ? 'rgba(255,255,255,0.3)' : '#DCFCE7',
                color: activeAdminTab === tab.id ? '#FFFFFF' : '#15803D',
                fontWeight: '800'
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: KELOLA PESANAN BELANJAAN MASUK */}
      {activeAdminTab === 'orders' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D' }}>
              Pesanan Belanjaan Masuk ({orders.length})
            </h3>
            <span style={{ fontSize: '11px', color: '#EA580C', fontWeight: '700' }}>
              {pendingOrders} Perlu Disiapkan
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map(order => (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '14px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#14532D' }}>
                      #{order.id}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      {order.date} • {order.customerName}
                    </div>
                  </div>

                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: order.status === 'completed' ? '#15803D' : '#B45309',
                    backgroundColor: order.status === 'completed' ? '#DCFCE7' : '#FEF3C7',
                    padding: '3px 8px',
                    borderRadius: '8px'
                  }}>
                    {order.statusText || 'Diproses'}
                  </span>
                </div>

                {/* Recipient info & items */}
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', padding: '8px 10px', fontSize: '11.5px', marginBottom: '10px' }}>
                  <div><strong>Penerima:</strong> {order.recipientName} ({order.recipientPhone})</div>
                  <div><strong>Alamat Rumah:</strong> {order.deliveryAddress}</div>
                  <div><strong>Layanan:</strong> {order.deliveryType === 'express' ? 'Kurir Antar Kilat 30 Menit' : 'Ambil di Toko'}</div>
                  <div style={{ color: '#15803D', fontWeight: '800', marginTop: '2px' }}>
                    Total: {formatRupiah(order.total)} ({order.paymentMethod.toUpperCase()})
                  </div>
                </div>

                {/* Status Update Quick Buttons */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'processing', 'Belanjaan Sedang Disiapkan', 'Staf sedang mempacking sembako & snack')}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '8px',
                      border: '1px solid #15803D',
                      backgroundColor: order.status === 'processing' ? '#15803D' : '#FFFFFF',
                      color: order.status === 'processing' ? '#FFFFFF' : '#15803D',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    📦 Sedang Disiapkan
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'shipping', 'Kurir Menuju Alamat', 'Abang kurir warung dalam perjalanan antar')}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '8px',
                      border: '1px solid #EA580C',
                      backgroundColor: order.status === 'shipping' ? '#EA580C' : '#FFFFFF',
                      color: order.status === 'shipping' ? '#FFFFFF' : '#EA580C',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    🚚 Kurir Antar
                  </button>

                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed', 'Belanjaan Selesai Diterima', 'Barang belanjaan telah sampai di rumah pembeli')}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '8px',
                      border: '1px solid #16A34A',
                      backgroundColor: order.status === 'completed' ? '#16A34A' : '#FFFFFF',
                      color: order.status === 'completed' ? '#FFFFFF' : '#16A34A',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    ✓ Selesai
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MANAJEMEN STOK SEMBAKO & SNACK */}
      {activeAdminTab === 'products' && (
        <div className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D' }}>
              Daftar Barang Warung ({products.length})
            </h3>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="btn-touch"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: '#15803D',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <Plus size={14} />
              <span>Tambah Barang</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map(product => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '10px 12px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '55px', height: '55px', borderRadius: '10px', objectFit: 'cover' }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '12.5px', fontWeight: '700', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                  </h4>
                  <div style={{ fontSize: '11.5px', color: '#15803D', fontWeight: '800' }}>
                    {formatRupiah(product.price)} • Stok: {product.stock}
                  </div>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>
                    Kategori: {product.category} • {product.soldCount} terjual
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      border: '1px solid #FEE2E2',
                      backgroundColor: '#FEF2F2',
                      color: '#EF4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STATISTIK & OMSET */}
      {activeAdminTab === 'stats' && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '12px' }}>
            Ringkasan Penjualan Sembako
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Total Omset Belanja</div>
              <div style={{ fontSize: '17px', fontWeight: '800', color: '#15803D' }}>
                {formatRupiah(totalRevenue)}
              </div>
              <div style={{ fontSize: '10px', color: '#15803D', marginTop: '2px', fontWeight: '700' }}>
                ↑ +24% Penjualan Minggu Ini
              </div>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>Total Transaksi</div>
              <div style={{ fontSize: '17px', fontWeight: '800', color: '#14532D' }}>
                {totalOrders} Belanja
              </div>
              <div style={{ fontSize: '10px', color: '#EA580C', marginTop: '2px', fontWeight: '700' }}>
                {pendingOrders} sedang disiapkan
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px',
            border: '1px solid var(--border-color)'
          }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#14532D', marginBottom: '8px' }}>
              Metode Pembayaran Sering Digunakan
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Bayar di Tempat (COD)</span>
                <strong style={{ color: '#15803D' }}>58% (Paling Banyak)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>QRIS Instan (BCA/GoPay/OVO)</span>
                <strong>32%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Transfer Bank</span>
                <strong>10%</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PENGATURAN TOKO/WARUNG */}
      {activeAdminTab === 'settings' && (
        <div className="animate-fade-in">
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#14532D', marginBottom: '12px' }}>
            Konfigurasi Toko Kelontong Berkah Sekar
          </h3>

          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', border: '1px solid var(--border-color)' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Nomor WhatsApp Toko (Penerima Order Belanjaan) *
              </label>
              <input
                type="text"
                value={settingsPhone}
                onChange={(e) => setSettingsPhone(e.target.value)}
                placeholder="628xxxxxxxxxx"
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12.5px',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                Format dengan 62 di depan tanpa spasi atau tanda +.
              </span>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', border: '1px solid var(--border-color)' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Alamat Warung / Toko Kelontong
              </label>
              <textarea
                rows={2}
                value={settingsAddress}
                onChange={(e) => setSettingsAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12px',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '14px', border: '1px solid var(--border-color)' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>
                Jam Buka Warung
              </label>
              <input
                type="text"
                value={settingsOpeningHours}
                onChange={(e) => setSettingsOpeningHours(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-touch"
              style={{
                padding: '12px',
                borderRadius: '14px',
                border: 'none',
                backgroundColor: '#15803D',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Save size={16} />
              <span>Simpan Pengaturan Toko</span>
            </button>
          </form>
        </div>
      )}

      {/* MODAL: TAMBAH PRODUK BARU */}
      {showAddProductModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
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
              maxHeight: '90vh',
              borderRadius: '24px',
              padding: '20px',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#14532D' }}>
                Tambah Sembako / Snack Baru
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                style={{ border: 'none', background: '#F1F5F9', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveNewProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '2px' }}>
                  Nama Produk Sembako / Snack *
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Misal: Minyak Goreng Filma 2 Liter"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '2px' }}>
                    Kategori *
                  </label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', backgroundColor: '#FFF' }}
                  >
                    <option value="sembako">Beras, Minyak & Telur</option>
                    <option value="mie">Mie & Makanan Instan</option>
                    <option value="snack">Snack & Biskuit</option>
                    <option value="minuman">Minuman & Kopi</option>
                    <option value="bumbu">Bumbu Dapur</option>
                    <option value="sabun">Sabun & Kebersihan</option>
                    <option value="paket">Paket Sembako</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '2px' }}>
                    Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="35000"
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '2px' }}>
                  URL Foto Produk (Image URL)
                </label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '11px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '2px' }}>
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  placeholder="Kualitas minyak jernih, tahan panas, isi 2 liter..."
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                className="btn-touch"
                style={{
                  marginTop: '8px',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#15803D',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Simpan & Pajang di Warung
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
