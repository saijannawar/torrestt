import React, { useEffect, useState, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getProduct } from '../../../graphql/queries';
import { updateProduct } from '../../../graphql/mutations';
import { getUrl, uploadData } from 'aws-amplify/storage'; // Added uploadData
import { useParams, useNavigate } from 'react-router-dom';
import { Download, CheckCircle, XCircle, ExternalLink, ShieldAlert, Code, Upload, Loader2 } from 'lucide-react';

const client = generateClient();

const AdminProductReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [zipLink, setZipLink] = useState('');
  const [feedback, setFeedback] = useState('');
  
  // New State for Replacing File
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  useEffect(() => { fetchDetails(); }, []);

  async function fetchDetails() {
    try {
      const result = await client.graphql({ query: getProduct, variables: { id } });
      const item = result.data.getProduct;
      setProduct(item);

      // Get Secure S3 Links (Explicitly ask for 'guest' access)
      if(item.thumbnailUrl) {
          const url = await getUrl({ key: item.thumbnailUrl, options: { accessLevel: 'guest' } });
          setImageLink(url.url);
      }
      if(item.fileUrl) {
          const url = await getUrl({ key: item.fileUrl, options: { accessLevel: 'guest' } });
          setZipLink(url.url);
      }
    } catch (err) { console.error(err); }
  }

  // --- NEW FUNCTION: REPLACE FILE ---
  const handleReplaceFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if(!window.confirm("This will overwrite the seller's original file. Continue?")) return;

    setIsUploading(true);
    try {
        // 1. Upload new file to S3 (Same folder structure)
        const newKey = `products/${Date.now()}-ADMIN-EDIT-${file.name}`;
        await uploadData({
            key: newKey,
            data: file,
            options: { accessLevel: 'guest' }
        }).result;

        // 2. Update DynamoDB with new key
        await client.graphql({
            query: updateProduct,
            variables: {
                input: {
                    id: product.id,
                    fileUrl: newKey // Save new path
                }
            }
        });

        // 3. Refresh Link
        const url = await getUrl({ key: newKey, options: { accessLevel: 'guest' } });
        setZipLink(url.url);
        alert("Source code updated successfully!");

    } catch (err) {
        console.error("Error replacing file:", err);
        alert("Failed to replace file.");
    } finally {
        setIsUploading(false);
    }
  };

  async function handleDecision(status) {
    if (status === 'REJECTED' && !feedback) {
        alert("Please enter feedback for rejection.");
        return;
    }
    if(!window.confirm(`Mark as ${status}?`)) return;

    try {
        await client.graphql({
            query: updateProduct,
            variables: {
                input: {
                    id: product.id,
                    status: status,
                    adminFeedback: feedback
                }
            }
        });
        alert(`Product marked as ${status}`);
        navigate('/admin/products');
    } catch (err) { console.error(err); }
  }

  if (!product) return <div className="p-10 text-center">Loading Review Panel...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
         <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                {product.name}
                <span className={`text-sm px-3 py-1 rounded-full border ${product.status === 'PENDING' ? 'bg-yellow-100 border-yellow-200 text-yellow-800' : 'bg-gray-100 border-gray-200'}`}>
                    {product.status}
                </span>
            </h1>
            <p className="text-gray-500 mt-1">Submitted by Owner ID: {product.owner}</p>
         </div>
         <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${product.price}</p>
            <p className="text-xs text-gray-400">Platform Fee: 30%</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Product Content */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-4">Thumbnail Preview</h3>
                {imageLink ? (
                    <img src={imageLink} alt="Thumb" className="w-full rounded-lg border border-gray-100 shadow-sm" />
                ) : <div className="h-40 bg-gray-100 flex items-center justify-center">No Image</div>}
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><Code size={16}/> Tech Stack</h4>
                        <div className="p-3 bg-gray-50 rounded border border-gray-100 font-mono text-sm text-blue-600">
                            {product.techStack}
                        </div>
                    </div>
                    <div className="flex-1">
                         <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2"><ExternalLink size={16}/> Demo Link</h4>
                         <a href={product.livePreviewUrl} target="_blank" rel="noreferrer" className="block p-3 bg-gray-50 rounded border border-gray-100 text-sm text-blue-600 hover:underline truncate">
                            {product.livePreviewUrl}
                         </a>
                    </div>
                </div>

                <h4 className="font-bold text-gray-700 mb-2">Description / Documentation</h4>
                <div className="p-4 bg-gray-50 rounded border border-gray-100 text-sm text-gray-700 whitespace-pre-wrap">
                    {product.description}
                </div>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="space-y-6">
            
            {/* File Audit & Replace */}
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg">
                <h3 className="font-bold flex items-center gap-2 mb-4"><ShieldAlert className="text-green-400"/> Security Audit</h3>
                <p className="text-gray-400 text-sm mb-6">
                    Download the source code to check for viruses. If the file is corrupted, you can replace it here.
                </p>
                
                <div className="space-y-3">
                    <a href={zipLink} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-100 transition">
                        <Download size={18}/> Download .ZIP
                    </a>

                    <div className="relative">
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            className="hidden" 
                            onChange={handleReplaceFile}
                            accept=".zip,.rar"
                        />
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            disabled={isUploading}
                            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition border border-gray-700"
                        >
                            {isUploading ? <Loader2 className="animate-spin" size={18}/> : <Upload size={18}/>}
                            {isUploading ? "Uploading..." : "Replace Source Code"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Decision Panel */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">Admin Decision</h3>
                
                <label className="block text-sm font-bold text-gray-700 mb-2">Feedback / Rejection Reason</label>
                <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="e.g. Please remove node_modules or fix the mobile view."
                    rows="3"
                ></textarea>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => handleDecision('REJECTED')}
                        className="flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-lg hover:bg-red-100 transition"
                    >
                        <XCircle size={18}/> Reject
                    </button>
                    <button 
                        onClick={() => handleDecision('APPROVED')}
                        className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition shadow-md"
                    >
                        <CheckCircle size={18}/> Approve
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductReview;