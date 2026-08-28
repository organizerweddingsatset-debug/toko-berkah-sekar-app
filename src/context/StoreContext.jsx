import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from '../data/initialProducts';
import confetti from 'canvas-confetti';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Products with local storage persistence (version keyed to reset cleanly)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('berkah_sekar_grocery_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('berkah_sekar_cart_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('berkah_sekar_wishlist_v2');
    return saved ? JSON.parse(saved) : ['bs-prod-1', 'bs-prod-2'];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('berkah_sekar_orders_v2');
    return saved ? JSON.parse(saved) : [
      {
        id: 'BS-2026-9012',
        date: '2026-08-24 10:15',
        customerName: 'Ibu Rahmawati',
        customerPhone: '081298765432',
        recipientName: 'Ibu Rahmawati',
        recipientPhone: '081298765432',
        deliveryAddress: 'Jl. Melati 3 No. 24 RT 04/RW 02 (Pagar Hitam), Cilandak, Jaksel',
        deliveryDate: '2026-08-24',
        deliverySlot: 'Pagi (08:00 - 11:00)',
        deliveryType: 'express',
        deliveryFee: 10000,
        items: [
          {
            id: 'item-demo-1',
            productId: 'bs-prod-1',
            name: 'Beras Pandan Wangi Premium 5 Kg',
            price: 72000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80'
          },
          {
            id: 'item-demo-2',
            productId: 'bs-prod-2',
            name: 'Minyak Goreng Tropical Pouch 2 Liter',
            price: 34500,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80'
          }
        ],
        subtotal: 141000,
        discount: 10000,
        total: 141000,
        paymentMethod: 'qris',
        status: 'processing', // pending, processing, shipping, completed, cancelled
        statusText: 'Belanjaan Sedang Disiapkan Warung',
        statusHistory: [
          { time: '10:15', title: 'Pesanan Diterima', desc: 'Pembayaran QRIS terverifikasi' },
          { time: '10:20', title: 'Sedang Disiapkan', desc: 'Barang sembako sedang dipacking rapi oleh staf' }
        ]
      }
    ];
  });

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('home'); // home, catalog, custom, orders, admin
  const [activeCategory, setActiveCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState(null);
  const [deviceFrame, setDeviceFrame] = useState(true);
  const [toast, setToast] = useState(null);

  // Store Settings (Grocery / Kelontong)
  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem('berkah_sekar_settings_v2');
    return saved ? JSON.parse(saved) : {
      name: 'Toko Kelontong Berkah Sekar',
      tagline: 'Sembako Lengkap, Snack Grosir & Antar Cepat ke Rumah',
      phone: '6285888882910',
      address: 'Jl. Pasar Tradisional No. 18, Cilandak, Jakarta Selatan',
      city: 'Jakarta Selatan',
      openingHours: '06:30 - 21:30 WIB (Buka Setiap Hari)',
      courierSpeed: 'Antar Cepat 30 - 60 Menit',
      bankAccounts: [
        { bank: 'BCA', number: '8730291823', owner: 'Toko Berkah Sekar' },
        { bank: 'Mandiri', number: '137001829381', owner: 'Toko Berkah Sekar' },
        { bank: 'BRI', number: '028101002938501', owner: 'Toko Berkah Sekar' }
      ]
    };
  });

  // Sync with Local Storage
  useEffect(() => {
    localStorage.setItem('berkah_sekar_grocery_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('berkah_sekar_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('berkah_sekar_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('berkah_sekar_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('berkah_sekar_settings_v2', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Toast Trigger Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Cart Operations
  const addToCart = (product, quantity = 1, customDetails = null, note = '', greetingCard = '') => {
    const cartItemId = customDetails 
      ? `custom-${Date.now()}` 
      : `${product.id}-${Date.now()}`;

    const newItem = {
      cartItemId,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      customDetails,
      note,
      greetingCard
    };

    setCart(prev => [newItem, ...prev]);
    showToast(`"${product.name}" dimasukkan ke keranjang belanja! 🛒`);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item dihapus dari keranjang', 'info');
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Wishlist
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
      showToast('Dihapus dari daftar favorit', 'info');
    } else {
      setWishlist(prev => [...prev, productId]);
      showToast('Disimpan ke daftar favorit ❤️');
    }
  };

  // Orders
  const createOrder = (orderData) => {
    const newOrderId = `BS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
      id: newOrderId,
      date: formattedDate,
      ...orderData,
      status: 'processing',
      statusText: 'Pesanan Diterima & Sedang Disiapkan',
      statusHistory: [
        { time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`, title: 'Pesanan Diterima', desc: 'Staf toko sedang menyiapkan dan mempacking barang belanjaan' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setActiveReceiptOrder(newOrder);

    // Confetti animation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }

    showToast(`Pesanan #${newOrderId} berhasil dibuat! 🎉`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, statusText, historyNote) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          statusText: statusText || order.statusText,
          statusHistory: [
            ...order.statusHistory,
            { time: timeStr, title: statusText, desc: historyNote || 'Update status terkini oleh Toko Berkah Sekar' }
          ]
        };
      }
      return order;
    }));
    showToast(`Status pesanan #${orderId} diperbarui.`);
  };

  // Admin Product Operations
  const addProduct = (newProduct) => {
    const id = `bs-prod-${Date.now()}`;
    const productToAdd = { ...newProduct, id };
    setProducts(prev => [productToAdd, ...prev]);
    showToast('Produk sembako/snack baru berhasil ditambahkan! 📦');
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showToast('Data produk berhasil diperbarui');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Produk berhasil dihapus', 'info');
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      wishlist,
      orders,
      activeTab,
      setActiveTab,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      selectedProduct,
      setSelectedProduct,
      isCartOpen,
      setIsCartOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      activeReceiptOrder,
      setActiveReceiptOrder,
      deviceFrame,
      setDeviceFrame,
      toast,
      showToast,
      storeSettings,
      setStoreSettings,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotalItems,
      cartSubtotal,
      toggleWishlist,
      createOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
