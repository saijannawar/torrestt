import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { listPrimeServices } from '../graphql/queries'; 
import { Menu } from 'lucide-react';

const client = generateClient();

const MainNav = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const apiData = await client.graphql({ query: listPrimeServices, authMode: 'apiKey' });
      const items = apiData.data.listPrimeServices.items.filter(item => item.isActive !== false);
      setServices(items);
    } catch (err) {
      console.log('Error fetching services:', err);
    }
  }

  return (
    <div className="bg-gray-900 text-gray-300 text-sm font-medium border-b border-gray-800 shadow-md">
      {/* Updated Container to match TopHeader (1300px) */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex justify-between items-center h-14">
        
        {/* Left Side: Prime Services List */}
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
          
          {/* 1. Static "All Services" Link */}
          <Link 
            to="/all-items" 
            className={`whitespace-nowrap hover:text-white transition-colors flex items-center gap-2 ${location.pathname === '/all-items' ? 'text-white font-bold' : ''}`}
          >
            <Menu size={16} /> All Services
          </Link>

          <div className="h-4 w-px bg-gray-700 hidden md:block"></div>

          {/* 2. Dynamic Prime Services from AWS */}
          {services.map((service) => (
            <Link 
              key={service.id} 
              to={service.url} 
              className="whitespace-nowrap hover:text-white transition-colors"
            >
              {service.name}
            </Link>
          ))}
          
          {/* Fallback if list is empty */}
          {services.length === 0 && (
              <span className="text-gray-600 text-xs italic">Add services in Admin to see them here</span>
          )}

        </div>

        {/* Right Side: AI Tools */}
        <div className="hidden lg:flex items-center gap-6 ml-auto pl-6 border-l border-gray-800">
          <Link to="/ai-tools" className="text-green-400 hover:text-green-300 transition-colors font-semibold">
            AI Tools
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MainNav;