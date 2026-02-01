// Account page
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Package, 
  Heart, 
  RefreshCw, 
  User, 
  Headphones, 
  FileText, 
  Share2, 
  MessageCircle,
  Settings,
  LogOut
} from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import OrderCard from '../components/OrderCard';
import { useOrders } from '../context/OrderContext';
import { products } from '../data/products';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useOrders();
  const recentOrders = orders.slice(0, 2);

  // Mock user data
  const user = {
    name: 'Alex',
    isPrime: true,
  };

  const quickLinks = [
    { icon: Package, label: 'My orders', path: '/orders', count: orders.length },
    { icon: Heart, label: 'My Lists', path: '/lists' },
    { icon: RefreshCw, label: 'Buy Again', path: '/buy-again' },
    { icon: User, label: 'My Account', path: '/account-settings' },
    { icon: Headphones, label: 'Customer Service', path: '/support' },
  ];

  const supportLinks = [
    { icon: FileText, label: 'View Order Details', path: '/orders' },
    { icon: Share2, label: 'Share Item Receipt', path: '/receipts' },
    { icon: MessageCircle, label: 'Contact Manufacturer', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={true} />
      
      <main className="safe-bottom">
        {/* Welcome Header */}
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">
            Hello, <span className="text-gradient-amazon">{user.name}!</span>
          </h1>
          {user.isPrime && (
            <span className="prime-badge text-sm">prime member</span>
          )}
        </div>

        {/* My Orders Section */}
        {orders.length > 0 && (
          <section className="mb-6">
            <div className="section-header">
              <h2 className="section-title">My orders</h2>
              <Link to="/orders" className="text-primary text-sm font-medium flex items-center">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="px-4 space-y-3">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} compact />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed / Buy Again */}
        <section className="mb-6">
          <div className="section-header">
            <h2 className="section-title">Buy Again</h2>
            <Link to="/buy-again" className="text-primary text-sm font-medium flex items-center">
              See all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="scroll-container">
            {products.slice(0, 5).map((product) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="flex-shrink-0 w-20 text-center"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-secondary mb-1"
                />
                <p className="text-xs text-muted-foreground line-clamp-2">{product.name.split(' ').slice(0, 2).join(' ')}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map(({ icon: Icon, label, path, count }) => (
              <Link
                key={label}
                to={path}
                className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3 active:scale-[0.98] transition-transform"
              >
                <Icon className="w-6 h-6 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{label}</p>
                  {count !== undefined && (
                    <p className="text-xs text-muted-foreground">{count} orders</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Support */}
        <section className="px-4 mb-6">
          <h3 className="font-semibold mb-3">Other Support</h3>
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            {supportLinks.map(({ icon: Icon, label, path }, i) => (
              <Link
                key={label}
                to={path}
                className={`flex items-center justify-between p-4 ${i > 0 ? 'border-t border-border' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">{label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        {/* Account Settings */}
        <section className="px-4 pb-4">
          <div className="bg-card rounded-xl border border-border/50 overflow-hidden">
            <Link
              to="/settings"
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button
              className="flex items-center justify-between p-4 w-full border-t border-border text-destructive"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Sign Out</span>
              </div>
            </button>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Account;
