import React from 'react';
import { CheckCircle, XCircle, FileText, AlertTriangle } from 'lucide-react';

const SellerGuidelines = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Seller Guidelines</h1>
      <p className="text-gray-600 mb-8 text-lg">
        To ensure high quality on Torrestt, all items must meet the following standards before approval.
      </p>

      <div className="space-y-8">
        
        {/* Do's */}
        <div>
            <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <CheckCircle /> Accepted Practices
            </h3>
            <ul className="space-y-3 ml-2">
                <li className="flex gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></span>
                    Code must be clean, commented, and well-structured.
                </li>
                <li className="flex gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></span>
                    Include detailed documentation (Setup, Installation, Usage).
                </li>
                <li className="flex gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0"></span>
                    Designs should be modern, responsive, and cross-browser compatible.
                </li>
            </ul>
        </div>

        {/* Don'ts */}
        <div>
            <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <XCircle /> Prohibited Content
            </h3>
            <ul className="space-y-3 ml-2">
                <li className="flex gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></span>
                    Do NOT upload items containing viruses, malware, or malicious code.
                </li>
                <li className="flex gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></span>
                    Do NOT upload copyrighted material that you do not own.
                </li>
                <li className="flex gap-3 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0"></span>
                    Do NOT use "Lorem Ipsum" in main preview images; use real content placeholders.
                </li>
            </ul>
        </div>

        {/* Warning Box */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mt-8">
            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                <AlertTriangle size={20}/> Review Process
            </h4>
            <p className="text-yellow-900 text-sm">
                All submissions are manually reviewed by our team. This process typically takes <strong>24-48 hours</strong>. 
                Repeated violations of these guidelines may result in permanent account suspension.
            </p>
        </div>

      </div>
    </div>
  );
};

export default SellerGuidelines;