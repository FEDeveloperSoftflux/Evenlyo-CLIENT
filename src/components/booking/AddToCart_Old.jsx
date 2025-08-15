import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookNowModal from './BookNowModal';
import api from '../../store/api';
import { endPoints } from '../../constants/api';
import { useCartReducer } from './useCartReducer';

const AddToCart = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  
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

  // Calculate totals dynamically
  const currentItems = activeTab === 'requests' ? cartItems : acceptedItems;
  const subtotal = currentItems.reduce((sum, item) => sum + item.price, 0);
  const securityFee = activeTab === 'accepted' ? 25 : 0;
  const kilometerFee = activeTab === 'accepted' ? 5 : 0;
  const serviceCharges = Math.round(subtotal * 0.1); // 10% service charges
  const total = subtotal + securityFee + kilometerFee + serviceCharges;

  // Remove item from cart
  const removeFromCart = (itemId) => {
    if (activeTab === 'requests') {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } else {
      setAcceptedItems(acceptedItems.filter(item => item.id !== itemId));
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsBookNowModalOpen(true);
  };

  // Save handler for BookNowModal in edit mode
  const handleSaveEdit = ({ dates, startTime, endTime }) => {
    setCartItems(prev => prev.map(ci =>
      ci.id === editItem.id ? { ...ci, dates, startTime, endTime, edited: true } : ci
    ));
    setIsBookNowModalOpen(false);
    setEditItem(null);
  };

  const renderCartItem = (item) => (
    <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 mb-4">
      <div className="flex items-center space-x-4">
        {/* Item Image */}
        <div className="w-20 h-20 rounded-lg overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/assets/placeholder.jpg";
            }}
          />
        </div>
        {/* Item Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-1">
                <span className="text-gray-400 text-sm font-normal mr-1 mb-1">In stock</span>
                <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#ec4899"/>
                  <path d="M7.5 10.5l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className="flex items-center space-x-2">
                <img src="/assets/jaydeep.png" alt="Jaydeep" className="w-6 h-6 rounded-full object-cover" />
                <span className="text-base text-gray-900 font-medium">Jaydeep</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Price and Actions */}
      <div className="flex items-center space-x-4">
        {/* Show only total price for detailed bookings */}
        {item.type === 'detailed' && (
          <span className="text-xl font-bold text-gray-900">${item.totalPrice}</span>
        )}
        {/* Show bill amount for edited simple bookings, styled like detailed */}
        {item.type === 'simple' && item.edited && (
          <span className="text-xl font-bold text-gray-900">${item.price * (item.dates?.length || 1)}</span>
        )}
        {/* Show selected dates and times for simple bookings only if not edited */}
        {item.type === 'simple' && !item.edited && item.dates && item.dates.length > 0 && (
          <div className="flex flex-col text-xs text-gray-700">
            <span className="font-semibold">Dates:</span>
            <span>
              {item.dates.map((d, i) => {
                const dateObj = typeof d === 'string' ? new Date(d) : d;
                return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + (i < item.dates.length - 1 ? ', ' : '');
              })}
            </span>
            {item.dates.length === 1 && (
              <span>
                <span className="font-semibold">Time: </span>
                {item.startTime || '--'} - {item.endTime || '--'}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center space-x-2">
          {/* Action button based on type */}
          {activeTab === 'requests' && (
            item.type === 'simple' && !item.edited && (
              <button className="px-4 py-2 border btn-primary-mobile rounded-lg text-sm font-medium hover:bg-pink-50 transition-all" onClick={() => handleEditClick(item)}>
                Edit
              </button>
            )
          )}
          <button 
            onClick={() => removeFromCart(item.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove from cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Cart</h1>
        <p className="text-gray-600">Manage your event bookings and requests</p>
      </div>

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

      {/* Tab Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="col-span-2">
          {currentItems.length > 0 ? (
            currentItems.map(renderCartItem)
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some items to your cart to get started!</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {currentItems.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {currentItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">{item.title}</span>
                  <span className="text-gray-900">${item.price}</span>
                </div>
              ))}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${subtotal}</span>
              </div>
              
              {activeTab === 'accepted' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Fee</span>
                    <span className="text-gray-900">${securityFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kilometer Fee</span>
                    <span className="text-gray-900">${kilometerFee}</span>
                  </div>
                </>
              )}
              
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
                <p className="text-xs text-orange-600 mb-2 font-medium">Only Bookings with complete details will be sent.</p>
              )}
              {activeTab === 'accepted' && (
                <>
                  <p className="text-sm text-gray-600 mb-2">Accepted payment methods:</p>
                  <div className="flex justify-center space-x-2 mb-4">
                    <img src="/assets/stripe.png" alt="Stripe" className="h-8" />
                    <img src="/assets/amex.png" alt="Amex" className="h-8" />
                    <img src="/assets/paypal.png" alt="PayPal" className="h-8" />
                    <img src="/assets/visa.png" alt="Visa" className="h-8" />
                  </div>
                </>
              )}
              {activeTab === 'accepted' ? (
                <button className="w-full py-3 btn-primary-mobile text-white rounded-2xl font-medium hover:shadow-lg transition-all">
                  Process to Checkout
                </button>
              ) : (
                <button className="w-full py-3 btn-primary-mobile text-white rounded-2xl font-medium hover:shadow-lg transition-all">
                  Send Booking Request
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <BookNowModal
        isOpen={isBookNowModalOpen}
        onClose={() => { setIsBookNowModalOpen(false); setEditItem(null); }}
        onSuccess={() => setIsBookNowModalOpen(false)}
        selectedDates={[]}
        editMode={!!editItem}
        item={editItem}
        onSaveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default AddToCart;
