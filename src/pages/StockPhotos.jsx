import React, { useState, useEffect } from 'react';
import { Search, Download, Heart, Filter, ImageIcon, X } from 'lucide-react';

// --- Import Layout Components ---
// We import these so the page looks consistent with BrowseCollection
import PromoBanner from '../components/PromoBanner';
import TopHeader from '../components/TopHeader';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

// STATIC DATA
const STATIC_PHOTOS = [
  { id: 1, url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba", title: "Corporate Meeting", category: "Business" },
  { id: 2, url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174", title: "Modern Office", category: "Interiors" },
  { id: 3, url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0", title: "Strategic Planning", category: "Business" },
  { id: 4, url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", title: "Tech Team", category: "Technology" },
  { id: 5, url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", title: "Analytics Dashboard", category: "Technology" },
  { id: 6, url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf", title: "Colleagues Working", category: "Office" },
  { id: 7, url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c", title: "Creative Studio", category: "People" },
  { id: 8, url: "https://images.unsplash.com/photo-1661956602116-aa6865609028", title: "Code on Screen", category: "Technology" },
  { id: 9, url: "https://images.unsplash.com/photo-1486325212027-8081e485255e", title: "Urban Architecture", category: "City" },
  { id: 10, url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853", title: "Abstract Gradient", category: "Minimal" },
  { id: 11, url: "https://images.unsplash.com/photo-1497366216548-37526070297c", title: "Minimal Desk", category: "Minimal" },
  { id: 12, url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7", title: "Business Deal", category: "Business" },
];

const StockPhotos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState(STATIC_PHOTOS);

  // Filter Logic: Runs whenever searchTerm changes
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPhotos(STATIC_PHOTOS);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const results = STATIC_PHOTOS.filter(photo => 
        photo.title.toLowerCase().includes(lowerTerm) || 
        photo.category.toLowerCase().includes(lowerTerm)
      );
      setFilteredPhotos(results);
    }
  }, [searchTerm]);

  // Handle Trending Tag Click
  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  // Handle Clear Search
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      
      {/* --- 1. GLOBAL NAVIGATION (Added) --- */}
      <PromoBanner />
      <TopHeader />
      <div className="sticky top-0 z-50">
        <MainNav />
      </div>

      {/* --- 2. HERO SECTION (Search & Trending) --- */}
      <div className="bg-gray-900 text-white py-16 relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Royalty-free Stock Photos
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Curated high-resolution images for your Torrestt templates.
          </p>
          
          {/* Functional Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl flex items-center p-2 shadow-2xl transform hover:scale-[1.01] transition-transform">
            <Search className="text-gray-400 ml-4" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 'Office', 'Abstract', 'Nature'..." 
              className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-xl"
            />
            {searchTerm && (
                <button onClick={clearSearch} className="p-2 text-gray-400 hover:text-red-500">
                    <X size={18}/>
                </button>
            )}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/30">
              Search
            </button>
          </div>
          
          {/* Functional Trending Tags */}
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
            <span>Trending:</span>
            {['Business', 'Technology', 'Minimal', 'Office'].map((tag) => (
                <button 
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`cursor-pointer hover:text-white hover:underline transition-colors ${searchTerm === tag ? 'text-white font-bold underline' : 'text-gray-300'}`}
                >
                    {tag}
                </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- 3. PHOTO GRID SECTION --- */}
      <div className="container mx-auto px-4 py-12 flex-1">
        
        {/* Header & Count */}
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                {searchTerm ? `Results for "${searchTerm}"` : "Newest Uploads"}
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {filteredPhotos.length} items
                </span>
            </h2>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                <Filter size={16}/> Filters
            </button>
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <ImageIcon size={30}/>
                </div>
                <h3 className="text-lg font-bold text-gray-700">No photos found</h3>
                <p className="text-gray-500">Try searching for "Business" or "City".</p>
                <button onClick={clearSearch} className="mt-4 text-blue-600 font-bold hover:underline">Clear Search</button>
            </div>
        ) : (
            /* Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
                <div key={photo.id} className="group relative break-inside-avoid mb-6 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100">
                <img 
                    src={`${photo.url}?auto=format&fit=crop&w=600&q=80`} 
                    alt={photo.title} 
                    className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay (Visible on Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-white">
                            <p className="font-bold text-lg leading-tight">{photo.title}</p>
                            <p className="text-xs text-gray-300 mt-1">{photo.category}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white/10 hover:bg-white text-white hover:text-red-500 rounded-full backdrop-blur-md transition-colors">
                                <Heart size={18} />
                            </button>
                            <button className="p-2 bg-white text-gray-900 rounded-full hover:bg-blue-50 transition-colors shadow-lg">
                                <Download size={18} />
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}

        {/* Load More Button (Only show if not searching) */}
        {!searchTerm && (
            <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-full hover:bg-gray-200 transition-colors">
                    Load More Photos
                </button>
            </div>
        )}

      </div>

      {/* --- 4. GLOBAL FOOTER (Added) --- */}
      <Footer />

    </div>
  );
};

export default StockPhotos;