import React, { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';

// Mock Data matching your screenshot
const categories = [
  { id: 1, name: "Site Templates", count: 23774 },
  { id: 2, name: "WordPress", count: 12508 },
  { id: 3, name: "CMS Themes", count: 1543 },
  { id: 4, name: "eCommerce", count: 4354 },
  { id: 5, name: "Blogging", count: 373 },
  { id: 6, name: "Marketing", count: 2859 },
  { id: 7, name: "Forums", count: 20 },
  { id: 8, name: "Muse Templates", count: 604 },
  { id: 9, name: "Jamstack", count: 342 },
  { id: 10, name: "Courses", count: 125 }
];

const BrowseCategories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans">
      
      {/* Page Header / Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <span className="cursor-pointer hover:underline">Home</span>
                <ChevronRight size={12} />
                <span className="text-gray-800">Browse Categories</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-light text-gray-800">Browse Categories</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-10">
        
        {/* The 4-Column Layout */}
        <div className="flex flex-col md:flex-row gap-6 h-[600px]">
            
            {/* COLUMN 1: Main Categories List */}
            <div className="w-full md:w-1/4 bg-transparent flex flex-col gap-1 overflow-y-auto pr-2">
                {categories.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                            flex items-center justify-between px-4 py-3 text-sm rounded transition-all group
                            ${activeCategory === cat.id 
                                ? 'bg-[#E0E0E0] text-gray-900 font-bold shadow-inner' 
                                : 'bg-[#EBEBEB] text-gray-600 hover:bg-[#E0E0E0]'}
                        `}
                    >
                        <span className="truncate">{cat.name}</span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">({cat.count})</span>
                            <ChevronRight size={14} className="text-gray-400 group-hover:text-gray-600" />
                        </div>
                    </button>
                ))}
            </div>

            {/* COLUMN 2: Instructions / Subcategories Placeholder */}
            <div className="w-full md:w-1/4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center p-6 text-gray-400">
                {activeCategory ? (
                    // This shows if a category IS selected (Simulating data loading)
                    <div className="animate-pulse flex flex-col gap-4 w-full">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                    </div>
                ) : (
                    // This shows matching your screenshot (Default State)
                    <>
                        <p className="font-bold text-lg mb-2 text-gray-300">Click on a row to show sub-categories</p>
                        <p className="text-sm">Click on the category text to browse that category!</p>
                    </>
                )}
            </div>

            {/* COLUMN 3: Empty Placeholder (Dashed) */}
            <div className="hidden md:flex w-1/4 border-2 border-dashed border-gray-200 rounded-lg items-center justify-center">
                 {/* Empty by default */}
            </div>

            {/* COLUMN 4: Empty Placeholder (Dashed) */}
            <div className="hidden md:flex w-1/4 border-2 border-dashed border-gray-200 rounded-lg items-center justify-center">
                 {/* Empty by default */}
            </div>

        </div>

      </div>
    </div>
  );
};

export default BrowseCategories;