import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { MobileHeader } from './components/layout/MobileHeader';
import { BottomNav } from './components/layout/BottomNav';
import { Toast } from './components/layout/Toast';
import { HomeScreen } from './components/home/HomeScreen';
import { CatalogScreen } from './components/catalog/CatalogScreen';
import { BouquetBuilder } from './components/customizer/BouquetBuilder';
import { OrderTracker } from './components/orders/OrderTracker';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { ReceiptModal } from './components/common/ReceiptModal';

const AppContent = () => {
  const { activeTab } = useStore();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'catalog':
        return <CatalogScreen />;
      case 'custom':
        return <BouquetBuilder />;
      case 'orders':
        return <OrderTracker />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="native-app-container">
      {/* Native Top App Bar */}
      <MobileHeader />

      {/* Main Native Scroll Viewport */}
      <main className="native-scroll-content">
        {renderActiveScreen()}
      </main>

      {/* Native Material Navigation Bar */}
      <BottomNav />

      {/* Native Modals & Bottom Sheets */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <ReceiptModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
