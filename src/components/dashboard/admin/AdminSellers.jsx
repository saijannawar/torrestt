import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listSellerProfiles } from '../../../graphql/queries';
import { updateSellerProfile } from '../../../graphql/mutations';
import { Authenticator } from '@aws-amplify/ui-react';
import { getUrl } from 'aws-amplify/storage';
import { fetchAuthSession } from 'aws-amplify/auth'; // <--- NEW IMPORT
import { useNavigate } from 'react-router-dom';      // <--- NEW IMPORT
import { Check, X, User, Store, FileText, Ban, AlertTriangle, Loader2 } from 'lucide-react';

const client = generateClient();

const getErrorMessage = (err) => {
    if (err.errors && err.errors.length > 0) return err.errors[0].message;
    if (err.message) return err.message;
    return JSON.stringify(err);
};

const AdminSellers = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('PENDING');
  
  const navigate = useNavigate(); // <--- Navigation hook

  useEffect(() => { 
      // Run security check FIRST, then fetch data
      checkAdminAccess().then(isAdmin => {
          if(isAdmin) fetchRequests();
      });
  }, []);

  // --- 🔒 SECURITY CHECK ---
  async function checkAdminAccess() {
      try {
          const session = await fetchAuthSession();
          const groups = session.tokens?.accessToken?.payload['cognito:groups'] || [];
          
          if (!groups.includes('admin')) {
              // USER IS NOT ADMIN -> KICK THEM OUT
              console.warn("Unauthorized access attempt blocked.");
              navigate('/'); // Redirect to Home
              return false;
          }
          return true; // User is admin, proceed
      } catch (err) {
          navigate('/'); // Not logged in? Kick out.
          return false;
      }
  }

  async function fetchRequests() {
    try {
      const result = await client.graphql({ 
        query: listSellerProfiles,
        authMode: 'userPool' 
      });
      processItems(result.data.listSellerProfiles.items);
    } catch (err) { 
        if (err.data && err.data.listSellerProfiles) {
            processItems(err.data.listSellerProfiles.items);
        } else {
            const msg = getErrorMessage(err);
            console.error("Error fetching sellers:", msg);
            setError(msg);
            setLoading(false);
        }
    }
  }

  async function processItems(rawItems) {
      const validItems = rawItems.filter(item => item !== null);
      validItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const enhancedItems = await Promise.all(validItems.map(async (item) => {
         let docUrl = null;
         if (!item) return null;
         
         const key = item.studentIdCardUrl || item.personalIdCardUrl || item.companyDocumentUrl;
         if(key) {
             try {
                const url = await getUrl({ key: key, options: { accessLevel: 'protected' } });
                docUrl = url.url;
             } catch(e) {}
         }
         return { ...item, docUrl };
      }));

      setRequests(enhancedItems.filter(i => i !== null));
      setLoading(false);
  }

  async function handleStatus(id, newStatus) {
    if(!window.confirm(`Mark this user as ${newStatus}?`)) return;
    
    const originalRequests = [...requests];
    setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));

    try {
      await client.graphql({
        query: updateSellerProfile,
        variables: { input: { id, status: newStatus } },
        authMode: 'userPool'
      });
    } catch (err) { 
        console.error("Update failed:", err);
        alert("Failed to update status: " + getErrorMessage(err));
        setRequests(originalRequests); 
    }
  }

  const filteredRequests = filter === 'ALL' ? requests : requests.filter(r => r.status === filter);

  return (
    <Authenticator hideSignUp={true}>
      <div className="p-4 md:p-8 min-h-screen bg-gray-50">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Management</h1>
                <p className="text-gray-500 text-sm">Review applications and manage vendor access.</p>
            </div>
            
            <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                {['PENDING', 'APPROVED', 'ALL'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${filter === f ? 'bg-black text-white shadow' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        {f.charAt(0) + f.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>
        </div>

        {/* ERROR STATE */}
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-3">
                <AlertTriangle />
                <div>
                    <span className="font-bold block">Access Denied</span>
                    <span className="text-sm">{error}</span>
                </div>
            </div>
        )}

        {loading ? <div className="text-center p-10 text-gray-400 flex flex-col items-center"><Loader2 className="animate-spin mb-2"/>Loading sellers...</div> : 
         filteredRequests.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <Store size={48} className="mx-auto text-gray-300 mb-4"/>
                <p className="text-gray-400">No {filter.toLowerCase()} sellers found.</p>
            </div>
        ) : (
            <div className="grid gap-4">
                {filteredRequests.map((req) => (
                    <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:shadow-md transition-shadow">
                        
                        <div className="flex items-start gap-4 flex-1">
                            <div className={`p-3 rounded-full shrink-0 ${req.sellerType === 'COMPANY' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                <User size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                    {req.shopName}
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 uppercase tracking-wider">
                                        {req.sellerType}
                                    </span>
                                </h3>
                                <p className="text-gray-500 text-sm mt-1 line-clamp-2 max-w-xl">{req.description}</p>
                                
                                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                                    {req.website && <span className="text-blue-500 hover:underline cursor-pointer">{req.website}</span>}
                                    <span>ID: {req.owner.substring(0, 8)}...</span>
                                    {req.docUrl && (
                                        <a href={req.docUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-black font-bold">
                                            <FileText size={12}/> View Proof Document
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
                            {req.status === 'PENDING' && (
                                <>
                                    <button onClick={() => handleStatus(req.id, 'REJECTED')} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-bold transition-colors">
                                        <X size={18} /> Reject
                                    </button>
                                    <button onClick={() => handleStatus(req.id, 'APPROVED')} className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg font-bold shadow-md transition-colors">
                                        <Check size={18} /> Approve
                                    </button>
                                </>
                            )}
                            {req.status === 'APPROVED' && (
                                <button onClick={() => handleStatus(req.id, 'REJECTED')} className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg font-bold text-sm transition-colors">
                                    <Ban size={16} /> Revoke Access
                                </button>
                            )}
                            {req.status === 'REJECTED' && (
                                <button onClick={() => handleStatus(req.id, 'APPROVED')} className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg font-bold text-sm transition-colors">
                                    Restore Access
                                </button>
                            )}
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