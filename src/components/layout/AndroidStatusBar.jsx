import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const AndroidStatusBar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      height: '32px',
      padding: '6px 18px 2px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '12px',
      fontWeight: '600',
      color: '#182824',
      zIndex: 40,
      background: 'transparent',
      userSelect: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>{time || '11:00'}</span>
        <span style={{ fontSize: '10px', color: '#1E5E4E', background: '#E8F3F0', padding: '1px 5px', borderRadius: '4px' }}>5G</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Signal size={13} strokeWidth={2.5} />
        <Wifi size={13} strokeWidth={2.5} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontSize: '11px' }}>88%</span>
          <BatteryMedium size={15} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};
