import React, { useState } from 'react';
import { UploadCloud, DollarSign, FileText, Image as ImageIcon, ShieldAlert, Code, CheckCircle, ExternalLink } from 'lucide-react';

const AddProduct = () => {
  const [dragActive, setDragActive] = useState(false);

  // Drag handler
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      
      {/* HEADER: The "Torrestt Standards" Banner */}
      <div className="bg-gray-900 rounded-2xl p-8 mb-8 text-white shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
                    <ShieldAlert size={32} className="text-green-500" />
                    Developer Submission Portal
                </h1>
                <p className="text-gray-400 mt-2 max-w-2xl text-sm">
                    Torrestt enforces strict <strong>Industry Quality Standards</strong>. 
                    Your code will be audited for cleanliness, security, and documentation before deployment.
                </p>
            </div>
            <div className="hidden md:block text-right">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Review Time</span>
                <span className="text-xl font-bold text-green-400">~24 Hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Technical Inputs */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Project Specifications */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
                    <Code size={20} className="text-indigo-600" />
                    Technical Specifications
                </h3>
                
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                        <input type="text" placeholder="e.g. Nexus - SaaS Landing Page Kit" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                           <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white">
                               <option>Select...</option>
                               <option>React / Next.js</option>
                               <option>Vue / Nuxt</option>
                               <option>WordPress Theme</option>
                               <option>HTML5 Template</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-1">Stack Version</label>
                           <input type="text" placeholder="e.g. React 18.2 + Tailwind 3.4" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Technical Description</label>
                        <textarea rows="5" placeholder="List dependencies, build tools (Vite/Webpack), and key features..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"></textarea>
                    </div>
                </div>
            </div>

            {/* 2. Mandatory Documentation (The "Quality" Check) */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Documentation & Demo
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-indigo-800 uppercase mb-1">Live Preview URL</label>
                        <div className="flex">
                            <span className="bg-indigo-100 border border-indigo-200 text-indigo-600 px-3 py-2 rounded-l-lg flex items-center"><ExternalLink size={16}/></span>
                            <input type="url" placeholder="https://demo.torrestt.com/your-product" className="w-full px-4 py-2 border border-indigo-200 rounded-r-lg focus:outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-indigo-800 uppercase mb-1 flex items-center gap-1">
                           Documentation Link <span className="text-red-500">*</span>
                        </label>
                        <input type="url" placeholder="https://docs.your-product.com" className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none" required />
                        <p className="text-xs text-indigo-600 mt-2 font-medium">
                            * Products without detailed installation guides will be auto-rejected.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Source Code Upload */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Source Code Bundle</h3>
                <div 
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:bg-gray-50"}`}
                    onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrag}
                >
                    <UploadCloud size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-900 font-bold">Drag & Drop .zip file</p>
                    <p className="text-xs text-gray-500 mt-1">Ensure 'node_modules' is excluded.</p>
                </div>
            </div>

        </div>

        {/* RIGHT COLUMN: Commercials & Legal */}
        <div className="space-y-6">
            
            {/* Pricing */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-green-600" />
                    Pricing Model
                </h3>
                <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-bold text-lg">₹</span>
                    <input type="number" placeholder="499" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div className="mt-4 bg-gray-50 p-3 rounded-lg text-xs space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Platform Fee (30%)</span>
                        <span className="text-gray-900 font-bold">-₹150</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="text-green-700 font-bold">Your Earnings</span>
                        <span className="text-green-700 font-bold">₹349</span>
                    </div>
                </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Thumbnail</h3>
                <div className="aspect-video bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer">
                    <div className="text-center">
                        <ImageIcon size={24} className="mx-auto mb-2 opacity-50" />
                        <span className="text-xs">1920x1080 (PNG/JPG)</span>
                    </div>
                </div>
            </div>

            {/* The "Professional" Declaration */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Developer Declaration</h3>
                <label className="flex items-start gap-3 cursor-pointer group mb-4">
                    <div className="mt-1">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        I confirm I own the IP rights to this code. I understand that Torrestt has a <strong>Zero Tolerance Policy</strong> for plagiarism.
                    </p>
                </label>

                <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> Submit for Audit
                </button>
            </div>

        </div>

      </div>
    </div>
  );
};

export default AddProduct;