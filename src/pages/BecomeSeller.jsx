import React, { useEffect, useState, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import { listSellerProfiles } from "../graphql/queries";
import { createSellerProfile, updateSellerProfile } from "../graphql/mutations";
import { uploadData } from 'aws-amplify/storage';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Building2, GraduationCap, UploadCloud, 
  CheckCircle, Loader2, ShieldCheck, ArrowLeft, Briefcase, Check, Clock, Pencil, AlertTriangle
} from 'lucide-react';

const client = generateClient();

const BecomeSeller = () => {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [sellerType, setSellerType] = useState(null); 
  const [agreed, setAgreed] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shopName: '', description: '', website: '',
    collegeName: '', collegeEmail: '',
    experienceYears: '', portfolioUrl: '',
    companyRegistrationNum: '', companyLinkedin: ''
  });

  const [proofFile, setProofFile] = useState(null);
  const fileInputRef = useRef(null);

  const brandColor = "text-[#82B440]";
  const brandBg = "bg-[#82B440]";

  useEffect(() => { fetchProfile(); }, []);

  async function fetchProfile() {
    setLoading(true);
    try {
      const u = await getCurrentUser();
      console.log("Current User:", u);

      // 1. Fetch ALL profiles (Bypass cache with network-only)
      const result = await client.graphql({ 
        query: listSellerProfiles,
        fetchPolicy: 'network-only' 
      });

      const allItems = result.data.listSellerProfiles.items;
      
      // 2. ROBUST MATCHING: Find the profile that belongs to this user
      const myProfile = allItems.find(item => 
          item.owner === u.userId || 
          item.owner === u.username ||
          item.owner === u.signInDetails?.loginId
      );

      console.log("My Profile:", myProfile);

      if (myProfile) {
        // --- 3. AUTO-REDIRECT IF APPROVED ---
        if (myProfile.status === 'APPROVED') {
            console.log("Approved! Redirecting...");
            navigate('/seller/dashboard', { replace: true });
            return;
        }

        // 4. Load Profile Data
        setProfile(myProfile);
        setSellerType(myProfile.sellerType); // Lock type
        setAgreed(true); 
        
        setFormData({
            shopName: myProfile.shopName || '',
            description: myProfile.description || '',
            website: myProfile.website || '',
            collegeName: myProfile.collegeName || '',
            collegeEmail: myProfile.collegeEmail || '',
            experienceYears: myProfile.experienceYears || '',
            portfolioUrl: myProfile.portfolioUrl || '',
            companyRegistrationNum: myProfile.companyRegistrationNum || '',
            companyLinkedin: myProfile.companyLinkedin || ''
        });
      }
    } catch (err) { 
        console.error("Fetch Error:", err); 
    } finally {
        setLoading(false); 
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) setProofFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreed) return alert("Please accept the Terms & Conditions.");
    if (!formData.shopName.trim()) return alert("Shop Name is required.");
    if (!sellerType) return alert("Please select a Seller Type.");

    setIsSaving(true);

    try {
        let proofKey = profile?.studentIdCardUrl || profile?.personalIdCardUrl || profile?.companyDocumentUrl;

        // Upload Document if new file selected
        if (proofFile) {
            const extension = proofFile.name.split('.').pop();
            const typePrefix = sellerType.toLowerCase();
            proofKey = `verification/${typePrefix}/${Date.now()}.${extension}`;
            
            await uploadData({
                key: proofKey,
                data: proofFile,
                options: { accessLevel: 'protected' }
            }).result;
        }

        const experienceInt = parseInt(formData.experienceYears);
        const finalExperience = isNaN(experienceInt) ? 0 : experienceInt;

        const inputData = {
            shopName: formData.shopName.trim(),
            description: formData.description || "",
            website: formData.website || "",
            sellerType: sellerType,
            status: "PENDING", // <--- ALWAYS RESET TO PENDING
            
            collegeName: sellerType === 'STUDENT' ? formData.collegeName : null,
            collegeEmail: sellerType === 'STUDENT' ? formData.collegeEmail : null,
            studentIdCardUrl: sellerType === 'STUDENT' ? proofKey : null,

            experienceYears: sellerType === 'FREELANCER' ? finalExperience : null,
            portfolioUrl: sellerType === 'FREELANCER' ? formData.portfolioUrl : null,
            personalIdCardUrl: sellerType === 'FREELANCER' ? proofKey : null,

            companyRegistrationNum: sellerType === 'COMPANY' ? formData.companyRegistrationNum : null,
            companyLinkedin: sellerType === 'COMPANY' ? formData.companyLinkedin : null,
            companyDocumentUrl: sellerType === 'COMPANY' ? proofKey : null,
        };

        let resultProfile;

        // --- CRITICAL FIX: USE authMode: 'userPool' ---
        // This ensures the database knows exactly WHO created/updated the record.
        if (profile) {
            const res = await client.graphql({
                query: updateSellerProfile,
                variables: { input: { id: profile.id, ...inputData } },
                authMode: 'userPool' 
            });
            resultProfile = res.data.updateSellerProfile;
        } else {
            const res = await client.graphql({
                query: createSellerProfile,
                variables: { input: inputData },
                authMode: 'userPool'
            });
            resultProfile = res.data.createSellerProfile;
        }
        
        // Immediate UI Update
        setProfile(resultProfile);
        setIsEditing(false); 
        window.scrollTo(0, 0);
        
        alert("Application Submitted Successfully!");

    } catch (err) {
        console.error("Submission Error:", JSON.stringify(err, null, 2));
        const msg = err.errors ? err.errors[0].message : err.message;
        alert("Submission Failed: " + msg);
    } finally {
        setIsSaving(false);
    }
  };

  // ------------------------------------------
  //               RENDER LOGIC
  // ------------------------------------------

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gray-50"><Loader2 className="animate-spin mr-2"/> Loading...</div>;

  // --- 1. WAITING PAGE (Status PENDING) ---
  if (profile && profile.status === 'PENDING' && !isEditing) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-in fade-in duration-700">
            <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-xl p-10 text-center border border-gray-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-2 ${brandBg}`}></div>
                <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={48} className="text-yellow-600 animate-pulse" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Under Review</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    Thank you for applying. We are verifying your documents. This typically takes <span className="font-bold text-gray-900">24-48 hours</span>.
                </p>
                <div className="space-y-3">
                    <button 
                        onClick={() => { setLoading(true); fetchProfile(); }} 
                        className="w-full py-4 bg-[#82B440] text-white font-bold rounded-xl hover:bg-[#6a9632] transition-colors flex items-center justify-center gap-2"
                    >
                        Refresh Status
                    </button>
                    <Link to="/" className="block w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">Go to Homepage</Link>
                    <button onClick={() => setIsEditing(true)} className="flex items-center justify-center gap-2 w-full py-4 text-gray-500 font-bold hover:text-black hover:bg-gray-50 rounded-xl transition-all">
                        <Pencil size={16} /> Edit Application
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // --- 2. SELECTION SCREEN (Brand New Users) ---
  if (!sellerType) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 animate-in fade-in duration-700 relative">
            <div className="text-center mb-16 space-y-4 max-w-3xl mt-10">
                <span className={`text-xs font-bold tracking-[0.2em] uppercase ${brandColor}`}>Join the Elite Network</span>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">Become a Torrestt Seller</h1>
                <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mx-auto">Choose your profile type to unlock exclusive verification badges and seller tools.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
                {[
                    { id: 'STUDENT', icon: GraduationCap, label: 'Student', desc: 'Verify with University ID. Access student perks.' },
                    { id: 'FREELANCER', icon: Briefcase, label: 'Freelancer', desc: 'Verify with Portfolio. Build your personal brand.' },
                    { id: 'COMPANY', icon: Building2, label: 'Agency / Org', desc: 'Verify with Business Reg. Corporate trust badge.' },
                ].map((type) => (
                    <div key={type.id} onClick={() => setSellerType(type.id)} className="group relative bg-gray-50 p-8 md:p-10 rounded-[2rem] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center overflow-hidden">
                        <div className={`w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#82B440] group-hover:text-white transition-colors duration-500 text-gray-900`}>
                            <type.icon size={36} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{type.label}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-10 px-2">{type.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  // --- 3. FORM SCREEN ---
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 md:px-8 animate-in slide-in-from-bottom-8 duration-700 relative">
      
      {profile && profile.status === 'REJECTED' && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 p-6 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-4">
            <div className="p-3 bg-red-100 rounded-full text-red-600"><AlertTriangle size={24} /></div>
            <div>
                <h3 className="text-lg font-bold text-red-900">Application Rejected</h3>
                <p className="text-red-700 mt-1">Your application needs changes. Please update details and re-submit.</p>
            </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-8 md:mt-0">
        <div className="flex items-center gap-6 mb-10">
            <button 
                onClick={() => {
                     if(profile && profile.status === 'PENDING') { setIsEditing(false); } 
                     else if (!profile) { setSellerType(null); } 
                     else { window.location.reload(); }
                }}
                className={`group p-3 bg-white border border-gray-200 rounded-full transition-all hover:border-black hover:shadow-md cursor-pointer`}
            >
                <ArrowLeft size={20} className="text-gray-500 group-hover:text-black" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{profile ? "Edit Application" : "Complete Application"}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg"><User size={20} className="text-black" /></div>
                    Public Shop Details
                </h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                            <input required value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#82B440] focus:bg-white transition-all font-medium" placeholder="e.g. Torrestt Studio" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Website</label>
                            <input value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#82B440] focus:bg-white transition-all font-medium" placeholder="https://" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Bio</label>
                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[#82B440] focus:bg-white transition-all font-medium min-h-[100px]" placeholder="Tell buyers about your expertise..." />
                    </div>
                </div>
            </section>

            <section className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1.5 h-full ${brandBg}`}></div>
                <div className="flex justify-between items-start mb-8">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg"><ShieldCheck size={20} className={brandColor} /></div>
                        {sellerType} Verification
                    </h3>
                    {!profile && <button type="button" onClick={() => setSellerType(null)} className="text-xs font-bold text-gray-400 hover:text-black mt-2">Change</button>}
                </div>

                <div className="space-y-6">
                    {sellerType === 'STUDENT' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="label-style">College Name</label><input required value={formData.collegeName} onChange={e => setFormData({...formData, collegeName: e.target.value})} className="input-style" /></div>
                            <div><label className="label-style">College Email</label><input required type="email" value={formData.collegeEmail} onChange={e => setFormData({...formData, collegeEmail: e.target.value})} className="input-style" /></div>
                        </div>
                    )}
                    {sellerType === 'FREELANCER' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="label-style">Experience (Years)</label><input required type="number" value={formData.experienceYears} onChange={e => setFormData({...formData, experienceYears: e.target.value})} className="input-style" /></div>
                            <div><label className="label-style">Portfolio URL</label><input required type="url" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} className="input-style" /></div>
                        </div>
                    )}
                    {sellerType === 'COMPANY' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label className="label-style">Registration / GST</label><input required value={formData.companyRegistrationNum} onChange={e => setFormData({...formData, companyRegistrationNum: e.target.value})} className="input-style" /></div>
                            <div><label className="label-style">LinkedIn URL</label><input required type="url" value={formData.companyLinkedin} onChange={e => setFormData({...formData, companyLinkedin: e.target.value})} className="input-style" /></div>
                        </div>
                    )}

                    <div className="pt-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Document Proof</label>
                        <div onClick={() => fileInputRef.current.click()} className="group border-2 border-dashed border-gray-200 rounded-2xl p-8 md:p-10 text-center cursor-pointer hover:border-[#82B440] hover:bg-green-50/30 transition-all duration-300">
                            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:scale-110 transition-all">
                                <UploadCloud className="text-gray-400 group-hover:text-[#82B440]" size={28}/>
                            </div>
                            <p className="text-sm font-bold text-gray-900">{proofFile ? proofFile.name : (profile ? "Click to Update Document" : "Click to Upload Document")}</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
                    </div>
                </div>
            </section>

            <section className="pt-2 pb-6">
                <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-200">
                    <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${agreed ? 'bg-[#82B440] border-[#82B440]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                        {agreed && <Check size={16} className="text-white" strokeWidth={3} />}
                    </div>
                    <input type="checkbox" className="hidden" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                    <div className="text-sm text-gray-500 leading-relaxed">
                        <span className="font-bold text-gray-900 block mb-1">Agreement to Terms</span>
                        I confirm that I possess full intellectual property rights.
                    </div>
                </label>
            </section>

            <div className="flex justify-end pb-12">
                <button type="submit" disabled={isSaving || !agreed} className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${agreed && !isSaving ? 'bg-black text-white hover:bg-[#82B440] hover:shadow-xl hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                    {isSaving ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
                    {isSaving ? (profile ? "Updating..." : "Submitting...") : (profile ? "Update Application" : "Submit Application")}
                </button>
            </div>
        </form>
      </div>
      <style>{`
        .label-style { display: block; font-size: 0.75rem; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .input-style { width: 100%; padding: 1rem 1.25rem; background-color: #F9FAFB; border: none; border-radius: 0.75rem; font-weight: 500; transition: all 0.2s; }
        .input-style:focus { background-color: white; box-shadow: 0 0 0 2px #82B440; outline: none; }
      `}</style>
    </div>
  );
};

export default BecomeSeller;