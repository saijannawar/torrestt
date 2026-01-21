import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShoppingCart, Star, SlidersHorizontal, ChevronDown, ChevronRight, Search } from 'lucide-react';

// STATIC DATA
const STATIC_PRODUCTS = [
  {
    id: 1,
    title: "Avone - Multipurpose Shopify Theme OS 2.0",
    author: "adornthemes",
    category: "Fashion",
    price: 89,
    sales: "11.1K",
    rating: 4.8,
    reviews: 564,
    image: "https://placehold.co/600x300/1a1a1a/FFF?text=Avone+Shopify",
    features: ["Incredible Theme Design", "Mobile Optimized", "Fast Loading"]
  },
  {
    id: 2,
    title: "Listeo - Directory & Listings With Booking",
    author: "purethemes",
    category: "Directory",
    price: 49,
    sales: "4.2K",
    rating: 5.0,
    reviews: 120,
    image: "https://placehold.co/600x300/581c87/FFF?text=Listeo+Directory",
    features: ["Built-in Booking System", "Front-end Submission", "Google Maps API"]
  },
  {
    id: 3,
    title: "Vegist - eCommerce Shopify 2.0 Theme",
    author: "spacingtech",
    category: "Food",
    price: 59,
    sales: "2.8K",
    rating: 4.5,
    reviews: 89,
    image: "https://placehold.co/600x300/166534/FFF?text=Vegist+Organic",
    features: ["Multiple Homepage Layouts", "SEO Optimized", "One-click Install"]
  },
  {
    id: 4,
    title: "RyanCV - CV Resume WordPress Theme",
    author: "beshleyua",
    category: "Resume",
    price: 39,
    sales: "1.5K",
    rating: 4.9,
    reviews: 210,
    image: "https://placehold.co/600x300/2563eb/FFF?text=RyanCV+Resume",
    features: ["Dark/Light Mode", "Elementor Page Builder", "24/7 Support"]
  }
];

