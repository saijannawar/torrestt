import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { Search, Layout, ChevronDown, ChevronUp, ChevronRight, Star, ShoppingCart, Zap, TrendingUp, Clock, Tag } from 'lucide-react';

const client = generateClient();

// --- MOCK DATA ---
const WEEKLY_BESTSELLERS = [
  { id: 101, title: "Avada | Website Builder For WordPress", author: "ThemeFusion", category: "Business", price: 69, sales: "1.05M", rating: 4.8, image: "https://placehold.co/600x350/10b981/ffffff?text=Avada" },
  { id: 102, title: "WoodMart - Multipurpose WooCommerce", author: "xtemos", category: "WooCommerce", price: 59, sales: "108.1K", rating: 4.9, image: "https://placehold.co/600x350/1e293b/ffffff?text=WoodMart" },
  { id: 103, title: "The7 — Ultimate WordPress Theme", author: "Dream-Theme", category: "Business", price: 39, sales: "331.7K", rating: 4.7, image: "https://placehold.co/600x350/3b82f6/ffffff?text=The7" },
  { id: 104, title: "Flatsome | Multi-Purpose Responsive", author: "UX-themes", category: "WooCommerce", price: 59, sales: "264.1K", rating: 4.8, image: "https://placehold.co/600x350/6366f1/ffffff?text=Flatsome" }
];

const HOT_UNDER_15 = [
  { id: 201, title: "Modern Business Card Template", author: "GraphicSoul", category: "Print", price: 12, sales: "450", rating: 4.5, image: "https://placehold.co/600x350/f43f5e/ffffff?text=Card+Template" },
  { id: 202, title: "Social Media Pack Pro", author: "DesignSpace", category: "Graphics", price: 14, sales: "1.2K", rating: 4.7, image: "https://placehold.co/600x350/8b5cf6/ffffff?text=Social+Pack" },
  { id: 203, title: "Resume / CV Template Clean", author: "Resumify", category: "Print", price: 9, sales: "890", rating: 4.9, image: "https://placehold.co/600x350/0ea5e9/ffffff?text=CV+Template" },
  { id: 204, title: "Logo Mockup Bundle", author: "MockupKing", category: "Graphics", price: 15, sales: "3.4K", rating: 4.6, image: "https://placehold.co/600x350/fbbf24/ffffff?text=Logo+Mockup" }
];

const NEW_RELEASES = [
  { id: 301, title: "NextSaaS - React Admin Dashboard", author: "TechLabs", category: "Admin Templates", price: 24, sales: "12", rating: 5.0, image: "https://placehold.co/600x350/ec4899/ffffff?text=NextSaaS" },
  { id: 302, title: "Modave - Multipurpose Shopify", author: "ShopifyPro", category: "Shopify", price: 29, sales: "45", rating: 4.5, image: "https://placehold.co/600x350/14b8a6/ffffff?text=Modave" },
  { id: 303, title: "Bright-up - Startup Agency Theme", author: "CreativeMinds", category: "WordPress", price: 39, sales: "8", rating: 0, image: "https://placehold.co/600x350/f97316/ffffff?text=Bright-up" },
  { id: 304, title: "Tailux - Tailwind CSS Admin", author: "CodeThemes", category: "Admin Templates", price: 19, sales: "23", rating: 4.8, image: "https://placehold.co/600x350/64748b/ffffff?text=Tailux" }
];

const POPULAR_SEARCHES = [
  "food", "travel", "real estate", "portfolio", "landing page", "hotel", 
  "blog", "education", "newspaper", "photography", "news", "dashboard"
];

const SALE_ITEMS = [
  { id: 1, title: "Convertly - Tax & Accounting Theme", author: "nirmalstudio", category: "Business Services", price: 24, salePrice: 19, sales: 1, rating: 0, image: "https://placehold.co/600x350/064e3b/ffffff?text=Convertly" },
  { id: 2, title: "Jhana - Yoga WordPress Theme", author: "YoloTheme", category: "Health Beauty", price: 45, salePrice: 40, sales: 225, rating: 4.5, image: "https://placehold.co/600x350/ecfccb/3f6212?text=Jhana" },
  { id: 3, title: "MyHome - Real Estate WordPress", author: "TangibleWP", category: "Real Estate", price: 79, salePrice: 59, sales: 7200, rating: 5, image: "https://placehold.co/600x350/1e3a8a/ffffff?text=MyHome" }
];

const listCategoriesDeep = `
  query ListCategoriesDeep {
    listCategories {
      items {
        id
        name
        slug
      }
    }
  }
`;

