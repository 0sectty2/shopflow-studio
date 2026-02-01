// Orders page
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import OrderCard from '../components/OrderCard';
import { useOrders } from '../context/OrderContext';
import { Package } from 'lucide-react';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const activeOrders = orders.filter(o => o.status === 'processing' || o.status === 'shipped');
  const pastOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled' || o.status === 'returned');

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBack title="My Orders" showSearch={false} />
        <main className="safe-bottom flex flex-col items-center justify-center p-8 min-h-[60vh]">
          <Package className="w-20 h-20 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground text-center mb-6">
            When you place orders, they will appear here
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn-amazon"
          >
            Start Shopping
          </button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBack title="My Orders" showSearch={false} />
      
      <main className="safe-bottom p-4">
        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <section className="mb-6">
            <h2 className="font-semibold text-lg mb-3">Active Orders</h2>
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}

        {/* Order History */}
        {pastOrders.length > 0 && (
          <section>
            <h2 className="font-semibold text-lg mb-3">Order History</h2>
            <div className="space-y-3">
              {pastOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Orders;
