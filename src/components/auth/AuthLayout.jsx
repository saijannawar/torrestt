import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 font-sans">
      
      {/* Logo Area */}
      <Link to="/" className="mb-8 flex items-center gap-2 text-2xl font-bold text-gray-800 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 bg-brand-light rounded flex items-center justify-center text-white">
          <ShieldCheck size={20} />
        </div>
        Torrestt
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 text-center">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>

        {/* Content (Form) */}
        <div className="p-8">
            {children}
        </div>
      
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <Link to="/" className="hover:text-brand-light transition-colors">Back to Home</Link>
        <span className="mx-2">•</span>
        <a href="#" className="hover:text-brand-light transition-colors">Privacy Policy</a>
        <span className="mx-2">•</span>
        <a href="#" className="hover:text-brand-light transition-colors">Terms</a>
      </div>

    </div>
  );
};

export default AuthLayout;