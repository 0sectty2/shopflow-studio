// Category page
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { categories, getProductsByCategory } from '../data/products';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const category = categories.find(c => c.id === id);
  const products = getProductsByCategory(id || '');

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Category not found</p>
          <button onClick={() => navigate('/categories')} className="btn-amazon">
            View All Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBack title={category.name} />
      
      <main className="safe-bottom">
        {/* Hero Banner */}
        <div className={`relative h-32 ${category.gradient} mx-4 rounded-2xl overflow-hidden mb-4`}>
          <img 
            src={category.image} 
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 p-4 h-full flex flex-col justify-end">
            <h1 className="text-2xl font-bold text-primary-foreground drop-shadow-lg">
              {category.name}
            </h1>
            <p className="text-primary-foreground/80 text-sm">
              {products.length} products
            </p>
          </div>
        </div>

        {/* Subcategories */}
        {category.subcategories && (
          <div className="px-4 mb-4">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap">
                All
              </button>
              {category.subcategories.map((sub) => (
                <button 
                  key={sub}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium whitespace-nowrap"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="px-4 pb-4">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} variant="default" className="w-full" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No products in this category yet</p>
              <button 
                onClick={() => navigate('/search')}
                className="text-primary font-medium"
              >
                Browse all products
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CategoryPage;
