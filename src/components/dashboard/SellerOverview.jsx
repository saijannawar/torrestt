import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listProducts } from '../../graphql/queries';
import { DollarSign, CheckCircle, Clock, FileText } from 'lucide-react';

const client = generateClient();

const SellerOverview = () => {
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, earnings: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const result = await client.graphql({ 
        query: listProducts,
        authMode: 'userPool' // Ensure we only get OWNER'S products
      });
      const items = result.data.listProducts.items;
      
      setStats({
        total: items.length,
        approved: items.filter(i => i.status === 'APPROVED').length,
        pending: items.filter(i => i.status === 'PENDING').length,
        earnings: 0 // Mock for now
      });
      setLoading(false);
    } catch (err) { console.error(err); setLoading(false); }
  }

  const StatCard = ({ label, value, icon: Icon, color, bg }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
      <div className={`p-4 rounded-full ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-bold text-gray-900">{loading ? '-' : value}</h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Templates" value={stats.total} icon={FileText} color="text-blue-600" bg="bg-blue-50" />
        <StatCard label="Approved" value={stats.approved} icon={CheckCircle} color="text-green-600" bg="bg-green-50" />
        <StatCard label="Pending Review" value={stats.pending} icon={Clock} color="text-orange-600" bg="bg-orange-50" />
        <StatCard label="Total Earnings" value={`$${stats.earnings}`} icon={DollarSign} color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* Recent Activity (Static for now, can be dynamic later) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
            <p className="text-gray-500 text-sm">No recent notifications.</p>
        </div>
      </div>
    </div>
  );
};

export default SellerOverview;