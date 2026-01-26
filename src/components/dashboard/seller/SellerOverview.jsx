import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
// 1. Import Auth to get User ID
import { getCurrentUser } from 'aws-amplify/auth';
import { listProducts } from '../../../graphql/queries';
import { DollarSign, CheckCircle, Clock, FileText, Loader2 } from 'lucide-react';

const client = generateClient();

const SellerOverview = () => {
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      // 2. Get the Current User
      const user = await getCurrentUser();
      setUserName(user.username); // Optional: Set username for welcome message

      const result = await client.graphql({ 
        query: listProducts,
        // 3. CRITICAL FIX: Filter by Owner ID
        variables: { 
            filter: { 
                owner: { eq: user.userId } 
            } 
        },
        authMode: 'userPool' 
      });
      
      const items = result.data.listProducts.items;
      
      setStats({
        total: items.length,
        approved: items.filter(i => i.status === 'APPROVED').length,
        pending: items.filter(i => i.status === 'PENDING').length,
        earnings: 0 // Placeholder for now
      });
      
      setLoading(false);
    } catch (err) { 
        console.error("Error fetching stats:", err); 
        setLoading(false); 
    }
  }

  const StatCard = ({ label, value, icon: Icon, color, bg }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-full ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">
            {loading ? <Loader2 className="animate-spin w-5 h-5 mt-1"/> : value}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back{userName ? `, ${userName}` : ''}! Here is what's happening with your shop today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Templates" value={stats.total} icon={FileText} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="Approved" value={stats.approved} icon={CheckCircle} color="text-green-600" bg="bg-green-50" />
        <StatCard label="Pending Review" value={stats.pending} icon={Clock} color="text-orange-600" bg="bg-orange-50" />
        <StatCard label="Total Earnings" value={`$${stats.earnings}`} icon={DollarSign} color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="font-bold text-lg text-gray-900 mb-6">Recent Activity</h3>
        
        {loading ? (
            <div className="text-gray-400 flex items-center gap-2"><Loader2 className="animate-spin" size={16}/> Loading activity...</div>
        ) : stats.total === 0 ? (
            <div className="text-center py-10 text-gray-400">
                <p>No activity yet. Upload your first product to get started!</p>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle size={16} className="text-green-500"/>
                    <span>System: Dashboard stats updated successfully.</span>
                </div>
                {/* You can map actual recent products here later */}
            </div>
        )}
      </div>
    </div>
  );
};

export default SellerOverview;