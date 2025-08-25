import React, { useRef } from "react";

const TrackOrderModal = ({ open, onClose, order, onDownload }) => {
  console.log("TrackOrderModal order:", order);

  const modalRef = useRef(null);
  if (!open || !order) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto mx-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
        <button
          className="absolute top-4 right-4 bg-gradient-to-b from-secondary via-primary-500 to-primary-600 text-white rounded-xl w-8 h-8 flex items-center justify-center shadow-lg"
          onClick={onClose}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-6">Order Mapping – {order.trackingId}</h2>
        {/* Order Information */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <div className="font-semibold text-lg mb-2">Order Information</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-medium">Order ID:</span> {order.orderId}</div>
            <div className="text-sm text-gray-700 mb-1"><span className="font-medium">Client Name:</span> {order.clientName}</div>
            <div className="text-sm text-gray-700"><span className="font-medium">Phone:</span> {order.phone}</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-600 mb-2">{order.statusLabel}</span>
            <div className="text-lg font-bold">Total Price: <span className="text-2xl">{order.totalPrice}</span></div>
          </div>
        </div>
        {/* Order Timeline */}
        <div className="mb-6">
          <div className="font-bold text-xl mb-4">Order Timeline</div>
          <div className="space-y-6">
            {order.timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1
                    ${step.completed ? 'bg-green-400 text-gray' : 'bg-green-500 text-white '}
                  `}>
                    {step.icon}
                  </div>
                  {idx < order.timeline.length - 1 && (
                    <div className={`w-1 h-10 ${step.completed ? 'bg-green-300' : 'bg-green-600'}`}></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold ${step.completed ? 'text-green-600' : 'text-gray-700'}`}>{step.title}</div>
                  <div className="text-xs text-gray-500 mb-1">{step.description}</div>
                  <div className="flex items-center gap-2 text-xs">
                    {step.label && <span className={`inline-block px-2 py-0.5 rounded-full font-medium ${step.labelColor}`}>{step.label}</span>}
                    {step.date && <span className="text-gray-400 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{step.date}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Progress Notes */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="font-bold mb-2">Progress Notes</div>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span role="img" aria-label="hourglass">⏳</span>
            {order.progressNote}
          </div>
        </div>
        <button
          className="w-full py-3 rounded-2xl btn-primary-mobile text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          onClick={onDownload}
        >
          <img src="/assets/Downlaod.svg" alt="Download" className="w-5 h-5" />
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default TrackOrderModal; 