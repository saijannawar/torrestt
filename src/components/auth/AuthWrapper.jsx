import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const formFields = {
    signUp: {
      name: { 
        order: 1, 
        label: 'Full Name', 
        placeholder: 'Enter your full name', 
        isRequired: true, 
      },
      email: { 
        order: 2,
        label: 'Email',
        placeholder: 'Enter your email',
        isRequired: true,
      },
      password: { order: 3 },
      confirm_password: { order: 4 }
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
           <h2 className="text-2xl font-bold text-gray-900">Welcome to Torrestt</h2>
        </div>

        <Authenticator 
          // 1. THIS LINE FIXES THE LOGIN ISSUE
          // It forces the login screen to ask for "Email" instead of Username
          loginMechanisms={['email']}

          // 2. THIS ENSURES WE CAPTURE THE NAME FOR THE HEADER
          signUpAttributes={['name']} 
          
          formFields={formFields} 
          socialProviders={['google']}
        >
          {({ signOut, user }) => {
            if (user) {
                // Redirect to the previous page (or home) after successful login
                setTimeout(() => navigate(from, { replace: true }), 100);
                return (
                  <div className="text-center py-4">
                    <p className="text-green-600 font-medium">Successfully Logged In!</p>
                    <p className="text-gray-500 text-sm">Redirecting you...</p>
                  </div>
                );
            }
            return null;
          }}
        </Authenticator>
      </div>
    </div>
  );
};

export default AuthWrapper;