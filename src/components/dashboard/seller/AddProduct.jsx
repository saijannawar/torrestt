import React, { useState, useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';
import { createProduct } from '../../../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, DollarSign, FileText, Image as ImageIcon, 
  ShieldAlert, Code, CheckCircle, ExternalLink, Loader2 
} from 'lucide-react';

const client = generateClient();

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Refs for hidden file inputs
  const zipInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    techStack: '',
    livePreviewUrl: '',
    documentationUrl: '', 
    subCategoryID: ''
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  // 1. Fetch Categories on Load (to populate dropdown)
  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      // Deep query to get Categories AND SubCategories
      const deepQuery = `
        query ListDeep {
            listCategories {
                items {
                    id
                    name
                    subCategories { items { id name } }
                }
            }
        }
      `;
      const result = await client.graphql({ query: deepQuery });
      setCategories(result.data.listCategories.items);
    } catch (e) { console.error("Error fetching categories", e); }
  }

  // 2. Handle Text Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle File Selection
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === 'image') setThumbnailFile(file);
    if (type === 'zip') setZipFile(file);
  };

  // 4. Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.subCategoryID) {
        alert("Please select a specific Category.");
        return;
    }
    if (!thumbnailFile || !zipFile) {
      alert("Please upload both a thumbnail and the source code zip.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // A. Upload Thumbnail to S3 (Public Read)
      const thumbExt = thumbnailFile.name.split('.').pop();
      const thumbKey = `thumbnails/${Date.now()}.${thumbExt}`;
      
      await uploadData({
        key: thumbKey,
        data: thumbnailFile,
        options: { accessLevel: 'guest' } 
      }).result;

      // B. Upload Zip to S3 (Protected)
      const zipExt = zipFile.name.split('.').pop();
      const zipKey = `products/${Date.now()}.${zipExt}`;

      await uploadData({
        key: zipKey,
        data: zipFile,
        options: { accessLevel: 'protected' } // Only buyer/seller can access
      }).result;

      // C. Save Product to Database
      // We map our form state to the exact fields in your Schema
      const inputData = {
        name: formData.name,
        // Schema has no 'documentationUrl', so we add it to description
        description: `${formData.description}\n\nDocumentation: ${formData.documentationUrl}`, 
        price: parseFloat(formData.price),
        techStack: formData.techStack,
        livePreviewUrl: formData.livePreviewUrl,
        
        // Critical: Link to the SubCategory ID
        subCategoryID: formData.subCategoryID, 
        
        // S3 Keys
        thumbnailUrl: thumbKey, 
        fileUrl: zipKey,
        
        status: "PENDING"
      };

      await client.graphql({
        query: createProduct,
        variables: { input: inputData },
        authMode: 'userPool' // Required for owner-based auth rules
      });

      alert("Submission successful! Your item is now pending review.");
      navigate('/seller/products');

    } catch (err) {
      console.error("Upload Error:", JSON.stringify(err, null, 2));
      const msg = err.errors ? err.errors[0].message : err.message;
      alert("Upload Failed: " + msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Drag Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
       setZipFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="bg-gray-900 rounded-2xl p-8 mb-8 text-white shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
                    <ShieldAlert size={32} className="text-[#82B440]" />
                    Developer Submission Portal
                </h1>
                <p className="text-gray-400 mt-2 max-w-2xl text-sm">
                    Torrestt enforces strict <strong>Industry Quality Standards</strong>. 
                    Your code will be audited for cleanliness, security, and documentation.
                </p>
            </div>
            <div className="hidden md:block text-right">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Review Time</span>
                <span className="text-xl font-bold text-[#82B440]">~24 Hours</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Technical Inputs */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Project Specifications */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 border-b pb-4">
                        <Code size={20} className="text-[#82B440]" />
                        Technical Specifications
                    </h3>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                            <input name="name" onChange={handleChange} required type="text" placeholder="e.g. Nexus - SaaS Landing Page Kit" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                               <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                               <select name="subCategoryID" onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black">
                                   <option value="">Select Category...</option>
                                   {categories.map(cat => (
                                       <optgroup key={cat.id} label={cat.name}>
                                           {cat.subCategories && cat.subCategories.items.map(sub => (
                                               <option key={sub.id} value={sub.id}>{sub.name}</option>
                                           ))}
                                       </optgroup>
                                   ))}
                               </select>
                            </div>
                            <div>
                               <label className="block text-sm font-bold text-gray-700 mb-1">Tech Stack</label>
                               <input name="techStack" onChange={handleChange} required type="text" placeholder="e.g. React 18.2 + Tailwind" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Technical Description</label>
                            <textarea name="description" onChange={handleChange} required rows="5" placeholder="List dependencies, build tools, and key features..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"></textarea>
                        </div>
                    </div>
                </div>

                {/* 2. Documentation */}
                <div className="bg-[#f4fce3] p-6 rounded-xl border border-[#dcecc0]">
                    <h3 className="font-bold text-[#4d6b26] mb-4 flex items-center gap-2">
                        <FileText size={20} />
                        Documentation & Demo
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-[#5c802d] uppercase mb-1">Live Preview URL</label>
                            <div className="flex">
                                <span className="bg-[#eaf5d3] border border-[#dcecc0] text-[#82B440] px-3 py-2 rounded-l-lg flex items-center"><ExternalLink size={16}/></span>
                                <input name="livePreviewUrl" onChange={handleChange} type="url" placeholder="https://demo.torrestt.com" className="w-full px-4 py-2 border border-[#dcecc0] rounded-r-lg focus:outline-none focus:ring-1 focus:ring-[#82B440]" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#5c802d] uppercase mb-1 flex items-center gap-1">
                               Documentation Link <span className="text-red-500">*</span>
                            </label>
                            <input name="documentationUrl" onChange={handleChange} required type="url" placeholder="https://docs.your-product.com" className="w-full px-4 py-2 border border-[#dcecc0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#82B440]" />
                        </div>
                    </div>
                </div>

                {/* 3. Source Code Upload */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Source Code Bundle</h3>
                    <div 
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive ? "border-[#82B440] bg-green-50" : "border-gray-300 hover:bg-gray-50"}`}
                        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                        onClick={() => zipInputRef.current.click()}
                    >
                        <input type="file" ref={zipInputRef} onChange={(e) => handleFileChange(e, 'zip')} className="hidden" accept=".zip,.rar,.7z" />
                        
                        {zipFile ? (
                             <div className="flex flex-col items-center text-[#82B440]">
                                <CheckCircle size={40} className="mb-2"/>
                                <p className="font-bold">{zipFile.name}</p>
                                <p className="text-xs text-gray-500">{(zipFile.size / 1024 / 1024).toFixed(2)} MB</p>
                             </div>
                        ) : (
                            <>
                                <UploadCloud size={40} className="mx-auto text-gray-400 mb-3" />
                                <p className="text-gray-900 font-bold">Drag & Drop .zip file</p>
                                <p className="text-xs text-gray-500 mt-1">Ensure 'node_modules' is excluded.</p>
                            </>
                        )}
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Commercials & Legal */}
            <div className="space-y-6">
                
                {/* Pricing */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <DollarSign size={20} className="text-[#82B440]" />
                        Pricing Model
                    </h3>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500 font-bold text-lg">₹</span>
                        <input name="price" onChange={handleChange} required type="number" placeholder="499" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg font-bold text-lg focus:ring-2 focus:ring-[#82B440] outline-none" />
                    </div>
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg text-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Platform Fee (30%)</span>
                            <span className="text-gray-900 font-bold">-30%</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                            <span className="text-[#82B440] font-bold">Your Earnings</span>
                            <span className="text-[#82B440] font-bold">70%</span>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Thumbnail</h3>
                    <div 
                        className="aspect-video bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer overflow-hidden relative"
                        onClick={() => imageInputRef.current.click()}
                    >
                        <input type="file" ref={imageInputRef} onChange={(e) => handleFileChange(e, 'image')} className="hidden" accept="image/*" />
                        
                        {thumbnailFile ? (
                            <img src={URL.createObjectURL(thumbnailFile)} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center">
                                <ImageIcon size={24} className="mx-auto mb-2 opacity-50" />
                                <span className="text-xs">1920x1080 (PNG/JPG)</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Declaration & Submit */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Developer Declaration</h3>
                    <label className="flex items-start gap-3 cursor-pointer group mb-4">
                        <div className="mt-1">
                            <input required type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#82B440] focus:ring-[#82B440]" />
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            I confirm I own the IP rights to this code. I understand that Torrestt has a <strong>Zero Tolerance Policy</strong> for plagiarism.
                        </p>
                    </label>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`
                            w-full font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-white
                            ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-[#82B440] hover:scale-105"}
                        `}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="animate-spin" size={18}/> Uploading...</>
                        ) : (
                            <><CheckCircle size={18} /> Submit for Audit</>
                        )}
                    </button>
                </div>

            </div>
          </div>
      </form>
    </div>
  );
};

export default AddProduct;