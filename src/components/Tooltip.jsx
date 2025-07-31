import React, { useState, useRef } from 'react';

/**
 * Tooltip component for custom-styled tooltips.
 * Usage:
 * <Tooltip content="Tooltip text"><button>Hover me</button></Tooltip>
 */
function Tooltip({ content, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef();

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 100);
  };
  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Positioning classes
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
    >
      {children}
      {visible && (
        <span
          className={`pointer-events-none absolute z-50 px-3 py-2 rounded-lg text-xs font-medium bg-gray-900 text-white shadow-lg whitespace-nowrap ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}

export default Tooltip; 