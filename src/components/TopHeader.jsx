import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Grid, User, LogOut, Settings, Download, Heart, UserCircle, ShieldCheck } from 'lucide-react'; // Added ShieldCheck icon
import { useCart } from '../context/CartContext';
import { useAuthenticator } from '@aws-amplify/ui-react';

const TopHeader = () => {
  const { cartItems } = useCart();
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const displayName = user?.attributes?.name || 
                      user?.attributes?.given_name || 
                      user?.attributes?.email || 
                      'User';

  const getAvatarInitial = () => {
    if (displayName && displayName.length > 0) {
      return displayName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="bg-gray-900 text-gray-300 py-4 border-b border-gray-800 relative z-[60]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
          <h1 className="text-2xl font-bold text-white tracking-tight font-serif">Torrestt</h1>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          
          {/* --- FIX IS HERE --- */}
          {/* Changed /register to /become-seller */}
          <Link 
            to="/become-seller" 
            className="hidden md:block hover:text-white transition-colors font-medium"
          >
            Start Selling
          </Link>
          
          <div className="hidden md:flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            <Grid size={18} />
            <span>Our Products</span>
          </div>

          {/* CART */}
          <Link to="/checkout" className="relative hover:text-white cursor-pointer transition-colors">
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-light text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* --- AUTH SECTION --- */}
          {user ? (
            <div 
              className="relative z-[100]"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors focus:outline-none py-2"
              >
                <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-white font-bold text-xs">
                  {getAvatarInitial()}
                </div>
                <span className="hidden md:block font-medium max-w-[120px] truncate">
                  {displayName}
                </span>
              </button>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 w-64 z-[100]">
                    <div className="bg-white text-gray-800 rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
                        
                        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Signed in as</p>
                            <p className="text-sm font-bold truncate text-gray-900 mt-1">{displayName}</p>
                        </div>

                        <div className="py-2">
                            {/* ADDED SELLER DASHBOARD LINK HERE TOO FOR CONVENIENCE */}
                            <Link to="/seller/dashboard" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-colors">
                                <ShieldCheck size={18} /> Seller Dashboard
                            </Link>
                            
                            <Link to="/profile" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-colors">
                                <UserCircle size={18} /> Profile
                            </Link>
                            <Link to="/settings" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-colors">
                                <Settings size={18} /> Settings
                            </Link>
                            <Link to="/downloads" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-colors">
                                <Download size={18} /> Downloads
                            </Link>
                            <Link to="/favorites" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-dark transition-colors">
                                <Heart size={18} /> Favorites
                            </Link>
                        </div>

                        <div className="border-t border-gray-100 bg-gray-50">
                            <button 
                            onClick={handleSignOut}
                            className="w-full text-left flex items-center gap-3 px-5 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium"
                            >
                            <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
              )}
            </div>
          ) : (
            // LOGGED OUT STATE
            <Link to="/login" className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
              <div className="w-8 h-8 rounded-full bg-gray-700 group-hover:bg-gray-600 transition-colors flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden md:block font-medium">Sign In</span>
            </Link>
          )}

        </div>
      </div>
    </div>
  );
};

export default TopHeader;