import React, { useState, useEffect } from "react";
import api from "../../store/api";
import { endPoints } from "../../constants/api";

const BookNowModal = ({ isOpen, onClose, onSuccess, selectedDates, vendorData, listingData, vendorId, listingId, editMode = false, item = null, onSaveEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // Format date to readable string
  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    return dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const [selectedDatesState, setSelectedDatesState] = useState([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [location, setLocation] = useState("");
  const [instructions, setInstructions] = useState("");
  const [hasSecurityProtection, setHasSecurityProtection] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [guestCount, setGuestCount] = useState(50);
  const [eventType, setEventType] = useState("Event");
  const [contactPreference, setContactPreference] = useState("email");

  // Initialize form data when modal opens or item changes
  useEffect(() => {
    if (!isOpen) return;

    if (editMode && item?.tempDetails) {
      const tempDetails = item.tempDetails;
      console.log('Loading edit mode with tempDetails:', tempDetails);

      // Set location
      setLocation(tempDetails.eventLocation && tempDetails.eventLocation !== 'To be specified' ? tempDetails.eventLocation : '');

      // Set times (handle both 12-hour and 24-hour formats)
      const convertTo24Hour = (timeStr) => {
        if (!timeStr) return '09:00';
        if (timeStr.includes('AM') || timeStr.includes('PM')) {
          const [time, period] = timeStr.split(' ');
          let [hours, minutes] = time.split(':');
          hours = parseInt(hours);
          if (period === 'PM' && hours !== 12) hours += 12;
          if (period === 'AM' && hours === 12) hours = 0;
          return `${hours.toString().padStart(2, '0')}:${minutes}`;
        }
        return timeStr;
      };

      setStartTime(convertTo24Hour(tempDetails.eventTime));
      setEndTime(convertTo24Hour(tempDetails.endTime));

      // Set other details
      setInstructions(tempDetails.specialRequests || '');
      setGuestCount(tempDetails.guestCount || 50);
      setEventType(tempDetails.eventType || 'Event');
      setContactPreference(tempDetails.contactPreference || 'email');

      // Handle dates
      const dates = [];
      if (tempDetails.eventDate && tempDetails.eventDate !== 'To be specified') {
        try {
          dates.push(new Date(tempDetails.eventDate));
        } catch (e) {
          console.warn('Invalid event date:', tempDetails.eventDate);
        }
      }
      if (tempDetails.endDate && tempDetails.endDate !== tempDetails.eventDate) {
        try {
          dates.push(new Date(tempDetails.endDate));
        } catch (e) {
          console.warn('Invalid end date:', tempDetails.endDate);
        }
      }
      setSelectedDatesState(dates);
    } else if (!editMode && selectedDates) {
      setSelectedDatesState(selectedDates);
      // Reset form for new booking
      setLocation('');
      setStartTime('09:00');
      setEndTime('17:00');
      setInstructions('');
      setGuestCount(50);
      setEventType('Event');
      setContactPreference('email');
    }
  }, [editMode, item, selectedDates, isOpen]);

  // Helper for toggling dates in edit mode
  const handleEditDateToggle = (dateObj) => {
    const exists = selectedDatesState.some(
      d => d.getDate() === dateObj.getDate() && d.getMonth() === dateObj.getMonth() && d.getFullYear() === dateObj.getFullYear()
    );
    if (exists) {
      setSelectedDatesState(selectedDatesState.filter(
        d => !(d.getDate() === dateObj.getDate() && d.getMonth() === dateObj.getMonth() && d.getFullYear() === dateObj.getFullYear())
      ));
    } else {
      setSelectedDatesState([...selectedDatesState, dateObj]);
    }
  };

  if (!isOpen) return null;

  // Calculate pricing based on listing data and selected dates
  const calculatePricing = () => {
    if (!listingData?.pricing || selectedDatesState.length === 0) {
      return {
        duration: 0,
        days: 0,
        hourlyRate: 0,
        dailyRate: 0,
        eventRate: 0,
        subtotal: 0,
        securityFee: 0,
        systemFee: 0,
        total: 0
      };
    }

    const sortedDates = [...selectedDatesState].sort((a, b) => a - b);
    const startDateObj = sortedDates[0];
    const endDateObj = sortedDates[sortedDates.length - 1];
    const diffTime = Math.abs(endDateObj - startDateObj);
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);
    const isMultiDay = days > 1;

    // Calculate hours per day
    const calculateHours = (startTime, endTime) => {
      const start = new Date(`2000-01-01 ${startTime}`);
      const end = new Date(`2000-01-01 ${endTime}`);
      let diffHours = (end - start) / (1000 * 60 * 60);
      if (diffHours < 0) diffHours += 24; // Handle overnight
      return Math.max(diffHours, 1);
    };

    const dailyHours = calculateHours(
      startTime.includes(':') ? startTime : '09:00',
      endTime.includes(':') ? endTime : '17:00'
    );
    const totalHours = dailyHours * days;

    const pricing = listingData.pricing;
    let subtotal = 0;
    let hourlyRate = 0;
    let dailyRate = 0;
    let eventRate = 0;

    // Calculate based on pricing type
    if (pricing.type === 'daily' && pricing.perDay) {
      dailyRate = pricing.perDay;
      subtotal = pricing.perDay * days;
    } else if (pricing.type === 'hourly' && pricing.perHour) {
      hourlyRate = pricing.perHour;
      subtotal = pricing.perHour * totalHours;
    } else if (pricing.type === 'per_event' && pricing.perEvent) {
      eventRate = pricing.perEvent;
      subtotal = pricing.perEvent * (isMultiDay ? days : 1);
    }

    // Apply multi-day discounts if applicable
    if (isMultiDay && pricing.multiDayDiscount?.enabled) {
      const discountPercent = pricing.multiDayDiscount.percent || 0;
      const minDays = pricing.multiDayDiscount.minDays || 2;

      if (days >= minDays) {
        const discount = (subtotal * discountPercent) / 100;
        subtotal = subtotal - discount;
      }
    }

    const securityFee = pricing.securityFee || 0;
    const systemFee = subtotal * 0.02; // 2% system fee
    const total = subtotal + securityFee + systemFee;

    return {
      duration: dailyHours,
      days,
      hourlyRate,
      dailyRate,
      eventRate,
      subtotal,
      securityFee,
      systemFee,
      total,
      isMultiDay,
      currency: pricing.currency || 'EUR'
    };
  };

  const pricingInfo = calculatePricing();

  // Mock calculation for km
  const calculatedKm = location ? 12 : 0;

  const handleAddToCart = async () => {
    if (!listingId || selectedDatesState.length === 0 || !location.trim()) {
      alert('Please fill in all required fields (dates, location)');
      return;
    }

    setIsAddingToCart(true);
    try {
      // Prepare temporary details for cart
      const sortedDates = [...selectedDatesState].sort((a, b) => a - b);
      const startDate = sortedDates[0].toISOString().split('T')[0];
      const endDate = sortedDates[sortedDates.length - 1].toISOString().split('T')[0];

      // Convert time format
      const convertTimeFormat = (timeStr) => {
        if (timeStr.includes('AM') || timeStr.includes('PM')) {
          const [time, period] = timeStr.split(' ');
          let [hours, minutes] = time.split(':');
          hours = parseInt(hours);

          if (period === 'PM' && hours !== 12) {
            hours += 12;
          } else if (period === 'AM' && hours === 12) {
            hours = 0;
          }

          return `${hours.toString().padStart(2, '0')}:${minutes}`;
        }
        return timeStr;
      };

      const tempDetails = {
        startDate,
        endDate: sortedDates.length > 1 ? endDate : null,
        eventTime: convertTimeFormat(startTime),
        endTime: convertTimeFormat(endTime),
        eventLocation: location.trim(),
        specialRequests: instructions.trim() || null,
        contactPreference: 'email'
      };

      // Add to cart
      const response = await api.post(endPoints.cart.add, {
        listingId,
        tempDetails
      });

      console.log('Added to cart successfully:', response.data);
      alert('Item added to cart successfully!');
      onClose();

    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add to cart';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleSendBookingRequest = async () => {
    if (!vendorId || !listingId || selectedDatesState.length === 0 || !location.trim()) {
      console.error('Missing required booking information');
      return;
    }

    setIsLoading(true);
    try {
      // Prepare booking request data
      const sortedDates = [...selectedDatesState].sort((a, b) => a - b);
      const startDate = sortedDates[0];
      const endDate = sortedDates[sortedDates.length - 1];

      // Convert time format from "HH:MM AM/PM" to "HH:MM"
      const convertTimeFormat = (timeStr) => {
        if (timeStr.includes('AM') || timeStr.includes('PM')) {
          const [time, period] = timeStr.split(' ');
          let [hours, minutes] = time.split(':');
          hours = parseInt(hours);

          if (period === 'PM' && hours !== 12) {
            hours += 12;
          } else if (period === 'AM' && hours === 12) {
            hours = 0;
          }

          return `${hours.toString().padStart(2, '0')}:${minutes}`;
        }
        return timeStr; // Already in 24-hour format
      };

      const bookingData = {
        listingId,
        vendorId,
        details: {
          startDate: startDate.toISOString().split('T')[0], // YYYY-MM-DD format
          endDate: endDate.toISOString().split('T')[0],
          startTime: convertTimeFormat(startTime),
          endTime: convertTimeFormat(endTime),
          eventLocation: location.trim(),
          specialRequests: instructions.trim() || null,
          contactPreference: 'email'
        }
      };

      console.log('Sending booking request:', bookingData);

      // Send booking request to backend
      const response = await api.post('/booking/request', bookingData);

      console.log('Booking request successful:', response.data);
      setBookingResult(response.data.data?.bookingRequest || response.data);

      // Call success callback
      onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error('Booking request failed:', error);

      // Handle error display
      const errorMessage = error.response?.data?.message || error.message || 'Booking request failed';
      alert(`Booking failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
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
          {/* Date and Time Selection */}
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
                  const isSelected = selectedDatesState.some(
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

              {/* Time Selection for Edit Mode */}
              {/* <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border-gray-200 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border-gray-200 rounded-lg bg-gray-100 text-gray-700"
                  />
                </div>
              </div> */}
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

            {pricingInfo.days > 1 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration: {pricingInfo.days} days</span>
                <span className="text-gray-900 font-medium">{pricingInfo.currency} {pricingInfo.dailyRate}/day</span>
              </div>
            )}

            {pricingInfo.days === 1 && pricingInfo.duration > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration: {pricingInfo.duration.toFixed(1)} hours</span>
                <span className="text-gray-900 font-medium">{pricingInfo.currency} {pricingInfo.hourlyRate}/hr</span>
              </div>
            )}

            {pricingInfo.eventRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Event Rate:</span>
                <span className="text-gray-900 font-medium">{pricingInfo.currency} {pricingInfo.eventRate}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900 font-medium">{pricingInfo.currency} {pricingInfo.subtotal.toFixed(2)}</span>
            </div>

            {/* System Fee */}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">System Fee (2%):</span>
              <span className="text-gray-900 font-medium">{pricingInfo.currency} {pricingInfo.systemFee.toFixed(2)}</span>
            </div>

            {pricingInfo.securityFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Security Fee:</span>
                <span className="text-gray-900 font-medium">{pricingInfo.currency} {pricingInfo.securityFee.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t border-gray-200/50 pt-3">
              <div className="flex justify-between text-xl font-bold">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">{pricingInfo.currency} {pricingInfo.total.toFixed(2)}</span>
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
                onClick={() => {
                  if (!onSaveEdit) return;

                  // Sort dates chronologically
                  const sortedDates = [...selectedDatesState].sort((a, b) => a.getTime() - b.getTime());

                  // Always set startDate and endDate in tempDetails for edit mode
                  const startDate =
                    sortedDates.length > 0
                      ? sortedDates[0].toISOString().split('T')[0]
                      : undefined;
                  const endDate =
                    sortedDates.length > 1
                      ? sortedDates[sortedDates.length - 1].toISOString().split('T')[0]
                      : sortedDates.length === 1
                        ? sortedDates[0].toISOString().split('T')[0]
                        : undefined;
                  // Only include endDate if multi-day
                  const saveData = {
                    startDate,
                    endDate,
                    eventTime: startTime,
                    endTime: endTime,
                    eventLocation: location && location.trim() ? location.trim() : undefined,
                    specialRequests: instructions && instructions.trim() ? instructions.trim() : undefined,
                    guestCount: guestCount,
                    eventType: eventType,
                    contactPreference: contactPreference
                  };

                  if (sortedDates.length > 1) {
                    saveData.endDate = sortedDates[sortedDates.length - 1].toISOString().split('T')[0];
                  }

                  // Validation: startDate, endDate, and location required
                  if (!startDate || !endDate || !saveData.eventLocation) {
                    alert("Start date, end date, and location are required.");
                    return;
                  }
                  console.log('Saving edit data:', saveData);
                  onSaveEdit(saveData);
                }}
                className="flex-1 py-2 px-3 bg-gradient-brand text-white rounded-2xl font-semibold hover:shadow-lg transition-all text-nowrap text-sm md:text-md"
                disabled={!selectedDatesState.length || !location.trim()}
              >
                Save
              </button>
            ) : (
              <>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2 px-3 border-2 border-pink-500 text-pink-500 rounded-2xl font-semibold hover:bg-pink-50 transition-all backdrop-blur-sm text-nowrap text-sm md:text-md disabled:opacity-50"
                  disabled={!acceptedTerms || !location.trim() || isAddingToCart || selectedDatesState.length === 0}
                >
                  {isAddingToCart ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </div>
                  ) : (
                    'Add To Cart'
                  )}
                </button>
                <button
                  onClick={handleSendBookingRequest}
                  className="flex-1 py-2 px-3 bg-gradient-brand text-white rounded-2xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 backdrop-blur-sm text-nowrap text-sm md:text-md"
                  disabled={!acceptedTerms || !location.trim() || isLoading || selectedDatesState.length === 0}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Booking Request'
                  )}
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
