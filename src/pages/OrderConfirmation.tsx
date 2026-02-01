// Order confirmation page
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useOrders } from '../context/OrderContext';

const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const order = getOrderById(id || '');

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Order not found</p>
          <button onClick={() => navigate('/')} className="btn-amazon">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="safe-bottom p-4">
        {/* Success Header */}
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-full bg-amazon-green/10 flex items-center justify-center mx-auto mb-4 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-amazon-green" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
          <p className="text-muted-foreground">Thanks for shopping with us</p>
        </div>

        {/* Order Info */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Order Number</span>
            <span className="font-mono font-medium">{order.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Tracking Number</span>
            <span className="font-mono font-medium text-primary">{order.trackingNumber}</span>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <h3 className="font-semibold mb-4">Delivery Status</h3>
          <div className="relative">
            <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-border" />
            {[
              { icon: Package, label: 'Order Confirmed', time: 'Just now', active: true },
              { icon: Package, label: 'Processing', time: 'Expected today', active: false },
              { icon: Truck, label: 'Shipped', time: 'Expected tomorrow', active: false },
              { icon: MapPin, label: 'Delivered', time: order.deliveryDate?.toLocaleDateString() || '', active: false },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 relative mb-4 last:mb-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                  step.active ? 'bg-amazon-green' : 'bg-secondary'
                }`}>
                  <step.icon className={`w-3 h-3 ${step.active ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className={`font-medium ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <h3 className="font-semibold mb-2">Shipping to</h3>
          <p className="text-sm">{order.address.name}</p>
          <p className="text-sm text-muted-foreground">{order.address.street}</p>
          <p className="text-sm text-muted-foreground">
            {order.address.city}, {order.address.state} {order.address.zip}
          </p>
        </div>

        {/* Items */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <h3 className="font-semibold mb-3">Items Ordered</h3>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {order.items.map((item) => (
              <img 
                key={item.product.id}
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover bg-secondary flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Order Total</span>
            <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate(`/orders/${order.id}`)}
            className="w-full btn-amazon"
          >
            View Order Details
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full btn-amazon-outline"
          >
            Continue Shopping
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default OrderConfirmation;
