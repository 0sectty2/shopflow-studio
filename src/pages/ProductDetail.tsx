import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Star, ChevronDown, ChevronRight, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import ProductCard from '@/components/ProductCard';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id || '');
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <button onClick={() => navigate('/')} className="btn-amazon">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success('Added to cart', {
      description: `${product.name.slice(0, 30)}...`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full active:bg-secondary">
            <Heart className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full active:bg-secondary">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="pb-32">
        {/* Image Gallery */}
        <div className="bg-card">
          <div className="relative aspect-square">
            <img 
              src={images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
            <button className="absolute top-4 right-4 px-3 py-1.5 bg-card/80 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1.5 shadow-sm">
              <Heart className="w-4 h-4" />
              Save to List
            </button>
            {product.discount && (
              <span className="absolute top-4 left-4 bg-price-red text-primary-foreground text-sm font-bold px-3 py-1 rounded-lg">
                -{product.discount}%
              </span>
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 px-4 pb-4 overflow-x-auto hide-scrollbar">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-colors ${
                  selectedImage === i ? 'border-primary' : 'border-border'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-4">
          {/* Title & Rating */}
          <div>
            <h1 className="text-lg font-semibold text-foreground leading-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'fill-muted text-muted'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} • {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-price-red font-semibold">
                    -{product.discount}%
                  </span>
                </>
              )}
            </div>
            {product.isPrime && (
              <div className="flex items-center gap-2">
                <span className="prime-badge text-sm">prime</span>
                <span className="text-sm text-amazon-green font-medium">
                  FREE Delivery {product.deliveryDate}
                </span>
              </div>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Color: <span className="font-normal">{selectedColor}</span></p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                      selectedColor === color.name 
                        ? 'border-primary ring-2 ring-primary/20' 
                        : 'border-border'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.name && (
                      <Check className={`w-5 h-5 ${color.hex === '#ffffff' || color.hex === '#f5f5f5' ? 'text-foreground' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === size 
                        ? 'border-primary bg-primary/5 text-primary font-medium' 
                        : 'border-border'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Info */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amazon-green"></span>
                <span className="text-amazon-green font-medium">In Stock</span>
                {product.stockCount && product.stockCount < 20 && (
                  <span className="text-sm text-muted-foreground">
                    • Only {product.stockCount} left
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-destructive"></span>
                <span className="text-destructive font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Product Info Accordion */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-full bg-card rounded-xl p-4 border border-border/50 flex items-center justify-between"
          >
            <span className="font-medium">Product Info</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${showInfo ? 'rotate-180' : ''}`} />
          </button>
          
          {showInfo && (
            <div className="bg-card rounded-xl p-4 border border-border/50 space-y-3 animate-fade-in">
              <p className="text-sm text-muted-foreground">{product.description}</p>
              {product.features && (
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-amazon-green flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Info Links */}
          <div className="space-y-1">
            {['Product Details', 'Description', 'Media Gallery', 'User Guide', 'Troubleshooting Guide'].map((item) => (
              <button key={item} className="w-full flex items-center justify-between py-3 border-b border-border last:border-0">
                <span className="text-sm">{item}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Delivery & Returns */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl p-3 border border-border/50 text-center">
              <Truck className="w-6 h-6 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Free Delivery</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border/50 text-center">
              <RotateCcw className="w-6 h-6 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Easy Returns</p>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border/50 text-center">
              <Shield className="w-6 h-6 mx-auto mb-1 text-primary" />
              <p className="text-xs font-medium">Warranty</p>
            </div>
          </div>

          {/* Compare with Similar */}
          {similarProducts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">Compare with similar items</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} variant="compact" />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-[4.5rem] left-0 right-0 bg-card border-t border-border p-4 flex gap-3 z-30">
        <button
          onClick={handleAddToCart}
          className="flex-1 btn-amazon-outline text-center"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 btn-amazon text-center"
        >
          Buy Now
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProductDetail;
