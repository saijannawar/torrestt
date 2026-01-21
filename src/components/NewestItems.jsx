import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listCategories } from '../graphql/queries'; // We only fetch categories now
import { ShoppingCart, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const client = generateClient();

// --- STATIC PRODUCTS (Mock Data for Display) ---
const STATIC_PRODUCTS = [
  {
    id: 1,
    title: "Healthcare - Medical Center Mobile App...",
    author: "WebBmasda",
    category: "UI Templates", // Make sure you have a Category in AWS named "UI Templates" to see this when filtering!
    price: 22,
    image: "https://placehold.co/600x400/eff6ff/3b82f6?text=Healthcare+App"
  },
  {
    id: 2,
    title: "Calisa - Custom Jewellery Elementor Tem...",
    author: "Kitpro",
    category: "WordPress",
    price: 24,
    image: "https://placehold.co/600x400/fdf2f8/db2777?text=Calisa+Jewelry"
  },
  {
    id: 3,
    title: "FlowFix - Plumbing & Plumber Service El...",
    author: "sparklethings",
    category: "Site Templates",
    price: 24,
    image: "https://placehold.co/600x400/fff7ed/ea580c?text=FlowFix+Plumbing"
  },
  {
    id: 4,
    title: "Luxe - Architecture & Interior Elementor ...",
    author: "Enative",
    category: "Real Estate",
    price: 25,
    image: "https://placehold.co/600x400/f8fafc/64748b?text=Luxe+Interior"
  },
  {
    id: 5,
    title: "Avique - Beauty Care Elementor Templat...",
    author: "creedcreatives",
    category: "Fashion Beauty",
    price: 24,
    image: "https://placehold.co/600x400/fdf4ff/c026d3?text=Avique+Beauty"
  },
  {
    id: 6,
    title: "Relsea - Yacht Club & Luxury Boat Renta...",
    author: "raddito",
    category: "Travel",
    price: 25,
    image: "https://placehold.co/600x400/f0f9ff/0284c7?text=Relsea+Yacht"
  },
  {
    id: 7,
    title: "Crown - Luxury Car Rental Service Eleme...",
    author: "sociolib",
    category: "Automotive",
    price: 24,
    image: "https://placehold.co/600x400/18181b/71717a?text=Crown+Luxury"
  },
  {
    id: 8,
    title: "Lunera - Feminine Business Coaching Ele...",
    author: "moxcreative",
    category: "Business",
    price: 24,
    image: "https://placehold.co/600x400/fff1f2/e11d48?text=Lunera+Coach"
  }
];

const NewestItems = () => {
  // State
  const [activeTab, setActiveTab] = useState("All Categories");
  const [categories, setCategories] = useState([]);

  // 1. Fetch Categories from AWS on Load
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const apiData = await client.graphql({ query: listCategories, authMode: 'apiKey' });
      // Sort alphabetically and take top 12 so tabs don't overflow
      const items = apiData.data.listCategories.items
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 12);
      setCategories(items);
    } catch (err) {
      console.log('Error fetching categories:', err);
    }
  }

  // 2. Filter Logic (Matches Static Product Category to Dynamic Tab Name)
  const displayedProducts = activeTab === "All Categories"
    ? STATIC_PRODUCTS
    : STATIC_PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section className="bg-[#F5F5F5] py-24">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-800 mb-4">
            Check out our newest themes and templates
          </h2>
          <p className="text-gray-500 max-w-4xl mx-auto leading-relaxed">
            We carefully review new entries from our community one by one to make sure they meet high-quality design and functionality standards.
          </p>
        </div>

        {/* Dynamic Filter Tabs (AWS Data) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {/* Default Tab */}
          <button
            onClick={() => setActiveTab("All Categories")}
            className={`
              px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 border
              ${activeTab === "All Categories" 
                ? 'bg-white border-brand-light text-gray-800 shadow-sm' 
                : 'bg-white border-transparent text-gray-500 hover:shadow-sm hover:text-gray-700'}
            `}
          >
            All Categories
          </button>

          {/* Mapped AWS Categories */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.name)}
              className={`
                px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 border
                ${activeTab === cat.name
                  ? 'bg-white border-brand-light text-gray-800 shadow-sm' 
                  : 'bg-white border-transparent text-gray-500 hover:shadow-sm hover:text-gray-700'}
              `}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid (Static Data) */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
             <p className="text-gray-400">
               No static mock items found for category: <strong>{activeTab}</strong>.
             </p>
             <p className="text-sm text-gray-300 mt-2">
               (Add a mock product with category "{activeTab}" in the code to see it here)
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {displayedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                
                {/* Image Area */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Arrows */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/80 p-1 rounded-full cursor-pointer hover:bg-white text-gray-800">
                          <ChevronLeft size={16} />
                      </div>
                      <div className="bg-white/80 p-1 rounded-full cursor-pointer hover:bg-white text-gray-800">
                          <ChevronRight size={16} />
                      </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  <h3 className="text-gray-800 font-bold text-[15px] mb-1 leading-snug truncate cursor-pointer hover:text-brand-light transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    by <span className="text-gray-700 font-medium hover:underline cursor-pointer">{product.author}</span> in <span className="text-gray-700 font-medium hover:underline cursor-pointer">{product.category}</span>
                  </p>

                  {/* Footer: Price & Actions */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-xl font-bold text-gray-800">${product.price}</span>
                    
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-gray-800 border border-gray-200 rounded hover:border-gray-400 transition-colors">
                          <ShoppingCart size={16} />
                      </button>
                      <button className="px-3 py-1.5 text-xs font-bold text-[#0073AA] border border-gray-200 rounded hover:border-[#0073AA] hover:bg-blue-50 transition-all">
                          Live Preview
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Button */}
        <div className="text-center">
            <Link 
              to="/all-items" 
              className="inline-block bg-brand-light hover:bg-brand-dark text-white font-bold py-3 px-8 rounded shadow-lg hover:shadow-xl transition-all"
            >
                View more new items
            </Link>
        </div>

      </div>
    </section>
  );
};

export default NewestItems;