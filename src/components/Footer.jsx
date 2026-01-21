import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#262626] text-[#BBBBBB] pt-20 pb-10 border-t border-gray-800 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* TOP SECTION: Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          
          {/* Column 1: Marketplace */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Torrestt Market</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become an Affiliate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Help</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Community</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Forums</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Meetups</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Brand */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Join the Community</h4>
            <p className="text-sm mb-6 leading-relaxed">
              Receive updates on new themes, discounts, and trend reports.
            </p>
            <div className="flex gap-2">
                <input 
                    type="email" 
                    placeholder="Enter email" 
                    className="bg-[#1E1E1E] border border-gray-700 text-white px-4 py-2 rounded w-full text-sm outline-none focus:border-[#A7C58B]"
                />
                <button className="bg-[#A7C58B] hover:bg-[#8fae75] text-white px-4 py-2 rounded text-sm font-bold transition-colors">
                    Go
                </button>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <hr className="border-gray-800 my-10" />

        {/* BOTTOM SECTION: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Left: Brand & Copyright */}
            <div className="flex items-center gap-8">
                <div className="text-2xl font-bold text-white tracking-tight font-serif">
                    Torrestt
                </div>
                <div className="text-xs text-gray-500 hidden md:block">
                    © 2026 Torrestt Inc. All rights reserved. <br/>
                    Trademarks and brands are the property of their respective owners.
                </div>
            </div>

            {/* Right: Social Icons */}
            <div className="flex items-center gap-6">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#1DA1F2] hover:text-white transition-colors group">
                    <Twitter size={18} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#4267B2] hover:text-white transition-colors group">
                    <Facebook size={18} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#C13584] hover:text-white transition-colors group">
                    <Instagram size={18} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-[#FF0000] hover:text-white transition-colors group">
                    <Youtube size={18} />
                </a>
            </div>

        </div>
        
        {/* Mobile Copyright (Visible only on small screens) */}
        <div className="text-xs text-gray-500 mt-8 text-center md:hidden">
            © 2026 Torrestt Inc. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;