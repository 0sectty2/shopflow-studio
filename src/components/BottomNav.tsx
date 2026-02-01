import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, ScanLine, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/categories', icon: Grid3X3, label: 'Menu' },
    { path: '/scan', icon: ScanLine, label: 'Scan' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { path: '/account', icon: User, label: 'You' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(({ path, icon: Icon, label, badge }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={cn(
              'bottom-nav-item',
              isActive && 'active'
            )}
          >
            <div className="relative">
              <Icon className="w-6 h-6" />
              {badge !== undefined && badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {badge > 99 ? '99+' : badge}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
