import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setShowTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: 'Home', href: 'https://www.oksolar.in/' },
    { name: 'Services', href: 'https://www.oksolar.in/#services' },
    { name: 'Technical', href: 'https://www.oksolar.in/#technical' },
    { name: 'Testimonials', href: 'https://www.oksolar.in/#testimonials' },
    { name: 'Contact', href: 'https://www.oksolar.in/#contact' },
    { name: 'Our Projects', href: '/our-projects' },
    { name: 'Partner with Us', href: '/partner-with-us' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-1' : 'bg-transparent py-4'
        }`}
      >
        <div className="container flex items-center justify-between mt-0 mb-2 md:mb-4">
          <div className="flex items-center">
            <a href="https://www.oksolar.in/" aria-label="Home">
              <img
                src="/newlogo2-removebg-preview.png"
                alt="Eco Solar Logo"
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-24 w-32' : 'h-24 w-32'
                }`}
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-medium hover:text-primary-500 transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact and WhatsApp */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+919982953595"
              className={`flex items-center font-medium ${
                isScrolled ? 'text-secondary-500' : 'text-white'
              }`}
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>+91 99935 11331</span>
            </a>
            <a
              href="https://wa.me/919993511331?text=Hello%2C%20I'm%20interested%20in%20solar%20installation.%20Please%20provide%20more%20information."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="h-6 w-6"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-500"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-800 hover:text-primary-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <a
                  href="tel:+919993511331"
                  className="flex items-center font-medium text-secondary-500"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+91 99935 11331</span>
                </a>
                <a
                  href="https://wa.me/919993511331?text=Hello%2C%20I'm%20interested%20in%20solar%20installation.%20Please%20provide%20more%20information."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="h-6 w-6"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Back to Top Button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 bg-primary-500 text-white rounded-full p-3 shadow-lg hover:bg-primary-600 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default Header;