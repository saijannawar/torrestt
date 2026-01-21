import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Image as ImageIcon, Heart } from 'lucide-react';

// Static Data for Homepage Display
const PHOTO_EXAMPLES = [
  { 
    id: 1, 
    title: "Minimalist Office Setup", 
    category: "Business", 
    price: 5, 
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80" 
  },
  { 
    id: 2, 
    title: "Urban Architecture", 
    category: "City", 
    price: 8, 
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80" 
  },
  { 
    id: 3, 
    title: "Creative Team Meeting", 
    category: "People", 
    price: 12, 
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
  },
  { 
    id: 4, 
    title: "Abstract Gradient Waves", 
    category: "Backgrounds", 
    price: 4, 
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80" 
  }
];

const StockPhotoSection = () => {
  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        
        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 bg-lime-100 text-lime-600 rounded-lg">
                    <ImageIcon size={20} />
                </span>
                <span className="text-lime-600 font-bold uppercase tracking-wider text-xs">Product Line</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Premium Stock Photos
            </h2>
            <p className="text-gray-500 mt-3 text-lg max-w-xl">
              High-resolution, royalty-free images curated for your next website or creative project.
            </p>
          </div>
          
          <Link 
            to="/photos" 
            className="group flex items-center gap-2 font-bold text-gray-900 hover:text-purple-600 transition-colors"
          >
            View All Photos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </div>

        {/* --- Photos Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PHOTO_EXAMPLES.map((photo) => (
            <div key={photo.id} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={photo.image} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors shadow-lg" title="Preview">
                        <ImageIcon size={18} />
                    </button>
                    <button className="bg-white text-gray-900 p-3 rounded-full hover:text-red-500 transition-colors shadow-lg" title="Add to Wishlist">
                        <Heart size={18} />
                    </button>
                </div>
              </div>

              {/* Details (Like Templates) */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="text-xs font-bold text-purple-500 mb-1">{photo.category}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors cursor-pointer">
                    {photo.title}
                    </h3>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-gray-900">${photo.price}</span>
                    <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-600 transition-colors shadow-md">
                        <ShoppingCart size={16} /> Add
                    </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* --- Mobile Only: View All Button (Bottom) --- */}
        <div className="mt-8 text-center md:hidden">
            <Link to="/photos" className="inline-block w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">
                Browse All Photos
            </Link>
        </div>

      </div>
    </section>
  );
};

export default StockPhotoSection;