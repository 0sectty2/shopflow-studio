export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  category: string;
  subcategory?: string;
  isPrime: boolean;
  inStock: boolean;
  stockCount?: number;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  deliveryDate: string;
  seller: string;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  gradient: string;
  subcategories?: string[];
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    gradient: "gradient-blue",
    subcategories: ["Headphones", "Phones", "Laptops", "Cameras", "TVs"]
  },
  {
    id: "fashion",
    name: "Fashion & Beauty",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
    gradient: "gradient-purple",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories"]
  },
  {
    id: "groceries",
    name: "Groceries & Stores",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop",
    gradient: "gradient-green",
    subcategories: ["Fresh Produce", "Dairy", "Snacks", "Beverages"]
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
    gradient: "gradient-coral",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding"]
  },
  {
    id: "prime",
    name: "Prime Products",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=300&h=200&fit=crop",
    gradient: "gradient-teal",
    subcategories: ["Best Sellers", "Exclusive Deals", "Early Access"]
  },
  {
    id: "deals",
    name: "Deals & Savings",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
    gradient: "gradient-yellow",
    subcategories: ["Today's Deals", "Lightning Deals", "Coupons"]
  },
  {
    id: "medical",
    name: "Medical Care & Pharmacy",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop",
    gradient: "gradient-teal",
    subcategories: ["Vitamins", "First Aid", "Personal Care"]
  },
  {
    id: "pets",
    name: "Pets",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=200&fit=crop",
    gradient: "gradient-coral",
    subcategories: ["Dog Supplies", "Cat Supplies", "Pet Food"]
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "Bose QuietComfort 45 Wireless Bluetooth Noise Cancelling Headphones",
    description: "Premium wireless headphones with world-class noise cancellation, high-fidelity audio, and up to 24 hours of battery life. Perfect for travel, work, or relaxation.",
    price: 279,
    originalPrice: 329,
    discount: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop"
    ],
    rating: 4.7,
    reviewCount: 12847,
    category: "electronics",
    subcategory: "Headphones",
    isPrime: true,
    inStock: true,
    stockCount: 50,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#f5f5f5" },
      { name: "Blue", hex: "#1e40af" }
    ],
    deliveryDate: "Tomorrow",
    seller: "Bose Official",
    features: [
      "World-class noise cancellation",
      "High-fidelity audio",
      "24-hour battery life",
      "Comfortable fit for all-day wear",
      "Multi-device connectivity"
    ]
  },
  {
    id: "2",
    name: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
    description: "Active Noise Cancellation, Personalized Spatial Audio, and a MagSafe Charging Case. Next-level AirPods.",
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop"
    ],
    rating: 4.8,
    reviewCount: 45892,
    category: "electronics",
    subcategory: "Headphones",
    isPrime: true,
    inStock: true,
    stockCount: 120,
    colors: [
      { name: "White", hex: "#ffffff" }
    ],
    deliveryDate: "Tomorrow",
    seller: "Apple",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Personalized Spatial Audio",
      "Touch control",
      "6 hours battery life"
    ]
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation with Auto NC Optimizer, crystal clear hands-free calling, and 30-hour battery.",
    price: 348,
    originalPrice: 399,
    discount: 13,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop"
    ],
    rating: 4.6,
    reviewCount: 8934,
    category: "electronics",
    subcategory: "Headphones",
    isPrime: true,
    inStock: true,
    stockCount: 35,
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Silver", hex: "#c0c0c0" }
    ],
    deliveryDate: "Wednesday",
    seller: "Sony Official",
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Multipoint connection",
      "Quick charging (3 min = 3 hours)",
      "Speak-to-Chat"
    ]
  },
  {
    id: "4",
    name: "Samsung Galaxy S24 Ultra 256GB - Titanium Gray",
    description: "The ultimate Galaxy experience with built-in S Pen, 200MP camera, and Galaxy AI.",
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop"
    ],
    rating: 4.5,
    reviewCount: 3421,
    category: "electronics",
    subcategory: "Phones",
    isPrime: true,
    inStock: true,
    stockCount: 25,
    colors: [
      { name: "Titanium Gray", hex: "#4a4a4a" },
      { name: "Titanium Black", hex: "#1a1a1a" },
      { name: "Titanium Violet", hex: "#8b5cf6" }
    ],
    deliveryDate: "Tomorrow",
    seller: "Samsung",
    features: [
      "200MP camera system",
      "Galaxy AI powered",
      "Built-in S Pen",
      "5000mAh battery",
      "Titanium frame"
    ]
  },
  {
    id: "5",
    name: "Organic Green Tea Matcha Powder - 100g",
    description: "Premium ceremonial grade matcha from Kyoto, Japan. Perfect for lattes, smoothies, and baking.",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 2156,
    category: "groceries",
    subcategory: "Beverages",
    isPrime: true,
    inStock: true,
    stockCount: 200,
    deliveryDate: "Tomorrow",
    seller: "Kyoto Organic"
  },
  {
    id: "6",
    name: "Dyson V15 Detect Cordless Vacuum Cleaner",
    description: "Reveals microscopic dust with a laser. Powerful Dyson Hyperdymium motor. Up to 60 minutes run time.",
    price: 649,
    originalPrice: 749,
    discount: 13,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 6543,
    category: "home",
    subcategory: "Appliances",
    isPrime: true,
    inStock: true,
    stockCount: 15,
    colors: [
      { name: "Iron/Gold", hex: "#b8860b" },
      { name: "Blue/Nickel", hex: "#4682b4" }
    ],
    deliveryDate: "Thursday",
    seller: "Dyson Official",
    features: [
      "Laser reveals invisible dust",
      "Piezo sensor counts particles",
      "60 min runtime",
      "LCD screen",
      "HEPA filtration"
    ]
  },
  {
    id: "7",
    name: "Levi's Men's 501 Original Fit Jeans",
    description: "The original jean. The iconic straight fit with a button fly that started it all.",
    price: 59.99,
    originalPrice: 79.50,
    discount: 25,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    rating: 4.5,
    reviewCount: 18923,
    category: "fashion",
    subcategory: "Men's Clothing",
    isPrime: true,
    inStock: true,
    stockCount: 80,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Medium Stonewash", hex: "#5b7c99" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Dark Rinse", hex: "#1e3a5f" }
    ],
    deliveryDate: "Tomorrow",
    seller: "Levi's"
  },
  {
    id: "8",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 124567,
    category: "home",
    subcategory: "Kitchen",
    isPrime: true,
    inStock: true,
    stockCount: 150,
    deliveryDate: "Tomorrow",
    seller: "Instant Pot",
    features: [
      "7-in-1 functionality",
      "6 Quart capacity",
      "13 smart programs",
      "Stainless steel inner pot",
      "Easy to clean"
    ]
  },
  {
    id: "9",
    name: "Nike Air Max 270 Running Shoes",
    description: "The Nike Air Max 270 features Nike's biggest heel Air unit yet for a super-soft ride.",
    price: 129.99,
    originalPrice: 150,
    discount: 13,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 8765,
    category: "fashion",
    subcategory: "Shoes",
    isPrime: true,
    inStock: true,
    stockCount: 45,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: [
      { name: "Black/White", hex: "#1a1a1a" },
      { name: "White/Black", hex: "#ffffff" },
      { name: "Red", hex: "#ef4444" }
    ],
    deliveryDate: "Wednesday",
    seller: "Nike Official"
  },
  {
    id: "10",
    name: "Premium Dog Food - Grain Free Salmon",
    description: "High-protein, grain-free recipe made with real salmon as the #1 ingredient. Perfect for adult dogs.",
    price: 49.99,
    originalPrice: 64.99,
    discount: 23,
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 5432,
    category: "pets",
    subcategory: "Pet Food",
    isPrime: true,
    inStock: true,
    stockCount: 100,
    deliveryDate: "Tomorrow",
    seller: "PetNutrition"
  },
  {
    id: "11",
    name: "Vitamins D3 + K2 Complex - 90 Capsules",
    description: "High-potency vitamin D3 5000 IU with K2 MK-7 100mcg for optimal calcium absorption and bone health.",
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 7823,
    category: "medical",
    subcategory: "Vitamins",
    isPrime: true,
    inStock: true,
    stockCount: 250,
    deliveryDate: "Tomorrow",
    seller: "VitaHealth"
  },
  {
    id: "12",
    name: "MacBook Pro 14\" M3 Pro - Space Black",
    description: "Supercharged by M3 Pro. Up to 18 hours of battery life. Stunning Liquid Retina XDR display.",
    price: 1999,
    originalPrice: 2199,
    discount: 9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 2341,
    category: "electronics",
    subcategory: "Laptops",
    isPrime: true,
    inStock: true,
    stockCount: 10,
    colors: [
      { name: "Space Black", hex: "#1d1d1f" },
      { name: "Silver", hex: "#e3e3e3" }
    ],
    deliveryDate: "Thursday",
    seller: "Apple",
    features: [
      "M3 Pro chip",
      "18-hour battery",
      "Liquid Retina XDR display",
      "18GB unified memory",
      "512GB SSD"
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.category === categoryId);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isPrime && p.discount && p.discount >= 15);
};

export const getDeals = (): Product[] => {
  return products.filter(p => p.discount && p.discount >= 20).sort((a, b) => (b.discount || 0) - (a.discount || 0));
};
