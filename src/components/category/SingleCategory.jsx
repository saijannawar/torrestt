import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { Layers, ArrowLeft, ChevronRight, Hash } from 'lucide-react';

const client = generateClient();

const SingleCategory = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryDetails();
  }, [slug]);

  async function fetchCategoryDetails() {
    try {
      const filterQuery = `
        query GetCategoryBySlug($slug: String!) {
          listCategories(filter: { slug: { eq: $slug } }) {
            items {
              id
              name
              slug
              subCategories {
                items {
                  id
                  name
                  slug
                }
              }
            }
          }
        }
      `;
      
      const result = await client.graphql({ 
        query: filterQuery, 
        variables: { slug: slug } 
      });

      const foundCategory = result.data.listCategories.items[0];
      if (foundCategory) {
        // Sort subcategories alphabetically
        foundCategory.subCategories.items.sort((a, b) => a.name.localeCompare(b.name));
        setCategory(foundCategory);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-3 w-48 bg-gray-200 rounded"></div>
        </div>
    </div>
  );

  if (!category) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Category Not Found</h2>
        <Link to="/category/all" className="text-blue-600 hover:underline">Back to all categories</Link>
    </div>
  );

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-20">
      
      {/* --- Header Section --- */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-10">
          
          {/* Breadcrumb / Back */}
          <Link to="/category/all" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <ArrowLeft size={16} />
            </div>
            Back to Categories
          </Link>

          <div className="flex items-center gap-4">
             {/* Large Category Icon */}
             <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Hash size={32} />
             </div>
             <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {category.name}
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                    Browse specific collections and themes within {category.name}.
                </p>
             </div>
          </div>

        </div>
      </div>

      {/* --- Subcategories Grid --- */}
      <div className="container mx-auto px-4 py-12">
        
        {/* Empty State Check */}
        {category.subCategories.items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Layers size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No collections yet</h3>
            <p className="text-gray-500 mt-1">We haven't added any sub-categories to {category.name} yet.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-bold text-gray-800">
                  {category.subCategories.items.length} Collections Available
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.subCategories.items.map((sub, index) => (
                <Link 
                    key={sub.id} 
                    to={`/category/${category.slug}/${sub.slug}`}
                    className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-40"
                >
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <Layers size={24} />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 transform translate-x-2 group-hover:translate-x-0 duration-300">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {sub.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                            Browse Collection
                        </p>
                    </div>
                </Link>
                ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default SingleCategory;