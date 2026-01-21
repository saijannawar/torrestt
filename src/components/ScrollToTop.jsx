import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom'; // <--- 1. Import this

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // 2. Get the current URL path (e.g., "/category/all")
  const { pathname } = useLocation();

  // 3. EFFECT: Automatically scroll to top when path changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // <--- This makes it "smoothly open" from the top
    });
  }, [pathname]); // Runs every time "pathname" changes

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Manual Scroll to Top function (for the button)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-brand-light hover:bg-brand-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;