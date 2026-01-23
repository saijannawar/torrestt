import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { 
  LayoutDashboard, FolderOpen, UploadCloud, User, DollarSign, 
  BookOpen, LogOut, Menu, X, ShieldCheck, Layers, Link as LinkIcon 
} from 'lucide-react';

const DashboardLayout = ({ role }) => { // Removed default value to ensure prop usage
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuthenticator((context) => [context.user]);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  // --- 1. DEFINE MENU ITEMS BASED ON ROLE ---
  const menuItems = role === 'admin' ? [
    { icon: LayoutDashboard, label: 'Admin Overview', path: '/admin/dashboard' },
    { icon: ShieldCheck, label: 'Seller Requests', path: '/admin/sellers' },
    { icon: FolderOpen, label: 'All Products', path: '/admin/products' }, // You might need to create this page later
    { icon: Layers, label: 'Categories', path: '/admin/categories' },
    { icon: LinkIcon, label: 'Services', path: '/admin/services' },
  ] : [
    { icon: LayoutDashboard, label: 'My Dashboard', path: '/seller/dashboard' },
    { icon: FolderOpen, label: 'My Products', path: '/seller/products' },
    { icon: UploadCloud, label: 'Upload New', path: '/seller/products/add' },
    { icon: DollarSign, label: 'Earnings', path: '/seller/earnings' },
    { icon: BookOpen, label: 'Guidelines', path: '/seller/guidelines' },
    { icon: User, label: 'Profile', path: '/seller/profile' },
  ];

  const mobileNavItems = menuItems.slice(0, 4);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      {/* 2. SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-[#1E1E2D] text-white flex-col shadow-xl z-20">
        
        {/* --- DYNAMIC LOGO SECTION --- */}
        <div className="h-20 flex items-center justify-center border-b border-gray-700/50">
           <Link to="/" className="text-2xl font-bold tracking-tight">
             <span className="text-white">Torrestt</span>
             {/* Dynamic Text & Color based on Role */}
             <span className="text-[#82B440]">
               {role === 'admin' ? 'Admin' : 'Seller'}
             </span>
           </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-2">
            {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
                            ${isActive 
                                ? 'bg-[#82B440] text-white shadow-md transform translate-x-1' 
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }
                        `}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </Link>
                )
            })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700/50">
            <button 
                onClick={handleLogout} 
                className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-2"
            >
                <LogOut size={20} /> 
                <span>Sign Out</span>
            </button>
        </div>
      </aside>

      {/* 3. MOBILE HAMBURGER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-72 h-full bg-[#1E1E2D] p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8">
                    <span className="font-bold text-xl text-white">
                        Torrestt<span className="text-[#82B440]">{role === 'admin' ? 'Admin' : 'Seller'}</span>
                    </span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white"><X size={24}/></button>
                </div>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
                            <item.icon size={20} /> {item.label}
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 w-full mt-6 border-t border-gray-700 pt-6">
                        <LogOut size={20} /> Sign Out
                    </button>
                </nav>
            </div>
        </div>
      )}

      {/* 4. MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-gray-50/50">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white shadow-sm flex items-center justify-between px-4 sticky top-0 z-30">
            <span className="font-bold text-gray-800 text-lg">
                {role === 'admin' ? 'Admin Panel' : 'Seller Dashboard'}
            </span>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-600">
                <Menu size={24} />
            </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
            <Outlet /> 
        </main>
      </div>

      {/* 5. MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {mobileNavItems.map((item) => {
             const isActive = location.pathname === item.path;
             return (
                 <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 text-[10px] ${isActive ? 'text-[#82B440]' : 'text-gray-400'}`}>
                     <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                     <span>{item.label}</span>
                 </Link>
             )
        })}
      </div>

    </div>
  );
};

export default DashboardLayout;