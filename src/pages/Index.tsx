import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import InspirationTile from '../components/InspirationTile';
import { products, categories, getDeals, getFeaturedProducts } from '../data/products';
import { ChevronRight } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const deals = getDeals();
  const featured = getFeaturedProducts();

  const inspirationTiles = [
    { title: 'Your Daily Inspiration', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200', gradient: 'gradient-blue' },
    { title: 'Best tech of 2025', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200', gradient: 'gradient-coral' },
    { title: 'Local trends', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200', gradient: 'gradient-purple' },
    { title: 'Things nearby', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200', gradient: 'gradient-teal' },
    { title: 'Based on your likes', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200', gradient: 'gradient-green' },
  ];

  const quickCategories = [
    { id: 'prime', name: 'Prime Products', gradient: 'gradient-teal', image: categories.find(c => c.id === 'prime')?.image || '' },
    { id: 'deals', name: 'Deals & Savings', gradient: 'gradient-yellow', image: categories.find(c => c.id === 'deals')?.image || '' },
    { id: 'groceries', name: 'Groceries & Stores', gradient: 'gradient-green', image: categories.find(c => c.id === 'groceries')?.image || '' },
    { id: 'medical', name: 'Medical Care & Pharmacy', gradient: 'gradient-coral', image: categories.find(c => c.id === 'medical')?.image || '' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="safe-bottom pb-4">
        {/* Inspiration Grid */}
        <section className="px-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {/* Large tile */}
            <InspirationTile
              title={inspirationTiles[0].title}
              image={inspirationTiles[0].image}
              gradient={inspirationTiles[0].gradient}
              size="large"
              className="row-span-2 w-full h-full"
              onClick={() => navigate('/search?q=inspiration')}
            />
            {/* Small tiles */}
            {inspirationTiles.slice(1).map((tile, i) => (
              <InspirationTile
                key={i}
                title={tile.title}
                image={tile.image}
                gradient={tile.gradient}
                size="small"
                className="w-full"
                onClick={() => navigate('/search?q=' + tile.title)}
              />
            ))}
          </div>
        </section>

        {/* Category Pills */}
        <section className="px-4 mb-4">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {['For You', 'Keep Shopping', 'On Sale', 'Best Sellers'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => navigate('/search?filter=' + tab.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  i === 0 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Product */}
        <section className="px-4 mb-6">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-start gap-4">
              <img 
                src={products[0].image} 
                alt={products[0].name}
                className="w-28 h-28 object-cover rounded-xl bg-secondary cursor-pointer"
                onClick={() => navigate(`/product/${products[0].id}`)}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary font-medium mb-1">Bose New QuietComfort</p>
                <h3 
                  className="text-sm font-medium text-foreground line-clamp-2 mb-2 cursor-pointer"
                  onClick={() => navigate(`/product/${products[0].id}`)}
                >
                  Wireless Headphone
                </h3>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xl font-bold">${products[0].price}</span>
                  <span className="text-sm text-muted-foreground line-through">${products[0].originalPrice}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="prime-badge">prime</span>
                  <span className="text-xs text-muted-foreground">{products[0].reviewCount.toLocaleString()} reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-amazon-green font-medium">In Stock</span>
                  <span className="text-xs text-muted-foreground">• FREE Delivery Tuesday, Jan 2</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Categories */}
        <section className="mb-6">
          <div className="section-header">
            <h2 className="section-title">Shop by categories</h2>
            <button 
              onClick={() => navigate('/categories')}
              className="text-primary text-sm font-medium flex items-center"
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="scroll-container">
            {quickCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/category/${cat.id}`)}
                className={`category-tile flex-shrink-0 w-40 h-28 ${cat.gradient}`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-30" />
                </div>
                <span className="relative z-10 text-primary-foreground font-semibold text-sm drop-shadow-lg">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Deals Section */}
        <section className="mb-6">
          <div className="section-header">
            <h2 className="section-title">Today's Deals</h2>
            <button 
              onClick={() => navigate('/search?filter=deals')}
              className="text-primary text-sm font-medium flex items-center"
            >
              See all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="scroll-container">
            {deals.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} variant="default" />
            ))}
          </div>
        </section>

        {/* Keep Shopping */}
        <section className="mb-6">
          <div className="section-header">
            <h2 className="section-title">Keep Shopping</h2>
          </div>
          <div className="scroll-container">
            {products.slice(3, 9).map((product) => (
              <ProductCard key={product.id} product={product} variant="compact" />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-6">
          <div className="section-header">
            <h2 className="section-title">Featured for You</h2>
          </div>
          <div className="px-4 space-y-3">
            {featured.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} variant="horizontal" />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
