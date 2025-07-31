import React from "react";

const DownloadInvoiceModal = ({ open, onClose, bookingId = "BK001234", items = [], summary = {}, onDownload }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg"
          onClick={onClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6">Pricing Breakdown – {bookingId}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left mb-6">
            <thead>
              <tr className="bg-pink-50">
                <th className="px-4 py-3 font-semibold text-sm text-left">Item</th>
                <th className="px-4 py-3 font-semibold text-sm text-center">Hours</th>
                <th className="px-4 py-3 font-semibold text-sm text-center">Days</th>
                <th className="px-4 py-3 font-semibold text-sm text-center">SecurityPrice</th>
                <th className="px-4 py-3 font-semibold text-sm text-center">Kilometer</th>
                <th className="px-4 py-3 font-semibold text-sm text-center">BookingPrice</th>
              </tr>
            </thead>
            <tbody>
              {(items.length ? items : [
                { item: "Professional Camera", hours: 48, days: 2, security: "$300", km: "$5", price: "$800" },
                { item: "Professional Camera", hours: 48, days: 2, security: "$300", km: "$5", price: "$800" },
                
              ]).map((row, idx) => (
                <tr key={idx} className="border-b last:border-b-0 ">
                  <td className="px-4 py-3 text-xs text-left">{row.item}</td>
                  <td className="px-4 py-3 text-xs text-center">{row.hours}</td>
                  <td className="px-4 py-3 text-xs text-center">{row.days}</td>
                  <td className="px-4 py-3 text-xs text-center">{row.security}</td>
                  <td className="px-4 py-3 text-xs text-center">{row.km}</td>
                  <td className="px-4 py-3 text-xs text-center">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl p-4 mb-6 border-t border-b">
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Booking Price:</span>
            <span className="font-semibold">{summary.bookingPrice || "$1200"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Security Price:</span>
            <span className="font-semibold">{summary.securityPrice || "$300"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-gray-600">Kilometer:</span>
            <span className="font-semibold">{summary.kilometer || "5 Km"}</span>
          </div>
          <div className="flex justify-between py-2 mt-2 border-t">
            <span className="font-bold text-lg">Total Price:</span>
            <span className="font-bold text-lg">{summary.totalPrice || "$1500"}</span>
          </div>
        </div>
        <button
          className="w-full py-3 rounded-2xl btn-primary-mobile text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          onClick={onDownload}
        >
          <img src="/assets/Downlaod.svg" alt="Download" className="w-5 h-5" />
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default DownloadInvoiceModal; 