import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Truck, RotateCcw } from 'lucide-react';
import { Order } from '../context/OrderContext';
import { cn } from '../lib/utils';

interface OrderCardProps {
  order: Order;
  compact?: boolean;
}

const statusConfig = {
  processing: { label: 'Processing', color: 'text-primary', bg: 'bg-primary/10' },
  shipped: { label: 'Shipped', color: 'text-amazon-prime', bg: 'bg-amazon-prime/10' },
  delivered: { label: 'Delivered', color: 'text-amazon-green', bg: 'bg-amazon-green/10' },
  cancelled: { label: 'Cancelled', color: 'text-destructive', bg: 'bg-destructive/10' },
  returned: { label: 'Returned', color: 'text-muted-foreground', bg: 'bg-muted' },
};

const OrderCard: React.FC<OrderCardProps> = ({ order, compact = false }) => {
  const status = statusConfig[order.status];

  if (compact) {
    const firstItem = order.items[0];
    return (
      <Link 
        to={`/orders/${order.id}`}
        className="bg-card rounded-xl p-3 shadow-sm border border-border/50 flex items-center gap-3 active:scale-[0.99] transition-transform"
      >
        <img 
          src={firstItem.product.image} 
          alt={firstItem.product.name}
          className="w-16 h-16 object-cover rounded-lg bg-secondary"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium line-clamp-1">{firstItem.product.name}</p>
          <p className="text-xs text-muted-foreground">
            {order.items.length > 1 && `+${order.items.length - 1} more • `}
            {new Date(order.orderDate).toLocaleDateString()}
          </p>
          <span className={cn('text-xs font-medium', status.color)}>{status.label}</span>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </Link>
    );
  }

  return (
    <Link 
      to={`/orders/${order.id}`}
      className="bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden active:scale-[0.99] transition-transform"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Order {order.id}</p>
          <p className="text-sm font-medium">
            {new Date(order.orderDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
        <span className={cn('px-3 py-1 rounded-full text-xs font-medium', status.bg, status.color)}>
          {status.label}
        </span>
      </div>

      {/* Items Preview */}
      <div className="p-4">
        <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
          {order.items.slice(0, 4).map((item, i) => (
            <img 
              key={i}
              src={item.product.image} 
              alt={item.product.name}
              className="w-16 h-16 object-cover rounded-lg bg-secondary flex-shrink-0"
            />
          ))}
          {order.items.length > 4 && (
            <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-muted-foreground">
                +{order.items.length - 4}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
          <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        {order.status === 'shipped' && (
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-secondary text-sm font-medium">
            <Truck className="w-4 h-4" />
            Track Package
          </button>
        )}
        {order.status === 'delivered' && (
          <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-secondary text-sm font-medium">
            <RotateCcw className="w-4 h-4" />
            Return Items
          </button>
        )}
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
          <Package className="w-4 h-4" />
          Buy Again
        </button>
      </div>
    </Link>
  );
};

export default OrderCard;
