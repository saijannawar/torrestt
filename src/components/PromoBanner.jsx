import React from 'react';

const PromoBanner = () => {
  return (
    <div className="bg-brand-light text-white py-2 px-4 flex justify-between items-center text-sm font-medium">
      <div className="hidden md:flex mx-auto items-center gap-4">
        <span>AI tools + unlimited creative stock assets. All in one subscription.</span>
        <button className="bg-gray-900 text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors shadow-lg text-xs uppercase tracking-wide">
          Start now
        </button>
      </div>
      {/* Mobile view */}
      <div className="md:hidden w-full text-center text-xs">
        <span>Unlimited assets available now.</span>
      </div>
    </div>
  );
};

export default PromoBanner;