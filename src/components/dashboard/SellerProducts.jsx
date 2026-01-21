import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../../graphql/queries';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Eye, AlertCircle } from 'lucide-react';

const client = generateClient();

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    try {
      const result = await client.graphql({ query: listProducts, authMode: 'userPool' });
      setProducts(result.data.listProducts.items);
      setLoading(false);
    } catch (err) { console.error(err); }
  }

  const getStatusBadge = (status) => {
    switch(status) {
        case 'APPROVED': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Live</span>;
        case 'PENDING': return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending</span>;
        case 'CHANGES_REQUESTED': return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">Action Required</span>;
        case 'REJECTED': return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Rejected</span>;
        default: return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Templates</h1>
        <Link to="/seller/products/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition">
            <Plus size={18}/> Upload New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? <div className="p-8 text-center text-gray-500">Loading templates...</div> : 
         products.length === 0 ? <div className="p-12 text-center text-gray-500">No templates uploaded yet.</div> : (
         <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
                    <tr>
                        <th className="px-6 py-4">Template Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {products.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 text-gray-500 text-sm">{item.subCategory?.name || 'N/A'}</td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col items-start gap-1">
                                    {getStatusBadge(item.status)}
                                    {/* Admin Feedback Display */}
                                    {item.adminFeedback && (
                                        <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                            <AlertCircle size={10}/> See feedback
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-700">${item.price}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    {/* Edit only if NOT approved yet */}
                                    {item.status !== 'APPROVED' && (
                                        <button className="text-gray-400 hover:text-blue-600 p-2" title="Edit / Resubmit"><Edit2 size={18}/></button>
                                    )}
                                    <button className="text-gray-400 hover:text-green-600 p-2" title="View Details"><Eye size={18}/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
         </div>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;