import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import { Layout, ShoppingCart, Code, Mail, Database, Edit3, ArrowRight } from 'lucide-react';

const client = generateClient();

// Fallback styles
const VISUAL_STYLES = [
  {
    icon: <Layout size={24} />,
    color: "bg-red-50 text-red-600 border-red-100",
    fallbackImage: "https://placehold.co/600x300/fee2e2/dc2626?text=Theme+Preview",
    descTemplate: "Professional templates"
  },
  {
    icon: <ShoppingCart size={24} />,
    color: "bg-orange-50 text-orange-600 border-orange-100",
    fallbackImage: "https://placehold.co/600x300/ffedd5/ea580c?text=eCommerce+Store",
    descTemplate: "High-converting themes"
  },
  {
    icon: <Code size={24} />,
    color: "bg-purple-50 text-purple-600 border-purple-100",
    fallbackImage: "https://placehold.co/600x300/f3e8ff/9333ea?text=Code+Template",
    descTemplate: "Clean code structure"
  },
  {
    icon: <Mail size={24} />,
    color: "bg-yellow-50 text-yellow-600 border-yellow-100",
    fallbackImage: "https://placehold.co/600x300/fef9c3/ca8a04?text=Marketing+Page",
    descTemplate: "Engaging landing pages"
  },
  {
    icon: <Database size={24} />,
    color: "bg-teal-50 text-teal-600 border-teal-100",
    fallbackImage: "https://placehold.co/600x300/ccfbf1/0d9488?text=Dashboard+UI",
    descTemplate: "Data-rich interfaces"
  },
  {
    icon: <Edit3 size={24} />,
    color: "bg-pink-50 text-pink-600 border-pink-100",
    fallbackImage: "https://placehold.co/600x300/fce7f3/db2777?text=Blog+Layout",
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
      const deepQuery = `
        query ListCategoriesDeep {
          listCategories {
            items {
              id
              name
              slug
              image
              rank
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
      let items = apiData.data.listCategories.items;

      // Sort by Rank
      items.sort((a, b) => (a.rank || 999) - (b.rank || 999));

      // Take Top 6
      items = items.slice(0, 6);

      // Generate Image URLs
      const enrichedItems = await Promise.all(items.map(async (cat) => {
        let imageUrl = null;
        if (cat.image) {
            try {
                const urlRes = await getUrl({ 
                    key: cat.image, 
                    options: { accessLevel: 'guest' } 
                });
                imageUrl = urlRes.url;
            } catch (e) { console.error("Image load fail", e); }
        }
        return { ...cat, imageUrl };
      }));

      setCategories(enrichedItems);
    } catch (err) {
      console.log('Error fetching categories:', err);
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {categories.length === 0 && (
             <div className="col-span-3 text-center text-gray-400 py-10">
               Loading categories...
             </div>
          )}

          {categories.map((cat, index) => {
            const style = VISUAL_STYLES[index % VISUAL_STYLES.length];
            const displayImage = cat.imageUrl || style.fallbackImage;

            return (
              <div 
                key={cat.id} 
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 block"
              >
                
                {/* Content: Centered Title & Subtitle */}
                <div className="text-center mb-6 mt-2">
                    <Link to={`/category/${cat.slug}`} className="block">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {cat.name}
                        </h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-3">
                       {style.descTemplate}
                    </p>

                    {/* NEW: Newest & Bestsellers Links */}
                    <div className="flex justify-center gap-4 text-sm font-medium">
                        <Link 
                            to={`/category/${cat.slug}?sort=newest`} 
                            className="text-[#0084FF] hover:underline hover:text-[#0066cc]"
                        >
                            Newest
                        </Link>
                        <Link 
                            to={`/category/${cat.slug}?sort=bestsellers`} 
                            className="text-[#0084FF] hover:underline hover:text-[#0066cc]"
                        >
                            Bestsellers
                        </Link>
                    </div>
                </div>

                {/* Preview Image with "Move Up" Animation */}
                <Link to={`/category/${cat.slug}`} className="block rounded-lg overflow-hidden h-56 bg-gray-50 border border-gray-100 relative">
                    <img 
                        src={displayImage} 
                        alt={cat.name} 
                        // Added 'group-hover:-translate-y-2' for the upward movement effect
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </Link>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;