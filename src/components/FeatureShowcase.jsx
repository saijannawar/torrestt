import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, FileText, ArrowRight } from 'lucide-react';

const FeatureShowcase = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-[600px] relative overflow-hidden pb-16">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-16 md:pt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: The 4 Grid Boxes with IMAGES */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Box 1 */}
            <div className="relative group overflow-hidden rounded-2xl aspect-square shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="WordPress" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Elementra WP</span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="relative group overflow-hidden rounded-2xl aspect-square shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Admin" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-600/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Tailux Admin</span>
              </div>
            </div>

            {/* Box 3 */}
            <div className="relative group overflow-hidden rounded-2xl aspect-square shadow-lg">
               <img 
                src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="SaaS" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl">SaaS Startup</span>
              </div>
            </div>

            {/* Box 4 */}
            <div className="relative group overflow-hidden rounded-2xl aspect-square shadow-lg">
               <img 
                src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Crafto" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-emerald-600/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl">Crafto WP</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Text Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-light text-gray-800 mb-12 text-right lg:text-right leading-tight tracking-tight">
                We're the <span className="font-bold">largest theme<br/>marketplace</span> in the world
            </h2>

            {/* The 3 Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="p-2 bg-orange-100 rounded-full mb-3 text-orange-600">
                  <CheckCircle size={20} />
                </div>
                <p className="text-sm font-medium text-gray-600">Home of the most popular themes</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="p-2 bg-blue-100 rounded-full mb-3 text-blue-600">
                  <FileText size={20} />
                </div>
                <p className="text-sm font-medium text-gray-600">Clear documentation available</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="p-2 bg-purple-100 rounded-full mb-3 text-purple-600">
                  <Shield size={20} />
                </div>
                <p className="text-sm font-medium text-gray-600">Quality reviewed creators</p>
              </div>
            </div>

            {/* The NEW "View Themes" Button */}
            <div className="flex justify-center lg:justify-start">
              <Link 
                to="/all-items" 
                className="bg-[#82B440] hover:bg-[#6fa030] text-white text-lg font-bold py-4 px-10 rounded shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                View All Themes <ArrowRight size={20} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;