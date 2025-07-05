"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Heart, FileText, CreditCard, Shield, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { contactData } from '../../../public/data/Constent';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px
        setShowHeader(false);
      } else {
        // Scrolling up or at top
        setShowHeader(true);
      }
      
      // Set scrolled state for styling - only when scrolled past the top bar
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'Programs', href: '/programs' },
    { name: 'Impact', href: '/impact' },
    { name: 'Get Involved', href: '/volunteer' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="relative">
      {/* Top Credentials & Contact Bar - Only visible when at top */}
      <div className={`bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-3 px-4 transition-all duration-300 ${
        isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
      }`}>
        <div className="w-full px-[5%] mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center">
            {/* Left - Registration Details */}
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Reg: {contactData.regNo}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">PAN: {contactData.panNo}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="font-medium">NGO ID: {contactData.ngoDarpanId}</span>
              </div>
            </div>

            {/* Right - Contact Details */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 hover:bg-white/10 px-2 py-1 rounded transition-all">
                <Phone className="w-4 h-4" />
                <span>{contactData.phoneNo[0].phoneNo}</span>
              </div>
              <div className="flex items-center space-x-2 hover:bg-white/10 px-2 py-1 rounded transition-all">
                <Mail className="w-4 h-4" />
                <span>{contactData.email[0].email}</span>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-xs">
                <div className="bg-white/10 px-2 py-1 rounded">
                  <span className="font-medium">Reg: {contactData.regNo}</span>
                </div>
                <div className="bg-white/10 px-2 py-1 rounded">
                  <span className="font-medium">PAN: {contactData.panNo}</span>
                </div>
              </div>
              <button
                onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                className="flex items-center space-x-1 text-sm hover:bg-white/10 px-2 py-1 rounded transition-all"
              >
                <span>Contact</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Mobile Contact Dropdown */}
            {isContactDropdownOpen && (
              <div className="mt-3 bg-white/10 rounded-lg p-3 space-y-2 text-sm animate-slideDown">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{contactData.phoneNo[0].phoneNo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{contactData.email[0].email}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-tight">{contactData.address[0].address}</span>
                </div>
                <div className="flex items-center space-x-2 pt-1 border-t border-white/20">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">NGO ID: {contactData.ngoDarpanId}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - Fixed with animations */}
      <div className={`${isScrolled ? 'fixed' : 'sticky'} top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-red-100' 
          : 'bg-white shadow-lg border-b-2 border-red-100'
      }`}>
        <div className="w-full mx-auto px-[5%]">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-3'
          }`}>
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className={`bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isScrolled ? 'w-10 h-10' : 'w-14 h-14'
                }`}>
                  <Heart className={`text-white transition-all duration-300 ${
                    isScrolled ? 'w-5 h-5' : 'w-7 h-7'
                  }`} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Shield className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className={`font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled ? 'text-lg lg:text-xl' : 'text-2xl lg:text-3xl'
                }`}>
                  {contactData.name}
                </h1>
                <div className={`flex items-center space-x-2 mt-1 transition-all duration-300 ${
                  isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-10'
                }`}>
                  <p className="text-sm text-gray-600 hidden sm:block">Making a Difference Together</p>
                  <div className="hidden md:flex items-center space-x-1 bg-green-100 px-2 py-0.5 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-700 font-medium">Verified NGO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group py-2"
                >
                  <span>
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </nav>

            {/* Action Buttons & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* Quick Contact Info when scrolled */}
              {isScrolled && (
                <div className="hidden xl:flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full animate-fadeIn">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-gray-700">{contactData.phoneNo[0].phoneNo}</span>
                </div>
              )}

              {/* Donation Button */}
              <Link href={"/donation"}>
              <button className={`bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center cursor-pointer space-x-2 ${
                isScrolled ? 'px-3 lg:px-4 py-1.5 lg:py-2' : 'px-4 lg:px-6 py-2 lg:py-2.5'
              }`}>
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Donate Now</span>
                <span className="sm:hidden">Donate</span>
              </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 mobile-menu-container"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg animate-slideDown mobile-menu-container">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-red-600 font-medium py-3 px-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Contact & Registration Info */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>{contactData.phoneNo[0].phoneNo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>{contactData.phoneNo[1].phoneNo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-red-600" />
                      <span>{contactData.email[0].email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 mb-2">Registration Details</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Reg No:</strong> {contactData.regNo}</div>
                    <div><strong>PAN:</strong> {contactData.panNo}</div>
                    <div><strong>NGO ID:</strong> {contactData.ngoDarpanId}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer to prevent content jump - only when fixed */}
      {isScrolled && <div className="h-16"></div>}

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;