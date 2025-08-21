import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookNowModal from './BookNowModal';
import OrderSummaryModal from './OrderSummaryModal';
import RequestSuccessModal from './RequestSuccessModal';
import TrackOrderModal from '../TrackOrderModal';
import api from '../../store/api';
import { endPoints } from '../../constants/api';

const BookingCalendar = ({ vendorData, listingData, vendorId, listingId }) => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2)); // March 2025
  const [activeTab, setActiveTab] = useState('details');
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [isOrderSummaryModalOpen, setIsOrderSummaryModalOpen] = useState(false);
  const [isRequestSuccessModalOpen, setIsRequestSuccessModalOpen] = useState(false);
  const [isTrackOrderModalOpen, setIsTrackOrderModalOpen] = useState(false);
  const [trackOrderData, setTrackOrderData] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [dragStartDate, setDragStartDate] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCurrentDate, setDragCurrentDate] = useState(null);
  const dragMovedRef = React.useRef(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Vendor details mapping
  const vendorDetails = vendorData?.vendor?.data?.businessDetails || {};
  // Listing details mapping
  const listingDetails = listingData || {};
  const availability = listingDetails.availability || {};
  const availableDays = (availability.availableDays || []).map(d => d.toLowerCase());
  const availableTimeSlots = availability.availableTimeSlots || [];

  // Helper functions
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getWeekdayIndex = (date) => {
    let jsDay = date.getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  };
  const getDateObj = (day) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month, day);
  };
  const isDayOfWeekAvailable = (dateObj) => {
    const dayName = dayNames[getWeekdayIndex(dateObj)].toLowerCase();
    return availableDays.includes(dayName);
  };
  const isAvailable = (day, currentMonthFlag) => {
    if (!currentMonthFlag) return false;
    const dateObj = getDateObj(day);
    return isDayOfWeekAvailable(dateObj);
  };
  const getAvailableTimes = (day) => {
    const dateObj = getDateObj(day);
    return getAvailableTimesForDate(dateObj);
  };

  // Helper for available times in tooltip
  const getAvailableTimesForDate = (dateObj) => {
    const dayName = dayNames[getWeekdayIndex(dateObj)].toLowerCase();
    return availableTimeSlots
      .filter(slot => slot.day?.toLowerCase() === dayName)
      .map(slot => slot.time)
      .flat();
  };

  // Calendar grid
  const generateCalendarData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = getWeekdayIndex(firstDayOfMonth);

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    let calendar = [];
    let week = [];
    for (let i = 0; i < 7; i++) {
      if (i < startDay) {
        week.push({
          day: daysInPrevMonth - (startDay - 1) + i,
          currentMonth: false
        });
      } else {
        week.push({
          day: i - startDay + 1,
          currentMonth: true
        });
      }
    }
    calendar.push(week);

    let dayCounter = 8 - startDay;
    while (dayCounter <= daysInMonth) {
      week = [];
      for (let i = 0; i < 7; i++) {
        if (dayCounter > daysInMonth) {
          week.push({
            day: dayCounter - daysInMonth,
            currentMonth: false
          });
        } else {
          week.push({
            day: dayCounter,
            currentMonth: true
          });
        }
        dayCounter++;
      }
      calendar.push(week);
    }
    return calendar;
  };

  // Date selection logic
  const handleDateSelect = (day) => {
    const dateObj = getDateObj(day);
    const isAlreadySelected = selectedDates.some(
      d => d.getDate() === dateObj.getDate() && d.getMonth() === dateObj.getMonth() && d.getFullYear() === dateObj.getFullYear()
    );
    if (isAlreadySelected) {
      setSelectedDates(selectedDates.filter(
        d => !(d.getDate() === dateObj.getDate() && d.getMonth() === dateObj.getMonth() && d.getFullYear() === dateObj.getFullYear())
      ));
    } else {
      setSelectedDates([...selectedDates, dateObj]);
    }
  };

  // Drag selection helpers
  const getDatesInRange = (start, end) => {
    if (!start || !end) return [];
    const startDay = start.getDate();
    const endDay = end.getDate();
    const [from, to] = startDay <= endDay ? [startDay, endDay] : [endDay, startDay];
    let range = [];
    for (let d = from; d <= to; d++) {
      range.push(getDateObj(d));
    }
    return range;
  };

  const handleDateMouseDown = (day, isAvailableDay, isBookedDay) => {
    if (!isAvailableDay || isBookedDay) return;
    setDragStartDate(getDateObj(day));
    setDragCurrentDate(getDateObj(day));
    setIsDragging(true);
    dragMovedRef.current = false;
  };

  const handleDateMouseEnter = (day, isAvailableDay, isBookedDay) => {
    if (!isDragging || !isAvailableDay || isBookedDay) return;
    setDragCurrentDate(getDateObj(day));
    dragMovedRef.current = true;
  };

  const handleDateMouseUp = () => {
    if (isDragging && dragStartDate && dragCurrentDate && dragMovedRef.current) {
      const range = getDatesInRange(dragStartDate, dragCurrentDate);
      setSelectedDates(prev => {
        const prevTimestamps = prev.map(d => d.getTime());
        const newDates = range.filter(d => !prevTimestamps.includes(d.getTime()));
        return [...prev, ...newDates];
      });
    }
    setIsDragging(false);
    setDragStartDate(null);
    setDragCurrentDate(null);
    dragMovedRef.current = false;
  };

  // Single-date toggle on click
  const handleDateClick = (day, isAvailableDay, isBookedDay) => {
    if (!isAvailableDay || isBookedDay) return;
    handleDateSelect(day);
  };

  // Month navigation
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  // Mouse up outside calendar
  useEffect(() => {
    if (!isDragging) return;
    const handleMouseUpGlobal = () => handleDateMouseUp();
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging, dragStartDate, dragCurrentDate]);

  // Add to Cart button logic
  const handleAddToCart = async () => {
    if (!listingId) {
      alert('Missing listing ID');
      return;
    }
    setIsAddingToCart(true);
    try {
      // Prepare selected dates (as ISO strings)
      const sortedDates = [...selectedDates].sort((a, b) => a - b);
      const startDate = sortedDates[0] ? sortedDates[0].toISOString().split('T')[0] : null;
      const endDate = sortedDates.length > 1 ? sortedDates[sortedDates.length - 1].toISOString().split('T')[0] : null;
      const tempDetails = {
        startDate,
        endDate,
        // You can add more fields here if needed
      };
      await api.post(endPoints.cart.add, {
        listingId,
        tempDetails
      });
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 1500);
    } catch (error) {
      alert('Failed to add to cart.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold text-gray-900">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day, i) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                <span className="md:hidden">{dayShortNames[i]}</span>
                <span className="hidden md:inline">{day}</span>
              </div>
            ))}
          </div>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarData().map((week, weekIndex) =>
              week.map((cell, dayIndex) => {
                const isCurrentMonthDay = cell.currentMonth;
                const isAvailableDay = isAvailable(cell.day, cell.currentMonth);
                const isBookedDay = false; // No booking logic provided
                const isSelected =
                  isCurrentMonthDay &&
                  selectedDates.some(
                    d => d.getDate() === cell.day && d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()
                  );
                let isInDragRange = false;
                if (
                  isDragging &&
                  dragStartDate &&
                  dragCurrentDate &&
                  isCurrentMonthDay &&
                  isAvailableDay &&
                  !isBookedDay
                ) {
                  const range = getDatesInRange(dragStartDate, dragCurrentDate);
                  isInDragRange = range.some(
                    d => d.getDate() === cell.day && d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()
                  );
                }
                return (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-10 h-10 md:h-12 md:w-14 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200
                      ${isCurrentMonthDay
                        ? isBookedDay
                          ? 'bg-gray-300 text-gray-400 cursor-not-allowed relative'
                          : isAvailableDay
                            ? `${isSelected || isInDragRange ? 'bg-gradient-brand text-white ' : 'bg-white text-gray-700 hover:bg-gray-200 cursor-pointer'}`
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'text-gray-300'}`}
                    onClick={e => handleDateClick(cell.day, isAvailableDay, isBookedDay)}
                    onMouseDown={e => handleDateMouseDown(cell.day, isAvailableDay, isBookedDay)}
                    onMouseEnter={e => handleDateMouseEnter(cell.day, isAvailableDay, isBookedDay)}
                    onMouseUp={handleDateMouseUp}
                    style={{ userSelect: 'none', position: 'relative' }}
                    onMouseLeave={() => setHoveredDate(null)}
                    onMouseOver={() => isAvailableDay && setHoveredDate({ day: cell.day, week: weekIndex, dayIdx: dayIndex })}
                  >
                    {cell.day}
                    {/* Tooltip for available times */}
                    {hoveredDate && hoveredDate.day === cell.day && hoveredDate.week === weekIndex && hoveredDate.dayIdx === dayIndex && isAvailableDay && !isBookedDay && (
                      <div className="absolute z-50 left-1/2 -translate-x-1/2 top-12 bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 text-xs text-gray-700 whitespace-nowrap min-w-[120px]">
                        <div className="font-semibold mb-1 text-pink-600">Available Times</div>
                        {getAvailableTimesForDate(getDateObj(cell.day)).length > 0 ? (
                          getAvailableTimesForDate(getDateObj(cell.day)).map((time, idx) => (
                            <div key={time + idx}>{time}</div>
                          ))
                        ) : (
                          <div>No slots</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Details Content Section */}
        <div className="space-y-6">
          {/* Vendor Info */}
          <div className="flex items-center space-x-3">
            <img
              src={vendorDetails.profileImage || vendorDetails.bannerImage || "/assets/jaydeep.png"}
              alt={vendorDetails.businessName || "Vendor"}
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
            />
            <span className="text-sm text-gray-600">
              {vendorDetails.businessName || "Vendor"}
            </span>
          </div>

          {/* Listing Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {listingDetails.title || listingDetails.name || "Professional Service"}
            </h1>
            <p className="text-gray-600 text-sm">
              Vendor: <span className="font-medium">{vendorDetails.businessName || 'Service Provider'}</span>
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 fill-current ${i < Math.floor(listingDetails.rating || vendorDetails.rating || 4.5)
                ? 'text-yellow-400'
                : 'text-gray-300'
                }`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">
              {(listingDetails.rating || vendorDetails.rating || 4.5).toFixed(1)}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {listingDetails.description || vendorDetails.description || vendorDetails.whyChooseUs || 'Professional service provider with years of experience.'}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Contact:</span>
              <span className="text-sm font-medium text-gray-900">
                {vendorDetails.phone || vendorDetails.businessPhone || 'Not available'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Email:</span>
              <span className="text-sm font-medium text-gray-900">
                {vendorDetails.email || vendorDetails.businessEmail || 'Not available'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Location:</span>
              <span className="text-sm font-medium text-gray-900">
                {listingDetails.fullLocation || vendorDetails.location || 'Available Citywide'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Experience:</span>
              <span className="text-sm font-medium text-gray-900">
                {vendorDetails.employees || vendorDetails.experience || '5+ years'}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500">USD(incl. of all taxes)</p>
            <div className="flex items-center space-x-4">
              {listingDetails.pricing?.perEvent && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${listingDetails.pricing.perEvent}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">PER EVENT</span>
                </div>
              )}
              {listingDetails.pricing?.perHour && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${listingDetails.pricing.perHour}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">PER HOUR</span>
                </div>
              )}
              {listingDetails.pricing?.perDay && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${listingDetails.pricing.perDay}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">PER DAY</span>
                </div>
              )}
              {!listingDetails.pricing?.perEvent && !listingDetails.pricing?.perHour && !listingDetails.pricing?.perDay && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {listingDetails.formattedPrice || 'Quote on request'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Selected Dates Summary */}
          {selectedDates.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Selected Dates ({selectedDates.length} day{selectedDates.length > 1 ? 's' : ''})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDates.sort((a, b) => a - b).map((date, index) => (
                  <span key={index} className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">
                    {date.toLocaleDateString()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`px-6 py-3 border-2 rounded-2xl font-medium transition-all flex items-center justify-center ${cartSuccess
                ? 'border-green-500 text-green-500 bg-green-50'
                : isAddingToCart
                  ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border-primary text-primary hover:bg-primary/10'
                }`}
            >
              {cartSuccess ? 'Added!' : isAddingToCart ? 'Adding...' : 'Add To Cart'}
            </button>
            <button
              onClick={() => setIsBookNowModalOpen(true)}
              className="px-6 py-3 bg-gradient-brand text-white rounded-2xl font-medium hover:shadow-lg transition-all"
            >
              Book Now
            </button>
          </div>

          {selectedDates.length === 0 && (
            <p className="text-xs text-gray-500 mt-2">
              You can add to cart without dates and specify them later, or select dates first for convenience
            </p>
          )}
        </div>
      </div>

      {/* Modals */}
      <BookNowModal
        isOpen={isBookNowModalOpen}
        onClose={() => setIsBookNowModalOpen(false)}
        onSuccess={() => { }}
        selectedDates={selectedDates}
        vendorData={vendorData}
        listingData={listingData}
        vendorId={vendorId}
        listingId={listingId}
      />
      <OrderSummaryModal
        isOpen={isOrderSummaryModalOpen}
        onClose={() => setIsOrderSummaryModalOpen(false)}
        onDownloadPDF={() => { }}
      />
      <RequestSuccessModal
        isOpen={isRequestSuccessModalOpen}
        onClose={() => setIsRequestSuccessModalOpen(false)}
        onTrackBooking={() => { }}
        bookingData={trackOrderData}
      />
      <TrackOrderModal
        open={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
        order={trackOrderData}
        onDownload={() => { }}
      />
    </div>
  );
};

export default BookingCalendar;
