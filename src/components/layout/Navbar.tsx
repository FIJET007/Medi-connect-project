import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePrescriptions } from '../../context/PrescriptionContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { notifications } = usePrescriptions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-3 px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="text-primary" size={24} />
            <span className="text-xl font-bold text-primary">MediConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary font-medium">
                  Dashboard
                </Link>
                <Link to="/prescriptions" className="text-gray-700 hover:text-primary font-medium">
                  My Prescriptions
                </Link>
                <Link to="/pharmacies" className="text-gray-700 hover:text-primary font-medium">
                  Pharmacies
                </Link>
                <div className="flex items-center gap-4">
                  <Link to="/notifications" className="relative">
                    <Bell size={20} className="text-gray-700" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-error text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-primary">
                    <User size={20} />
                  </Link>
                  <button onClick={handleLogout} className="btn-outline">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-700 hover:text-primary font-medium">
                  Log In
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 animate-slide-up">
          <div className="flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/prescriptions" 
                  className="text-gray-700 hover:text-primary font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Prescriptions
                </Link>
                <Link 
                  to="/pharmacies" 
                  className="text-gray-700 hover:text-primary font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pharmacies
                </Link>
                <Link 
                  to="/notifications" 
                  className="text-gray-700 hover:text-primary font-medium py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notifications
                  {unreadNotifications > 0 && (
                    <span className="bg-error text-white text-xs px-2 py-1 rounded-full">
                      {unreadNotifications} new
                    </span>
                  )}
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-primary font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button onClick={handleLogout} className="btn-primary mt-2">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Link 
                  to="/login" 
                  className="btn-outline w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-primary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;