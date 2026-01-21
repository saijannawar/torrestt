import React from 'react';
import { 
  Star, ShoppingCart, Check, ShieldCheck, Heart, 
  Monitor, Layers, Zap, Calendar, Download, Image as ImageIcon 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <--- 1. Import Cart Hook

const ProductDetails = () => {
  const { addToCart } = useCart(); // <--- 2. Get addToCart function

  // 3. Define the product data (Static for now, will come from DB later)
  const productData = {
    id: "elementra-1", 
    title: "Elementra - Multipurpose Corporate WordPress Theme",
    price: 29.00,
    image: "https://placehold.co/100x100/1e293b/FFF?text=E",
    license: "Regular License"
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen font-sans pb-20">
      
      {/* 1. PRODUCT HEADER (Dark Background) */}
      <div className="bg-[#262626] text-white py-12">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Link to="/" className="hover:text-white">Home</Link>
                    <span>/</span>
                    <Link to="/category/wordpress" className="hover:text-white">WordPress</Link>
                    <span>/</span>
                    <span className="text-white">Corporate</span>
                </div>
                
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-light">
                    {productData.title}
                </h1> 

                {/* Ratings & Author */}
                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <span className="text-white font-bold ml-1">4.85</span>
                        <span className="text-gray-400 ml-1">(124 ratings)</span>
                    </div>
                    <div className="text-gray-400">
                        by <span className="text-white font-bold hover:underline cursor-pointer">ThemeTorres</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT (2 Columns) */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT COLUMN: Content (66% Width) */}
            <div className="lg:w-2/3 space-y-8">
                
                {/* Preview Image */}
                <div className="bg-white p-2 rounded shadow-sm border border-gray-200">
                    <img 
                        src="https://placehold.co/800x450/1e293b/FFF?text=Elementra+Main+Preview" 
                        alt="Preview" 
                        className="w-full rounded"
                    />
                    <div className="flex justify-center gap-4 mt-4 mb-2">
                        <button className="bg-[#8FA67A] hover:bg-[#7A8F68] text-white font-bold py-3 px-8 rounded shadow transition-colors flex items-center gap-2">
                            <Monitor size={18} />
                            Live Preview
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded shadow-sm transition-colors flex items-center gap-2">
                            <ImageIcon size={18} />
                            Screenshots
                        </button>
                    </div>
                </div>

                {/* Description Box */}
                <div className="bg-white p-8 rounded shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Product Description</h3>
                    
                    <div className="prose max-w-none text-gray-600 space-y-4">
                        <p>
                            <strong>Elementra</strong> is a clean, modern, and fully responsive WordPress theme designed for corporate websites, agencies, and businesses. It comes with 15+ pre-made homepages and over 100 inner pages.
                        </p>
                        <p>
                            Built with the latest technologies including Bootstrap 5, SASS, and jQuery, it ensures high performance and easy customization.
                        </p>
                        
                        <h4 className="text-lg font-bold text-gray-800 mt-6 mb-2">Key Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {['One-Click Demo Import', 'Drag & Drop Builder', 'SEO Optimized', 'Fast Loading Speed', 'Responsive Design', 'Retina Ready'].map(feat => (
                                <li key={feat} className="flex items-center gap-2">
                                    <Check size={16} className="text-green-500" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        
                        <img 
                            src="https://placehold.co/800x300/e2e8f0/94a3b8?text=Feature+Highlight" 
                            alt="Feature" 
                            className="w-full rounded mt-6"
                        />
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Sticky Sidebar (33% Width) */}
            <div className="lg:w-1/3">
                <div className="sticky top-24 space-y-6">
                    
                    {/* Buy Box */}
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 font-medium">{productData.license}</span>
                            <span className="text-3xl font-bold text-gray-800">${productData.price}</span>
                        </div>
                        
                        <div className="text-sm text-gray-500 mb-6 space-y-2">
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-gray-400" />
                                Quality checked by Envato
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-gray-400" />
                                Future updates included
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-gray-400" />
                                6 months support from ThemeTorres
                            </div>
                        </div>

                        {/* 4. CONNECTED BUTTON */}
                        <button 
                            onClick={() => addToCart(productData)}
                            className="w-full bg-[#8FA67A] hover:bg-[#7A8F68] text-white font-bold py-3.5 rounded shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mb-3"
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                        
                        <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2.5 rounded shadow-sm transition-colors mb-4">
                            Buy Now
                        </button>
                        
                        <div className="text-center text-xs text-gray-400">
                            Price is in US dollars and excludes tax
                        </div>
                    </div>

                    {/* Meta Info Box */}
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <table className="w-full text-sm text-gray-600">
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="py-3 font-medium">Last Update</td>
                                    <td className="py-3 text-right">2 days ago</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">Published</td>
                                    <td className="py-3 text-right">August 2025</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">High Resolution</td>
                                    <td className="py-3 text-right">Yes</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">Compatible Browsers</td>
                                    <td className="py-3 text-right">IE11, Firefox, Safari, Chrome, Edge</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">Files Included</td>
                                    <td className="py-3 text-right">PHP, HTML, CSS, JS</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-medium">Software Version</td>
                                    <td className="py-3 text-right">WordPress 6.4.x</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDetails;