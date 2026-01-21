import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Code, Heart, Download, HelpCircle } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Everything you need to <span className="text-blue-600">ship faster</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Stop reinventing the wheel. We curate high-quality themes, templates, and 3D assets so you can focus on building amazing projects, not fixing bugs.
          </p>
        </div>

        {/* 3-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <Code size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Clean & Modern Code</h3>
            <p className="text-gray-500 leading-relaxed">
              Our templates are built with the latest technologies (React, Tailwind, Next.js) and follow strict coding standards for easy customization.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
              <ShieldCheck size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Quality</h3>
            <p className="text-gray-500 leading-relaxed">
              Every item is manually reviewed by our team. We check for bugs, responsiveness, and design quality before it hits the store.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
              <Zap size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Access</h3>
            <p className="text-gray-500 leading-relaxed">
              Get instant access to your files immediately after purchase. No waiting times, no hidden subscriptions—just grab what you need.
            </p>
          </div>

        </div>

        {/* Bottom Call to Action Banner */}
        <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-center md:text-left relative overflow-hidden">
          
          {/* Abstract background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Ready to start your next project?</h3>
              <p className="text-gray-400 text-lg max-w-xl">
                Join hundreds of developers and designers building with Torrestt assets today.
              </p>
            </div>
            <div className="flex-shrink-0">
               <Link 
                 to="/category/all" 
                 className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-full shadow-lg transition-all flex items-center gap-2"
               >
                 <Download size={20} /> Browse Collection
               </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;