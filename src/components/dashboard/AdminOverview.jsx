import React from 'react';
import { Link } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Layers, Menu, LogOut, Package } from 'lucide-react';

const AdminOverview = () => {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-[#F5F5F5] p-8">
          <div className="max-w-5xl mx-auto">
            
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, {user.username}</p>
              </div>
              <button onClick={signOut} className="flex items-center gap-2 text-red-600 font-bold bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                <LogOut size={18} /> Sign Out
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Manage Categories */}
              <Link to="/admin/categories" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <Layers size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Categories</h2>
                <p className="text-gray-500">Add or edit main categories (WordPress, eCommerce) and sub-categories.</p>
              </Link>

              {/* Manage Services */}
              <Link to="/admin/services" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                  <Menu size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Services</h2>
                <p className="text-gray-500">Add or remove links from the top Black Navigation Bar.</p>
              </Link>

               {/* Add Product */}
               <Link to="/admin/add-product" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center md:col-span-2">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                  <Package size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Product</h2>
                <p className="text-gray-500">Upload a new theme or template to the marketplace.</p>
              </Link>

            </div>
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default AdminOverview;