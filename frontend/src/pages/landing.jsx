import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [tableNumber, setTableNumber] = useState('');
  const navigate = useNavigate();

  const handleScanQR = () => {
    // In a real scenario, the QR code would contain the table number
    // For demo purposes, let's use a prompt
    const table = prompt('Please enter your table number:');
    if (table && !isNaN(table)) {
      navigate(`/menu?table=${table}`);
    } else if (table) {
      alert('Please enter a valid table number');
    }
  };

  const handleManualEntry = (e) => {
    e.preventDefault();
    if (tableNumber && tableNumber > 0) {
      navigate(`/menu?table=${tableNumber}`);
    } else {
      alert('Please enter a valid table number');
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="restaurant-name">🍽️ Drisya's Kitchen</h1>
        <p className="tagline">Experience the taste of authentic cuisine</p>
      </div>

      <div className="content-section">
        <div className="qr-section">
          <div className="qr-placeholder">
            <div className="qr-icon">📱</div>
            <p>Scan QR code on your table</p>
          </div>
          <button onClick={handleScanQR} className="scan-btn">
            Scan QR Code
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="manual-section">
          <h3>Enter your table number manually</h3>
          <form onSubmit={handleManualEntry}>
            <input
              type="number"
              placeholder="Table number (e.g., 1, 2, 3...)"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="table-input"
              min="1"
              required
            />
            <button type="submit" className="menu-btn">
              View Menu →
            </button>
          </form>
        </div>

        <div className="info-section">
          <div className="feature">
            <span>✨</span>
            <p>No app download needed</p>
          </div>
          <div className="feature">
            <span>🚀</span>
            <p>Instant ordering</p>
          </div>
          <div className="feature">
            <span>💳</span>
            <p>Secure payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;