const ProductCard = ({ item, badge }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
    <div className="relative h-40 bg-gray-100 overflow-hidden">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      {badge && <div className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded shadow-sm z-10">{badge}</div>}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div className="p-3 flex flex-col flex-grow">
      <h3 className="font-bold text-gray-800 text-sm mb-1 truncate leading-tight" title={item.title}>{item.title}</h3>
      <p className="text-xs text-gray-500 mb-2 truncate">by <span className='text-gray-700 font-medium'>{item.author}</span> in {item.category}</p>
      <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${item.salePrice || item.price}</span>
            {item.salePrice && <span className="text-xs text-gray-400 line-through ml-1.5">${item.price}</span>}
          </div>
          <div className="flex items-center">
             <div className="flex items-center mr-2">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={10} className={`${i < Math.floor(item.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
               ))}
               <span className="text-[9px] text-gray-400 ml-0.5">({item.sales})</span>
             </div>
          </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100 flex gap-2">
          <button className="flex-1 py-1 text-xs font-semibold text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"><ShoppingCart size={12}/> Add to Cart</button>
          <button className="px-2 py-1 text-xs font-semibold text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">Preview</button>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, linkText = "View all", icon: Icon }) => (
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
            {Icon && <Icon className="text-gray-400" size={24} />}
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <button className="text-sm font-semibold text-white bg-[#82B440] hover:bg-[#72a035] px-4 py-2 rounded transition-colors">{linkText}</button>
    </div>
);

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const result = await client.graphql({ 
        query: listCategoriesDeep,
        authMode: 'apiKey' 
      });
      const sorted = result.data.listCategories.items.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sorted);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  }

  const filteredCategories = categories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const visibleCategories = showAllCategories ? filteredCategories : filteredCategories.slice(0, 15);

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      
      {/* 1. Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        {/* --- ADDED CUSTOM WIDTH HERE --- */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Explore Collections</h1>
              <p className="text-gray-500 text-lg">Browse our curated categories for your next project.</p>
            </div>
            <div className="w-full md:w-auto md:min-w-[350px]">
              <div className="relative shadow-md hover:shadow-lg transition-shadow rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
                <input type="text" className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Category List Box */}
      {/* --- ADDED CUSTOM WIDTH HERE --- */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-8 relative z-20 pb-16">
        <div className="bg-white rounded border border-gray-200 shadow-sm">
            
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <Layout className="text-gray-500" size={20} />
                <h2 className="text-lg font-bold text-gray-800">All categories</h2>
            </div>

            <div className="p-6">
                {loading ? <div className="text-gray-400 text-sm">Loading...</div> : 
                 filteredCategories.length === 0 ? <div className="text-gray-400 text-sm">No categories found</div> : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-2">
                        {visibleCategories.map((cat) => (
                            <Link 
                                key={cat.id} 
                                to={`/category/${cat.slug}`}
                                className="group flex items-center justify-between py-3 border-b border-gray-100 transition-all hover:bg-gray-50/50"
                                title={cat.name}
                            >
                                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                                  {cat.name}
                                </span>
                                <ChevronRight 
                                  size={14} 
                                  className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" 
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t border-gray-100 bg-white relative">
                <div className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-6">
                     <Link to="/new" className="text-sm font-bold text-gray-700 hover:text-blue-600">Browse New</Link>
                     <Link to="/bestsellers" className="text-sm font-bold text-gray-700 hover:text-blue-600">Browse Bestsellers</Link>
                </div>

                {filteredCategories.length > 15 && (
                    <div className="absolute left-1/2 -top-3.5 -translate-x-1/2">
                        <button 
                            onClick={() => setShowAllCategories(!showAllCategories)}
                            className="bg-white border border-gray-200 text-xs font-semibold text-gray-600 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-50 flex items-center gap-1 transition-all"
                        >
                            {showAllCategories ? (
                                <>Show less <ChevronUp size={14}/></>
                            ) : (
                                <>Show more <ChevronDown size={14}/></>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* 3. Sale Items Section */}
      <div className="bg-[#E6E6E6] py-16 border-t border-gray-200">
        {/* --- ADDED CUSTOM WIDTH HERE --- */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/4 pt-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 leading-tight">Save on website templates and themes.</h2>
                    <button className="bg-[#82B440] hover:bg-[#72a035] text-white font-bold py-3 px-6 rounded shadow-md w-full md:w-auto">Browse on sale themes</button>
                </div>
                <div className="lg:w-3/4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SALE_ITEMS.map((item) => <ProductCard key={item.id} item={item} badge={<Tag size={12} />} />)}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 4. Other Sections */}
      {/* --- ADDED CUSTOM WIDTH HERE --- */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 space-y-20">
        <section>
            <SectionHeader title="Weekly bestsellers" icon={TrendingUp} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {WEEKLY_BESTSELLERS.map(item => <ProductCard key={item.id} item={item} badge={<Zap size={14}/>} />)}
            </div>
        </section>

        <section>
            <SectionHeader title="New bestsellers" icon={Star} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...WEEKLY_BESTSELLERS].reverse().map(item => <ProductCard key={item.id} item={item} />)}
            </div>
        </section>

        <section>
            <SectionHeader title="Hot under $15" icon={Tag} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {HOT_UNDER_15.map(item => <ProductCard key={item.id} item={item} />)}
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular searches</h2>
            <div className="flex flex-wrap gap-3">
                {POPULAR_SEARCHES.map((term, i) => (
                    <Link key={i} to={`/search?q=${term}`} className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium bg-white hover:border-gray-800 hover:text-gray-900 transition-all text-sm">{term}</Link>
                ))}
            </div>
        </section>

        <section>
            <SectionHeader title="New releases" icon={Clock} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {NEW_RELEASES.map(item => <ProductCard key={item.id} item={item} badge={<span className="text-[10px] font-bold">NEW</span>} />)}
            </div>
        </section>
      </div>

    </div>
  );
};

export default AllCategories;