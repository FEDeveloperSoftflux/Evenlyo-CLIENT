import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AdvancedBookingSystem from "../components/AdvancedBookingSystem";
import RentalTabs from "../components/RentalTabs";
import Categories from '../components/Categories';
import VendorList from "../components/VendorList";
import MultiVendor from "../components/MultiVendor";
import FrontendUserDashboard from "../components/FrontendUserDashboard";
import HaveQuestions from "../components/HaveQuestions";
import MapProviders from "../components/MapProviders";
import Ratings from "../components/Ratings";
import CustomerShowcase from "../components/CustomerShowcase";
import SuccessStories from "../components/SuccessStories";
import Footer from "../components/Footer";
import HelpBot from "../components/HelpBot";

function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [vendors, setVendors] = useState([]);
  const [vendorsLoading, setVendorsLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Categories 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setVendors={setVendors}
        setVendorsLoading={setVendorsLoading}
      />
      <VendorList 
        selectedCategory={selectedCategory}
        vendors={vendors}
        loading={vendorsLoading}
      />
      <AdvancedBookingSystem />
      <RentalTabs />
      <MultiVendor />
      <FrontendUserDashboard />
      <HaveQuestions />
      <MapProviders />
      <Ratings />
      <CustomerShowcase />
      <SuccessStories />
      <Footer />
      <HelpBot />
    </div>
  );
}

export default LandingPage;
