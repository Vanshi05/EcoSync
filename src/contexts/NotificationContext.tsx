import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Coins, Gift, Sparkles } from 'lucide-react';

interface Notification {
  id: string;
  type: 'eco-coins' | 'coupon' | 'achievement';
  title: string;
  message: string;
  icon?: React.ReactNode;
  data?: any;
}

interface Coupon {
  id: string;
  brandName: string;
  discount: string;
  code: string;
  validUntil: string;
  isUsed: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  coupons: Coupon[];
  showEcoCoinsNotification: (amount: number, reason: string) => void;
  showCouponUnlockedNotification: (coupon: Coupon) => void;
  showAchievementNotification: (title: string, message: string) => void;
  addCoupon: (coupon: Coupon) => void;
  getCouponsForBrand: (brandName: string) => Coupon[];
  useCoupon: (couponId: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('userCoupons');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  const showEcoCoinsNotification = useCallback((amount: number, reason: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type: 'eco-coins',
      title: `+${amount} Eco Coins`,
      message: reason,
      icon: <Coins className="h-5 w-5 text-yellow-500" />
    };

    setNotifications(prev => [...prev, notification]);
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-yellow-500" />
          <span>+{amount} Eco Coins</span>
        </div>
      ) as any,
      description: reason,
      duration: 3000,
    });

    // Update eco coins in localStorage
    const currentCoins = parseInt(localStorage.getItem('userEcoCoins') || '850');
    localStorage.setItem('userEcoCoins', (currentCoins + amount).toString());
  }, [toast]);

  const showCouponUnlockedNotification = useCallback((coupon: Coupon) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type: 'coupon',
      title: 'Coupon Unlocked!',
      message: `${coupon.discount} off at ${coupon.brandName}`,
      icon: <Gift className="h-5 w-5 text-purple-500" />
    };

    setNotifications(prev => [...prev, notification]);
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-purple-500" />
          <span>Coupon Unlocked!</span>
        </div>
      ) as any,
      description: `${coupon.discount} off at ${coupon.brandName}`,
      duration: 4000,
    });

    addCoupon(coupon);
  }, [toast]);

  const showAchievementNotification = useCallback((title: string, message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type: 'achievement',
      title,
      message,
      icon: <Sparkles className="h-5 w-5 text-eco-primary" />
    };

    setNotifications(prev => [...prev, notification]);
    
    toast({
      title: (
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-eco-primary" />
          <span>{title}</span>
        </div>
      ) as any,
      description: message,
      duration: 3000,
    });
  }, [toast]);

  const addCoupon = useCallback((coupon: Coupon) => {
    setCoupons(prev => {
      const updated = [...prev, coupon];
      localStorage.setItem('userCoupons', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getCouponsForBrand = useCallback((brandName: string) => {
    return coupons.filter(coupon => 
      coupon.brandName.toLowerCase() === brandName.toLowerCase() && 
      !coupon.isUsed
    );
  }, [coupons]);

  const useCoupon = useCallback((couponId: string) => {
    setCoupons(prev => {
      const updated = prev.map(coupon => 
        coupon.id === couponId 
          ? { ...coupon, isUsed: true }
          : coupon
      );
      localStorage.setItem('userCoupons', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = {
    notifications,
    coupons,
    showEcoCoinsNotification,
    showCouponUnlockedNotification,
    showAchievementNotification,
    addCoupon,
    getCouponsForBrand,
    useCoupon,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};