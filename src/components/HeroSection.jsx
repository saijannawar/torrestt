import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listCategories } from '../graphql/queries';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Layout, Smartphone, Code } from 'lucide-react';

const client = generateClient();

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const result = await client.graphql({ query: listCategories, authMode: 'apiKey' });
      // Sort alphabetically
      const sorted = result.data.listCategories.items
        .sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sorted);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/all-items?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    // Reverted padding to py-20 as requested
    <div className="bg-[#F5F5F5] py-20 relative overflow-hidden flex items-center min-h-[600px]">
      
      {/* --- 1. CATEGORIES (Positioned Absolutely at the Top) --- */}
      <div className="absolute top-0 left-0 w-full border-b border-gray-200/50 bg-[#F5F5F5] z-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
            <div className="flex items-center gap-4 py-3 overflow-x-auto no-scrollbar mask-linear-fade">
               <span className="text-gray-400 font-extrabold text-[10px] uppercase tracking-widest whitespace-nowrap shrink-0">
                 Explore:
               </span>
               
               <div className="flex items-center gap-6 whitespace-nowrap">
                 {categories.length > 0 ? (
                   categories.map((cat) => (
                     <Link 
                       key={cat.id} 
                       to={`/category/${cat.slug}`} 
                       className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors relative group"
                     >
                       {cat.name}
                       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                     </Link>
                   ))
                 ) : (
                   <span className="text-gray-300 text-sm">Loading categories...</span>
                 )}
               </div>
            </div>
        </div>
      </div>


      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2"></div>

      {/* --- MAIN HERO CONTENT (Stays exactly where it was) --- */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full mt-8">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">

          {/* New Arrival Badge */}
          <div className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-blue-600 mb-6 shadow-sm w-fit">
            🚀 New: 500+ High-Performance Templates Added
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
            Build faster with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              premium assets.
            </span>
          </h1>
          <p className="text-gray-600 text-lg mb-10 max-w-lg leading-relaxed">
            Stop reinventing the wheel. Discover thousands of easy-to-customize themes, templates & CMS products made by world-class developers.
          </p>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-xl shadow-lg border border-gray-100 flex items-center max-w-lg transition-transform focus-within:scale-[1.02] duration-300"
          >
            <Search className="text-gray-400 ml-3" size={20} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 'SaaS Landing Page'..." 
              className="flex-1 px-4 py-3 outline-none text-gray-700 bg-transparent text-base"
            />
            <button 
              type="submit"
              className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-bold transition-all text-sm md:text-base shadow-md"
            >
              Search
            </button>
          </form>
          
          <div className="mt-8 flex items-center gap-6 text-sm font-medium text-gray-500">
             <span className="flex items-center gap-2"><Layout size={16} className="text-blue-500"/> 12k+ Themes</span>
             <span className="flex items-center gap-2"><Smartphone size={16} className="text-green-500"/> Responsive</span>
             <span className="flex items-center gap-2"><Code size={16} className="text-purple-500"/> Clean Code</span>
          </div>
        </div>

        {/* Right Content (Images) */}
        <div className="relative h-[500px] w-full hidden lg:block">
           <div className="absolute top-10 left-0 w-[85%] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-10 transition-transform hover:scale-[1.01] duration-500">
              <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 <div className="ml-auto text-xs text-gray-400 font-mono">dashboard.html</div>
              </div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Dashboard" className="w-full h-64 object-cover object-top"/>
           </div>

           <div className="absolute -top-4 right-4 w-[40%] bg-[#1E293B] rounded-xl shadow-xl border border-gray-700 p-4 z-20 transform hover:-translate-y-2 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-3 border-b border-gray-700 pb-2">
                 <Code size={14} className="text-blue-400" />
                 <span className="text-xs text-gray-400 font-mono">Clean Code</span>
              </div>
              <div className="space-y-2">
                 <div className="h-2 bg-gray-600 rounded w-3/4 opacity-50"></div>
                 <div className="h-2 bg-purple-500 rounded w-1/2 opacity-70"></div>
                 <div className="h-2 bg-blue-500 rounded w-2/3 opacity-70"></div>
              </div>
           </div>

           <div className="absolute bottom-10 right-0 w-[35%] bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-30 transform hover:rotate-2 transition-transform duration-500">
              <div className="bg-gray-100 rounded-xl overflow-hidden h-64 border border-gray-200 relative">
                 <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Mobile App" className="w-full h-full object-cover"/>
                 <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full whitespace-nowrap">Mobile Ready</div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;