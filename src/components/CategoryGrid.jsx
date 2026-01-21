import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { Layout, ShoppingCart, Code, Mail, Database, Edit3, ArrowRight } from 'lucide-react';

const client = generateClient();

const VISUAL_STYLES = [
  {
    icon: <Layout size={24} />,
    color: "bg-red-50 text-red-600 border-red-100",
    image: "https://placehold.co/600x300/fee2e2/dc2626?text=Theme+Preview",
    descTemplate: "Professional templates"
  },
  {
    icon: <ShoppingCart size={24} />,
    color: "bg-orange-50 text-orange-600 border-orange-100",
    image: "https://placehold.co/600x300/ffedd5/ea580c?text=eCommerce+Store",
    descTemplate: "High-converting themes"
  },
  {
    icon: <Code size={24} />,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    image: "https://placehold.co/600x300/f3e8ff/9333ea?text=Code+Template",
    descTemplate: "Clean code structure"
  },
  {
    icon: <Mail size={24} />,
    color: "bg-yellow-50 text-yellow-600 border-yellow-100",
    image: "https://placehold.co/600x300/fef9c3/ca8a04?text=Marketing+Page",
    descTemplate: "Engaging landing pages"
  },
  {
    icon: <Database size={24} />,
    color: "bg-teal-50 text-teal-600 border-teal-100",
    image: "https://placehold.co/600x300/ccfbf1/0d9488?text=Dashboard+UI",
    descTemplate: "Data-rich interfaces"
  },
  {
    icon: <Edit3 size={24} />,
    color: "bg-pink-50 text-pink-600 border-pink-100",
    image: "https://placehold.co/600x300/fce7f3/db2777?text=Blog+Layout",
    descTemplate: "Creative storytelling"
  }
];

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      // We need a custom query here to get the subCategories list
      const deepQuery = `
        query ListCategoriesDeep {
          listCategories {
            items {
              id
              name
              slug
              subCategories {
                items {
                  id
                }
              }
            }
          }
        }
      `;

      const apiData = await client.graphql({ query: deepQuery, authMode: 'apiKey' });
      
      // Sort alphabetically and take top 6
      const items = apiData.data.listCategories.items
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 6);
      setCategories(items);
    } catch (err) {
      console.log('Error fetching categories in grid:', err);
    }
  }

  return (
    <section className="bg-white py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Browse Top Categories</h2>
                <p className="text-gray-500">Explore our most popular themes and templates.</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-gray-600 font-semibold hover:text-blue-600 flex items-center gap-2 transition-colors"
            >
              View all categories <ArrowRight size={18} />
            </Link>
        </div>

        {/* Clean, Symmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {categories.length === 0 && (
             <div className="col-span-3 text-center text-gray-400 py-10">
               Loading categories...
             </div>
          )}

          {categories.map((cat, index) => {
            const style = VISUAL_STYLES[index % VISUAL_STYLES.length];
            
            // Calculate the count dynamically
            const itemCount = cat.subCategories?.items?.length || 0;

            return (
              <Link 
                key={cat.id} 
                to={`/category/${cat.slug}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
              >
                
                {/* Card Header: Icon & Dynamic Count */}
                <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl border ${style.color}`}>
                        {style.icon}
                    </div>
                    <div className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded">
                        {itemCount} Items
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                   {style.descTemplate}
                </p>

                {/* Preview Image (Subtle & Rounded) */}
                <div className="rounded-lg overflow-hidden h-48 bg-gray-50 border border-gray-100 relative">
                    <img 
                        src={style.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;