import React, { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProtectedAdminRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  async function checkAdminAccess() {
    try {
      // 1. Get the current session
      const session = await fetchAuthSession();
      
      // 2. Look for the 'admin' group in the token
      const groups = session.tokens?.accessToken?.payload['cognito:groups'] || [];
      
      if (groups.includes('admin')) {
        // SUCCESS: User is an Admin
        setIsAuthorized(true);
      } else {
        // FAIL: User is logged in, but NOT an admin (could be a Seller/Student)
        console.warn("Access Denied: User is not an admin.");
        navigate('/'); // Kick them to Home
      }
    } catch (err) {
      // FAIL: User is not even logged in
      navigate('/'); 
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-red-600" size={32} />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verifying Admin Access</span>
        </div>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default ProtectedAdminRoute;