const BrowseCollection = () => {
  const location = useLocation(); // Hook to read the URL
  const [displayedProducts, setDisplayedProducts] = useState(STATIC_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");

  // FILTER LOGIC: Runs whenever the URL changes (e.g., user searches)
  useEffect(() => {
    // 1. Read ?search=... from URL
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || "";
    setSearchQuery(query);

    // 2. Filter the Static Products
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filtered = STATIC_PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery) ||
        p.author.toLowerCase().includes(lowerQuery)
      );
      setDisplayedProducts(filtered);
    } else {
      // If no search, show all
      setDisplayedProducts(STATIC_PRODUCTS);
    }
  }, [location.search]);

  return (
    <div className="bg-[#F5F5F5] min-h-screen pb-20">
      
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 py-6">
         <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {searchQuery ? `Search Results for "${searchQuery}"` : "64,031 website templates from $2"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {searchQuery 
                ? `Found ${displayedProducts.length} matches.` 
                : "Sorted by highest rated. Beautiful website templates reviewed by our staff."}
            </p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          <div className="lg:col-span-1 space-y-6">
             
             {/* Filter Header */}
             <div className="flex items-center gap-2 font-bold text-gray-800 pb-4 border-b border-gray-200">
               <SlidersHorizontal size={18}/> Filter & Refine
             </div>

             {/* 1. Price Filter */}
             <div className="pb-6 border-b border-gray-200">
               <h3 className="font-bold text-gray-700 mb-3 flex justify-between">Price <ChevronDown size={16}/></h3>
               <div className="flex items-center gap-2">
                 <input type="number" placeholder="$" className="w-full border p-2 rounded text-sm" defaultValue="2"/>
                 <span className="text-gray-400">-</span>
                 <input type="number" placeholder="$" className="w-full border p-2 rounded text-sm" defaultValue="10000"/>
                 <button className="bg-gray-200 p-2 rounded hover:bg-gray-300"><ChevronRight size={16}/></button>
               </div>
             </div>

             {/* 2. On Sale */}
             <div className="pb-6 border-b border-gray-200">
               <h3 className="font-bold text-gray-700 mb-3 flex justify-between">On Sale <ChevronDown size={16}/></h3>
               <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                 <input type="checkbox" className="rounded border-gray-300"/> Yes <span className="ml-auto text-gray-400 text-xs">538</span>
               </label>
             </div>

             {/* 3. Sales Count */}
             <div className="pb-6 border-b border-gray-200">
               <h3 className="font-bold text-gray-700 mb-3 flex justify-between">Sales <ChevronDown size={16}/></h3>
               <div className="space-y-2">
                 {["No Sales", "Low", "Medium", "High", "Top Sellers"].map((label, idx) => (
                   <label key={idx} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-600">
                     <input type="checkbox" className="rounded border-gray-300"/> {label}
                     <span className="ml-auto text-gray-400 text-xs">{Math.floor(Math.random() * 30000)}</span>
                   </label>
                 ))}
               </div>
             </div>

             {/* 4. Rating */}
             <div className="pb-6 border-b border-gray-200">
               <h3 className="font-bold text-gray-700 mb-3 flex justify-between">Rating <ChevronDown size={16}/></h3>
               <div className="space-y-2">
                 <label className="flex items-center gap-2 text-sm font-bold text-gray-800 cursor-pointer">
                    <input type="radio" name="rating" defaultChecked /> Show all
                 </label>
                 {[1, 2, 3, 4].map(star => (
                   <label key={star} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="rating" /> {star} stars and higher
                      <span className="ml-auto text-gray-400 text-xs">{Math.floor(Math.random() * 15000)}</span>
                   </label>
                 ))}
               </div>
             </div>

          </div>

          {/* --- RIGHT CONTENT (PRODUCT LIST) --- */}
          <div className="lg:col-span-3">
            
            {/* Sort Bar */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 text-sm">
                 {displayedProducts.length} items found
              </span>
              <div className="flex gap-2 text-sm">
                <button className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-50">Best sellers</button>
                <button className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-50">Newest</button>
                <button className="px-3 py-1 bg-gray-800 text-white rounded">Best rated</button>
                <button className="px-3 py-1 border border-gray-300 bg-white rounded hover:bg-gray-50">Trending</button>
              </div>
            </div>

            {/* EMPTY STATE (When search finds nothing) */}
            {displayedProducts.length === 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                       <Search size={24}/>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">No results found</h3>
                    <p className="text-gray-500 mt-2">
                        We couldn't find any items matching "{searchQuery}". <br/>
                        Try searching for "Shopify", "Directory", or "Food".
                    </p>
                    <button 
                        onClick={() => window.location.href = '/all-items'}
                        className="mt-6 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* PRODUCT CARDS (Horizontal Layout) */}
            <div className="space-y-6">
              {displayedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                  
                  {/* Image */}
                  <div className="md:w-64 h-48 md:h-auto shrink-0 relative group cursor-pointer">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button className="bg-white text-gray-900 px-4 py-2 rounded font-bold text-sm">Live Preview</button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
                          {product.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">by <span className="text-gray-800 font-medium">{product.author}</span> in <span className="text-gray-800">{product.category}</span></p>
                      
                      {/* Features Bullet Points */}
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        {product.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                             <span className="w-1 h-1 bg-gray-400 rounded-full"></span> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                       <span className="flex items-center gap-1 text-orange-500"><ShoppingCart size={14}/> {product.sales} Sales</span>
                       <span>Last updated: Dec 25</span>
                    </div>
                  </div>

                  {/* Right Sidebar (Price & Cart) */}
                  <div className="p-6 md:w-48 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col items-center justify-center text-center bg-gray-50">
                     <div className="mb-2">
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                     </div>
                     <div className="flex items-center justify-center gap-1 mb-4 text-yellow-500 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                        ))}
                        <span className="text-gray-400 ml-1">({product.reviews})</span>
                     </div>
                     
                     <div className="space-y-2 w-full">
                       <button className="w-full border border-gray-300 bg-white text-gray-600 py-2 rounded text-sm font-bold hover:bg-gray-50 flex items-center justify-center gap-2">
                         <ShoppingCart size={16}/> Add to Cart
                       </button>
                       <button className="w-full border border-gray-300 bg-white text-gray-600 py-2 rounded text-sm font-bold hover:bg-gray-50">
                         Live Preview
                       </button>
                     </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Pagination */}
            {displayedProducts.length > 0 && (
                <div className="mt-10 flex justify-center gap-2">
                <button className="px-4 py-2 border rounded bg-gray-800 text-white">1</button>
                <button className="px-4 py-2 border rounded hover:bg-gray-100">2</button>
                <button className="px-4 py-2 border rounded hover:bg-gray-100">3</button>
                <span className="px-4 py-2">...</span>
                <button className="px-4 py-2 border rounded hover:bg-gray-100">Next &rarr;</button>
                </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCollection;