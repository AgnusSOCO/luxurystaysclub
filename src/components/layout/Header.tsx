import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, Home } from 'lucide-react';
import Button from '../ui/Button';
import { useAdmin } from '../../context/AdminContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin, clearAccess } = useAdmin();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${
    isHomePage
      ? isScrolled
        ? 'bg-white shadow-md py-3'
        : 'bg-transparent py-5'
      : 'bg-white shadow-md py-3'
  }`;

  const linkClass = `transition-colors duration-200 ${
    isHomePage && !isScrolled ? 'text-white hover:text-gold-300' : 'text-slate-800 hover:text-blue-800'
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Home className={`mr-2 ${isHomePage && !isScrolled ? 'text-white' : 'text-blue-900'}`} size={28} />
            <span className={`font-serif text-2xl font-bold ${isHomePage && !isScrolled ? 'text-white' : 'text-blue-900'}`}>
              Luxury Stays Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${linkClass} ${location.pathname === '/' ? 'font-semibold' : ''}`}>
              Home
            </Link>
            <Link to="/properties" className={`${linkClass} ${location.pathname === '/properties' ? 'font-semibold' : ''}`}>
              Properties
            </Link>
            <Link to="/admin" className={`${linkClass} ${location.pathname === '/admin' ? 'font-semibold' : ''}`}>
              Manage Properties
            </Link>
            {isAdmin && (
              <Button
                variant={isHomePage && !isScrolled ? "outline" : "secondary"}
                size="sm"
                onClick={clearAccess}
              >
                Exit Admin
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={28} className={isHomePage && !isScrolled ? 'text-white' : 'text-slate-800'} />
            ) : (
              <Menu size={28} className={isHomePage && !isScrolled ? 'text-white' : 'text-slate-800'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-xl mt-2 py-4 px-4 absolute left-4 right-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-slate-800 hover:text-blue-800 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/properties"
                className="text-slate-800 hover:text-blue-800 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                to="/admin"
                className="text-slate-800 hover:text-blue-800 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Manage Properties
              </Link>
              {isAdmin && (
                <button
                  onClick={() => {
                    clearAccess();
                    setMobileMenuOpen(false);
                  }}
                  className="text-slate-800 hover:text-blue-800 font-medium text-left"
                >
                  Exit Admin
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;