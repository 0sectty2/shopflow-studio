import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { categories } from '../data/products';
import { ChevronRight } from 'lucide-react';

const Categories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={true} title="Shop by categories" />
      
      <main className="safe-bottom p-4">
        {/* Featured Categories Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.slice(0, 4).map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className={`category-tile h-36 ${category.gradient}`}
            >
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
              <span className="relative z-10 text-primary-foreground font-bold text-base drop-shadow-lg">
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* All Categories List */}
        <h2 className="font-semibold text-lg mb-4">All Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/category/${category.id}`)}
              className="w-full bg-card rounded-xl p-4 border border-border/50 flex items-center gap-4 active:scale-[0.99] transition-transform"
            >
              <img 
                src={category.image} 
                alt={category.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">{category.name}</h3>
                {category.subcategories && (
                  <p className="text-sm text-muted-foreground">
                    {category.subcategories.slice(0, 3).join(', ')}
                    {category.subcategories.length > 3 && '...'}
                  </p>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Categories;
