import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  LogOut, Menu, X, Bell, ShieldCheck
} from 'lucide-react';

const DashboardLayout = ({ role = 'seller' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Define menu items based on Role (Admin vs Seller)
  const menuItems = role === 'admin' ? [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },

    { icon: ShieldCheck, label: 'Seller Requests', path: '/admin/sellers' },

    { icon: Package, label: 'All Products', path: '/admin/products' },
    { icon: Users, label: 'Manage Users', path: '/admin/users' },
    { icon: ShoppingCart, label: 'Transactions', path: '/admin/orders' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ] : [
    { icon: LayoutDashboard, label: 'My Dashboard', path: '/seller/dashboard' },
    { icon: Package, label: 'My Products', path: '/seller/products' },
    { icon: ShoppingCart, label: 'Earnings', path: '/seller/earnings' },
    { icon: Settings, label: 'Profile', path: '/seller/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      
      {/* 1. SIDEBAR */}
      <aside className={`
        bg-[#1E1E2D] text-white transition-all duration-300 flex flex-col
        ${isSidebarOpen ? 'w-64' : 'w-20'}
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-gray-700">
             {isSidebarOpen ? (
                 <span className="text-xl font-bold tracking-tight">Torrestt<span className="text-brand-light">Admin</span></span>
             ) : (
                 <span className="text-xl font-bold">T</span>
             )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 px-3 space-y-2">
            {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        className={`
                            flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
                            ${isActive ? 'bg-brand-light text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                        `}
                    >
                        <item.icon size={20} />
                        {isSidebarOpen && <span>{item.label}</span>}
                    </Link>
                )
            })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
            <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full">
                <LogOut size={20} />
                {isSidebarOpen && <span>Logout</span>}
            </button>
        </div>
      </aside>


      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded">
                <Menu size={20} className="text-gray-600" />
            </button>

            <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-full">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 bg-brand-light rounded-full flex items-center justify-center text-white font-bold">
                    {role === 'admin' ? 'A' : 'S'}
                </div>
            </div>
        </header>

        {/* Page Content (Where the Dashboard charts will go) */}
        <main className="flex-1 overflow-y-auto p-6">
            <Outlet /> {/* This renders the specific page content */}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;