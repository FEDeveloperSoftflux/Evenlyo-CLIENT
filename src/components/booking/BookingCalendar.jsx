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
  const [availabilityData, setAvailabilityData] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayShortNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Helper to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get the weekday index (0=Monday, 6=Sunday)
  const getWeekdayIndex = (date) => {
    // JS: 0=Sunday, 1=Monday, ..., 6=Saturday
    // We want: 0=Monday, ..., 6=Sunday
    let jsDay = date.getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  };
  
  // Generate calendar grid for current month
  const generateCalendarData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = getWeekdayIndex(firstDayOfMonth); // 0=Monday

    // Previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

    let calendar = [];
    let week = [];

    // Fill first week
    for (let i = 0; i < 7; i++) {
      if (i < startDay) {
        // Days from previous month
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

    // Fill remaining weeks
    let dayCounter = 8 - startDay;
    while (dayCounter <= daysInMonth) {
      week = [];
      for (let i = 0; i < 7; i++) {
        if (dayCounter > daysInMonth) {
          // Next month
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

  // Available dates (gray background) - for demo, keep as 1-31
  const availableDates = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const isAvailable = (day, currentMonthFlag) => {
    return currentMonthFlag && availableDates.includes(day);
  };

  // Demo: Booked dates for all months (YYYY-MM-DD format)
  const bookedDates = [
    '2025-03-05',
    '2025-03-12',
    '2025-04-10',
    '2025-05-18',
    '2025-06-01',
    '2025-06-15',
  ];

  const isBooked = (day, currentMonthFlag) => {
    if (!currentMonthFlag) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1; // JS months are 0-based
    // Pad month and day to 2 digits
    const monthStr = month.toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    return bookedDates.includes(dateStr);
  };

  // For demo: hardcoded available times
  const getAvailableTimes = (day) => {
    // You can customize this logic as needed
    if (day % 2 === 0) {
      return ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];
    } else {
      return ['9:00 AM', '1:00 PM', '3:00 PM'];
    }
  };

  const handleDateSelect = (day) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateObj = new Date(year, month, day);
    // Check if already selected (by date, month, year)
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
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const handleBookNow = () => {
    setIsBookNowModalOpen(true);
  };
  
  const handleAddToCart = async () => {
    // Only validate listing information - dates are optional
    if (!listingData || !listingId) {
      alert('Listing information is missing.');
      return;
    }

    setIsAddingToCart(true);

    try {
      // Prepare cart item details - dates are optional
      const sortedDates = selectedDates.length > 0 ? selectedDates.sort((a, b) => a - b) : [];
      const startDate = sortedDates.length > 0 ? sortedDates[0] : null;
      const endDate = sortedDates.length > 1 ? sortedDates[sortedDates.length - 1] : null;
      
      // Format dates for API
      const formatDate = (date) => {
        return date ? date.toISOString().split('T')[0] : null; // YYYY-MM-DD
      };

      // Create temporary booking details for cart - all optional
      const tempDetails = {
        eventDate: startDate ? formatDate(startDate) : null, // null instead of string for Mongoose Date validation
        eventTime: '10:00', // Default time, can be updated later
        endDate: endDate ? formatDate(endDate) : undefined,
        endTime: sortedDates.length > 1 ? '18:00' : undefined,
        eventLocation: 'To be specified', // This will be updated by user in cart
        eventType: 'Event', // Default event type
        guestCount: 50, // Default guest count
        specialRequests: '',
        contactPreference: 'email'
      };

      // Prepare request payload
      const requestPayload = {
        listingId: listingId.toString(), // Ensure it's a string
        tempDetails
      };

      console.log('Adding to cart with payload:', JSON.stringify(requestPayload, null, 2));
      console.log('API endpoint:', endPoints.cart.add);
      console.log('Full API URL:', `${api.defaults.baseURL}${endPoints.cart.add}`);

      // Call the cart API
      const response = await api.post(endPoints.cart.add, requestPayload);

      console.log('Cart API response:', response.data);

      if (response.data && response.data.success) {
        setCartSuccess(true);
        // Reset success state after 3 seconds
        setTimeout(() => setCartSuccess(false), 3000);
        
        console.log('Successfully added to cart:', response.data.message);
        
        // Show appropriate success message
        const successMessage = selectedDates.length > 0 
          ? 'Item successfully added to cart with selected dates! You can view and edit it in your cart.'
          : 'Item successfully added to cart! You can specify dates and details in your cart.';
        alert(successMessage);
        
        // Clear selected dates after adding to cart
        setSelectedDates([]);
        
        // Optional: Navigate to cart page
        // navigate('/add-to-cart');
      } else {
        // Handle case where response doesn't indicate success
        console.warn('Cart API did not return success:', response.data);
        throw new Error(response.data?.message || 'Server did not confirm successful addition to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
      
      // Provide more detailed error messages
      let errorMessage;
      if (error.response?.status === 500) {
        errorMessage = 'Server error occurred. Please check if you are logged in and try again.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Please log in to add items to your cart.';
      } else if (error.response?.status === 400) {
        errorMessage = `Invalid request: ${error.response?.data?.message || 'Please check your data and try again.'}`;
      } else if (error.code === 'NETWORK_ERROR') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.response?.data?.message || error.message || 'Failed to add item to cart. Please try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const handleBookingSuccess = (bookingData) => {
    setIsBookNowModalOpen(false);
    
    // Store the booking data for the success modal
    if (bookingData?.data?.bookingRequest) {
      setTrackOrderData({
        bookingId: bookingData.data.bookingRequest._id || bookingData.data.bookingRequest.id,
        trackingId: bookingData.data.bookingRequest.trackingId,
        vendorId: vendorId,
        location: bookingData.data.bookingRequest.details?.eventLocation,
        dateTime: `${bookingData.data.bookingRequest.details?.startDate} ${bookingData.data.bookingRequest.details?.startTime}`,
        status: bookingData.data.bookingRequest.status || 'pending'
      });
    }
    
    setIsRequestSuccessModalOpen(true);
  };
  
  const handleTrackBooking = () => {
    setIsRequestSuccessModalOpen(false);
    // Provide full mock order timeline for demonstration
    setTrackOrderData({
      trackingId: 'BK-20250709-3733',
      orderId: 'ORD-003',
      clientName: 'John Doe',
      phone: '+1-234-567-8903',
      statusLabel: 'Pending',
      totalPrice: '$500.00',
      timeline: [
        {
          title: 'Request Sent',
          description: 'Client sent order request',
          completed: true,
          icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v4l3 3" strokeWidth="2" /></svg>,
          label: 'Client',
          labelColor: 'bg-pink-100 text-pink-600',
          date: '2025-07-09/10:00'
        },
        {
          title: 'Order Accepted',
          description: 'Vendor accepted the order',
          completed: true,
          icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M9 12l2 2 4-4" strokeWidth="2" /></svg>,
          label: 'Vendor',
          labelColor: 'bg-yellow-100 text-yellow-600',
          date: '2025-07-09/11:00'
        },
        {
          title: 'Picked Up',
          description: 'Order picked up from location',
          completed: false,
          icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" /></svg>,
          label: 'Driver',
          labelColor: 'bg-green-100 text-green-600',
          date: null
        },
        {
          title: 'Delivered',
          description: 'Order delivered to destination',
          completed: false,
          icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="7" rx="2" strokeWidth="2" /><path d="M16 11V7a4 4 0 00-8 0v4" strokeWidth="2" /></svg>,
          label: 'Pending',
          labelColor: 'bg-gray-100 text-gray-400',
          date: null
        },
        {
          title: 'Received',
          description: 'Client confirmed receipt',
          completed: false,
          icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
          label: 'Pending',
          labelColor: 'bg-gray-100 text-gray-400',
          date: null
        },
        {
          title: 'Completed',
          description: 'Total Price: $500.00',
          completed: false,
          icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
          label: 'Pending',
          labelColor: 'bg-gray-100 text-gray-400',
          date: null
        }
      ],
      progressNote: 'Order is in progress. Next phase will be marked as completed once the current step is finished.'
    });
    setIsTrackOrderModalOpen(true);
  };
  
  const handleDownloadPDF = () => {
    // Implement PDF download logic
    console.log('Downloading PDF...');
  };
  
  // Helper to create a Date object for a given day in the current month
  const getDateObj = (day) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month, day);
  };

  // Helper to get all dates between two dates (inclusive, same month)
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

  // Mouse event handlers for drag selection
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
      // Dragged: add range
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

  // Fetch availability data when listingId changes or month changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!listingId) return;
      
      try {
        setAvailabilityLoading(true);
        console.log('Fetching availability for listing:', listingId);
        
        // Fetch availability for current month
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;
        const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
        const endDate = new Date(year, month, 0).getDate();
        const endDateStr = `${year}-${month.toString().padStart(2, '0')}-${endDate.toString().padStart(2, '0')}`;
        
        const response = await api.get(`${endPoints.listings.availability(listingId)}?startDate=${startDate}&endDate=${endDateStr}`);
        const availabilityInfo = response.data.data || response.data;
        
        console.log('Availability data received:', availabilityInfo);
        setAvailabilityData(availabilityInfo);
      } catch (error) {
        console.warn('Failed to fetch availability:', error);
        // Don't throw error, just continue with default availability
        setAvailabilityData(null);
      } finally {
        setAvailabilityLoading(false);
      }
    };
    
    fetchAvailability();
  }, [listingId, currentMonth]);

  // Add event listener to handle mouse up outside calendar
  React.useEffect(() => {
    if (!isDragging) return;
    const handleMouseUpGlobal = () => handleDateMouseUp();
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
  }, [isDragging, dragStartDate, dragCurrentDate]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold text-gray-900">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
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
                const isBookedDay = isBooked(cell.day, cell.currentMonth);
                const cellDateObj = isCurrentMonthDay ? getDateObj(cell.day) : null;
                const isSelected =
                  isCurrentMonthDay &&
                  selectedDates.some(
                    d => d.getDate() === cell.day && d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()
                  );
                // Drag selection highlight
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
                            ? `${isSelected || isInDragRange ? 'bg-gradient-brand text-white ' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'}`
                            : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
                        : 'text-gray-300'}
                    `}
                    onClick={e => handleDateClick(cell.day, isAvailableDay, isBookedDay)}
                    onMouseDown={e => handleDateMouseDown(cell.day, isAvailableDay, isBookedDay)}
                    onMouseEnter={e => handleDateMouseEnter(cell.day, isAvailableDay, isBookedDay)}
                    onMouseUp={handleDateMouseUp}
                    style={{ userSelect: 'none', position: 'relative' }}
                    onMouseLeave={() => setHoveredDate(null)}
                    onMouseOver={() => isAvailableDay && setHoveredDate({ day: cell.day, week: weekIndex, dayIdx: dayIndex })}
                  >
                    {cell.day}
                    {isBookedDay && (
                      <span className="absolute top-1 right-1" title="Booked">
                      </span>
                    )}
                    {/* Tooltip for available times */}
                    {hoveredDate && hoveredDate.day === cell.day && hoveredDate.week === weekIndex && hoveredDate.dayIdx === dayIndex && isAvailableDay && !isBookedDay && (
                      <div className="absolute z-50 left-1/2 -translate-x-1/2 top-12 bg-white border border-gray-200 shadow-lg rounded-lg px-3 py-2 text-xs text-gray-700 whitespace-nowrap min-w-[120px]">
                        <div className="font-semibold mb-1 text-pink-600">Available Times</div>
                        {getAvailableTimes(cell.day).map((time, idx) => (
                          <div key={time + idx}>{time}</div>
                        ))}
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
          {/* User/Vendor Info */}
          <div className="flex items-center space-x-3">
            <img
              src={vendorData?.vendor?.profileImage || "/assets/jaydeep.png"}
              alt={vendorData?.vendor?.businessName || "Vendor"}
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
            />
            <span className="text-sm text-gray-600">
              {vendorData?.vendor?.businessName || vendorData?.vendor?.firstName || "Vendor"}
            </span>
          </div>
          
          {/* Listing Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {(() => {
                // Handle title field safely
                if (typeof listingData?.title === 'string') return listingData.title;
                if (listingData?.title && typeof listingData.title === 'object') {
                  return listingData.title.en || listingData.title.nl || Object.values(listingData.title)[0] || 'Service';
                }
                if (typeof listingData?.name === 'string') return listingData.name;
                if (listingData?.name && typeof listingData.name === 'object') {
                  return listingData.name.en || listingData.name.nl || Object.values(listingData.name)[0] || 'Service';
                }
                return 'Professional Service';
              })()} 
            </h1>
            <p className="text-gray-600 text-sm">
              Vendor: <span className="font-medium">{vendorData?.vendor?.businessName || 'Service Provider'}</span>
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 fill-current ${
                i < Math.floor(listingData?.rating || vendorData?.vendor?.rating || 4.5) 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
              }`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">
              {(listingData?.rating || vendorData?.vendor?.rating || 4.5).toFixed(1)}
            </span>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {(() => {
                // Handle description field safely
                if (typeof listingData?.description === 'string') return listingData.description;
                if (listingData?.description && typeof listingData.description === 'object') {
                  return listingData.description.en || listingData.description.nl || Object.values(listingData.description)[0];
                }
                if (typeof vendorData?.vendor?.businessDescription === 'string') return vendorData.vendor.businessDescription;
                if (vendorData?.vendor?.businessDescription && typeof vendorData.vendor.businessDescription === 'object') {
                  return vendorData.vendor.businessDescription.en || vendorData.vendor.businessDescription.nl || Object.values(vendorData.vendor.businessDescription)[0];
                }
                return 'Professional service provider with years of experience in delivering quality services for events and occasions.';
              })()} 
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Contact:</span>
              <span className="text-sm font-medium text-gray-900">
                {vendorData?.vendor?.businessPhone || vendorData?.vendor?.phone || 'Not available'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Email:</span>
              <span className="text-sm font-medium text-gray-900">
                {vendorData?.vendor?.businessEmail || vendorData?.vendor?.email || 'Not available'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Location:</span>
              <span className="text-sm font-medium text-gray-900">
                {(() => {
                  // Handle location field safely
                  if (typeof listingData?.location === 'string') return listingData.location;
                  if (listingData?.location && typeof listingData.location === 'object') {
                    return listingData.location.city || listingData.location.address || Object.values(listingData.location)[0];
                  }
                  if (typeof vendorData?.vendor?.businessAddress === 'string') return vendorData.vendor.businessAddress;
                  if (vendorData?.vendor?.businessAddress && typeof vendorData.vendor.businessAddress === 'object') {
                    return vendorData.vendor.businessAddress.city || vendorData.vendor.businessAddress.address || Object.values(vendorData.vendor.businessAddress)[0];
                  }
                  return 'Available Citywide';
                })()} 
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Experience:</span>
              <span className="text-sm font-medium text-gray-900">
                {vendorData?.vendor?.experience || vendorData?.vendor?.yearsOfExperience || '5+ years'}
              </span>
            </div>
          </div>
          
          {/* Pricing */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500">USD(incl. of all taxes)</p>
            <div className="flex items-center space-x-4">
              {listingData?.pricing?.perEvent && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${listingData.pricing.perEvent}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">PER EVENT</span>
                </div>
              )}
              {listingData?.pricing?.perHour && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${listingData.pricing.perHour}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">PER HOUR</span>
                </div>
              )}
              {listingData?.pricing?.perDay && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${listingData.pricing.perDay}
                  </span>
                  <span className="text-sm text-gray-600 ml-2">PER DAY</span>
                </div>
              )}
              {!listingData?.pricing?.perEvent && !listingData?.pricing?.perHour && !listingData?.pricing?.perDay && (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {listingData?.formattedPrice || listingData?.pricingPerEvent || 'Quote on request'}
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
              className={`px-6 py-3 border-2 rounded-2xl font-medium transition-all flex items-center justify-center ${
                cartSuccess
                  ? 'border-green-500 text-green-500 bg-green-50'
                  : isAddingToCart
                    ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border-primary text-primary hover:bg-primary/10'
              }`}
            >
              {isAddingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                  Adding...
                </>
              ) : cartSuccess ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Wishlist!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
                  </svg>
                  Add To Wishlist
                </>
              )}
            </button>
            <button 
              onClick={handleBookNow}
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
        onSuccess={handleBookingSuccess}
        selectedDates={selectedDates}
        vendorData={vendorData}
        listingData={listingData}
        vendorId={vendorId}
        listingId={listingId}
      />
      
      <OrderSummaryModal 
        isOpen={isOrderSummaryModalOpen} 
        onClose={() => setIsOrderSummaryModalOpen(false)}
        onDownloadPDF={handleDownloadPDF}
      />
      
      <RequestSuccessModal 
        isOpen={isRequestSuccessModalOpen} 
        onClose={() => setIsRequestSuccessModalOpen(false)}
        onTrackBooking={handleTrackBooking}
        bookingData={trackOrderData}
      />
      <TrackOrderModal
        open={isTrackOrderModalOpen}
        onClose={() => setIsTrackOrderModalOpen(false)}
        order={trackOrderData}
        onDownload={() => {}}
      />
    </div>
  );
};

export default BookingCalendar;
