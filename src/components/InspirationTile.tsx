import React from 'react';
import { cn } from '@/lib/utils';

interface InspirationTileProps {
  title: string;
  image: string;
  gradient: string;
  size?: 'small' | 'large';
  onClick?: () => void;
  className?: string;
}

const InspirationTile: React.FC<InspirationTileProps> = ({
  title,
  image,
  gradient,
  size = 'small',
  onClick,
  className,
}) => {
  const sizeClasses = {
    small: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative rounded-2xl overflow-hidden flex-shrink-0 active:scale-95 transition-transform',
        gradient,
        sizeClasses[size],
        className
      )}
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative z-10 p-3 h-full flex items-end">
        <span className="text-primary-foreground font-semibold text-xs leading-tight drop-shadow">
          {title}
        </span>
      </div>
    </button>
  );
};

export default InspirationTile;
