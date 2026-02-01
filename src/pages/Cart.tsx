import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, getSubtotal, getSavings, getCartCount } = useCart();
  
  const subtotal = getSubtotal();
  const savings = getSavings();
  const total = getCartTotal();
  const shipping = total >= 35 ? 0 : 5.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header showSearch={false} title="My Cart" />
        <main className="safe-bottom flex flex-col items-center justify-center p-8 min-h-[60vh]">
          <ShoppingBag className="w-20 h-20 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Add items to your cart to see them here
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn-amazon"
          >
            Continue Shopping
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} title="My Cart" />
      
      <main className="pb-48">
        {/* Cart Items */}
        <div className="px-4 py-4 space-y-3">
          {items.map((item) => (
            <CartItem key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="px-4">
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({getCartCount()} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-amazon-green">
                  <span>Savings</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping & Handling</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-amazon-green font-medium pt-2 border-t border-border">
                  <span>Rewards Points</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                <span>Order Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[4.5rem] left-0 right-0 bg-card border-t border-border p-4 z-30">
        <div className="flex justify-between items-center mb-3">
          <span className="text-muted-foreground">Total:</span>
          <span className="text-2xl font-bold">${orderTotal.toFixed(2)}</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 btn-amazon-outline text-center"
          >
            Edit Cart
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 btn-amazon text-center"
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Cart;
