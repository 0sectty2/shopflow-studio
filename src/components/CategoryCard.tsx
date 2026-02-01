import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../data/products';
import { cn } from '../lib/utils';

interface CategoryCardProps {
  category: Category;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  size = 'medium',
  className 
}) => {
  const { id, name, image, gradient } = category;

  const sizeClasses = {
    small: 'h-24 w-28',
    medium: 'h-32 w-40',
    large: 'h-40 w-full',
  };

  return (
    <Link 
      to={`/category/${id}`}
      className={cn(
        'category-tile flex-shrink-0 flex flex-col justify-end',
        gradient,
        sizeClasses[size],
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <span className="relative text-primary-foreground font-semibold text-sm z-10 drop-shadow-lg">
        {name}
      </span>
    </Link>
  );
};

export default CategoryCard;
