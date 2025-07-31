import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddToCart from "../components/booking/AddToCart";
import ResponsiveHeader from "../components/Header";
import Footer from "../components/Footer";

const AddToCartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <ResponsiveHeader />
      <main className="flex-grow">
        <AddToCart />
      </main>
      <Footer />
    </div>
  );
};

export default AddToCartPage;
