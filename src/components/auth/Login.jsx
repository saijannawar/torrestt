import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login - in real app, this will connect to AWS Cognito
    navigate('/seller/dashboard'); 
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleLogin} className="space-y-5">
        
        {/* Email Input */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all"
                    required
                />
            </div>
        </div>

        {/* Password Input */}
        <div>
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-brand-light font-bold hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-light focus:border-transparent outline-none transition-all"
                    required
                />
            </div>
        </div>

        {/* Submit Button */}
        <button 
            type="submit" 
            className="w-full bg-brand-light hover:bg-brand-dark text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
        >
            Sign In
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

      </form>

      {/* Footer Switch */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-light font-bold hover:underline">
            Create an account
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;