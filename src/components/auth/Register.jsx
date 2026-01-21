import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase } from 'lucide-react';
import AuthLayout from './AuthLayout';

const Register = () => {
  const [role, setRole] = useState('buyer'); // 'buyer' or 'seller'

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join our community of creators and buyers"
    >
      <form className="space-y-5">
        
        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg mb-6">
            <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`py-2 text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 ${role === 'buyer' ? 'bg-white shadow text-brand-dark' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <User size={16} />
                I'm a Buyer
            </button>
            <button
                type="button"
                onClick={() => setRole('seller')}
                className={`py-2 text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 ${role === 'seller' ? 'bg-white shadow text-brand-dark' : 'text-gray-500 hover:text-gray-700'}`}
            >
                <Briefcase size={16} />
                I'm a Seller
            </button>
        </div>

        {/* Name Input */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-light outline-none"
                    required
                />
            </div>
        </div>

        {/* Email Input */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-light outline-none"
                    required
                />
            </div>
        </div>

        {/* Password Input */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    type="password" 
                    placeholder="Create a strong password" 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-light outline-none"
                    required
                />
            </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1 rounded text-brand-light focus:ring-brand-light" required />
            <span className="text-xs text-gray-500">
                I agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
            </span>
        </div>

        {/* Submit Button */}
        <button 
            type="submit" 
            className="w-full bg-brand-light hover:bg-brand-dark text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
            Create Account
        </button>

      </form>

      {/* Footer Switch */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-light font-bold hover:underline">
            Sign In
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;