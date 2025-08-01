import React from 'react'
import DashboardIcon from '../assets/icons/dashbaordicon.svg';
import NiftyIcon from '../assets/icons/niftyicon.svg';
import DashboardImg from '../assets/images/dashboardoverview.png';
import NiftyImg from '../assets/images/niftsgraphsoverview.png';
const FrontendUserDashboard = () => {
  return (
    <section className="py-16 px-6 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Text and Buttons Aligned Top */}
          <div className="flex flex-col justify-start space-y-2">
          <div>
              <p className="text-sm rounded-lg font-medium text-yellow-800 mb-2 tracking-wide inline-block uppercase bg-yellow-100 px-3 py-1">
              Superior UX
              </p>
              <h2 className="text-[25px] lg:text-5xl font-bold text-gray-900 leading-tight">
                Front-End User Dashboard
              </h2>
              <p className="text-sm xs:text-base text-gray-600 leading-normal mb-4 mt-4">
              Our user-friendly front-end dashboard allows{" "}
              <span className="font-bold text-gray-900">
              seamless management
              </span>{" "}
              of listings, bookings, packages, profile details, and private messages,
              <span className="font-bold text-gray-900">
              all in one place.
              </span>
                
               
            </p>
            </div>
            
            {/* Action Button */}
            <div>
              <button className="btn-primary-mobile  text-white font-bold px-3 py-3 rounded-xl shadow-lg transition-all duration-300">
                Watch Video Tour ➜
              </button>
            </div>
          </div>

          {/* Right Side - Simple Scroller with Placeholder */}
          <div className="relative">
            {/* Dashboard Screenshot + Overview Section (Combined) */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
              <img src={DashboardImg} alt="Dashboard Overview" className=" object-cover" />
              {/* Dashboard Overview Section */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={DashboardIcon} alt="Dashboard Icon" className="w-6 h-6 mr-2" />
                  <h4 className="text-sm font-semibold text-gray-900">Dashboard Overview</h4>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                The main dashboard page provides a comprehensive overview of key activities and performance metrics:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Bookings</p></div>
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Guest Messages</p></div>
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Wallet</p></div>
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Store Settings</p></div>
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Bookmarks</p></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Coupons Created</p></div>
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Ads Manager</p></div>
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Statistics</p></div>
                    <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 10.5L9 14.5L15 7.5" stroke="#F91942" strokeWidth="3.0" strokeLinecap="round" strokeLinejoin="round"/></svg><p className="m-0">Reviews</p></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nifty Graphs Section + Overview (Combined) */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
              <img src={NiftyImg} alt="Nifty Graphs Overview" className="object-cover" />
              {/* Nifty Graphs Overview Section */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={NiftyIcon} alt="Nifty Icon" className="w-6 h-6 mr-2" />
                  <h4 className="text-sm font-semibold text-gray-900">Nifty Graphs and Data</h4>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                Statistics 📈 page includes a bunch of nifty graphs and data to show your customers how many visits their listings get.
                </p>
                <p className="text-xs">
                Calendar view, unique to our theme, provides you with the ability to digest a <span className='font-bold'>breakdown of all
                bookings</span>  across the month.saved statistics
                </p>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FrontendUserDashboard
