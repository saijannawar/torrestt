import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- IMPORTS ---
import { Authenticator } from '@aws-amplify/ui-react';
import { CartProvider } from './context/CartContext';

// --- Global Layout Components ---
import PromoBanner from './components/PromoBanner';
import TopHeader from './components/TopHeader';
import MainNav from './components/MainNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// --- Pages ---
import BrowseCollection from './pages/BrowseCollection';
import StockPhotos from './pages/StockPhotos';
import BecomeSeller from './pages/BecomeSeller'; // <--- NEW IMPORT

// --- Components ---
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import FeatureShowcase from './components/FeatureShowcase';
import NewestItems from './components/NewestItems';
import WeeklyBestsellers from './components/WeeklyBestsellers';
import WhyChooseUs from './components/WhyChooseUs';
import StockPhotoSection from './components/StockPhotoSection';
import BrowseCategories from './components/category/BrowseCategories';
import AllCategories from './components/category/AllCategories';
import SingleCategory from './components/category/SingleCategory';
import ProductDetails from './components/ProductDetails';
import Checkout from './components/cart/Checkout';
import AuthWrapper from './components/auth/AuthWrapper';

// --- Dashboard & Logic ---
// 1. Layout
import DashboardLayout from './components/dashboard/layout/DashboardLayout';

// 2. Admin Pages
import AdminOverview from './components/dashboard/admin/AdminOverview';
import AdminSellers from './components/dashboard/admin/AdminSellers';
import ManageCategories from './components/dashboard/admin/ManageCategories';
import ManageServices from './components/dashboard/admin/ManageServices';

import AdminProducts from './components/dashboard/admin/AdminProducts';
import AdminProductReview from './components/dashboard/admin/AdminProductReview';

// 3. Seller Pages
import SellerOverview from './components/dashboard/seller/SellerOverview';
import SellerProducts from './components/dashboard/seller/SellerProducts';
import AddProduct from './components/dashboard/seller/AddProduct';
import SellerEarnings from './components/dashboard/seller/SellerEarnings';
import SellerGuidelines from './components/dashboard/seller/SellerGuidelines';
import SellerProfile from './components/dashboard/seller/SellerProfile';


import SellerRoute from './components/SellerRoute'; // <--- NEW IMPORT
const HomePage = () => {
  return (
    <>
      <div data-aos="fade-up"><HeroSection /></div>
      <div data-aos="fade-up" data-aos-delay="100"><CategoryGrid /></div>
      <div data-aos="fade-right"><FeatureShowcase /></div>
      <div data-aos="fade-up"><NewestItems /></div>
      <div data-aos="zoom-in-up"><WeeklyBestsellers /></div>
      <div data-aos="fade-up"><StockPhotoSection /></div>
      <div data-aos="flip-up"><WhyChooseUs /></div>
    </>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-white overflow-x-hidden">
      <PromoBanner />
      <TopHeader />
      <div className="sticky top-0 z-50">
        <MainNav />
      </div>
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-out-cubic' });
  }, []);

  return (
    <Authenticator.Provider>
      <CartProvider>
        <Router>
          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/category" element={<MainLayout><BrowseCategories /></MainLayout>} />
            <Route path="/category/all" element={<MainLayout><AllCategories /></MainLayout>} />
            <Route path="/category/:slug" element={<MainLayout><SingleCategory /></MainLayout>} />
            <Route path="/category/:parentSlug/:subSlug" element={<MainLayout><div className="p-20 text-center text-xl text-gray-400">Product Grid Coming Soon...</div></MainLayout>} />
            <Route path="/all-items" element={<MainLayout><BrowseCollection /></MainLayout>} />
            <Route path="/photos" element={<StockPhotos />} />
            <Route path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
            <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />

            {/* --- NEW: BECOME A SELLER PAGE --- */}
            <Route path="/become-seller" element={<BecomeSeller />} />

            {/* --- DASHBOARD ROUTES --- */}
            <Route path="/admin" element={<DashboardLayout role="admin" />}>
              <Route path="dashboard" element={<AdminOverview />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="sellers" element={<AdminSellers />} /> {/* <--- NEW ADMIN PAGE */}

              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id" element={<AdminProductReview />} />
            </Route>

            {/* --- PROTECTED SELLER ROUTES --- */}
            <Route path="/seller" element={
              // Wrap in SellerRoute to block unapproved users
              <SellerRoute>
                <DashboardLayout role="seller" />
              </SellerRoute>
            }>
              <Route path="dashboard" element={<SellerOverview />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="products/add" element={<AddProduct />} />

              <Route path="earnings" element={<SellerEarnings />} />
              <Route path="guidelines" element={<SellerGuidelines />} />
              <Route path="profile" element={<SellerProfile />} />
            </Route>

            {/* --- AUTH ROUTES --- */}
            <Route path="/login" element={<AuthWrapper />} />
            <Route path="/register" element={<AuthWrapper />} />

          </Routes>
        </Router>
      </CartProvider>
    </Authenticator.Provider>
  );
}

export default App;