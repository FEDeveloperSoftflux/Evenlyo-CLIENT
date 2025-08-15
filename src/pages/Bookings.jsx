import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Footer from "../components/Footer";
import ComplaintModal from '../components/ComplaintModal';
import CancelModal from '../components/CancelModal';
import DownloadInvoiceModal from '../components/DownloadInvoiceModal';
import TrackOrderModal from '../components/TrackOrderModal';
import Tooltip from '../components/Tooltip';
import ReviewModal from '../components/ReviewModal';
import api from '../store/api';
import { endPoints } from '../constants/api';

function Bookings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All status');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedTrackOrder, setSelectedTrackOrder] = useState(null);
  const dropdownRef = useRef(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const statusOptions = [
    'All status',
    'Pending',
    'Accepted',
    'Paid',
    'On the way',
    'Received',
    'Complete',
    'Rejected'
  ];

  const handleStatusSelect = (status) => {
    setStatusFilter(status);
    setIsDropdownOpen(false);
  };

  // State for managing bookings data
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get status color
  const getStatusColor = (status) => {
    const statusColorMap = {
      'pending': 'bg-yellow-100',
      'accepted': 'bg-green-100',
      'rejected': 'bg-red-100',
      'paid': 'bg-purple-100',
      'on-the-way': 'bg-blue-100',
      'received': 'bg-indigo-100',
      'complete': 'bg-gray-100'
    };
    return statusColorMap[status?.toLowerCase()] || 'bg-gray-100';
  };

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        console.log('Fetching booking history...');

        const response = await api.get(endPoints.bookings.history);
        const bookingsData = response.data.data || response.data || [];

        console.log('Bookings data received:', bookingsData);

        // Transform API data to match component format
        const bookingsArray = bookingsData.bookings || bookingsData || [];
        const transformedBookings = bookingsArray.map((booking, index) => ({
          id: booking._id || booking.id || index + 1,
          slNo: index + 1,
          trackingId: booking.trackingId || 'N/A',
          startDate: booking.bookingDateTime?.start ? new Date(booking.bookingDateTime.start).toLocaleDateString() : 'N/A',
          startTime: booking.bookingDateTime?.startTime || 'N/A',
          endDate: booking.bookingDateTime?.end ? new Date(booking.bookingDateTime.end).toLocaleDateString() : booking.bookingDateTime?.start ? new Date(booking.bookingDateTime.start).toLocaleDateString() : 'N/A',
          endTime: booking.bookingDateTime?.endTime || 'N/A',
          totalPrice: booking.totalPrice ? `$${booking.totalPrice}` : 'Quote on request',
          status: booking.status || 'pending',
          statusColor: getStatusColor(booking.status),
          // Additional data
          vendorId: booking.vendor?._id,
          vendor: booking.vendor,
          listing: booking.listing,
          bookingDateTime: booking.bookingDateTime,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt
        }));

        setBookings(transformedBookings);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError(err.message || 'Failed to fetch bookings');
        // Fallback to demo data if API fails
        setBookings([
          {
            id: 1,
            slNo: 1,
            trackingId: 'BR001236',
            startDate: '7/3/2024',
            startTime: '10:00 AM',
            endDate: '7/3/2024',
            endTime: '6:00 PM',
            totalPrice: '$1500',
            status: 'Received',
            statusColor: 'bg-blue-400'
          },
          {
            id: 2,
            slNo: 2,
            trackingId: 'BR001237',
            startDate: '7/3/2024',
            startTime: '10:00 AM',
            endDate: '7/3/2024',
            endTime: '6:00 PM',
            totalPrice: '$1500',
            status: 'Pending',
            statusColor: 'bg-red-400'
          },
          {
            id: 3,
            slNo: 3,
            trackingId: 'BR001236',
            startDate: '7/3/2024',
            startTime: '10:00 AM',
            endDate: '7/3/2024',
            endTime: '6:00 PM',
            totalPrice: '$1500',
            status: 'Paid',
            statusColor: 'bg-orange-400'
          },
          {
            id: 4,
            slNo: 4,
            trackingId: 'BR001236',
            startDate: '7/3/2024',
            startTime: '10:00 AM',
            endDate: '7/3/2024',
            endTime: '6:00 PM',
            totalPrice: '$1500',
            status: 'On the way',
            statusColor: 'bg-green-400'
          },
          {
            id: 5,
            slNo: 5,
            trackingId: 'BR001236',
            startDate: '7/3/2024',
            startTime: '10:00 AM',
            endDate: '7/3/2024',
            endTime: '6:00 PM',
            totalPrice: '$1500',
            status: 'Complete',
            statusColor: 'bg-red-400'
          },
          {
            id: 6,
            slNo: 6,
            trackingId: 'BR001236',
            startDate: '7/3/2024',
            startTime: '10:00 AM',
            endDate: '7/3/2024',
            endTime: '6:00 PM',
            totalPrice: '$1500',
            status: 'Accepted',
            statusColor: 'bg-blue-400'
          },
          {
            id: 7,
            slNo: 7,
            trackingId: 'BR001236',
            startDate: '7/3/2024',
            startTime: '10:00 AM',
            endDate: '7/3/2024',
            endTime: '6:00 PM',
            totalPrice: '$1500',
            status: 'Rejected',
            statusColor: 'bg-blue-400'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Add timer state for accepted bookings
  const [cancelTimers, setCancelTimers] = useState({});

  // Start timer when a booking is set to 'Accepted'
  useEffect(() => {
    const interval = setInterval(() => {
      setCancelTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[id] > 0) updated[id] -= 1;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setBookings((prev) => prev.map((b) => {
      if (b.status === 'Accepted' && cancelTimers[b.id] === undefined) {
        return { ...b, acceptedAt: Date.now() };
      }
      return b;
    }));
    // Initialize timers for accepted bookings
    bookings.forEach((b) => {
      if (b.status === 'Accepted' && cancelTimers[b.id] === undefined) {
        setCancelTimers((prev) => ({ ...prev, [b.id]: 30 * 60 }));
      }
      if (b.status !== 'Accepted' && cancelTimers[b.id] !== undefined) {
        setCancelTimers((prev) => {
          const copy = { ...prev };
          delete copy[b.id];
          return copy;
        });
      }
    });
    // eslint-disable-next-line
  }, [bookings]);

  function formatTimer(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.slNo.toString().includes(searchTerm) ||
      booking.startDate.includes(searchTerm) ||
      booking.endDate.includes(searchTerm) ||
      booking.totalPrice.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All status' || booking.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colorMap = {
      'received': 'bg-blue-100 text-blue-800 font-medium',
      'Received': 'bg-blue-100 text-blue-800 font-medium',
      'on_the_way': 'bg-amber-200 text-amber-800 font-medium',
      'On the way': 'bg-amber-200 text-amber-800 font-medium',
      'rejected': 'bg-red-200 text-red-800 font-medium',
      'Rejected': 'bg-red-200 text-red-800 font-medium',
      'paid': 'bg-purple-200 text-purple-800 font-medium',
      'Paid': 'bg-purple-200 text-purple-800 font-medium',
      'picked up': 'bg-blue-800 text-white font-medium',
      'Picked Up': 'bg-blue-800 text-white font-medium',
      'completed': 'bg-green-800 text-white font-medium',
      'Completed': 'bg-green-800 text-white font-medium',
      'claim': 'bg-orange-300 text-orange-900 font-medium',
      'Claim': 'bg-orange-300 text-orange-900 font-medium',
      'accepted': 'bg-green-100 text-green-600',
      'Accepted': 'bg-green-100 text-green-600',
      'pending': 'bg-yellow-100 text-yellow-800 font-medium',
      'Pending': 'bg-yellow-100 text-yellow-800 font-medium',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-700'; // fallback: light bg, dark text
  };


  const getActionButtons = (status, booking) => {
    const buttons = [];
    const statusLower = status?.toLowerCase();
    if (statusLower === 'completed') {
      // If review is pending, show badge and review button
      if (booking.reviewPending && !booking.review) {
        buttons.push(
          <button
            key="review-again"
            className="px-3 py-1 text-sm border-2 rounded-full text-pink-600 border-pink-400 hover:bg-pink-50 transition-colors"
            onClick={() => { setReviewBooking(booking); setIsReviewOpen(true); }}
          >
            Review
          </button>
        );
      }
      buttons.push(
        <Tooltip key="complain" content="Raise a complaint for this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => setIsComplaintOpen(true)}>
            Complain
          </button>
        </Tooltip>
      );
      return buttons;
    }
    if (statusLower === 'pending') {
      buttons.push(
        <Tooltip key="cancel" content="Cancel this pending booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => setIsCancelOpen(true)}>
            Cancel
          </button>
        </Tooltip>
      );
      const trackOrderData = {
        trackingId: booking.trackingId,
        orderId: booking.orderId || 'ORD-003',
        clientName: booking.clientName || 'Global Supply Co',
        phone: booking.phone || '+1-234-567-8903',
        statusLabel: booking.status || 'On the way',
        totalPrice: booking.totalPrice || '$2100.00',
        timeline: [
          {
            title: 'Request Sent',
            description: 'Client sent order request', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v4l3 3" strokeWidth="2" /></svg>,
            label: 'Client', labelColor: 'bg-pink-100 text-pink-600', date: '2025-01-07/07:45'
          },
          {
            title: 'Order Accepted', description: 'Vendor accepted the order', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M9 12l2 2 4-4" strokeWidth="2" /></svg>,
            label: 'Vendor', labelColor: 'bg-yellow-100 text-yellow-600', date: '2025-01-07/09:00'
          },
          {
            title: 'Picked Up', description: 'Order picked up from location', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" /></svg>,
            label: 'Driver', labelColor: 'bg-green-100 text-green-600', date: '2025-01-06/11:15'
          },
          {
            title: 'Delivered', description: 'Order delivered to destination', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="7" rx="2" strokeWidth="2" /><path d="M16 11V7a4 4 0 00-8 0v4" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Received', description: 'Client confirmed receipt', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Completed', description: `Total Price: ${booking.totalPrice || '$2100.00'}`,
            completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          }
        ],
        progressNote: 'Order is in progress. Next phase will be marked as completed once the current step is finished.'
      };
      buttons.push(
        <Tooltip key="track" content="Track the status of this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => { setSelectedTrackOrder(trackOrderData); setIsTrackOpen(true); }}>
            Track
          </button>
        </Tooltip>
      );
      return buttons;
    }
    if (status === 'accepted') {
      // Cancel button only for 30 min
      if (cancelTimers[booking.id] > 0) {
        buttons.push(
          <Tooltip key="cancel" content={cancelTimers[booking.id] === 1 ? 'Cancel period expired' : 'Cancel this booking within 30 minutes of acceptance'}>
            <button
              className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setIsCancelOpen(true)}
              disabled={cancelTimers[booking.id] === 1}
            >
              Cancel <span className="ml-1 text-xs text-gray-500">{formatTimer(cancelTimers[booking.id])}</span>
            </button>
          </Tooltip>
        );
      } else if (cancelTimers[booking.id] === 0) {
        buttons.push(
          <Tooltip key="cancel-expired" content="Cancel period expired">
            <button
              className="px-3 py-1 text-sm border-2 rounded-full text-gray-400 bg-gray-100 cursor-not-allowed mr-2"
              disabled
            >
              Cancel
            </button>
          </Tooltip>
        );
      }

      buttons.push(
        <Tooltip key="track" content="Track the status of this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => { setSelectedTrackOrder(trackOrderData); setIsTrackOpen(true); }}>
            Track
          </button>
        </Tooltip>
      );
      buttons.push(
        <Tooltip key="complain" content="Raise a complaint for this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => setIsComplaintOpen(true)}>
            Complain
          </button>
        </Tooltip>
      );
      return buttons;
    }
    if (status === 'paid') {
      const trackOrderData = {
        trackingId: booking.trackingId,
        orderId: booking.orderId || 'ORD-003',
        clientName: booking.clientName || 'Global Supply Co',
        phone: booking.phone || '+1-234-567-8903',
        statusLabel: booking.status || 'On the way',
        totalPrice: booking.totalPrice || '$2100.00',
        timeline: [
          {
            title: 'Request Sent',
            description: 'Client sent order request', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v4l3 3" strokeWidth="2" /></svg>,
            label: 'Client', labelColor: 'bg-pink-100 text-pink-600', date: '2025-01-07/07:45'
          },
          {
            title: 'Order Accepted', description: 'Vendor accepted the order', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M9 12l2 2 4-4" strokeWidth="2" /></svg>,
            label: 'Vendor', labelColor: 'bg-yellow-100 text-yellow-600', date: '2025-01-07/09:00'
          },
          {
            title: 'Picked Up', description: 'Order picked up from location', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" /></svg>,
            label: 'Driver', labelColor: 'bg-green-100 text-green-600', date: '2025-01-06/11:15'
          },
          {
            title: 'Delivered', description: 'Order delivered to destination', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="7" rx="2" strokeWidth="2" /><path d="M16 11V7a4 4 0 00-8 0v4" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Received', description: 'Client confirmed receipt', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Completed', description: `Total Price: ${booking.totalPrice || '$2100.00'}`,
            completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          }
        ],
        progressNote: 'Order is in progress. Next phase will be marked as completed once the current step is finished.'
      };
      buttons.push(
        <Tooltip key="track" content="Track the status of this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => { setSelectedTrackOrder(trackOrderData); setIsTrackOpen(true); }}>
            Track
          </button>
        </Tooltip>
      );
      buttons.push(
        <Tooltip key="complain" content="Raise a complaint for this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => setIsComplaintOpen(true)}>
            Complain
          </button>
        </Tooltip>
      );
      return buttons;
    }
    if (status === 'on_the_way') {
      const trackOrderData = {
        trackingId: booking.trackingId,
        orderId: booking.orderId || 'ORD-003',
        clientName: booking.clientName || 'Global Supply Co',
        phone: booking.phone || '+1-234-567-8903',
        statusLabel: booking.status || 'On the way',
        totalPrice: booking.totalPrice || '$2100.00',
        timeline: [
          {
            title: 'Request Sent',
            description: 'Client sent order request', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v4l3 3" strokeWidth="2" /></svg>,
            label: 'Client', labelColor: 'bg-pink-100 text-pink-600', date: '2025-01-07/07:45'
          },
          {
            title: 'Order Accepted', description: 'Vendor accepted the order', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M9 12l2 2 4-4" strokeWidth="2" /></svg>,
            label: 'Vendor', labelColor: 'bg-yellow-100 text-yellow-600', date: '2025-01-07/09:00'
          },
          {
            title: 'Picked Up', description: 'Order picked up from location', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" /></svg>,
            label: 'Driver', labelColor: 'bg-green-100 text-green-600', date: '2025-01-06/11:15'
          },
          {
            title: 'Delivered', description: 'Order delivered to destination', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="7" rx="2" strokeWidth="2" /><path d="M16 11V7a4 4 0 00-8 0v4" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Received', description: 'Client confirmed receipt', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Completed', description: `Total Price: ${booking.totalPrice || '$2100.00'}`,
            completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          }
        ],
        progressNote: 'Order is in progress. Next phase will be marked as completed once the current step is finished.'
      };
      buttons.push(
        <Tooltip key="track" content="Track the status of this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => { setSelectedTrackOrder(trackOrderData); setIsTrackOpen(true); }}>
            Track
          </button>
        </Tooltip>
      );
      buttons.push(
        <Tooltip key="received" content="Mark as received when you have received your order">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => {
            setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'Received', statusColor: 'bg-yellow-400' } : b));
          }}>
            Received
          </button>
        </Tooltip>
      );
      buttons.push(
        <Tooltip key="complain" content="Raise a complaint for this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => setIsComplaintOpen(true)}>
            Complain
          </button>
        </Tooltip>
      );
      return buttons;
    }
    if (status === 'received') {
      const trackOrderData = {
        trackingId: booking.trackingId,
        orderId: booking.orderId || 'ORD-003',
        clientName: booking.clientName || 'Global Supply Co',
        phone: booking.phone || '+1-234-567-8903',
        statusLabel: booking.status || 'On the way',
        totalPrice: booking.totalPrice || '$2100.00',
        timeline: [
          {
            title: 'Request Sent',
            description: 'Client sent order request', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v4l3 3" strokeWidth="2" /></svg>,
            label: 'Client', labelColor: 'bg-pink-100 text-pink-600', date: '2025-01-07/07:45'
          },
          {
            title: 'Order Accepted', description: 'Vendor accepted the order', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M9 12l2 2 4-4" strokeWidth="2" /></svg>,
            label: 'Vendor', labelColor: 'bg-yellow-100 text-yellow-600', date: '2025-01-07/09:00'
          },
          {
            title: 'Picked Up', description: 'Order picked up from location', completed: true,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" /></svg>,
            label: 'Driver', labelColor: 'bg-green-100 text-green-600', date: '2025-01-06/11:15'
          },
          {
            title: 'Delivered', description: 'Order delivered to destination', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="7" rx="2" strokeWidth="2" /><path d="M16 11V7a4 4 0 00-8 0v4" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Received', description: 'Client confirmed receipt', completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          },
          {
            title: 'Completed', description: `Total Price: ${booking.totalPrice || '$2100.00'}`,
            completed: false,
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>,
            label: 'Pending', labelColor: 'bg-gray-100 text-gray-400', date: null
          }
        ],
        progressNote: 'Order is in progress. Next phase will be marked as completed once the current step is finished.'
      };
      buttons.push(
        <Tooltip key="complete" content="Mark this booking as complete after your Event is finished">
          <button
            className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors"
            onClick={() => {
              setReviewBooking(booking);
              setIsReviewOpen(true);
            }}
          >
            Complete
          </button>
        </Tooltip>
      );
      buttons.push(
        <Tooltip key="complain" content="Raise a complaint for this booking">
          <button className="px-3 py-1 text-sm border-2 rounded-full text-black hover:text-gray-800 transition-colors" onClick={() => setIsComplaintOpen(true)}>
            Complain
          </button>
        </Tooltip>
      );
      return buttons;
    }
    return buttons;
  };

  // Handler for review modal submit
  const handleReviewSubmit = ({ rating, review }) => {
    if (reviewBooking) {
      setBookings(prev => prev.map(b =>
        b.id === reviewBooking.id
          ? { ...b, status: 'Complete', statusColor: 'bg-red-400', review, rating, reviewPending: false }
          : b
      ));
    }
    setIsReviewOpen(false);
    setReviewBooking(null);
  };

  // Handler for review modal cancel
  const handleReviewCancel = () => {
    if (reviewBooking) {
      setBookings(prev => prev.map(b =>
        b.id === reviewBooking.id
          ? { ...b, status: 'Complete', statusColor: 'bg-red-400', reviewPending: true }
          : b
      ));
    }
    setIsReviewOpen(false);
    setReviewBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="px-responsive py-8">
        <div className="container-7xl">
          {/* Back Button */}

          <div className="flex items-center mb-8">
            <button className="mr-4 text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Booking</h1>
              <p className="text-sm text-gray-500">You can track your booking</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-mobile pl-10 w-full"
                />
              </div>

              {/* Status Filter */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-40 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                >
                  <span>{statusFilter}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2 animate-fade-in overflow-hidden">
                    {statusOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setStatusFilter(option);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 relative ${statusFilter === option
                          ? 'text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                      >
                        {statusFilter === option && (
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl mx-2 my-1"></div>
                        )}
                        <span className="relative z-10">{option}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Mobile Cards View */}
            <div className="block md:hidden">
              {filteredBookings.length > 0 ? (
                <div className="space-y-4 p-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">#{booking.slNo}</p>
                          <p className="text-xs text-gray-500">{booking.trackingId}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Start:</span>
                          <span className="text-xs text-gray-900">{booking.startDate} {booking.startTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">End:</span>
                          <span className="text-xs text-gray-900">{booking.endDate} {booking.endTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-500">Price:</span>
                          <span className="text-xs font-semibold text-gray-900">{booking.totalPrice}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 justify-end mr-2">
                        {getActionButtons(booking.status, booking)}
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => { setSelectedBooking(booking); setIsDownloadOpen(true); }}>
                          <img src="/assets/Downlaod.svg" alt="Download" className="w-4 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium">No bookings found</p>
                    <p className="text-xs text-gray-400">
                      {searchTerm || statusFilter !== 'All status'
                        ? 'Try adjusting your search or filter criteria'
                        : 'No bookings available at the moment'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-pink-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S# No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Date/Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.slNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.trackingId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="space-y-1">
                            <div>
                              <span className="font-medium">Start:</span> {booking.startDate} {booking.startTime}
                            </div>
                            <div>
                              <span className="font-medium">End:</span> {booking.endDate} {booking.endTime}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-1">
                            <span className="font-semibold">{booking.totalPrice}</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex justify-end items-center space-x-2 mr-4">
                            {getActionButtons(booking.status, booking)}
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => { setSelectedBooking(booking); setIsDownloadOpen(true); }}>
                              <img src="/assets/Downlaod.svg" alt="Download" className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center space-y-2">
                          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-sm font-medium">No bookings found</p>
                          <p className="text-xs text-gray-400">
                            {searchTerm || statusFilter !== 'All status'
                              ? 'Try adjusting your search or filter criteria'
                              : 'No bookings available at the moment'
                            }
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ComplaintModal open={isComplaintOpen} onClose={() => setIsComplaintOpen(false)} />
      <CancelModal open={isCancelOpen} onClose={() => setIsCancelOpen(false)} />
      <DownloadInvoiceModal
        open={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        bookingId={selectedBooking?.trackingId}
        items={selectedBooking ? selectedBooking.items || [] : []}
        summary={selectedBooking ? selectedBooking.summary || {} : {}}
      />
      <TrackOrderModal open={isTrackOpen} onClose={() => setIsTrackOpen(false)} order={selectedTrackOrder} />
      <ReviewModal
        open={isReviewOpen}
        onClose={handleReviewCancel}
        onSubmit={handleReviewSubmit}
        booking={reviewBooking}
      />
    </div>
  )
}

export default Bookings
