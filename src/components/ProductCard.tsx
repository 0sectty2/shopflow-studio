import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'horizontal' | 'compact';
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'default',
  className 
}) => {
  const { id, name, price, originalPrice, discount, image, rating, reviewCount, isPrime, deliveryDate } = product;

  if (variant === 'horizontal') {
    return (
      <Link 
        to={`/product/${id}`}
        className={cn('product-card flex gap-3', className)}
      >
        <div className="relative w-28 h-28 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <button 
            className="absolute top-2 right-2 p-1.5 bg-card/80 rounded-full backdrop-blur-sm"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">{name}</h3>
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-muted-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount.toLocaleString()})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="price-current">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="price-original">${originalPrice.toFixed(2)}</span>
            )}
            {discount && (
              <span className="price-discount">-{discount}%</span>
            )}
          </div>
          {isPrime && (
            <div className="flex items-center gap-1 mt-1">
              <span className="prime-badge">prime</span>
              <span className="text-xs text-muted-foreground">FREE Delivery {deliveryDate}</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link 
        to={`/product/${id}`}
        className={cn('product-card w-36 flex-shrink-0', className)}
      >
        <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden mb-2">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xs font-medium text-foreground line-clamp-2 mb-1">{name}</h3>
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold">${price.toFixed(2)}</span>
          {discount && (
            <span className="text-xs text-price-red">-{discount}%</span>
          )}
        </div>
        {isPrime && <span className="prime-badge text-[10px]">prime</span>}
      </Link>
    );
  }

  return (
    <Link 
      to={`/product/${id}`}
      className={cn('product-card w-44 flex-shrink-0', className)}
    >
      <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden mb-2">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-2 right-2 p-1.5 bg-card/80 rounded-full backdrop-blur-sm active:scale-95 transition-transform"
          onClick={(e) => { e.preventDefault(); }}
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>
        {discount && (
          <span className="absolute top-2 left-2 bg-price-red text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        )}
      </div>
      <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1 h-10">{name}</h3>
      <div className="flex items-center gap-1 mb-1">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                'w-3 h-3',
                i < Math.floor(rating) 
                  ? 'fill-amber-400 text-amber-400' 
                  : 'fill-muted text-muted'
              )} 
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{reviewCount.toLocaleString()}</span>
      </div>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="price-current">${price.toFixed(2)}</span>
        {originalPrice && (
          <span className="price-original">${originalPrice.toFixed(2)}</span>
        )}
      </div>
      {isPrime && (
        <div className="mt-1">
          <span className="prime-badge">prime</span>
          <span className="text-[10px] text-muted-foreground ml-1">FREE Delivery</span>
        </div>
      )}
    </Link>
  );
};

export default ProductCard;
