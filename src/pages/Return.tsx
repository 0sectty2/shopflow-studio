import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, MapPin, Package } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useOrders } from '@/context/OrderContext';
import { toast } from 'sonner';

const Return: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById, requestReturn } = useOrders();
  const order = getOrderById(id || '');
  
  const [step, setStep] = useState<'select' | 'reason' | 'method' | 'confirm'>('select');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [returnMethod, setReturnMethod] = useState('');

  const reasons = [
    'Item arrived damaged',
    'Wrong item was sent',
    'Item doesn\'t match description',
    'Changed my mind',
    'Found a better price',
    'Other',
  ];

  const returnMethods = [
    { id: 'dropoff', name: 'Drop off at UPS', description: 'Free, no box needed' },
    { id: 'pickup', name: 'Schedule pickup', description: 'Free, we\'ll pick it up' },
    { id: 'locker', name: 'Amazon Locker', description: 'Free, drop at nearby locker' },
  ];

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Order not found</p>
          <button onClick={() => navigate('/orders')} className="btn-amazon">
            View All Orders
          </button>
        </div>
      </div>
    );
  }

  const toggleItem = (productId: string) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = () => {
    requestReturn(order.id);
    toast.success('Return requested successfully');
    navigate('/orders');
  };

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
          <h1 className="text-lg font-semibold">Return Items</h1>
        </div>
      </header>

      <main className="safe-bottom p-4">
        {/* Select Items */}
        {step === 'select' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-2">How's your product?</h2>
            <p className="text-muted-foreground mb-4">Select items you want to return</p>
            
            <div className="space-y-3 mb-6">
              {order.items.map((item) => (
                <button
                  key={item.product.id}
                  onClick={() => toggleItem(item.product.id)}
                  className={`w-full flex items-center gap-4 p-4 bg-card rounded-xl border-2 transition-all ${
                    selectedItems.includes(item.product.id) 
                      ? 'border-primary' 
                      : 'border-border/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    selectedItems.includes(item.product.id)
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedItems.includes(item.product.id) && (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <img 
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-secondary"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => selectedItems.length > 0 && setStep('reason')}
              disabled={selectedItems.length === 0}
              className="w-full btn-amazon disabled:opacity-50"
            >
              Return and Refund
            </button>
          </div>
        )}

        {/* Select Reason */}
        {step === 'reason' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-2">Reason for refund</h2>
            <p className="text-muted-foreground mb-4">Please select a reason</p>
            
            <div className="space-y-2 mb-6">
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`w-full flex items-center gap-3 p-4 bg-card rounded-xl border-2 transition-all ${
                    reason === r ? 'border-primary' : 'border-border/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    reason === r ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {reason === r && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <span className="text-left">{r}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => reason && setStep('method')}
              disabled={!reason}
              className="w-full btn-amazon disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* Select Return Method */}
        {step === 'method' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-2">Preferred return method</h2>
            <p className="text-muted-foreground mb-4">How would you like to return?</p>
            
            <div className="space-y-3 mb-6">
              {returnMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setReturnMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 bg-card rounded-xl border-2 transition-all ${
                    returnMethod === method.id ? 'border-primary' : 'border-border/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    returnMethod === method.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                  }`}>
                    {returnMethod === method.id && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => returnMethod && setStep('confirm')}
              disabled={!returnMethod}
              className="w-full btn-amazon disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* Confirmation */}
        {step === 'confirm' && (
          <div className="animate-fade-in">
            <div className="text-center py-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-amazon-green/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-amazon-green" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Review Return Request</h2>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
              <h3 className="font-medium mb-3">Items to return</h3>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {order.items
                  .filter(item => selectedItems.includes(item.product.id))
                  .map((item) => (
                    <img 
                      key={item.product.id}
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-secondary flex-shrink-0"
                    />
                  ))}
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Reason</span>
                <span className="font-medium">{reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Return method</span>
                <span className="font-medium">
                  {returnMethods.find(m => m.id === returnMethod)?.name}
                </span>
              </div>
            </div>

            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                Refund will be processed within 3-5 business days after we receive your items.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full btn-amazon"
            >
              Confirm Return Request
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Return;
