import React, { useState, useRef, useEffect } from "react";

const complaintOptions = [
  "Delayed delivery",
  "Item not as described",
  "Missing item",
  "Poor service quality",
  "Damaged equipment",
  "Billing discrepancy",
  "Other"
];

const ComplaintModal = ({ open, onClose }) => {
  const [selectedType, setSelectedType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto mx-2" >
        <button
          className="absolute top-4 right-4 bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg"
          onClick={onClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6">Order Complaint</h2>
        <div className="mb-4 h-16 bg-pink-50 rounded-xl" />
        <label className="block mb-2 font-medium" >Select or describe your issue </label>
        <div className="relative mb-4" ref={dropdownRef} >
          <div
            className="p-3 rounded-xl bg-gray-100 cursor-pointer"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            {selectedType || <span className="text-gray-400">Select a complaints type</span>}
          </div>
          {dropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10 py-2 px-2">
              {complaintOptions.map((option) => (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer rounded-xl transition-all
                    ${selectedType === option ? "bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white mx-1" : "text-gray-700 hover:bg-gray-50 hover:text-black"}
                  `}
                  onClick={() => {
                    setSelectedType(option);
                    setDropdownOpen(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <label className="block mb-2 font-medium">Additional Details</label>
        <textarea className="w-full mb-6 p-3 rounded-xl bg-gray-100" rows={4} placeholder="Details" />
        <button className="w-full py-2 rounded-xl btn-primary-mobile text-white font-bold text-lg shadow-lg">
          Submit Complaint
        </button>
      </div>
    </div>
  );
};

export default ComplaintModal; 