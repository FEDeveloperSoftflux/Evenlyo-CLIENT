import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AdvancedBookingSystem from "../components/AdvancedBookingSystem";
import RentalTabs from "../components/RentalTabs";
import Categories from "../components/Categories";
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
  const [selectedCategory, setSelectedCategory] = useState("Entertainment & Attractions");
  const [hideCategoryText, setHideCategoryText] = useState(false);

  // Handler to hide text when Search Now is clicked
  const handleSearchNow = () => {
    setHideCategoryText(true);
    // Optionally scroll to categories section if not already
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler to reset everything
  const handleReset = () => {
    setHideCategoryText(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Hero onSearchNow={handleSearchNow} onReset={handleReset} />
      <div id="categories">
        <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} hideText={hideCategoryText} />
      </div>
      <VendorList selectedCategory={selectedCategory} />
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
