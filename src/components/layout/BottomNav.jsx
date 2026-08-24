import React from 'react';
import { Home, LayoutGrid, Gift, PackageCheck, UserCog } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const BottomNav = () => {
  const { activeTab, setActiveTab, orders } = useStore();

  const activeOrdersCount = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'catalog', label: 'Katalog', icon: LayoutGrid },
    { id: 'custom', label: 'Racik Paket', icon: Gift },
    { id: 'orders', label: 'Pesanan', icon: PackageCheck, badge: activeOrdersCount },
    { id: 'admin', label: 'Admin', icon: UserCog }
  ];

  return (
    <nav className="native-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-tab-btn ${isActive ? 'active' : ''} touch-feedback`}
          >
            <div className="nav-icon-pill">
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {item.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '1px',
                  right: '6px',
                  backgroundColor: '#EA580C',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: '800',
                  minWidth: '15px',
                  height: '15px',
                  padding: '0 3px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #FFFFFF'
                }}>
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
