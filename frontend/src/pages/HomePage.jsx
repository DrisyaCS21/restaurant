import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScanQR = () => {
    const table = prompt('Please enter your table number:');
    if (table && !isNaN(table) && table > 0) {
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🍽️</span>
            <span className="logo-text">Brother's Kitchen</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#dining" onClick={(e) => { e.preventDefault(); scrollToSection('dining'); }}>Dining</a></li>
            <li><a href="#banquet" onClick={(e) => { e.preventDefault(); scrollToSection('banquet'); }}>Banquet</a></li>
            <li>
              <Link to="/auth">Login</Link>
            </li>
            <li><a href="#access-menu" onClick={(e) => { e.preventDefault(); scrollToSection('access-menu'); }}>Order Now</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title animate-fade-in">
            Welcome to <span className="highlight">Brother's Kitchen</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-delay">
            Experience Culinary Excellence in an Elegant Ambiance
          </p>
          <button 
            onClick={() => navigate("/dashboard")} 
            className="cta-button animate-fade-in-delay-2"
          >
            View Our Menu
          </button>
        </div>
      </section>

      {/* Dining Areas Section */}
      <section id="dining" className="dining-section">
        <div className="container">
          <h2 className="section-title">Our Dining Spaces</h2>
          <p className="section-subtitle">Experience luxury dining in beautifully designed spaces</p>
          
          <div className="dining-grid">
            <div className="dining-card">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800" alt="Main Dining Hall" />
                <div className="card-overlay">
                  <span className="card-tag">Fine Dining</span>
                </div>
              </div>
              <h3>Main Dining Hall</h3>
              <p>Elegant indoor dining with ambient lighting and comfortable seating</p>
            </div>

            <div className="dining-card">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" alt="Outdoor Terrace" />
                <div className="card-overlay">
                  <span className="card-tag">Al Fresco</span>
                </div>
              </div>
              <h3>Garden Terrace</h3>
              <p>Beautiful outdoor seating surrounded by lush greenery</p>
            </div>

            <div className="dining-card">
              <div className="card-image">
                <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800" alt="Private Room" />
                <div className="card-overlay">
                  <span className="card-tag">Private</span>
                </div>
              </div>
              <h3>Private Rooms</h3>
              <p>Intimate spaces for special occasions and business meetings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banquet Hall Section */}
      <section id="banquet" className="banquet-section">
        <div className="container">
          <h2 className="section-title">Grand Banquet Hall</h2>
          <p className="section-subtitle">Perfect venue for weddings, parties, and corporate events</p>
          
          <div className="banquet-showcase">
            <div className="banquet-featured">
              <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200" alt="Grand Banquet Hall" />
              <div className="banquet-info">
                <h3>Royal Banquet Hall</h3>
                <p>Capacity up to 500 guests | State-of-the-art facilities</p>
                <div className="banquet-features">
                  <span>🎵 Premium Sound System</span>
                  <span>💡 LED Lighting</span>
                  <span>📺 Projector Screens</span>
                  <span>🍽️ Customized Catering</span>
                </div>
              </div>
            </div>
            
            <div className="banquet-gallery">
              <div className="gallery-item">
                <img src="https://images.squarespace-cdn.com/content/v1/611cbe4f49881e4816761031/1748913166263-7HBUPVICYKA8ORMZMNTQ/TCBWeddingsCapturedByPeta-82.jpg" alt="Wedding Setup" />
                <p>Wedding Receptions</p>
              </div>
              <div className="gallery-item">
                <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600" alt="Corporate Event" />
                <p>Corporate Events</p>
              </div>
              <div className="gallery-item">
                <img src="https://www.sn2r.com/wp-content/uploads/2022/08/PRIVATE-EVENTS-21ST-BIRTHDAY-86.jpg" alt="Birthday Party" />
                <p>Private Celebrations</p>
              </div>
              <div className="gallery-item">
                <img src="https://www.thelittlevegaschapel.com/wp-content/uploads/marriage-proposal-ideas.jpg" alt="Birthday Party" />
                <p>Special Surprise Proposal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Menu Section */}
      <section id="access-menu" className="access-menu-section">
        <div className="container">
          <h2 className="section-title">Ready to Order?</h2>
          <p className="section-subtitle">Scan the QR code on your table or enter your table number below</p>
          
          <div className="access-container">
            <div className="qr-card">
              {/* <div className="qr-icon-large">📱</div> */}
              <h3>Scan QR Code</h3>
              <p>Found on your table</p>
              <button onClick={handleScanQR} className="qr-button">
                Simulate QR Scan
              </button>
            </div>

            <div className="divider-line">
              <span>or</span>
            </div>

            <div className="manual-card">
              <h3>Enter Table Number</h3>
              <form onSubmit={handleManualEntry}>
                <input
                  type="number"
                  placeholder="Table number (e.g., 1, 2, 3...)"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="table-input-elegant"
                  min="1"
                  required
                />
                <button type="submit" className="menu-access-button">
                  Access Menu →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Brother's Kitchen</h4>
              <p>Fine dining experience in the heart of the city</p>
            </div>
            <div className="footer-section">
              <h4>Hours</h4>
              <p>Monday - Sunday</p>
              <p>11:00 AM - 11:00 PM</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📞 +1 234 567 890</p>
              <p>✉️ info@Brotherskitchen.com</p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <span>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
               </span>
                <span>
                <a 
                  href="https://www.linkedin.com/in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
               </span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Brother's Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;