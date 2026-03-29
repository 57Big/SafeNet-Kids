import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation bar component
 */
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span>🛡️</span>
            <span>SafeNet Kids</span>
          </Link>

          <ul className="navbar-links">
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
              >
                Bosh sahifa
              </Link>
            </li>
            <li>
              <Link
                to="/analyze"
                className={location.pathname === '/analyze' ? 'active' : ''}
              >
                Matn tahlili
              </Link>
            </li>
            <li>
              <Link
                to="/website-filter"
                className={location.pathname === '/website-filter' ? 'active' : ''}
              >
                Sayt filtri
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === '/about' ? 'active' : ''}
              >
                Loyiha haqida
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className={location.pathname === '/admin' ? 'active' : ''}
              >
                Admin panel
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
