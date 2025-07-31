import React, { useState } from 'react';
import ClientLogin from './ClientLogin';
import VendorLogin from './VendorLogin';

const AuthModal = ({ isOpen, onClose, initialType = 'client' }) => {
  const [authType, setAuthType] = useState(initialType);

  if (!isOpen) return null;

  const handleSwitchToVendor = () => {
    setAuthType('vendor');
  };

  const handleSwitchToClient = () => {
    setAuthType('client');
  };

  return (
    <>
      {authType === 'client' && (
        <ClientLogin
          onClose={onClose}
          onSwitchToVendor={handleSwitchToVendor}
        />
      )}
      {authType === 'vendor' && (
        <VendorLogin
          onClose={onClose}
          onSwitchToClient={handleSwitchToClient}
        />
      )}
    </>
  );
};

export default AuthModal;
