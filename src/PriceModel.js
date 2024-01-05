import React from 'react';

function PriceModal({ onClose, price }) {
  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>Current Price of Bitcoin</h2>
        <p>${price}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const modalContentStyles = {
  textAlign: 'center',
};

export default PriceModal;
