// Search page with filters
import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Star } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import ProductCard from '../components/ProductCard';
import { products, searchProducts } from '../data/products';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [primeOnly, setPrimeOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = query ? searchProducts(query) : products;
    
    if (primeOnly) {
      results = results.filter(p => p.isPrime);
    }
    
    results = results.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    
    return results;
  }, [query, priceRange, sortBy, primeOnly]);

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header with Search Input */}
      <header className="sticky top-0 z-40 bg-card shadow-sm px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg bg-secondary"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setPrimeOnly(!primeOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              primeOnly ? 'bg-primary text-primary-foreground' : 'bg-secondary'
            }`}
          >
            Prime Only
          </button>
          {['Best Sellers', 'Under $50', '$50-$200', 'Top Rated'].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-secondary"
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card border-b border-border p-4 animate-slide-up">
          <h3 className="font-semibold mb-3">Sort by</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { value: 'relevance', label: 'Relevance' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'rating', label: 'Rating' },
              { value: 'reviews', label: 'Most Reviews' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  sortBy === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="safe-bottom">
        {/* Results Count */}
        <div className="px-4 py-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredProducts.length}</span> results
            {query && <> for "<span className="font-semibold text-foreground">{query}</span>"</>}
          </p>
        </div>

        {/* Products Grid */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="default" className="w-full" />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No products found</p>
              <button 
                onClick={() => setQuery('')}
                className="text-primary font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SearchPage;
