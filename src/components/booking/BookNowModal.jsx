import React, { useState, useEffect } from "react";

const BookNowModal = ({ isOpen, onClose, onSuccess, selectedDates, editMode = false, item = null, onSaveEdit }) => {
  // Format date to readable string
  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const [selectedDatesState, setSelectedDatesState] = useState(selectedDates || []);
  const [isMultipleDay, setIsMultipleDay] = useState(false);
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [location, setLocation] = useState("");
  const [instructions, setInstructions] = useState("");
  const [hasSecurityProtection, setHasSecurityProtection] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [startDate, setStartDate] = useState("2025-07-11");
  const [endDate, setEndDate] = useState("2025-07-12");

  // Add state for editable dates if in edit mode
  const [editSelectedDates, setEditSelectedDates] = useState(item && item.dates ? item.dates : []);
  // State for time selection in edit mode
  const [editStartTime, setEditStartTime] = useState(item && item.startTime ? item.startTime : "09:00");
  const [editEndTime, setEditEndTime] = useState(item && item.endTime ? item.endTime : "17:00");

  // Validation for enabling Save button in edit mode
  const isSaveEnabled = editMode && editSelectedDates.length > 0 && (editSelectedDates.length > 1 || (editStartTime && editEndTime));

  useEffect(() => {
    if (selectedDates) {
      setSelectedDatesState(selectedDates);
    }
    if (editMode && item && item.dates) {
      setEditSelectedDates(item.dates);
      setEditStartTime(item.startTime || "09:00");
      setEditEndTime(item.endTime || "17:00");
    }
  }, [selectedDates, editMode, item]);

  // Helper for toggling dates in edit mode
  const handleEditDateToggle = (dateObj) => {
    const exists = editSelectedDates.some(
      d => d.getDate() === dateObj.getDate() && d.getMonth() === dateObj.getMonth() && d.getFullYear() === dateObj.getFullYear()
    );
    if (exists) {
      setEditSelectedDates(editSelectedDates.filter(
        d => !(d.getDate() === dateObj.getDate() && d.getMonth() === dateObj.getMonth() && d.getFullYear() === dateObj.getFullYear())
      ));
    } else {
      setEditSelectedDates([...editSelectedDates, dateObj]);
    }
  };

  if (!isOpen) return null;

  const duration = 8; // hours
  const hourlyRate = 108;
  const subtotal = duration * hourlyRate;
  const securityFee = 25;
  const kilometerFee = 25;
  const total =
    subtotal + (hasSecurityProtection ? securityFee : 0) + kilometerFee;

  // Mock calculation for km
  const calculatedKm = location ? 12 : 0;

  const handleAddToCart = () => {
    console.log("Added to cart");
    onClose(); // Close the modal
  };

  const handleSendBookingRequest = () => {
    // Send booking request logic here
    console.log("Booking request sent");
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white backdrop-blur-md rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20 mx-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <h2 className="text-xl font-bold text-gray-900">
            Order Mapping - TRK001
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gradient-brand text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* If in edit mode, show date picker for multiple dates */}
          {editMode ? (
            <div>
              <div className="text-xs text-gray-500 font-medium mb-1">Select Dates</div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                  <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
                ))}
              </div>
              {/* Simple calendar for current month */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                  const dateObj = new Date(2025, 2, day); // March 2025 for demo
                  const isSelected = editSelectedDates.some(
                    d => d.getDate() === dateObj.getDate() && d.getMonth() === dateObj.getMonth() && d.getFullYear() === dateObj.getFullYear()
                  );
                  return (
                    <div
                      key={day}
                      className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${isSelected ? 'bg-gradient-brand text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => handleEditDateToggle(dateObj)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              {/* If only one date is selected, show time selection */}
              {editSelectedDates.length === 1 && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={editStartTime}
                      onChange={e => setEditStartTime(e.target.value)}
                      className="w-full px-3 py-2 border-gray-200 rounded-lg bg-gray-100 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={editEndTime}
                      onChange={e => setEditEndTime(e.target.value)}
                      className="w-full px-3 py-2 border-gray-200 rounded-lg bg-gray-100 text-gray-700"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ... existing code for selected date(s) display ...
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-5 py-4 mb-2">
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Selected Date{selectedDatesState.length > 1 ? 's' : ''} & Time</div>
                <div className="text-base text-gray-700 font-semibold">
                  {selectedDatesState.length === 0 ? (
                    'No date selected'
                  ) : selectedDatesState.length === 1 ? (
                    formatDate(selectedDatesState[0])
                  ) : (() => {
                    const sorted = [...selectedDatesState].sort((a, b) => a - b);
                    let isContinuous = true;
                    for (let i = 1; i < sorted.length; i++) {
                      const prev = sorted[i - 1];
                      const curr = sorted[i];
                      const diff = (curr - prev) / (1000 * 60 * 60 * 24);
                      if (diff !== 1) {
                        isContinuous = false;
                        break;
                      }
                    }
                    if (isContinuous) {
                      return (
                        <span>
                          {formatDate(sorted[0])} – {formatDate(sorted[sorted.length - 1])}
                        </span>
                      );
                    } else {
                      return (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {sorted.map((dateObj, idx) => (
                            <span
                              key={dateObj.toISOString() + idx}
                              className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-pink-200"
                            >
                              {formatDate(dateObj)}
                            </span>
                          ))}
                        </div>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          )}


          {/* Time Selection */}
          {selectedDatesState.length === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border-gray-200 rounded-lg bg-gray-100 text-gray-700 cursor"
                    placeholder="09:00"
                  />
                  <div className="absolute right-3 top-2.5">

                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700 cursor"
                    placeholder="17:00"
                  />
                  <div className="absolute right-3 top-2.5">
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Location & Calculated km */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700  "
                  placeholder="Add Location"
                />
                <div className="absolute right-3 top-2.5">

                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculated km
              </label>
              <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700 flex items-center h-10">
                {calculatedKm} km
              </div>
            </div>
          </div>

          {/* Add Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-700 h-20 resize-none"
              placeholder="Any special requirements or setup instructions..."
            />
          </div>

          {/* Security Protection */}
          <div className="flex flex-col select-none">
            <span className="text-gray-700 font-medium">Security Protection (+$25)</span>
            <span className="text-xs text-gray-500 mt-1">Fully refundable to ensure a safe and smooth experience—returned after your event if no issues are reported.</span>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-5 space-y-3 border border-gray-200/30">
            <h4 className="font-semibold text-gray-900 text-base mb-2">Pricing Summary</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration: {duration} hours</span>
              <span className="text-gray-900 font-medium">${hourlyRate}/hr</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            {/* System Fee */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">System Fee (2%):</span>
              <span className="text-gray-900 font-medium">${(subtotal * 0.02).toFixed(2)}</span>
            </div>
            {hasSecurityProtection && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Security Fee:</span>
                <span className="text-gray-900 font-medium">${securityFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Kilometer: 10 km</span>
              <span className="text-gray-900 font-medium">${kilometerFee.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200/50 pt-3">
              <div className="flex justify-between text-xl font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">${(subtotal + (subtotal * 0.02) + (hasSecurityProtection ? securityFee : 0) + kilometerFee).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-center space-x-3 select-none">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="sr-only"
            />
            <span className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${acceptedTerms ? 'border-white bg-gradient-brand' : 'border-gray-300'}`}>
              {acceptedTerms && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            <span className="text-gray-700 text-sm">
              I accept the company's{' '}
              <a href="#" className="text-pink-500 hover:text-pink-600 underline font-medium">terms & conditions</a>
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex flex-row gap-1 mt-2">
            {editMode ? (
              <button
                onClick={() => onSaveEdit && onSaveEdit({ dates: editSelectedDates, startTime: editStartTime, endTime: editEndTime })}
                className="flex-1 py-2 px-3 bg-gradient-brand text-white rounded-2xl font-semibold hover:shadow-lg transition-all text-nowrap text-sm md:text-md"
                disabled={!isSaveEnabled}
              >
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2 px-3 border-2 border-pink-500 text-pink-500 rounded-2xl font-semibold hover:bg-pink-50 transition-all backdrop-blur-sm text-nowrap text-sm md:text-md"
                >
                  Add To Cart
                </button>
                <button
                  onClick={handleSendBookingRequest}
                  className="flex-1 py-2 px-3 bg-gradient-brand text-white rounded-2xl font-semibold hover:shadow-lg transition-all  disabled:opacity-50 backdrop-blur-sm text-nowrap text-sm md:text-md"
                  disabled={!acceptedTerms || !location}
                >
                  Send Booking Request
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNowModal;
