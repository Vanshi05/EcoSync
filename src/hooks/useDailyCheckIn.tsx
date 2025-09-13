import { useEffect } from 'react';
import { useNotification } from '@/contexts/NotificationContext';

export const useDailyCheckIn = () => {
  const { showEcoCoinsNotification } = useNotification();

  useEffect(() => {
    const handleDailyCheckIn = () => {
      showEcoCoinsNotification(5, 'Daily check-in reward');
    };

    window.addEventListener('dailyCheckIn', handleDailyCheckIn);
    
    return () => {
      window.removeEventListener('dailyCheckIn', handleDailyCheckIn);
    };
  }, [showEcoCoinsNotification]);
};