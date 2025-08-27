import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Footer from "../components/Footer";
import ComplaintModal from '../components/ComplaintModal';
import CancelModal from '../components/CancelModal';
import DownloadInvoiceModal from '../components/DownloadInvoiceModal';
import TrackOrderModal from '../components/TrackOrderModal';
import Tooltip from '../components/Tooltip';
import api from '../store/api';
import { endPoints } from '../constants/api';

// --- Review Modal ---
function ReviewModal({
  open,
  onClose,
  onSubmit,
  stars,
  setStars,
  message,
  setMessage,
  loading,
  error
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Review</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                className={`text-2xl ${stars >= num ? 'text-yellow-400' : 'text-gray-300'}`}
                onClick={() => setStars(num)}
                disabled={loading}
                aria-label={`Rate ${num} star${num > 1 ? 's' : ''}`}
              >★</button>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Review</label>
          <textarea
            className="w-full border rounded-lg px-2 py-1"
            rows={3}
            value={message}
            onChange={e => setMessage(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-3 py-1 rounded-lg bg-gray-200" onClick={onClose} disabled={loading}>Cancel</button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1 disabled:opacity-50"
            disabled={loading || stars < 1 || stars > 5 || !message.trim()}
            onClick={onSubmit}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

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

  // --- Review State ---
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewBookingId, setReviewBookingId] = useState(null);
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewMessage, setReviewMessage] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);
  const [errorReview, setErrorReview] = useState(null);

  // --- Mark Complete State ---
  const [loadingCompleteId, setLoadingCompleteId] = useState(null);
  const [errorComplete, setErrorComplete] = useState(null);

  // --- Claim/Cancel (untouched) ---
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimBooking, setClaimBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [actionError, setActionError] = useState({});

  // --- Bookings Data ---
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // bookings per page




  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Helper: status color
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

  // --- Refetch Bookings ---
  const refetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get(endPoints.bookings.history);
      const bookingsData = response.data.data || response.data || [];
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
        vendorId: booking.vendor?._id,
        vendor: booking.vendor,
        listing: booking.listing,
        bookingDateTime: booking.bookingDateTime,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
        statusHistory: booking.statusHistory || [],
        review: booking.review,
        reviewPending: booking.reviewPending,
      }));
      setBookings(transformedBookings);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchBookings();
  }, []);

  // Helper: status badge
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
      'complete': 'bg-gray-100 text-gray-700',
      'Complete': 'bg-gray-100 text-gray-700',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-700';
  };

  // Helper: check if cancel allowed (within 30min of createdAt)
  function canCancelBooking(booking) {
    if (!booking.createdAt) return false;
    const created = new Date(booking.createdAt).getTime();
    const now = Date.now();
    return (now - created) < 30 * 60 * 1000;
  }

  // --- Mark Complete Handler ---
  const handleMarkComplete = async (bookingId) => {
    setLoadingCompleteId(bookingId);
    setErrorComplete(null);
    try {
      await api.post(endPoints.bookings.markComplete(bookingId));
      await refetchBookings();
      setReviewBookingId(bookingId);
      setReviewStars(0);
      setReviewMessage('');
      setReviewModalOpen(true);
    } catch (err) {
      setErrorComplete(err?.response?.data?.message || err.message || 'Mark complete failed');
    } finally {
      setLoadingCompleteId(null);
    }
  };

  // --- Review Modal Submit Handler ---
  const handleSubmitReview = async () => {
    if (!reviewBookingId) return;
    if (reviewStars < 1 || reviewStars > 5) {
      setErrorReview("Please select a rating between 1 and 5 stars.");
      return;
    }
    if (!reviewMessage.trim()) {
      setErrorReview("Review message is required.");
      return;
    }
    setLoadingReview(true);
    setErrorReview(null);
    try {
      await api.post(endPoints.bookings.createReview(reviewBookingId), {
        stars: reviewStars,
        message: reviewMessage.trim()
      });
      setReviewModalOpen(false);
      setReviewBookingId(null);
      setReviewStars(0);
      setReviewMessage('');
      await refetchBookings();
    } catch (err) {
      setErrorReview(err?.response?.data?.message || err.message || 'Review failed');
    } finally {
      setLoadingReview(false);
    }
  };

  // --- Review Modal Cancel Handler ---
  const handleReviewCancel = () => {
    setReviewModalOpen(false);
    setReviewBookingId(null);
    setReviewStars(0);
    setReviewMessage('');
    setErrorReview(null);
  };

  // --- Filter bookings ---
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.slNo.toString().includes(searchTerm) ||
      booking.startDate.includes(searchTerm) ||
      booking.endDate.includes(searchTerm) ||
      booking.totalPrice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All status' || booking.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  //Pagination Helper
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredBookings.length / pageSize);

  //A pagination Component

  function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return (
      <div className="flex justify-center items-center gap-2 py-4">
        <button
          className="touch-button px-3 py-1 rounded-lg bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition-all"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`touch-button px-3 py-1 rounded-lg font-semibold transition-all
            ${page === currentPage
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-pink-50'
              }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="touch-button px-3 py-1 rounded-lg bg-pink-100 text-pink-600 font-semibold hover:bg-pink-200 transition-all"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  }

  //Pagination Componenet ends



  // --- Action buttons per booking ---
  const getActionButtons = (booking) => {
    const status = booking.status?.toLowerCase();
    const buttons = [];

    // Helper style for pill buttons
    const pillBtn =
      "bg-transparent border border-gray-300 text-black rounded-full px-3 py-1 transition-colors hover:bg-gray-100 disabled:opacity-50";

    // Cancel (Pending)
    if (status === 'pending') {
      const cancelAllowed = canCancelBooking(booking);
      buttons.push(
        <button
          key="cancel"
          className={pillBtn}
          disabled={actionLoading[booking.id] || !cancelAllowed}
          title={!cancelAllowed ? "Cancellation period expired. You can only cancel within 30 minutes of booking request." : ""}
          onMouseEnter={() => { }}
          onClick={() => {
            setSelectedBooking(booking);
            setIsCancelOpen(true);
          }}
        >
          {actionLoading[booking.id] ? "Cancelling..." : "Cancel"}
        </button>
      );
    }

    // Mark Received (Accepted/Delivered)
    if (status === 'accepted' || status === 'delivered' || status === 'on the way' || status === 'on_the_way') {
      buttons.push(
        <button
          key="mark-received"
          className={pillBtn}
          disabled={actionLoading[booking.id]}
          onClick={() => {
            setActionLoading((prev) => ({ ...prev, [booking.id]: true }));
            setActionError((prev) => ({ ...prev, [booking.id]: null }));
            api.post(endPoints.bookings.markReceived(booking.id))
              .then(() => refetchBookings())
              .catch(err => setActionError((prev) => ({ ...prev, [booking.id]: err.message || 'Mark received failed' })))
              .finally(() => setActionLoading((prev) => ({ ...prev, [booking.id]: false })));
          }}
        >
          {actionLoading[booking.id] ? "Marking..." : "Mark Received"}
        </button>
      );
    }

    // Mark Complete (Received only)
    if (status === 'received') {
      buttons.push(
        <button
          key="mark-complete"
          className={pillBtn}
          disabled={loadingCompleteId === booking.id}
          onClick={() => handleMarkComplete(booking.id)}
        >
          {loadingCompleteId === booking.id ? "Marking..." : "Mark Complete"}
        </button>
      );
      if (errorComplete && loadingCompleteId === null) {
        buttons.push(
          <span key="error-complete" className="text-xs text-red-500 ml-2">{errorComplete}</span>
        );
      }
    }

    // Add Review (Completed)
    if ((status === 'complete' || status === 'completed') && !booking.review) {
      buttons.push(
        <button
          key="add-review"
          className={pillBtn}
          disabled={loadingReview}
          onClick={() => {
            setReviewBookingId(booking.id);
            setReviewStars(0);
            setReviewMessage('');
            setReviewModalOpen(true);
          }}
        >
          {loadingReview ? "Submitting..." : "Add Review"}
        </button>
      );
    }

    // Paid status: Track & Raise Claim
    if (status === 'paid') {
      buttons.push(
        <button
          key="track"
          className={pillBtn}
          title="Track your order"
          onClick={() => {
            setSelectedTrackOrder(booking);
            setIsTrackOpen(true);
          }}
        >
          Track
        </button>
      );
      buttons.push(
        <button
          key="raise-claim-paid"
          className={pillBtn}
          disabled={actionLoading[booking.id]}
          onClick={() => {
            setClaimBooking(booking);
            setClaimModalOpen(true);
          }}
        >
          {actionLoading[booking.id] ? "Submitting..." : "Raise Claim"}
        </button>
      );
    }

    // Raise Claim (Any eligible except paid, which is handled above)
    if (
      ['pending', 'accepted', 'delivered', 'on the way', 'on_the_way', 'received', 'complete', 'completed'].includes(status)
    ) {
      buttons.push(
        <button
          key="raise-claim"
          className={pillBtn}
          disabled={actionLoading[booking.id]}
          onClick={() => {
            setClaimBooking(booking);
            setClaimModalOpen(true);
          }}
        >
          {actionLoading[booking.id] ? "Submitting..." : "Raise Claim"}
        </button>
      );
    }

    return buttons;
  };

  // Cancel modal confirm
  const handleCancelConfirm = () => {
    if (selectedBooking) {
      setActionLoading((prev) => ({ ...prev, [selectedBooking.id]: true }));
      setActionError((prev) => ({ ...prev, [selectedBooking.id]: null }));
      api.post(endPoints.bookings.cancel(selectedBooking.id))
        .then(() => refetchBookings())
        .catch(err => setActionError((prev) => ({ ...prev, [selectedBooking.id]: err.message || 'Cancel failed' })))
        .finally(() => {
          setActionLoading((prev) => ({ ...prev, [selectedBooking.id]: false }));
          setIsCancelOpen(false);
          setSelectedBooking(null);
        });
    }
  };

  // Claim modal component (simple)
  const ClaimModal = ({ open, onClose, onSubmit }) => {
    const [type, setType] = useState('');
    const [reason, setReason] = useState('');
    return open ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
          <h2 className="text-lg font-bold mb-4">Raise a Claim</h2>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Type</label>
            <select className="w-full border rounded-lg px-2 py-1" value={type} onChange={e => setType(e.target.value)}>
              <option value="">Select type</option>
              <option value="refund">Refund</option>
              <option value="service">Service Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea className="w-full border rounded-lg px-2 py-1" rows={3} value={reason} onChange={e => setReason(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-3 py-1 rounded-lg bg-gray-200" onClick={onClose}>Cancel</button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1"
              disabled={!type || !reason}
              onClick={() => onSubmit({ type, reason })}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    ) : null;
  };

  // Claim modal submit
  const handleClaimSubmit = async ({ type, reason }) => {
    if (!claimBooking) return;
    const trimmedReason = reason.trim();
    if (!trimmedReason) {
      setActionError((prev) => ({ ...prev, [claimBooking.id]: "Claim reason is required" }));
      return;
    }
    setActionLoading((prev) => ({ ...prev, [claimBooking.id]: true }));
    setActionError((prev) => ({ ...prev, [claimBooking.id]: null }));
    try {
      await api.post(endPoints.bookings.createClaim(claimBooking.id), {
        claimType: type,
        reason: { en: trimmedReason }
      });
      setClaimModalOpen(false);
      setClaimBooking(null);
      await refetchBookings();
    } catch (err) {
      setActionError((prev) => ({ ...prev, [claimBooking.id]: err.message || 'Claim failed' }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [claimBooking.id]: false }));
    }
  };

  // --- Render ---
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
              {paginatedBookings.length > 0 ? (
                <div className="space-y-4 p-4">
                  {paginatedBookings.map((booking) => (
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
                        {getActionButtons(booking)}
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => { setSelectedBooking(booking); setIsDownloadOpen(true); }}>
                          <img src="../assets/icons/Download.svg" alt="Download" className="w-4 h-5" />
                        </button>
                      </div>
                      {actionError[booking.id] && (
                        <div className="text-xs text-red-500 mt-2">{actionError[booking.id]}</div>
                      )}
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
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
                  {paginatedBookings.length > 0 ? (
                    paginatedBookings.map((booking) => (
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
                            {getActionButtons(booking)}
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" onClick={() => { setSelectedBooking(booking); setIsDownloadOpen(true); }}>
                              <img src="../assets/icons/Download.svg" alt="Download" className="w-5 h-5" />
                            </button>
                          </div>
                          {actionError[booking.id] && (
                            <div className="text-xs text-red-500 mt-2">{actionError[booking.id]}</div>
                          )}
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
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Cancel Modal */}
      <CancelModal
        open={isCancelOpen}
        onClose={() => { setIsCancelOpen(false); setSelectedBooking(null); }}
        onConfirm={handleCancelConfirm}
        booking={selectedBooking}
        loading={actionLoading[selectedBooking?.id]}
        disabled={!selectedBooking || !canCancelBooking(selectedBooking)}
        error={actionError[selectedBooking?.id]}
      />

      {/* Claim Modal */}
      <ClaimModal
        open={claimModalOpen}
        onClose={() => { setClaimModalOpen(false); setClaimBooking(null); }}
        onSubmit={handleClaimSubmit}
      />

      {/* Download Invoice */}
      <DownloadInvoiceModal
        open={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        bookingId={selectedBooking?.trackingId}
        items={selectedBooking ? selectedBooking.items || [] : []}
        summary={selectedBooking ? selectedBooking.summary || {} : {}}
      />

      {/* Track Order */}
      <TrackOrderModal
        open={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        order={
          selectedTrackOrder
            ? {
              // Map booking fields to TrackOrderModal expected props
              trackingId: selectedTrackOrder.trackingId || '',
              orderId: selectedTrackOrder.trackingId || '', // fallback if no orderId
              clientName: selectedTrackOrder.clientName || (selectedTrackOrder?.vendor?.name || ''),
              phone: selectedTrackOrder.phone || (selectedTrackOrder?.vendor?.phone || ''),
              statusLabel: selectedTrackOrder.status || '',
              totalPrice: selectedTrackOrder.totalPrice || '',
              timeline: Array.isArray(selectedTrackOrder.statusHistory)
                ? selectedTrackOrder.statusHistory.map((step, idx) => ({
                  title: step.title || step.status || '',
                  description: step.description || '',
                  completed: step.completed || step.status === 'completed',
                  icon: <span>•</span>, // Replace with your icon logic if needed
                  label: step.label || '',
                  labelColor: step.labelColor || '',
                  date: step.date || step.updatedAt || '',
                }))
                : [],
              progressNote: selectedTrackOrder.progressNote || '',
            }
            : {
              trackingId: '',
              orderId: '',
              clientName: '',
              phone: '',
              statusLabel: '',
              totalPrice: '',
              timeline: [],
              progressNote: '',
            }
        }
        onDownload={() => {
          setSelectedBooking(selectedTrackOrder);
          setIsDownloadOpen(true);
        }}
      />

      {/* Review Modal */}
      <ReviewModal
        open={reviewModalOpen}
        onClose={handleReviewCancel}
        onSubmit={handleSubmitReview}
        stars={reviewStars}
        setStars={setReviewStars}
        message={reviewMessage}
        setMessage={setReviewMessage}
        loading={loadingReview}
        error={errorReview}
      />

      {/* Complaint Modal (unchanged) */}
      <ComplaintModal open={isComplaintOpen} onClose={() => setIsComplaintOpen(false)} />
    </div>
  )
}

export default Bookings
