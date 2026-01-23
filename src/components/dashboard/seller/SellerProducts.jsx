import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../../../graphql/queries';
import { deleteProduct } from '../../../graphql/mutations';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Edit2, Eye, AlertCircle, 
  Trash2, X, CheckCircle, Clock 
} from 'lucide-react';
import { getUrl } from 'aws-amplify/storage';

const client = generateClient();

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackModal, setFeedbackModal] = useState(null); // Stores item for feedback modal
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    try {
      const result = await client.graphql({ query: listProducts, authMode: 'userPool' });
      const items = result.data.listProducts.items;
      
      // Fetch Signed URLs for thumbnails
      const itemsWithImages = await Promise.all(items.map(async (item) => {
        if (item.thumbnailUrl) {
           try {
             const url = await getUrl({ key: item.thumbnailUrl, options: { accessLevel: 'guest' } });
             return { ...item, signedImage: url.url };
           } catch(e) { return item; }
        }
        return item;
      }));
      
      // Sort by newest first
      setProducts(itemsWithImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  }

  // Filter Logic
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete Logic
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this template? This cannot be undone.")) return;
    try {
        await client.graphql({ 
            query: deleteProduct, 
            variables: { input: { id } },
            authMode: 'userPool'
        });
        setProducts(products.filter(p => p.id !== id));
    } catch(err) { console.error(err); }
  }

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const styles = {
        APPROVED: "bg-green-100 text-green-700 border-green-200",
        PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
        CHANGES_REQUESTED: "bg-orange-50 text-orange-700 border-orange-200",
        REJECTED: "bg-red-50 text-red-700 border-red-200"
    };
    
    const icons = {
        APPROVED: <CheckCircle size={12} />,
        PENDING: <Clock size={12} />,
        CHANGES_REQUESTED: <AlertCircle size={12} />,
        REJECTED: <X size={12} />
    };

    return (
        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || "bg-gray-100 text-gray-600"}`}>
            {icons[status]}
            {status.replace('_', ' ')}
        </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Portfolio</h1>
            <p className="text-gray-500 mt-1">Manage your products, track status, and improve your listings.</p>
        </div>
        <Link 
            to="/seller/products/add" 
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
            <Plus size={20}/> Create New Template
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Search templates..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black/5 outline-none transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-2 text-sm text-gray-500">
             <span>{filteredProducts.length} Items</span>
         </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
        {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
                <p>Loading your portfolio...</p>
            </div>
        ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center p-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 max-w-sm mt-2 mb-6">You haven't uploaded any templates yet, or no items match your search.</p>
                <Link to="/seller/products/add" className="text-blue-600 font-bold hover:underline">Upload your first item</Link>
            </div>
        ) : (
            <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                            <tr>
                                <th className="px-8 py-5">Product</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Sales</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((item) => (
                                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                                {item.signedImage ? (
                                                    <img src={item.signedImage} alt={item.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300"><Eye size={16}/></div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{item.name}</h4>
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                                                    {item.subCategory?.name || 'Uncategorized'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col items-start gap-2">
                                            <StatusBadge status={item.status} />
                                            {/* FEEDBACK LINK IF REJECTED */}
                                            {item.adminFeedback && (item.status === 'REJECTED' || item.status === 'CHANGES_REQUESTED') && (
                                                <button 
                                                    onClick={() => setFeedbackModal(item)}
                                                    className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
                                                >
                                                    <AlertCircle size={10} /> View Reason
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-bold text-gray-900">${item.price}</td>
                                    <td className="px-6 py-5 text-gray-500">0</td> 
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {/* Edit Button - Active if not Approved or if Rejected */}
                                            {item.status !== 'APPROVED' && (
                                                <Link 
                                                    to={`/seller/products/edit/${item.id}`} 
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Template"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                            )}
                                            
                                            {/* Delete Button */}
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards (Responsive) */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                    {filteredProducts.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                        {item.signedImage && <img src={item.signedImage} alt="" className="w-full h-full object-cover" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.subCategory?.name}</p>
                                    </div>
                                </div>
                                <StatusBadge status={item.status} />
                            </div>
                            
                            {item.adminFeedback && (item.status === 'REJECTED' || item.status === 'CHANGES_REQUESTED') && (
                                <button 
                                    onClick={() => setFeedbackModal(item)}
                                    className="w-full mb-4 bg-red-50 border border-red-100 p-2 rounded-lg text-xs text-red-700 font-bold flex items-center justify-center gap-1"
                                >
                                    <AlertCircle size={12} /> View Admin Feedback
                                </button>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <span className="font-bold text-gray-900">${item.price}</span>
                                <div className="flex gap-3">
                                    {item.status !== 'APPROVED' && (
                                        <Link to={`/seller/products/edit/${item.id}`} className="text-blue-600 font-bold text-sm flex items-center gap-1"><Edit2 size={14}/> Edit</Link>
                                    )}
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 font-bold text-sm flex items-center gap-1"><Trash2 size={14}/> Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
      </div>

      {/* FEEDBACK MODAL */}
      {feedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                <div className="bg-red-50 p-6 border-b border-red-100 flex items-start gap-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-full shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-900">Action Required</h3>
                        <p className="text-sm text-red-700 mt-1">
                            The admin has requested changes for <strong>{feedbackModal.name}</strong>.
                        </p>
                    </div>
                </div>
                <div className="p-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Admin Feedback</h4>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-700 text-sm leading-relaxed">
                        "{feedbackModal.adminFeedback}"
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                        <button 
                            onClick={() => setFeedbackModal(null)}
                            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
                        >
                            Close
                        </button>
                        <Link 
                            to={`/seller/products/edit/${feedbackModal.id}`}
                            className="flex-1 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-lg transition-colors text-center"
                        >
                            Fix & Resubmit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default SellerProducts;