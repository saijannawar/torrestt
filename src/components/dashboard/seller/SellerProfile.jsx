import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { User, Mail, Shield, MapPin } from 'lucide-react';

const SellerProfile = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Header / Cover Mock */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
            
            <div className="px-8 pb-8">
                {/* Avatar */}
                <div className="relative -mt-12 mb-6">
                    <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg inline-block">
                        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            <User size={40} />
                        </div>
                    </div>
                </div>

                {/* Info List */}
                <div className="space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Username</label>
                        <div className="flex items-center gap-3 mt-1 text-gray-900 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <User size={18} className="text-gray-400"/>
                            {user?.username}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email Address</label>
                        <div className="flex items-center gap-3 mt-1 text-gray-900 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <Mail size={18} className="text-gray-400"/>
                            {user?.attributes?.email}
                        </div>
                    </div>

                    <div>
                         <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Account Status</label>
                         <div className="flex items-center gap-2 mt-2">
                             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                                <Shield size={12} /> Verified Seller
                             </span>
                         </div>
                    </div>
                </div>

                {/* Action */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition text-sm">
                        Edit Profile
                    </button>
                </div>

            </div>
        </div>
    </div>
  );
};

export default SellerProfile;