import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listSellerProfiles } from '../../../graphql/queries';
import { updateSellerProfile } from '../../../graphql/mutations';
import { Authenticator } from '@aws-amplify/ui-react';
import { Check, X, User, Store } from 'lucide-react';

const client = generateClient();

const AdminSellers = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRequests(); }, []);

  async function fetchRequests() {
    try {
      const result = await client.graphql({ query: listSellerProfiles });
      // Admins see ALL profiles, so filter for PENDING
      const pending = result.data.listSellerProfiles.items.filter(r => r.status === 'PENDING');
      setRequests(pending);
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  }

  async function handleStatus(id, newStatus) {
    if(!window.confirm(`Mark this user as ${newStatus}?`)) return;
    try {
      await client.graphql({
        query: updateSellerProfile,
        variables: { input: { id, status: newStatus } }
      });
      // Remove from the list immediately
      setRequests(requests.filter(r => r.id !== id));
    } catch (err) { console.error(err); }
  }

  return (
    <Authenticator hideSignUp={true}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Requests</h1>
                <p className="text-gray-500 text-sm">Review and approve new vendors.</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                {requests.length} Pending
            </span>
        </div>

        {loading ? <div className="text-center p-10">Loading...</div> : 
         requests.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <Store size={48} className="mx-auto text-gray-300 mb-4"/>
                <p className="text-gray-400">No pending seller applications.</p>
            </div>
        ) : (
            <div className="grid gap-4">
                {requests.map((req) => (
                    <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-100 p-3 rounded-full">
                                <User size={24} className="text-gray-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{req.shopName}</h3>
                                <p className="text-gray-500 text-sm">{req.description}</p>
                                <p className="text-xs text-gray-400 mt-1 font-mono bg-gray-50 inline-block px-1 rounded">Owner ID: {req.owner}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={() => handleStatus(req.id, 'REJECTED')}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-bold transition-colors"
                            >
                                <X size={18} /> Reject
                            </button>
                            <button 
                                onClick={() => handleStatus(req.id, 'APPROVED')}
                                className="flex items-center gap-2 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg font-bold shadow-md transition-colors"
                            >
                                <Check size={18} /> Approve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </Authenticator>
  );
};

export default AdminSellers;