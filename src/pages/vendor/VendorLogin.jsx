import React, { useState } from "react";
import heroImage from '../../assets/images/hero-img.png'; 
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VendorRegister from "../../auth/VendorRegister";
import VendorForgotPasswordModal from "../../vendor-auth/VendorForgotPasswordModal";

export default function VendorLogin() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [vendorModalOpen, setVendorModalOpen] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = (event) => {
        event.preventDefault();
        // Dummy success for redirect
        window.location.href = "/vendor/dashboard";
    };

    const handleBecomeVendor = () => {
        setVendorModalOpen(true);
    };

    const closeVendorModal = () => {
        setVendorModalOpen(false);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setShowForgotPasswordModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <section
                className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center bg-gray-900"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left Side - Hero Content */}
                        <div className="lg:col-span-7 text-white">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Welcome to
                                <br />
                                <span className="text-white">Vendor Portal</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                                Join our platform and showcase your services to thousands of customers.
                                <br />
                                Ready to grow your business?
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={handleBecomeVendor} className="btn-primary-mobile text-white font-semibold px-8 py-3 rounded-2xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center justify-center text-center">
                                    Become a Vendor
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Login Form */}
                        <div className="lg:col-span-5 relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-8 transform lg:translate-y-16 lg:mb-16">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Vendor Login</h2>
                                    <p className="text-gray-600">Welcome to Vendor Management</p>
                                </div>

                                <form onSubmit={handleLogin} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-300"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center justify-end">
                                        <button onClick={handleForgotPassword} className="text-sm text-pink-500 hover:text-pink-600 font-medium bg-transparent border-none cursor-pointer">Forgot Password?</button>
                                    </div>

                                    {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
                                    
                                    <button
                                        type="submit"
                                        className="w-full btn-primary-mobile text-white font-semibold py-3 rounded-2xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                                    >
                                        Login
                                    </button>
                                </form>

                                {/* Social Login */}
                                <div className="mt-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">or continue with</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5 text-blue-500 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                            </svg>
                                            Google
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full inline-flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-300"
                                        >
                                            <svg className="w-5 h-5 text-blue-600 mr-2" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                                />
                                            </svg>
                                            LinkedIn
                                        </button>
                                    </div>
                                </div>

                                {/* Register Link */}
                                <div className="text-center mt-6">
                                    <p className="text-sm text-gray-600">
                                        Don't have an account? 
                                        <button onClick={handleBecomeVendor} className="text-pink-500 hover:text-pink-600 font-medium ml-1 underline bg-transparent border-none cursor-pointer">Register as Vendor</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Vendor Registration Modal */}
            {vendorModalOpen && (
                <VendorRegister
                    onClose={closeVendorModal}
                    onSwitchToClient={closeVendorModal}
                />
            )}

            {/* Vendor Forgot Password Modal */}
            <VendorForgotPasswordModal 
                isOpen={showForgotPasswordModal} 
                onClose={() => setShowForgotPasswordModal(false)} 
            />
        </div>
    );
}
