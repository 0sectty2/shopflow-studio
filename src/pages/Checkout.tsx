import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, MapPin, CreditCard, Plus } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { 
    addresses, 
    paymentMethods, 
    selectedAddress, 
    selectedPayment,
    setSelectedAddress,
    setSelectedPayment,
    createOrder 
  } = useOrders();

  const [step, setStep] = useState<'address' | 'payment' | 'review'>('address');

  const total = getCartTotal();
  const shipping = total >= 35 ? 0 : 5.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  const handlePlaceOrder = () => {
    const order = createOrder(items, orderTotal);
    clearCart();
    navigate(`/order-confirmation/${order.id}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card shadow-sm px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Checkout</h1>
        </div>
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {['address', 'payment', 'review'].map((s, i) => (
            <React.Fragment key={s}>
              <button
                onClick={() => {
                  if (s === 'address' || (s === 'payment' && selectedAddress) || (s === 'review' && selectedPayment)) {
                    setStep(s as any);
                  }
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step === s 
                    ? 'bg-primary text-primary-foreground' 
                    : i < ['address', 'payment', 'review'].indexOf(step)
                      ? 'bg-amazon-green text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                }`}
              >
                {i < ['address', 'payment', 'review'].indexOf(step) ? <Check className="w-4 h-4" /> : i + 1}
              </button>
              {i < 2 && (
                <div className={`w-12 h-0.5 ${
                  i < ['address', 'payment', 'review'].indexOf(step) ? 'bg-amazon-green' : 'bg-secondary'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </header>

      <main className="pb-32 p-4">
        {/* Address Step */}
        {step === 'address' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <div className="space-y-3">
              {addresses.map((address) => (
                <button
                  key={address.id}
                  onClick={() => setSelectedAddress(address)}
                  className={`w-full text-left bg-card rounded-xl p-4 border-2 transition-all ${
                    selectedAddress?.id === address.id 
                      ? 'border-primary' 
                      : 'border-border/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      selectedAddress?.id === address.id 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {selectedAddress?.id === address.id && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{address.name}</p>
                      <p className="text-sm text-muted-foreground">{address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} {address.zip}
                      </p>
                      {address.isDefault && (
                        <span className="text-xs text-primary font-medium">Default</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
              <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border rounded-xl text-muted-foreground">
                <Plus className="w-5 h-5" />
                Add New Address
              </button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            {/* Selected Address Summary */}
            <div className="bg-secondary/50 rounded-xl p-3 mb-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">{selectedAddress?.name}</p>
                <p className="text-xs text-muted-foreground">{selectedAddress?.street}</p>
              </div>
              <button 
                onClick={() => setStep('address')}
                className="text-primary text-sm font-medium"
              >
                Change
              </button>
            </div>

            <h3 className="font-medium mb-3">Credit/Debit Card</h3>
            <div className="space-y-3 mb-6">
              {paymentMethods.filter(p => p.type === 'credit' || p.type === 'debit').map((payment) => (
                <button
                  key={payment.id}
                  onClick={() => setSelectedPayment(payment)}
                  className={`w-full text-left bg-card rounded-xl p-4 border-2 transition-all ${
                    selectedPayment?.id === payment.id 
                      ? 'border-primary' 
                      : 'border-border/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment?.id === payment.id 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {selectedPayment?.id === payment.id && (
                        <Check className="w-3 h-3 text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        payment.brand === 'Mastercard' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {payment.brand}
                      </span>
                      <span className="text-sm">•••• {payment.lastFour}</span>
                    </div>
                  </div>
                </button>
              ))}
              <button className="w-full flex items-center gap-3 py-4 px-4 border-2 border-dashed border-border rounded-xl text-muted-foreground">
                <Plus className="w-5 h-5" />
                Add New Card
              </button>
            </div>

            <h3 className="font-medium mb-3">Other methods</h3>
            <div className="space-y-2">
              {['Wallet', 'Net Banking', 'Someone else paying', 'Amazon Gift Card'].map((method) => (
                <button key={method} className="w-full flex items-center justify-between py-3 px-4 bg-card rounded-xl border border-border/50">
                  <span className="text-sm">{method}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === 'review' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Review Order</h2>
            
            {/* Address & Payment Summary */}
            <div className="space-y-3 mb-6">
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Delivery Address</span>
                  <button onClick={() => setStep('address')} className="text-primary text-sm font-medium">
                    Change
                  </button>
                </div>
                <p className="font-medium">{selectedAddress?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedAddress?.street}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.zip}
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-4 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Payment Method</span>
                  <button onClick={() => setStep('payment')} className="text-primary text-sm font-medium">
                    Change
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">{selectedPayment?.name}</span>
                </div>
              </div>
            </div>

            {/* Items Summary */}
            <h3 className="font-medium mb-3">Items ({items.length})</h3>
            <div className="bg-card rounded-xl border border-border/50 overflow-hidden mb-4">
              {items.map((item, i) => (
                <div key={item.product.id} className={`flex gap-3 p-3 ${i > 0 ? 'border-t border-border' : ''}`}>
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-secondary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="bg-card rounded-xl p-4 border border-border/50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span>Order Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[4.5rem] left-0 right-0 bg-card border-t border-border p-4 z-30">
        {step === 'address' && (
          <button
            onClick={() => selectedAddress && setStep('payment')}
            disabled={!selectedAddress}
            className="w-full btn-amazon disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Payment
          </button>
        )}
        {step === 'payment' && (
          <button
            onClick={() => selectedPayment && setStep('review')}
            disabled={!selectedPayment}
            className="w-full btn-amazon disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Review Order
          </button>
        )}
        {step === 'review' && (
          <button
            onClick={handlePlaceOrder}
            className="w-full btn-amazon"
          >
            Place Order • ${orderTotal.toFixed(2)}
          </button>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Checkout;
