import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Truck, MapPin, CreditCard, ChevronRight, RotateCcw, MessageCircle, FileText } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import { useOrders } from '@/context/OrderContext';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrders();
  const order = getOrderById(id || '');

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

  const statusSteps = [
    { key: 'processing', label: 'Order Confirmed', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: MapPin },
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === order.status);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card shadow-sm px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold">Order Details</h1>
          <p className="text-xs text-muted-foreground">{order.id}</p>
        </div>
      </header>

      <main className="safe-bottom p-4">
        {/* Status Tracker */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <div className="flex items-center justify-between mb-4">
            {statusSteps.map((step, i) => (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                    i <= currentStepIndex ? 'bg-amazon-green text-white' : 'bg-secondary text-muted-foreground'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs ${i <= currentStepIndex ? 'font-medium' : 'text-muted-foreground'}`}>
                    {step.label}
                  </span>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    i < currentStepIndex ? 'bg-amazon-green' : 'bg-secondary'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          
          {order.status === 'shipped' && order.trackingNumber && (
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Tracking Number</p>
              <p className="font-mono font-medium text-primary">{order.trackingNumber}</p>
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <h3 className="font-semibold mb-3">Delivery Address</h3>
          <p className="font-medium">{order.address.name}</p>
          <p className="text-sm text-muted-foreground">{order.address.street}</p>
          <p className="text-sm text-muted-foreground">
            {order.address.city}, {order.address.state} {order.address.zip}
          </p>
        </div>

        {/* Payment Info */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span>{order.paymentMethod.name}</span>
          </div>
        </div>

        {/* Items */}
        <div className="bg-card rounded-xl border border-border/50 overflow-hidden mb-4">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Items ({order.items.length})</h3>
          </div>
          {order.items.map((item, i) => (
            <div 
              key={item.product.id} 
              className={`flex gap-3 p-4 ${i > 0 ? 'border-t border-border' : ''}`}
              onClick={() => navigate(`/product/${item.product.id}`)}
            >
              <img 
                src={item.product.image} 
                alt={item.product.name}
                className="w-20 h-20 rounded-lg object-cover bg-secondary"
              />
              <div className="flex-1">
                <p className="font-medium line-clamp-2 mb-1">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground self-center" />
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-xl p-4 border border-border/50 mb-4">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
            {order.deliveryDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected Delivery</span>
                <span>{new Date(order.deliveryDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {order.status === 'delivered' && (
            <button 
              onClick={() => navigate(`/return/${order.id}`)}
              className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border/50"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span className="font-medium">Return or Replace Items</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <button className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border/50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span>Download Invoice</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border/50">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
              <span>Get Help</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default OrderDetail;
