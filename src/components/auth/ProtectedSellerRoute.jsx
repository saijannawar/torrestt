import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listSellerProfiles } from '../../graphql/queries';
import { Loader2 } from 'lucide-react';

const client = generateClient();

const ProtectedSellerRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    checkSellerStatus();
  }, []);

  async function checkSellerStatus() {
    try {
      const user = await getCurrentUser();
      
      // 1. Fetch ALL profiles (Network Only - bypass cache)
      // We do NOT use a filter variable here to avoid the ID mismatch bug
      const result = await client.graphql({
        query: listSellerProfiles,
        fetchPolicy: 'network-only' 
      });

      const allItems = result.data.listSellerProfiles.items;

      // 2. ROBUST MATCHING (Same logic as BecomeSeller.jsx)
      // Find the profile matching User ID OR Username
      const myProfile = allItems.find(item => 
        item.owner === user.userId || 
        item.owner === user.username ||
        item.owner === user.signInDetails?.loginId
      );

      // 3. Verify Status is APPROVED
      if (myProfile && myProfile.status === 'APPROVED') {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }

    } catch (err) {
      console.error("Seller Route Check Error:", err);
      setIsSeller(false);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-400">
        <Loader2 className="animate-spin mr-2" /> Verifying Seller Access...
      </div>
    );
  }

  // If approved, show the Dashboard (Outlet). If not, send to Application page.
  return isSeller ? (children || <Outlet />) : <Navigate to="/become-seller" replace />;
};

export default ProtectedSellerRoute;