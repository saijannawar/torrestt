import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listSellerProfiles } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient();

const SellerRoute = ({ children }) => {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const navigate = useNavigate();
  const [isApproved, setIsApproved] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
        navigate('/login');
    } else if (authStatus === 'authenticated') {
        checkSellerStatus();
    }
  }, [authStatus]);

  async function checkSellerStatus() {
    try {
      const result = await client.graphql({ query: listSellerProfiles });
      // User only gets their own profile
      const profile = result.data.listSellerProfiles.items[0];

      if (profile && profile.status === 'APPROVED') {
        setIsApproved(true);
      } else {
        // Redirect to application page if not approved
        navigate('/become-seller');
      }
      setChecking(false);
    } catch (e) {
      console.error(e);
      navigate('/become-seller');
    }
  }

  if (checking) return <div className="h-screen flex items-center justify-center">Verifying Seller Status...</div>;
  if (!isApproved) return null;
  
  return children;
};

export default SellerRoute;