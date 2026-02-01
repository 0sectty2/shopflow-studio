import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, selectedColor, selectedSize } = item;

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
      <div className="flex gap-4">
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-24 h-24 object-cover rounded-lg bg-secondary"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
              {product.name}
            </h3>
          </Link>
          {(selectedColor || selectedSize) && (
            <p className="text-xs text-muted-foreground mb-1">
              {selectedColor && `Color: ${selectedColor}`}
              {selectedColor && selectedSize && ' | '}
              {selectedSize && `Size: ${selectedSize}`}
            </p>
          )}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.isPrime && (
            <div className="flex items-center gap-1 mb-2">
              <span className="prime-badge">prime</span>
              <span className="text-xs text-amazon-green font-medium">FREE Delivery</span>
            </div>
          )}
          <p className="text-xs text-amazon-green font-medium">
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center active:scale-95 transition-transform bg-secondary"
          >
            {quantity === 1 ? (
              <Trash2 className="w-4 h-4 text-destructive" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
          </button>
          <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center active:scale-95 transition-transform bg-secondary"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2">
          <button className="text-sm text-primary font-medium px-3 py-1.5 rounded-lg active:bg-secondary transition-colors">
            Save for later
          </button>
          <button 
            onClick={() => removeFromCart(product.id)}
            className="text-sm text-destructive font-medium px-3 py-1.5 rounded-lg active:bg-secondary transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
