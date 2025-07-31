import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookNowModal from './BookNowModal';
import OrderSummaryModal from './OrderSummaryModal';
import RequestSuccessModal from './RequestSuccessModal';
import TrackOrderModal from '../TrackOrderModal';

const BookingCalendar = () => {
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
  
  const handleAddToCart = () => {
    navigate('/add-to-cart'); // Redirect to Add to Cart page
  };
  
  const handleBookingSuccess = () => {
    setIsBookNowModalOpen(false);
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
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <img
              src="/assets/jaydeep.png"
              alt="Jaydeep"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
            />
            <span className="text-sm text-gray-600">Jaydeep</span>
          </div>
          
          {/* Event Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              DJ Abz Wine || DJ Ray Beatz Let the Bass Move You!
            </h1>
            <p className="text-gray-600 text-sm">
              Vendor: <span className="font-medium">Pulse Events & Entertainment</span>
            </p>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">4.8</span>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              With over 7 years of event experience, DJ Ray Beatz is known for high-energy dance floors, seamless transitions, and crowd-pleasing remixes. From cleat weddings to corporate raves, he brings the perfect vibe for every crowd.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Contact:</span>
              <span className="text-sm font-medium text-gray-900">+8323344344</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Email:</span>
              <span className="text-sm font-medium text-gray-900">some@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Location:</span>
              <span className="text-sm font-medium text-gray-900">Los Angeles, CA</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Experience:</span>
              <span className="text-sm font-medium text-gray-900">8+ years</span>
            </div>
          </div>
          
          {/* Pricing */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500">USD(incl. of all taxes)</p>
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">$300 - $500</span>
                <span className="text-sm text-gray-600 ml-2">PER EVENT</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">$100 - $200</span>
                <span className="text-sm text-gray-600 ml-2">PER HOURS</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={handleAddToCart}
              className="px-6 py-3 border-2 border-primary text-primary rounded-2xl font-medium hover:bg-primary/10 transition-colors"
            >
              Add To Cart
            </button>
            <button 
              onClick={handleBookNow}
              className="px-6 py-3 bg-gradient-brand text-white rounded-2xl font-medium hover:shadow-lg transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <BookNowModal 
        isOpen={isBookNowModalOpen} 
        onClose={() => setIsBookNowModalOpen(false)}
        onSuccess={handleBookingSuccess}
        selectedDates={selectedDates}
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
