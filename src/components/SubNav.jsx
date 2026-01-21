import React from 'react';

const tags = [
  "All items", "WordPress", "Elementor", "Hosting", "HTML", "Shopify", "Jamstack", "Marketing", "CMS", "eCommerce", "UI Templates", "Plugins"
];

const SubNav = () => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs py-3">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 overflow-x-auto no-scrollbar">
        <div className="flex gap-6 whitespace-nowrap">
          {tags.map((tag, index) => (
            <a key={index} href="#" className="hover:text-brand-light transition-colors font-medium">
              {tag}
            </a>
          ))}
          <span className="text-gray-400 cursor-pointer hover:text-gray-600">More</span>
        </div>
      </div>
    </div>
  );
};

export default SubNav;