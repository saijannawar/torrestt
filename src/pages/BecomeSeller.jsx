import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { createSellerProfile } from '../graphql/mutations';
import { listSellerProfiles } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { Store, Clock, CheckCircle, ShieldAlert } from 'lucide-react';

const client = generateClient();

const BecomeSeller = () => {
  const { user, authStatus } = useAuthenticator((context) => [context.user, context.authStatus]);
  const navigate = useNavigate();
  
  const [shopName, setShopName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(null); // null (New), 'PENDING', 'APPROVED'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      checkStatus();
    } else if (authStatus === 'unauthenticated') {
      setLoading(false);
    }
  }, [authStatus]);

  async function checkStatus() {
    try {
      // User only sees THEIR OWN profile due to @auth rules
      const result = await client.graphql({ query: listSellerProfiles });
      if (result.data.listSellerProfiles.items.length > 0) {
        setStatus(result.data.listSellerProfiles.items[0].status);
      }
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await client.graphql({
        query: createSellerProfile,
        variables: { input: { shopName, description, status: "PENDING" } }
      });
      setStatus("PENDING");
    } catch (err) { 
      console.error(err);
      alert("Error submitting request"); 
    }
  }

  // 1. Not Logged In
  if (authStatus !== 'authenticated' && !loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-lg">
                <Store size={48} className="mx-auto text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Start Selling</h2>
                <p className="text-gray-500 mb-6">You must sign in to create a seller account.</p>
                <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Sign In</button>
            </div>
        </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // 2. If Approved -> Redirect Button
  if (status === 'APPROVED') {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-green-100">
                <CheckCircle size={64} className="mx-auto text-green-600 mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Seller!</h1>
                <p className="text-gray-500 mb-8">Your shop is active. You can now access the seller dashboard.</p>
                <button onClick={() => navigate('/seller/dashboard')} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition">
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
  }

  // 3. If Pending -> Wait Screen
  if (status === 'PENDING') {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4 text-center">
             <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-yellow-100">
                <Clock size={64} className="mx-auto text-yellow-500 mb-6" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Application Under Review</h1>
                <p className="text-gray-500">
                    Our team is reviewing your details. This usually takes ~24 hours.
                </p>
            </div>
        </div>
    );
  }

  // 4. New Application Form
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#1E1E2D] p-8 text-center">
            <Store size={48} className="mx-auto text-blue-400 mb-4 opacity-90" />
            <h1 className="text-3xl font-bold text-white">Start Selling on Torrestt</h1>
            <p className="text-gray-400 mt-2">Join our developer marketplace today.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Shop Name</label>
                <input 
                    required type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. PixelStudio"
                    value={shopName} onChange={(e) => setShopName(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">About your Shop</label>
                <textarea 
                    required rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="What kind of templates do you create?"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                <ShieldAlert className="text-blue-600 shrink-0" size={20} />
                <p className="text-xs text-blue-800">
                    By applying, you agree to our <strong>Seller Terms</strong>. We strictly prohibit plagiarized content.
                </p>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
                Submit Application
            </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeSeller;