import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  showSearch?: boolean;
  showBack?: boolean;
  title?: string;
  className?: string;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  showSearch = true, 
  showBack = false,
  title,
  className,
  transparent = false
}) => {
  const navigate = useNavigate();

  return (
    <header className={cn(
      'sticky top-0 z-40 px-4 py-3',
      transparent ? 'bg-transparent' : 'bg-card shadow-sm',
      className
    )}>
      {/* Logo Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 active:scale-95 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <button className="p-1 active:scale-95 transition-transform">
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          )}
          {title ? (
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          ) : (
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-foreground">amazon</span>
              <span className="text-primary font-bold text-2xl">.in</span>
            </Link>
          )}
        </div>
        <button className="p-2 rounded-full active:bg-secondary transition-colors relative">
          <Bell className="w-6 h-6 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <Link to="/search" className="search-bar">
          <Search className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground text-sm flex-1">Search on Amazon...</span>
        </Link>
      )}
    </header>
  );
};

export default Header;
