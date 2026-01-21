import React from 'react';
import { ShoppingCart, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock Data for the 4 Bestsellers
const bestsellers = [
  {
    id: 1,
    title: "Avada | Website Builder For WordPress & WooCommerce",
    author: "ThemeFusion",
    category: "Business",
    price: 69,
    sales: "1.04M Sales",
    rating: 4.8,
    reviews: "26.5K",
    image: "https://placehold.co/600x350/ffffff/333333?text=Avada+Theme",
    featured: true
  },
  {
    id: 2,
    title: "WoodMart - Multipurpose WooCommerce Theme",
    author: "xtemos",
    category: "WooCommerce",
    price: 59,
    sales: "107.9K Sales",
    rating: 4.9,
    reviews: "3.5K",
    image: "https://placehold.co/600x350/1e1e1e/ffffff?text=WoodMart+Store",
    featured: true
  },
  {
    id: 3,
    title: "The7 — Ultimate WordPress & WooCommerce Theme",
    author: "Dream-Theme",
    category: "Business",
    price: 39,
    sales: "331.6K Sales",
    rating: 4.7,
    reviews: "9.2K",
    image: "https://placehold.co/600x350/2563eb/ffffff?text=The7+Builder",
    featured: true
  },
  {
    id: 4,
    title: "Betheme | Responsive Multipurpose WordPress Theme",
    author: "muffingroup",
    category: "Business",
    price: 60,
    sales: "331.1K Sales",
    rating: 4.8,
    reviews: "7K",
    image: "https://placehold.co/600x350/0f172a/ffffff?text=Betheme+WP",
    featured: true
  }
];

const WeeklyBestsellers = () => {
  return (
    <section className="bg-[#F5F5F5] py-24 border-t border-gray-200">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="w-full lg:w-1/3 py-8">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6 leading-tight">
                Browse this week's <span className="font-bold">best selling</span> WordPress themes
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                This week's best web themes & templates have arrived.
            </p>
            <button className="bg-[#8FA67A] hover:bg-[#7A8F68] text-white font-bold py-3 px-8 rounded shadow-md transition-all">
                View more bestsellers
            </button>
        </div>

        {/* RIGHT COLUMN: Product Grid (2x2) */}
        <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bestsellers.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col">
                        
                        {/* Image Area with Badge */}
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                            {/* Blue Lightning Badge */}
                            <div className="absolute top-3 left-3 bg-[#0073AA] text-white p-1.5 rounded shadow-sm z-10">
                                <Zap size={16} fill="currentColor" />
                            </div>

                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Hover Arrows */}
                            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-white/90 p-1.5 rounded-full shadow-sm text-gray-800">
                                    <ChevronLeft size={18} />
                                </div>
                                <div className="bg-white/90 p-1.5 rounded-full shadow-sm text-gray-800">
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-gray-800 font-bold text-[15px] mb-1 leading-snug line-clamp-1 cursor-pointer hover:text-[#0073AA] transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">
                                by <span className="text-gray-700 font-medium hover:underline cursor-pointer">{item.author}</span> in <span className="text-gray-700 font-medium hover:underline cursor-pointer">{item.category}</span>
                            </p>

                            {/* Footer Area: Price/Ratings vs Buttons */}
                            <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-4">
                                
                                {/* Left: Price & Stats */}
                                <div>
                                    <div className="text-xl font-bold text-gray-800 mb-1">${item.price}</div>
                                    <div className="flex items-center gap-1 mb-1">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill="currentColor" className={i === 4 ? "text-gray-300" : ""} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400">({item.reviews})</span>
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">{item.sales}</div>
                                </div>

                                {/* Right: Buttons */}
                                <div className="flex flex-col gap-2 items-end">
                                    <button className="p-2 text-gray-500 hover:text-gray-800 border border-gray-200 rounded hover:border-gray-400 transition-colors">
                                        <ShoppingCart size={16} />
                                    </button>
                                    <button className="px-3 py-1.5 text-xs font-bold text-[#0073AA] border border-gray-200 rounded hover:border-[#0073AA] hover:bg-blue-50 transition-all whitespace-nowrap">
                                        Live Preview
                                    </button>
                                </div>

                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default WeeklyBestsellers;