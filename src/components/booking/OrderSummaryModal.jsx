import React from 'react';

const OrderSummaryModal = ({ isOpen, onClose, onDownloadPDF }) => {
  if (!isOpen) return null;

  const orderData = {
    orderId: 'ORD-003',
    clientName: 'Global Supply Co',
    phone: '+1-234-567-8903',
    totalPrice: 2100.00,
    timeline: [
      {
        id: 'request-sent',
        title: 'Request Sent',
        description: 'Client sent order request',
        time: '2025-01-07 07:45',
        status: 'completed',
        actor: 'Client'
      },
      {
        id: 'order-accepted',
        title: 'Order Accepted',
        description: 'Vendor accepted the order',
        time: '2025-01-07 09:00',
        status: 'completed',
        actor: 'Vendor'
      },
      {
        id: 'picked-up',
        title: 'Picked Up',
        description: 'Order picked up from location',
        time: '2025-01-14 11:15',
        status: 'completed',
        actor: 'Driver'
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Order delivered to destination',
        time: '',
        status: 'pending',
        actor: ''
      },
      {
        id: 'received',
        title: 'Received',
        description: 'Client confirmed receipt',
        time: '',
        status: 'pending',
        actor: ''
      },
      {
        id: 'completed',
        title: 'Completed',
        description: 'Total Price: $2100.00',
        time: '',
        status: 'pending',
        actor: ''
      }
    ]
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') {
      return (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      );
    }
  };

  const getActorBadge = (actor) => {
    const colors = {
      'Client': 'bg-blue-100 text-blue-800',
      'Vendor': 'bg-orange-100 text-orange-800',
      'Driver': 'bg-green-100 text-green-800'
    };
    
    if (!actor) return null;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[actor] || 'bg-gray-100 text-gray-800'}`}>
        {actor}
      </span>
    );
  };

  const handleDownloadPDF = () => {
    onDownloadPDF();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto mx-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Order Mapping - TRK001</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gradient-brand text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Information */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                On the way
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order ID:</span>
                <span className="text-sm font-medium text-gray-900">{orderData.orderId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Client Name:</span>
                <span className="text-sm font-medium text-gray-900">{orderData.clientName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Phone:</span>
                <span className="text-sm font-medium text-gray-900">{orderData.phone}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Price:</span>
                <span className="text-lg font-bold text-gray-900">${orderData.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
            
            <div className="space-y-4">
              {orderData.timeline.map((item, index) => (
                <div key={item.id} className="flex items-start space-x-3">
                  {/* Status Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  
                  {/* Timeline Line */}
                  {index < orderData.timeline.length - 1 && (
                    <div className="absolute left-[30px] mt-8 w-0.5 h-8 bg-gray-200"></div>
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                      {getActorBadge(item.actor)}
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-1">{item.description}</p>
                    
                    {item.time && (
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    )}
                    
                    {item.status === 'pending' && (
                      <div className="flex items-center space-x-1 mt-1">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-gray-500">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Notes */}
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-orange-800 mb-1">Progress Notes</h4>
                <p className="text-xs text-orange-700">
                  Order is in progress. Next phase will be marked as completed once the current step is finished.
                </p>
              </div>
            </div>
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            className="w-full py-3 bg-gradient-brand text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryModal;
