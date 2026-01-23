import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../../../graphql/queries';
import { Link } from 'react-router-dom';
import { Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { getUrl } from 'aws-amplify/storage';

const client = generateClient();

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    try {
      // Fetch ALL products
      const result = await client.graphql({ query: listProducts });
      const allItems = result.data.listProducts.items;
      
      // Sort: PENDING first, then by date
      const sorted = allItems.sort((a, b) => {
        if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
        if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      // Fetch Images for them
      const itemsWithImages = await Promise.all(sorted.map(async (item) => {
        if (item.thumbnailUrl) {
           const url = await getUrl({ key: item.thumbnailUrl });
           return { ...item, signedImage: url.url };
        }
        return item;
      }));

      setProducts(itemsWithImages);
      setLoading(false);
    } catch (err) { console.error(err); }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Product Submissions</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
                <tr>
                    <th className="px-6 py-4">Thumbnail</th>
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Seller</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {products.map((item) => (
                    <tr key={item.id} className={item.status === 'PENDING' ? 'bg-yellow-50/30' : ''}>
                        <td className="px-6 py-4">
                            <img src={item.signedImage || "https://placehold.co/50"} className="w-12 h-8 object-cover rounded border" />
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-800">
                            {item.name}
                            <div className="text-xs font-normal text-gray-500">{item.subCategory?.name}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                            {/* In a real app, you'd fetch the seller name using item.owner */}
                            {item.owner} 
                        </td>
                        <td className="px-6 py-4">
                            {item.status === 'PENDING' && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold flex w-fit gap-1"><Clock size={12}/> Review Needed</span>}
                            {item.status === 'APPROVED' && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex w-fit gap-1"><CheckCircle size={12}/> Live</span>}
                            {item.status === 'REJECTED' && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold flex w-fit gap-1"><XCircle size={12}/> Rejected</span>}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <Link 
                                to={`/admin/products/${item.id}`}
                                className="inline-flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition"
                            >
                                <Eye size={16}/> Inspect
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;