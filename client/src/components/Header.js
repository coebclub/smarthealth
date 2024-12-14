import React, { useEffect, useState } from 'react';
import { FaAmbulance, FaBars, FaSignOutAlt, FaTachometerAlt, FaTimes, FaTint } from 'react-icons/fa'; // Importing icons
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  // Check if the user is logged in on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a link is clicked in mobile view
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setIsLoggedIn(false); // Update state
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top sticky-top" style={{ backgroundColor: '#1b558b' }}>
      <div className="container">
        <Link className="navbar-brand title-animate" to="/homepage" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Smart Healthcare System
        </Link>

        {/* Hamburger icon (only visible on smaller devices) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}  // Toggling the menu open/close
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          {isMenuOpen ? (
            <FaTimes size={30} color="#fff" />  // Cross icon when menu is open
          ) : (
            <FaBars size={30} color="#fff" />  // Hamburger icon when menu is closed
          )}
        </button>

        {/* Normal navbar for large devices */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/dashboard" style={{ padding: '10px 15px' }}>
                    <FaTachometerAlt className="me-2" size={20} />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/blood-donation" style={{ padding: '10px 15px' }}>
                    <FaTint className="me-2" size={20} />
                    Blood Donation
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/accident-detection" style={{ padding: '10px 15px' }}>
                    <FaAmbulance className="me-2" size={20} />
                    Accident Detection
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/" style={{ padding: '10px 15px' }} onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" size={20} />
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* <li className="nav-item">
                  <Link className="nav-link text-animate" to="/" style={{ padding: '10px 15px' }}>
                    Login
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/register" style={{ padding: '10px 15px' }}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Sidebar for mobile view */}
        <div
          className={`navbar-collapse ${isMenuOpen ? 'slide-in' : ''}`} 
          id="navbarNav"
          style={{
            position: 'fixed',
            top: 0,
            left: isMenuOpen ? '0' : '-100%',  // Position it off-screen to the left when closed
            width: '250px', // Set a fixed width for the sidebar
            height: '100%',
            backgroundColor: '#1b558b',
            transition: 'left 0.3s ease-in-out',  // Smooth transition for the sliding effect
            zIndex: '1050'  // Ensure it's on top of other content
          }}
        >
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/dashboard" style={{ padding: '10px 15px' }} onClick={closeMenu}>
                    <FaTachometerAlt className="me-2" size={20} />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/blood-donation" style={{ padding: '10px 15px' }} onClick={closeMenu}>
                    <FaTint className="me-2" size={20} />
                    Blood Donation
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/accident-detection" style={{ padding: '10px 15px' }} onClick={closeMenu}>
                    <FaAmbulance className="me-2" size={20} />
                    Accident Detection
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/" style={{ padding: '10px 15px' }} onClick={() => { handleLogout(); closeMenu(); }}>
                    <FaSignOutAlt className="me-2" size={20} />
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/login" style={{ padding: '10px 15px' }} onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-animate" to="/register" style={{ padding: '10px 15px' }} onClick={closeMenu}>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
