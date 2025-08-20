import React, { useState, useEffect } from 'react';
import SalePayModal from './SalePayModal';
import { useNavigate } from 'react-router-dom';
import BookNowModal from './BookNowModal';
import api from '../../store/api';
import { endPoints } from '../../constants/api';
import { useCartReducer } from './useCartReducer';

const AddToCart = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  // New: Sale/Booking tab
  const [mainTab, setMainTab] = useState('booking'); // 'booking' or 'sale'
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  // Sale Items selection state (for Sale tab)
  const [selectedSaleItems, setSelectedSaleItems] = useState(['sale1', 'sale2']);
  // Sale Items Pay Now modal state
  const [isSalePayModalOpen, setIsSalePayModalOpen] = useState(false);
  const [saleUserDetails, setSaleUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    notes: '',
    quantity: 1
  });

  // Handler for selecting/deselecting sale items
  const handleSaleItemSelect = (id) => {
    setSelectedSaleItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Handler for Pay Now click
  const handleSalePayNow = () => {
    setIsSalePayModalOpen(true);
  };

  // Handler for modal input change
  const handleSaleUserDetailChange = (e) => {
    const { name, value } = e.target;
    setSaleUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for modal submit (for now just close modal)
  const handleSalePaySubmit = (e) => {
    e.preventDefault();
    // Here you would handle payment logic
    setIsSalePayModalOpen(false);
    setSaleUserDetails({ name: '', email: '', phone: '' });
    alert('Order placed! (Demo)');
  };
  
  // Use cart reducer for state management
  const {
    items,
    acceptedItems,
    loading,
    error,
    selectedItems,
    setLoading,
    setError,
    clearError,
    setCartItems,
    setAcceptedItems,
    removeCartItem,
    updateCartItem,
    toggleItemSelection,
    clearSelection,
    selectAllItems,
    getSelectedItems,
    getItemsWithCompleteInfo,
    getItemsNeedingEdit,
    canSubmitBookingRequest,
    hasCompleteBookingInfo
  } = useCartReducer();

  const tabs = [
    { id: 'requests', label: 'Request Add To Cart' },
    { id: 'accepted', label: 'Accepted' }
  ];

  // Fetch cart items on mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch accepted bookings when switching to accepted tab
  useEffect(() => {
    if (activeTab === 'accepted') {
      fetchAcceptedBookings();
    }
  }, [activeTab]);

  // API call to fetch cart items
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      clearError();
      const response = await api.get(endPoints.cart.get);
      
      if (response.data.success) {
        // Map the backend response to frontend structure
        const cartItems = response.data.data?.cart?.items || [];
        const mappedItems = cartItems.map(item => ({
          id: item.id || item._id,
          listing: {
            id: item.listingId?.id || item.listingId?._id,
            title: item.listingSnapshot?.title || item.listingId?.title,
            images: [item.listingSnapshot?.featuredImage].filter(Boolean),
          },
          vendor: {
            id: item.listingSnapshot?.vendorId || item.listingId?.vendor?._id,
            businessName: item.listingId?.vendor?.businessName,
            profileImage: null // Add if available in response
          },
          pricing: {
            perHour: item.listingSnapshot?.pricing?.perHour || item.listingId?.pricing?.perHour,
            perDay: item.listingSnapshot?.pricing?.perDay || item.listingId?.pricing?.perDay,
            perEvent: item.listingSnapshot?.pricing?.perEvent || item.listingId?.pricing?.perEvent,
            currency: item.listingSnapshot?.pricing?.currency || item.listingId?.pricing?.currency,
            type: item.listingId?.pricing?.type
          },
          tempDetails: item.tempDetails,
          addedAt: item.addedAt,
          status: item.listingId?.status
        }));
        
        console.log('Mapped cart items:', mappedItems);
        setCartItems(mappedItems);
      } else {
        setError('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError(error.response?.data?.message || 'Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  // API call to fetch accepted bookings
  const fetchAcceptedBookings = async () => {
    try {
      setLoading(true);
      clearError();
      const response = await api.get(endPoints.bookings.accepted);
      
      if (response.data.success) {
        // Map the accepted bookings response to frontend structure
        const acceptedBookings = response.data.data?.bookings || [];
        const mappedBookings = acceptedBookings.map(booking => ({
          id: booking._id,
          listing: {
            id: booking.listingId?.id || booking.listingId?._id,
            title: booking.listingId?.title || 'Service',
            images: [], // Add if available in response
          },
          vendor: {
            id: booking.vendorId?._id,
            businessName: booking.vendorId?.businessName,
            businessEmail: booking.vendorId?.businessEmail,
            businessPhone: booking.vendorId?.businessPhone,
            profileImage: null // Add if available in response
          },
          pricing: {
            perHour: booking.listingId?.pricing?.perHour,
            perDay: booking.listingId?.pricing?.perDay,
            perEvent: booking.listingId?.pricing?.perEvent || booking.pricing?.bookingPrice,
            currency: booking.listingId?.pricing?.currency,
            type: booking.listingId?.pricing?.type
          },
          tempDetails: {
            eventDate: booking.details?.startDate,
            endDate: booking.details?.endDate,
            eventTime: booking.details?.startTime,
            endTime: booking.details?.endTime,
            eventLocation: booking.details?.eventLocation,
            contactPreference: booking.details?.contactPreference,
            duration: booking.details?.duration
          },
          bookingDetails: {
            status: booking.status,
            paymentStatus: booking.paymentStatus,
            trackingId: booking.trackingId,
            totalPrice: booking.pricing?.totalPrice,
            bookingPrice: booking.pricing?.bookingPrice,
            securityPrice: booking.pricing?.securityPrice,
            extraCharges: booking.pricing?.extraCharges
          },
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt
        }));
        
        console.log('Mapped accepted bookings:', mappedBookings);
        setAcceptedItems(mappedBookings);
      } else {
        setError('Failed to fetch accepted bookings');
      }
    } catch (error) {
      console.error('Error fetching accepted bookings:', error);
      setError(error.response?.data?.message || 'Failed to fetch accepted bookings');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete item from cart
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await api.delete(endPoints.cart.remove(itemId));
      
      if (response.data.success) {
        removeCartItem(itemId);
        showToast('Item removed from cart', 'success');
      } else {
        showToast('Failed to remove item', 'error');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      showToast(error.response?.data?.message || 'Failed to remove item', 'error');
    }
  };

  // Handle submit booking request
  const handleSubmitBookingRequest = async () => {
    const selectedItemsData = getSelectedItems();
    
    // Check for items missing required details
    const incompleteItems = selectedItemsData.filter(item => !hasCompleteBookingInfo(item));
    
    if (incompleteItems.length > 0) {
      const missingDetails = [];
      incompleteItems.forEach(item => {
        if (!item.tempDetails?.eventDate || item.tempDetails.eventDate === 'To be specified') {
          missingDetails.push('date');
        }
        if (!item.tempDetails?.eventTime) {
          missingDetails.push('time');
        }
        if (!item.tempDetails?.eventLocation || item.tempDetails.eventLocation === 'To be specified') {
          missingDetails.push('location');
        }
      });
      
      const uniqueMissing = [...new Set(missingDetails)];
      showToast(`Please fill missing details: ${uniqueMissing.join(', ')} for selected items`, 'error');
      return;
    }

    if (selectedItemsData.length === 0) {
      showToast('Please select items with complete booking details to submit.', 'error');
      return;
    }

    try {
      setSubmitLoading(true);
      const selectedItemIds = selectedItemsData.map(item => item.id);
      
      const response = await api.post(endPoints.cart.submit, {
        itemIds: selectedItemIds
      });

      if (response.data.success) {
        showToast('Booking request sent successfully!', 'success');
        clearSelection();
        fetchCartItems(); // Refresh cart items
      } else {
        showToast('Failed to send booking request', 'error');
      }
    } catch (error) {
      console.error('Error submitting booking request:', error);
      showToast(error.response?.data?.message || 'Failed to send booking request', 'error');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsBookNowModalOpen(true);
  };

  // Save handler for BookNowModal in edit mode
  const handleSaveEdit = async (editData) => {
    try {
      // Prepare tempDetails in the correct format
      const tempDetailsUpdate = {
        tempDetails: {
          eventDate: editData.eventDate || editData.tempDetails?.eventDate,
          eventTime: editData.eventTime || editData.tempDetails?.eventTime,
          eventLocation: editData.eventLocation || editData.tempDetails?.eventLocation,
          endDate: editData.endDate || editData.tempDetails?.endDate,
          endTime: editData.endTime || editData.tempDetails?.endTime,
          eventType: editData.eventType || editData.tempDetails?.eventType || 'Event',
          guestCount: editData.guestCount || editData.tempDetails?.guestCount || 50,
          specialRequests: editData.specialRequests || editData.tempDetails?.specialRequests || '',
          contactPreference: editData.contactPreference || editData.tempDetails?.contactPreference || 'email'
        }
      };

      console.log('Updating cart item with:', tempDetailsUpdate);
      
      const response = await api.put(endPoints.cart.update(editItem.id), tempDetailsUpdate);
      
      if (response.data.success) {
        updateCartItem(editItem.id, tempDetailsUpdate);
        setIsBookNowModalOpen(false);
        setEditItem(null);
        showToast('Item updated successfully', 'success');
        fetchCartItems(); // Refresh to get updated data
      } else {
        showToast('Failed to update item', 'error');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      showToast(error.response?.data?.message || 'Failed to update item', 'error');
    }
  };

  // Simple toast notification function
  const showToast = (message, type = 'info') => {
    // In a real app, you'd use a proper toast library
    if (type === 'error') {
      alert(`Error: ${message}`);
    } else {
      alert(message);
    }
  };

  // Calculate totals dynamically from selected items
  const calculateOrderSummary = () => {
    const currentItems = activeTab === 'requests' 
      ? getSelectedItems() 
      : (Array.isArray(acceptedItems) ? acceptedItems.filter(item => selectedItems.includes(item.id)) : []);
    
    let subtotal = 0;
    currentItems.forEach(item => {
      // For accepted items, always calculate price; for requests, only if complete booking info
      if (activeTab === 'accepted' || hasCompleteBookingInfo(item)) {
        if (item.pricing?.perEvent) {
          subtotal += item.pricing.perEvent;
        } else if (item.pricing?.perHour) {
          subtotal += item.pricing.perHour * 8; // Default 8 hours
        } else if (item.pricing?.perDay) {
          subtotal += item.pricing.perDay;
        } else {
          subtotal += 300; // fallback price
        }
      }
    });

    const securityFee = activeTab === 'accepted' ? 25 : 0;
    const kilometerFee = activeTab === 'accepted' ? 5 : 0;
    const serviceCharges = Math.round(subtotal * 0.1); // 10% service charges
    const total = subtotal + securityFee + kilometerFee + serviceCharges;

    return {
      items: currentItems,
      subtotal,
      securityFee,
      kilometerFee,
      serviceCharges,
      total
    };
  };

  const orderSummary = calculateOrderSummary();

  const renderCartItem = (item, index) => {
    const hasCompleteInfo = hasCompleteBookingInfo(item);
    const isSelected = selectedItems.includes(item.id);
    const isAcceptedTab = activeTab === 'accepted';

    return (
      <div key={item.id || index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 mb-4">
        <div className="flex items-center space-x-4">
          {/* Selection checkbox - show for items with complete booking info OR for accepted items */}
          {(hasCompleteInfo || isAcceptedTab) && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleItemSelection(item.id)}
              className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
            />
          )}
          
          {/* Item Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
            {item.listing?.images?.[0] ? (
              <img 
                src={item.listing.images[0]} 
                alt={item.listing?.title || item.title || 'Service'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-full h-full flex items-center justify-center text-gray-400 text-xs"
              style={{ display: item.listing?.images?.[0] ? 'none' : 'flex' }}
            >
              No Image
            </div>
          </div>
          
          {/* Item Details */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {item.listing?.title || item.title || 'Service'}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-1">
                  <span className="text-gray-400 text-sm font-normal mr-1 mb-1">
                    {isAcceptedTab ? 'Accepted' : (item.status || 'In cart')}
                  </span>
                  <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="10" fill="#ec4899"/>
                    <path d="M7.5 10.5l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                    {item.vendor?.businessName ? item.vendor.businessName.charAt(0).toUpperCase() : 'V'}
                  </div>
                  <span className="text-base text-gray-900 font-medium">
                    {item.vendor?.businessName || item.vendor?.firstName || 'Service Provider'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Show booking details if available */}
            {item.tempDetails && (
              <div className="mt-2 text-xs text-gray-600">
                {item.tempDetails.eventDate && item.tempDetails.eventDate !== 'To be specified' && (
                  <div>Date: {new Date(item.tempDetails.eventDate).toLocaleDateString()}</div>
                )}
                {item.tempDetails.eventTime && (
                  <div>Time: {item.tempDetails.eventTime}</div>
                )}
                {item.tempDetails.eventLocation && item.tempDetails.eventLocation !== 'To be specified' && (
                  <div>Location: {item.tempDetails.eventLocation}</div>
                )}
              </div>
            )}
            
            {/* Show status for incomplete items */}
            {!hasCompleteInfo && !isAcceptedTab && (
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">
                  Details incomplete
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Price and Actions */}
        <div className="flex items-center space-x-4">
          {/* Show pricing only for items with complete booking info OR accepted items */}
          {(hasCompleteInfo || isAcceptedTab) && (
            <div className="text-right">
              {item.pricing?.perEvent && (
                <div className="text-lg font-bold text-gray-900">
                  ${item.pricing.perEvent}
                </div>
              )}
              {!item.pricing?.perEvent && item.pricing?.perHour && (
                <div className="text-lg font-bold text-gray-900">
                  ${item.pricing.perHour}/hr
                </div>
              )}
              {!item.pricing?.perEvent && !item.pricing?.perHour && item.pricing?.perDay && (
                <div className="text-lg font-bold text-gray-900">
                  ${item.pricing.perDay}/day
                </div>
              )}
              {/* Fallback pricing if no pricing data available */}
              {!item.pricing?.perEvent && !item.pricing?.perHour && !item.pricing?.perDay && (
                <div className="text-lg font-bold text-gray-900">
                  $300
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            {/* Edit button for incomplete items in requests tab */}
            {!isAcceptedTab && !hasCompleteInfo && (
              <button 
                className="px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg text-sm font-medium hover:bg-orange-50 transition-all" 
                onClick={() => handleEditClick(item)}
              >
                Add Details
              </button>
            )}
            
            {/* Delete button (only for requests tab) */}
            {!isAcceptedTab && (
              <button 
                onClick={() => handleDeleteItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove from cart"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
                </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const currentItems = activeTab === 'requests' ? (Array.isArray(items) ? items : []) : (Array.isArray(acceptedItems) ? acceptedItems : []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">Manage your event bookings and requests</p>
      </div>

      {/* Main Tabs: Booking Items / Sale Items */}
      <div className="flex justify-center mb-8">
        <div className="flex w-full max-w-5xl mx-auto space-x-2 bg-white rounded-xl p-1 shadow-lg">
          <button
            className={`w-1/2 px-10 py-2 rounded-xl text-base font-medium transition-all duration-200 ${mainTab === 'booking' ? 'btn-primary-mobile text-white shadow-lg' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
            onClick={() => setMainTab('booking')}
          >
            Booking Items
          </button>
          <button
            className={`w-1/2 px-10 py-2 rounded-xl text-base font-medium transition-all duration-200 ${mainTab === 'sale' ? 'btn-primary-mobile text-white shadow-lg' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
            onClick={() => setMainTab('sale')}
          >
            Sale Items
          </button>
        </div>
      </div>


      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button
            onClick={clearError}
            className="text-red-800 hover:text-red-900 underline text-sm mt-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Booking Items Implementation */}
      {mainTab === 'booking' && (
        <>
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white rounded-xl p-1 shadow-lg inline-flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'btn-primary-mobile text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          )}

          {/* Tab Content */}
          {!loading && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="col-span-2">
                {/* Select All functionality */}
                {((activeTab === 'requests' && getItemsWithCompleteInfo().length > 0) || (activeTab === 'accepted' && currentItems.length > 0)) && (
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={activeTab === 'requests' 
                          ? getItemsWithCompleteInfo().every(item => selectedItems.includes(item.id))
                          : currentItems.every(item => selectedItems.includes(item.id))
                        }
                        onChange={() => {
                          if (activeTab === 'requests') {
                            if (getItemsWithCompleteInfo().every(item => selectedItems.includes(item.id))) {
                              clearSelection();
                            } else {
                              selectAllItems();
                            }
                          } else {
                            // For accepted items
                            if (currentItems.every(item => selectedItems.includes(item.id))) {
                              clearSelection();
                            } else {
                              currentItems.forEach(item => {
                                if (!selectedItems.includes(item.id)) {
                                  toggleItemSelection(item.id);
                                }
                              });
                            }
                          }
                        }}
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Select All</span>
                    </label>
                    <span className="text-xs text-gray-500">
                      {selectedItems.length} of {activeTab === 'requests' ? getItemsWithCompleteInfo().length : currentItems.length} selected
                    </span>
                  </div>
                )}

                {currentItems.length > 0 ? (
                  currentItems.map(renderCartItem)
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Your {activeTab === 'requests' ? 'cart' : 'accepted bookings'} is empty
                    </h3>
                    <p className="text-gray-600">
                      {activeTab === 'requests' 
                        ? 'Add some items to your cart to get started!' 
                        : 'No accepted bookings found.'
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {currentItems.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    {orderSummary.items.map((item, index) => (
                      <div key={item.id || index} className="flex justify-between">
                        <span className="text-gray-600">{item.listing?.title || item.title || 'Service'}</span>
                        <span className="text-gray-900">
                          ${item.pricing?.perEvent || item.pricing?.perHour || item.basePrice || 300}
                        </span>
                      </div>
                    ))}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${orderSummary.subtotal}</span>
                    </div>
                    
                    {activeTab === 'accepted' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Security Fee</span>
                          <span className="text-gray-900">${orderSummary.securityFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Kilometer Fee</span>
                          <span className="text-gray-900">${orderSummary.kilometerFee}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Charges (10%)</span>
                      <span className="text-gray-900">${orderSummary.serviceCharges}</span>
                    </div>
                    
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">${orderSummary.total}</span>
                      </div>
                    </div>
                  </div>
                  
                  {activeTab === 'accepted' && (
                    <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="text-sm font-medium text-orange-800 mb-2">Progress Notes</h4>
                      <p className="text-xs text-orange-700 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Important: Request always extra charges will apply for the additional time.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-6 text-center">
                    {activeTab !== 'accepted' && (
                      <p className="text-xs text-orange-600 mb-2 font-medium">
                        Only Bookings with complete details will be sent.
                      </p>
                    )}
                    
                    {activeTab === 'accepted' && (
                      <>
                        <p className="text-sm text-gray-600 mb-2">Accepted payment methods:</p>
                        <div className="flex justify-center space-x-2 mb-4">
                          <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Stripe</div>
                          <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Amex</div>
                          <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">PayPal</div>
                          <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Visa</div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'accepted' ? (
                      <button className="w-full py-3 btn-primary-mobile text-white rounded-2xl font-medium hover:shadow-lg transition-all">
                        Process to Checkout
                      </button>
                    ) : (
                      <button 
                        onClick={handleSubmitBookingRequest}
                        disabled={!canSubmitBookingRequest() || submitLoading}
                        className={`w-full py-3 rounded-2xl font-medium transition-all ${
                          canSubmitBookingRequest() && !submitLoading
                            ? 'btn-primary-mobile text-white hover:shadow-lg'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {submitLoading ? 'Sending...' : 'Send Booking Request'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modals */}
          <BookNowModal
            isOpen={isBookNowModalOpen}
            onClose={() => { setIsBookNowModalOpen(false); setEditItem(null); }}
            onSuccess={handleSaveEdit}
            selectedDates={[]}
            editMode={!!editItem}
            item={editItem}
            onSaveEdit={handleSaveEdit}
            listingData={editItem?.listing}
            vendorData={editItem?.vendor}
            listingId={editItem?.listing?.id}
            vendorId={editItem?.vendor?.id}
          />
        </>
      )}

      {/* Sale Items Implementation */}
      {mainTab === 'sale' && (() => {
        // Mock sale items data
        const saleItems = [
          {
            id: 'sale1',
            title: 'Meat',
            image: 'https://via.placeholder.com/80x80?text=Decor',
            vendor: { businessName: 'Elegant Events' },
            price: 1200,
            quantity: 1
          },
          {
            id: 'sale2',
            title: 'Chairs',
            image: 'https://via.placeholder.com/80x80?text=Sound',
            vendor: { businessName: 'AudioPro' },
            price: 800,
            quantity: 2
          }
        ];

        // Only show selected items in summary
        const selectedItems = saleItems.filter((item) => selectedSaleItems.includes(item.id));
        const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const securityFee = selectedItems.length > 0 ? 25 : 0;
        const kilometerFee = selectedItems.length > 0 ? 5 : 0;
        const serviceCharges = Math.round(subtotal * 0.1);
        const total = subtotal + securityFee + kilometerFee + serviceCharges;

        return (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Sale Items List */}
            <div className="col-span-2">
              {saleItems.length > 0 ? (
                saleItems.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 mb-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedSaleItems.includes(item.id)}
                        onChange={() => handleSaleItemSelect(item.id)}
                        className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500 mr-2"
                      />
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                            {item.vendor.businessName.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-base text-gray-900 font-medium">{item.vendor.businessName}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">Quantity: {item.quantity}</div>

                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">${item.price}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No sale items found</h3>
                  <p className="text-gray-600">Add some sale items to your cart to get started!</p>
                </div>
              )}
            </div>
            {/* Order Summary & Payment */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {selectedItems.map((item, idx) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">{item.title}</span>
                    <span className="text-gray-900">${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Security Fee</span>
                  <span className="text-gray-900">${securityFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kilometer Fee</span>
                  <span className="text-gray-900">${kilometerFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charges (10%)</span>
                  <span className="text-gray-900">${serviceCharges}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="text-sm font-medium text-orange-800 mb-2">Payment</h4>
                <p className="text-xs text-orange-700 flex items-center mb-2">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Please proceed to payment to complete your purchase.
                </p>
                <p className="text-sm text-gray-600 mb-2">Accepted payment methods:</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Stripe</div>
                  <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Amex</div>
                  <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">PayPal</div>
                  <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-xs">Visa</div>
                </div>
                <button
                  className={`w-full py-3 rounded-2xl font-medium transition-all ${selectedItems.length > 0 ? 'btn-primary-mobile text-white hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  disabled={selectedItems.length === 0}
                  onClick={selectedItems.length > 0 ? handleSalePayNow : undefined}
                >
                  Pay Now
                </button>
      {/* Sale Items Pay Modal */}
      <SalePayModal
        isOpen={isSalePayModalOpen}
        onClose={() => setIsSalePayModalOpen(false)}
        userDetails={saleUserDetails}
        onChange={handleSaleUserDetailChange}
        onSubmit={handleSalePaySubmit}
      />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default AddToCart;
