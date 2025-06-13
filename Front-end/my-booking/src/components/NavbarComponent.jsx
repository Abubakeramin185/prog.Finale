import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';



export default function NavbarComponent({ isLoggedIn = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Chiudi il menu se clicco fuori
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll lock su mobile
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);
  const hanleRegistraLatuaStrutturaClick = () =>{
    navigate("registralatuastruttura")
  }
  const handleLoginClick = () => {
  navigate("/login");
};

const handleRegisterClick = () => {
  navigate("/register");
};

  return (
    <>
    
    <header className="booking-header">
      <div className="booking-container">
        <div className="booking-nav" ref={menuRef} role="navigation" aria-label="Main navigation">

          {/* Logo */}
          <div className="booking-logo ms-auto">
            <span className="booking-logo-icon">🏨</span>
            <span className="booking-logo-text">Miraviglia.Tripicale@com</span>
          </div>

          {/* Hamburger button */}
          <button
            className="booking-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
          >
            <span className={`booking-hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="booking-nav-desktop">
            {['/hotels', '/flights', '/cars', '/activities'].map((path, i) => {
              const labels = [' 🏠Alloggi ', ' ✈️Voli', ' 🚗 Noleggio auto', '🎯  Attrazioni'];
              return (
                <Link
                  key={path}
                  to={path}
                  className={`booking-nav-link ${location.pathname === path ? 'active' : ''}`}
                  aria-current={location.pathname === path ? 'page' : undefined}
                >
                  {labels[i]}
                </Link>
              );
            })}

            {!isLoggedIn ? (
              <>
                <Link to="/" className="booking-nav-link"></Link>
                <Link to="/" className="booking-nav-link"></Link>
              </>
            ) : (
              <div className="booking-user-dropdown">
                <PersonCircle size={20} />
                <div className="dropdown-content">
                  <Link to="/profile">Profilo</Link>
                  <Link to="/bookings">Prenotazioni</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Menu */}
          <div className={`booking-mobile-menu ${isMenuOpen ? 'open' : ''}`} id="mobile-menu">
            <nav className="booking-mobile-nav">
              <Link to="/" className="booking-mobile-link"></Link>
              <Link to="/" className="booking-mobile-link"></Link>
              <Link to="/" className="booking-mobile-link"></Link>
              <Link to="/activities" className="booking-mobile-link"></Link>

              {!isLoggedIn ? (
                <div className="booking-mobile-auth">
                   <Link to="/Registra la tua struttura" className="booking-btn booking-btn-primary booking-btn-full">
                   <button onClick={hanleRegistraLatuaStrutturaClick}>Registra la tua struttura</button></Link>
                    <Link to="/Register" className="booking-btn booking-btn-primary booking-btn-full"><button onClick={handleRegisterClick}>Iscriviti</button></Link>
                  <Link to="/Login" className="booking-btn booking-btn-secondary booking-btn-full"><button onClick={handleLoginClick}>Login</button></Link>
                 
                </div>
              ) : (
                <div className="booking-mobile-auth">
                  <Link to="/profile">Profilo</Link>
                  <Link to="/bookings">Prenotazioni</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}

