import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { 
  LayoutDashboard, ShoppingBag, PlusCircle, DollarSign, 
  Settings, LogOut, Store, HelpCircle, Menu, X 
} from 'lucide-react';
import { useState } from 'react';

const SellerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function handleLogout() {
    await signOut();
    navigate('/');
  }

  const links = [
    { name: 'Dashboard', path: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'My Products', path: '/seller/products', icon: ShoppingBag },
    { name: 'Upload New', path: '/seller/products/add', icon: PlusCircle }, // Highlighted action
    { name: 'Earnings', path: '/seller/earnings', icon: DollarSign },
    { name: 'Shop Profile', path: '/seller/profile', icon: Store },
    { name: 'Seller Guidelines', path: '/seller/guidelines', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 flex-col fixed h-full z-20">
        
        {/* Brand Header */}
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
           <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl mr-3">
             T
           </div>
           <div>
             <h1 className="font-bold text-gray-900 text-lg leading-tight">Torrestt</h1>
             <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seller Studio</p>
           </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const isUpload = link.name === 'Upload New';
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium text-sm
                  ${isActive 
                    ? 'bg-black text-white shadow-lg shadow-gray-200' 
                    : isUpload 
                        ? 'bg-[#82B440] text-white hover:bg-[#73a036] shadow-md shadow-green-100 justify-center font-bold mt-6 mb-6' // Special style for Upload button
                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                  }
                `}
              >
                <link.icon size={isUpload ? 20 : 18} strokeWidth={isUpload ? 2.5 : 2} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100">
           <button 
             onClick={handleLogout}
             className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 w-full rounded-xl transition-colors font-medium text-sm"
           >
             <LogOut size={18} /> Sign Out
           </button>
        </div>
      </aside>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden fixed top-0 w-full bg-white z-30 border-b border-gray-200 h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <span className="font-bold">Seller Studio</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 pt-20 px-4 md:hidden">
            <nav className="space-y-2">
                {links.map((link) => (
                    <Link 
                        key={link.path} 
                        to={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 p-4 border-b border-gray-50 text-gray-700 font-medium"
                    >
                        <link.icon size={20} /> {link.name}
                    </Link>
                ))}
                <button onClick={handleLogout} className="flex items-center gap-4 p-4 text-red-600 font-bold w-full text-left">
                    <LogOut size={20} /> Sign Out
                </button>
            </nav>
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 md:ml-72 p-6 md:p-10 mt-16 md:mt-0 max-w-[1600px]">
         <Outlet />
      </main>

    </div>
  );
};

export default SellerLayout;