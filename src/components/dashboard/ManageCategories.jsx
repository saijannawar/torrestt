import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
// We use a custom query to get nested data (Category -> SubCategory)
import { createCategory, deleteCategory, createSubCategory, deleteSubCategory } from '../../graphql/mutations';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; 
import { Trash2, Plus, Folder, CornerDownRight, Layers } from 'lucide-react';

const client = generateClient();

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  
  // Inputs
  const [newCatName, setNewCatName] = useState('');
  const [activeCatId, setActiveCatId] = useState(null); 
  const [newSubCatName, setNewSubCatName] = useState('');

  // Fetch Data on Load
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      // Deep Query: Get Categories AND their SubCategories
      const deepQuery = `
        query ListDeepCategories {
          listCategories {
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
      const result = await client.graphql({ query: deepQuery });
      const sorted = result.data.listCategories.items.sort((a, b) => a.name.localeCompare(b.name));
      setCategories(sorted);
    } catch (err) {
      console.log('Error fetching:', err);
    }
  }

  // --- ACTIONS ---

  // 1. Add Main Category
  async function handleAddCategory() {
    if (!newCatName) return;
    const slug = newCatName.toLowerCase().replace(/ /g, '-');
    try {
      const result = await client.graphql({
        query: createCategory,
        variables: { input: { name: newCatName, slug } }
      });
      // Update UI
      const newCat = { ...result.data.createCategory, subCategories: { items: [] } };
      setCategories([...categories, newCat]);
      setNewCatName('');
    } catch (err) { console.error(err); }
  }

  // 2. Delete Main Category
  async function handleDeleteCategory(id) {
    if(!window.confirm("Delete this Category? It will hide all subcategories inside it.")) return;
    try {
      await client.graphql({ query: deleteCategory, variables: { input: { id } } });
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) { console.error(err); }
  }

  // 3. Add Sub Category
  async function handleAddSubCategory(parentId) {
    if (!newSubCatName) return;
    const slug = newSubCatName.toLowerCase().replace(/ /g, '-');
    try {
      const result = await client.graphql({
        query: createSubCategory,
        variables: { input: { name: newSubCatName, slug, categoryID: parentId } }
      });
      
      // Update UI: Find parent, add child
      const updated = categories.map(cat => {
        if (cat.id === parentId) {
          const currentSubs = cat.subCategories?.items || [];
          return { ...cat, subCategories: { items: [...currentSubs, result.data.createSubCategory] } };
        }
        return cat;
      });
      setCategories(updated);
      setNewSubCatName('');
    } catch (err) { console.error(err); }
  }

  // 4. Delete Sub Category
  async function handleDeleteSubCategory(parentId, subId) {
    if(!window.confirm("Delete this subcategory?")) return;
    try {
      await client.graphql({ query: deleteSubCategory, variables: { input: { id: subId } } });
      const updated = categories.map(cat => {
        if (cat.id === parentId) {
          return { ...cat, subCategories: { items: cat.subCategories.items.filter(s => s.id !== subId) } };
        }
        return cat;
      });
      setCategories(updated);
    } catch (err) { console.error(err); }
  }

  return (
    // POINT 1: Security (hideSignUp=true)
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Category Manager</h1>
                <p className="text-gray-500 text-sm">Create Categories & Subcategories here.</p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin: {user.username}</span>
                <button onClick={signOut} className="text-red-600 text-sm font-bold">Sign Out</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left: Add Category */}
              <div className="md:col-span-4">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-6">
                  <h3 className="font-bold flex items-center gap-2 mb-4"><Folder size={18}/> New Main Category</h3>
                  <input 
                    className="w-full border border-gray-300 rounded p-2 mb-3" 
                    placeholder="e.g. WordPress"
                    value={newCatName} onChange={e => setNewCatName(e.target.value)}
                  />
                  <button onClick={handleAddCategory} className="w-full bg-black text-white py-2 rounded font-bold">
                    + Add Category
                  </button>
                </div>
              </div>

              {/* Right: List */}
              <div className="md:col-span-8 space-y-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Main Category Row */}
                    <div className="flex justify-between items-center p-4 bg-white border-b border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded text-gray-600"><Layers size={20}/></div>
                        <span className="font-bold text-lg">{cat.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setActiveCatId(activeCatId === cat.id ? null : cat.id)}
                          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded hover:bg-gray-200"
                        >
                          {activeCatId === cat.id ? 'Close' : 'Manage Subcategories'}
                        </button>
                        <button onClick={() => handleDeleteCategory(cat.id)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                      </div>
                    </div>

                    {/* Subcategories (Point 2) */}
                    {activeCatId === cat.id && (
                      <div className="bg-gray-50 p-4 animate-in fade-in">
                        <div className="space-y-2 mb-4 pl-4 border-l-2 border-gray-200">
                          {cat.subCategories?.items.map(sub => (
                            <div key={sub.id} className="flex justify-between items-center group">
                              <span className="flex items-center gap-2 text-gray-700 text-sm"><CornerDownRight size={14}/> {sub.name}</span>
                              <button onClick={() => handleDeleteSubCategory(cat.id, sub.id)} className="text-red-300 hover:text-red-500"><Trash2 size={14}/></button>
                            </div>
                          ))}
                          {cat.subCategories?.items.length === 0 && <span className="text-gray-400 text-sm italic">No subcategories yet.</span>}
                        </div>
                        
                        <div className="flex gap-2 pl-4">
                          <input 
                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                            placeholder="New Subcategory..."
                            value={newSubCatName} onChange={e => setNewSubCatName(e.target.value)}
                          />
                          <button onClick={() => handleAddSubCategory(cat.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Add</button>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default ManageCategories;