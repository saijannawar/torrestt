import React, { useState, useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createCategory, deleteCategory, createSubCategory, deleteSubCategory, updateCategory } from '../../../graphql/mutations';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; 
import { 
  Trash2, Plus, Folder, CornerDownRight, Layers, 
  ArrowUp, ArrowDown, Image as ImageIcon, Loader2, Pencil, X, Save 
} from 'lucide-react';

const client = generateClient();

const getErrorMessage = (err) => {
    if (err.errors && err.errors.length > 0) return err.errors[0].message;
    if (err.message) return err.message;
    return JSON.stringify(err);
};

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newCatName, setNewCatName] = useState('');
  const [newCatImage, setNewCatImage] = useState(null); 
  const [activeCatId, setActiveCatId] = useState(null); 
  const [newSubCatName, setNewSubCatName] = useState('');

  const [editingCatId, setEditingCatId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    try {
      const deepQuery = `
        query ListDeepCategories {
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
                  name
                  slug
                }
              }
            }
          }
        }
      `;
      // Fetching is public, so apiKey is fine here
      const result = await client.graphql({ 
        query: deepQuery,
        authMode: 'apiKey' 
      });
      
      let items = result.data.listCategories.items;
      items.sort((a, b) => (a.rank || 999) - (b.rank || 999));

      const itemsWithImages = await Promise.all(items.map(async (cat) => {
        if (cat.image) {
          try {
            const urlResult = await getUrl({ key: cat.image, options: { accessLevel: 'guest' } });
            return { ...cat, imageUrl: urlResult.url };
          } catch (e) { return cat; }
        }
        return cat;
      }));

      setCategories(itemsWithImages);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setLoading(false);
    }
  }

  // --- ACTIONS (Now using authMode: 'userPool') ---

  // 1. ADD CATEGORY
  async function handleAddCategory() {
    if (!newCatName) return alert("Enter category name");
    const btn = document.getElementById('add-btn');
    const originalText = btn ? btn.innerText : "+ Add";
    if(btn) btn.innerText = "Saving...";

    const slug = newCatName.toLowerCase().replace(/ /g, '-');
    
    try {
      let imageKey = null;
      let signedUrl = null;

      if (newCatImage) {
        const fileName = `categories/${Date.now()}-${newCatImage.name}`;
        const uploadResult = await uploadData({
          key: fileName,
          data: newCatImage,
          options: { accessLevel: 'guest' }
        }).result;
        imageKey = uploadResult.key;
        const urlRes = await getUrl({ key: imageKey, options: { accessLevel: 'guest' } });
        signedUrl = urlRes.url;
      }

      const maxRank = categories.length > 0 ? Math.max(...categories.map(c => c.rank || 0)) : 0;
      const nextRank = maxRank + 1;

      const result = await client.graphql({
        query: createCategory,
        variables: { input: { name: newCatName, slug, image: imageKey, rank: nextRank } },
        authMode: 'userPool' // <--- REQUIRED: Prove you are an Admin
      });

      const newCat = { ...result.data.createCategory, imageUrl: signedUrl, subCategories: { items: [] } };
      setCategories([...categories, newCat]);
      setNewCatName('');
      setNewCatImage(null);
      if(fileInputRef.current) fileInputRef.current.value = ""; 

    } catch (err) { alert("Failed to add category:\n" + getErrorMessage(err)); } 
    finally { if(btn) btn.innerText = originalText; }
  }

  // 2. UPDATE CATEGORY
  async function handleUpdateCategory(id) {
      if (!editName) return alert("Name cannot be empty");

      try {
          let inputData = { id, name: editName };
          
          if (editImage) {
            const fileName = `categories/${Date.now()}-${editImage.name}`;
            const uploadResult = await uploadData({
                key: fileName,
                data: editImage,
                options: { accessLevel: 'guest' }
            }).result;
            inputData.image = uploadResult.key;
          }

          await client.graphql({
              query: updateCategory,
              variables: { input: inputData },
              authMode: 'userPool' // <--- REQUIRED: Prove you are an Admin
          });

          await fetchCategories();
          cancelEditing();

      } catch (err) { alert("Update Failed:\n" + getErrorMessage(err)); }
  }

  // 3. RANKING
  async function handleMove(index, direction) {
    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newCategories.length) return;

    const itemA = newCategories[index];
    const itemB = newCategories[targetIndex];
    newCategories[index] = itemB;
    newCategories[targetIndex] = itemA;
    
    itemA.rank = targetIndex + 1; 
    itemB.rank = index + 1;
    setCategories(newCategories); 

    try {
      await Promise.all([
        client.graphql({ 
            query: updateCategory, 
            variables: { input: { id: itemA.id, rank: itemA.rank } },
            authMode: 'userPool' // <--- REQUIRED
        }),
        client.graphql({ 
            query: updateCategory, 
            variables: { input: { id: itemB.id, rank: itemB.rank } },
            authMode: 'userPool' // <--- REQUIRED
        })
      ]);
    } catch (err) { 
        console.error("Ranking Error:", err); 
        fetchCategories(); 
    }
  }

  // 4. DELETE
  async function handleDeleteCategory(id) {
    if(!window.confirm("Delete this Category?")) return;
    try {
      await client.graphql({ 
          query: deleteCategory, 
          variables: { input: { id } },
          authMode: 'userPool' // <--- REQUIRED
      });
      setCategories(categories.filter(c => c.id !== id));
    } catch (err) { alert("Delete Failed:\n" + getErrorMessage(err)); }
  }

  // 5. SUB-CATEGORIES
  async function handleAddSubCategory(parentId) {
    if (!newSubCatName) return;
    const slug = newSubCatName.toLowerCase().replace(/ /g, '-');
    try {
      const result = await client.graphql({
        query: createSubCategory,
        variables: { input: { name: newSubCatName, slug, categoryID: parentId } },
        authMode: 'userPool' // <--- REQUIRED
      });
      // Re-fetch to update UI easily or manually update state
      await fetchCategories(); 
      setNewSubCatName('');
    } catch (err) { alert("Sub Add Failed:\n" + getErrorMessage(err)); }
  }

  async function handleDeleteSubCategory(subId) {
    if(!window.confirm("Delete subcategory?")) return;
    try {
      await client.graphql({ 
          query: deleteSubCategory, 
          variables: { input: { id: subId } },
          authMode: 'userPool' // <--- REQUIRED
      });
      await fetchCategories();
    } catch (err) { alert("Sub Delete Failed:\n" + getErrorMessage(err)); }
  }

  const startEditing = (cat) => { setEditingCatId(cat.id); setEditName(cat.name); setEditImage(null); };
  const cancelEditing = () => { setEditingCatId(null); setEditName(''); setEditImage(null); };

  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Category Manager</h1>
                <p className="text-gray-500 text-sm">Manage Images, Ranking & Subcategories.</p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin: {user.username}</span>
                <button onClick={signOut} className="text-red-600 text-sm font-bold">Sign Out</button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Add Form */}
              <div className="lg:col-span-4">
                <div className="bg-white p-6 rounded-xl shadow-sm sticky top-6">
                  <h3 className="font-bold flex items-center gap-2 mb-4"><Folder size={18}/> New Main Category</h3>
                  <div className="mb-3">
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Name</label>
                    <input className="w-full border border-gray-300 rounded p-2" placeholder="e.g. Technology" value={newCatName} onChange={e => setNewCatName(e.target.value)}/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Cover Image</label>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setNewCatImage(e.target.files[0])} className="w-full text-sm text-gray-500"/>
                  </div>
                  <button id="add-btn" onClick={handleAddCategory} className="w-full bg-black text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-gray-800 transition"><Plus size={18} /> Add Category</button>
                </div>
              </div>

              {/* List */}
              <div className="lg:col-span-8 space-y-4">
                {loading ? <div className="text-center p-10"><Loader2 className="animate-spin mx-auto"/> Loading...</div> : 
                 categories.length === 0 ? <div className="text-center p-10 text-gray-400">No categories found.</div> :
                 categories.map((cat, index) => (
                  <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center p-4 bg-white border-b border-gray-50 gap-4">
                      {/* Rank */}
                      <div className="flex flex-row sm:flex-col gap-1 items-center bg-gray-50 p-1 rounded">
                         <button disabled={index === 0} onClick={() => handleMove(index, 'up')} className="p-1 text-gray-400 hover:text-black disabled:opacity-30"><ArrowUp size={16} /></button>
                         <span className="text-[10px] font-bold text-gray-400">#{index + 1}</span>
                         <button disabled={index === categories.length - 1} onClick={() => handleMove(index, 'down')} className="p-1 text-gray-400 hover:text-black disabled:opacity-30"><ArrowDown size={16} /></button>
                      </div>
                      {/* Edit or View */}
                      {editingCatId === cat.id ? (
                        <div className="flex-1 flex flex-col sm:flex-row gap-4 items-center animate-in fade-in">
                            <div className="flex-1 w-full space-y-2">
                                <input className="w-full border border-blue-500 rounded px-2 py-1 font-bold" value={editName} onChange={e => setEditName(e.target.value)} />
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-400 uppercase">Change Image:</span>
                                    <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files[0])} className="text-xs w-full"/>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleUpdateCategory(cat.id)} className="bg-green-600 text-white p-2 rounded hover:bg-green-700" title="Save"><Save size={18} /></button>
                                <button onClick={cancelEditing} className="bg-gray-200 text-gray-600 p-2 rounded hover:bg-gray-300" title="Cancel"><X size={18} /></button>
                            </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                            {cat.imageUrl ? <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={20} /></div>}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-lg text-gray-900">{cat.name}</h4>
                            <p className="text-xs text-gray-400 font-mono">/{cat.slug}</p>
                          </div>
                          <div className="flex items-center gap-2 justify-end mt-2 sm:mt-0">
                            <button onClick={() => setActiveCatId(activeCatId === cat.id ? null : cat.id)} className={`px-4 py-2 text-sm rounded-lg font-medium transition ${activeCatId === cat.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{activeCatId === cat.id ? 'Done' : 'Subcategories'}</button>
                            <button onClick={() => startEditing(cat)} className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg"><Pencil size={18}/></button>
                            <button onClick={() => handleDeleteCategory(cat.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                          </div>
                        </>
                      )}
                    </div>
                    {/* Subcategories Panel */}
                    {activeCatId === cat.id && !editingCatId && (
                      <div className="bg-gray-50 p-4 border-t border-gray-100 animate-in slide-in-from-top-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          {cat.subCategories?.items.map(sub => (
                            <div key={sub.id} className="flex justify-between items-center bg-white p-2 px-3 rounded border border-gray-200">
                              <span className="flex items-center gap-2 text-gray-700 text-sm font-medium"><CornerDownRight size={14} className="text-gray-400"/> {sub.name}</span>
                              <button onClick={() => handleDeleteSubCategory(sub.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={14}/></button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black" placeholder="Type new subcategory name..." value={newSubCatName} onChange={e => setNewSubCatName(e.target.value)} />
                          <button onClick={() => handleAddSubCategory(cat.id)} className="bg-black text-white px-4 py-2 rounded text-sm font-bold">Add</button>
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