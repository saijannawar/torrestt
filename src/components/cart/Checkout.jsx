import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // <--- 1. Import Hook
import { ShieldCheck, CreditCard, Lock, CheckCircle, Trash2 } from 'lucide-react'; // <--- Added Trash2 for delete button

const Checkout = () => {
  const { cartItems, cartTotal, removeFromCart } = useCart(); // <--- 2. Get Real Data
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Calculate handling fee logic
  const handlingFee = 2.00;
  const finalTotal = cartTotal > 0 ? cartTotal + handlingFee : 0;

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20 pt-10">
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        
        {/* Page Title */}
        <h1 className="text-3xl font-light text-gray-800 mb-8">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT COLUMN: Billing Details */}
            <div className="lg:w-2/3 space-y-6">
                
                {/* 1. Personal Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs">1</span>
                        Billing Details
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-light" placeholder="John" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-light" placeholder="Doe" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-light" placeholder="john@example.com" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white">
                                <option>India</option>
                                <option>United States</option>
                                <option>United Kingdom</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 2. Payment Method */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs">2</span>
                        Payment Method
                    </h2>

                    <div className="space-y-3">
                        {/* Option: Card */}
                        <div 
                            onClick={() => setPaymentMethod('card')}
                            className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'card' ? 'border-brand-light bg-green-50' : 'border-gray-200'}`}
                        >
                            <div className="flex items-center gap-3">
                                <CreditCard className={paymentMethod === 'card' ? 'text-brand-light' : 'text-gray-400'} />
                                <span className="font-medium text-gray-800">Credit / Debit Card</span>
                            </div>
                            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                                {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-brand-light"></div>}
                            </div>
                        </div>

                        {/* Option: PayPal */}
                        <div 
                            onClick={() => setPaymentMethod('paypal')}
                            className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'paypal' ? 'border-brand-light bg-green-50' : 'border-gray-200'}`}
                        >
                            <div className="flex items-center gap-3">
                                <ShieldCheck className={paymentMethod === 'paypal' ? 'text-brand-light' : 'text-gray-400'} />
                                <span className="font-medium text-gray-800">PayPal</span>
                            </div>
                            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                                {paymentMethod === 'paypal' && <div className="w-2 h-2 rounded-full bg-brand-light"></div>}
                            </div>
                        </div>
                    </div>

                    {/* Fake Card Details Box */}
                    {paymentMethod === 'card' && (
                        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200 animate-fade-in">
                            <div className="mb-3">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded bg-white outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry</label>
                                    <input type="text" placeholder="MM / YY" className="w-full px-4 py-2 border border-gray-300 rounded bg-white outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                        <input type="text" placeholder="123" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded bg-white outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                    <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                    
                    {/* DYNAMIC ITEM LIST */}
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.length === 0 ? (
                             <p className="text-gray-500 text-sm text-center py-4">Your cart is empty.</p>
                        ) : (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-start group">
                                    <div className="flex items-center gap-3">
                                        <img src={item.image} className="w-12 h-12 rounded object-cover border border-gray-100" alt="product" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.license}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="font-bold text-gray-800">${item.price}</span>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 text-xs transition-colors"
                                            title="Remove Item"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* DYNAMIC TOTALS */}
                    <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4 mb-6">
                        <div className="flex justify-between">
                            <span>Item Price</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Handling Fee</span>
                            <span>${cartTotal > 0 ? handlingFee.toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button className="w-full bg-[#8FA67A] hover:bg-[#7A8F68] text-white font-bold py-3.5 rounded shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mb-4">
                        <Lock size={18} />
                        Pay Securely
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <CheckCircle size={12} className="text-green-500" />
                        <span>256-bit SSL Secured Payment</span>
                    </div>

                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;