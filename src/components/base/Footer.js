import React from 'react';
import { Heart, Phone, Mail, MapPin, FileText, CreditCard, Shield, Facebook, Twitter, Instagram, Youtube, ArrowRight, Clock, Users, Award } from 'lucide-react';

const Footer = () => {
  const contactData = {
    email: [
      {
        name: "MangalamCT",
        email: "mangalamctm@gmail.com",
      }
    ],
    phoneNo: [
      {
        name: "MangalamCT",
        phoneNo: "+919326833121"
      },
      {
        name: "MangalamCT",
        phoneNo: "+919321837673"
      }
    ],
    address: [
      {
        name: "MangalamCT",
        address: "E-6,5th FLR 2.dimpal APT, CHS, JERBAI WADIA ROAD, parel mumbai-400012"
      }
    ],
    name: "Mangalam Charitable Trust",
    regNo: "E-0039188 (GBR)",
    panNo: "AAJTM8547M",
    ngoDarpanId: "MH/2025/0522249",
    description: "Mangalam Charitable Trust is a non-profit organization dedicated to improving the lives of underprivileged communities through education, healthcare, and social welfare initiatives. Our mission is to empower individuals and families by providing them with the resources and support they need to lead better lives."
  };

  const quickLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Programs', href: '/programs' },
    { name: 'Impact Stories', href: '/impact' },
    { name: 'Get Involved', href: '/volunteer' },
    { name: 'Donate Now', href: '/donation' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const programs = [
    { name: 'Education Support', href: '/' },
    { name: 'Healthcare Services', href: '/' },
    { name: 'Women Empowerment', href: '/' },
    { name: 'Child Welfare', href: '/' },
    { name: 'Senior Care', href: '/' },
    { name: 'Emergency Relief', href: '/' }
  ];

  const legalPages = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Refund Policy', href: '/refund-policy' },
    // { name: 'Annual Reports', href: '/' },
    // { name: 'Financial Transparency', href: '/' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/15nga7cTNJ/', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '/', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/trustmanglamcharitable?utm_source=qr&igsh=bXQ4MGY4djBlcW5s', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@MANGALAMCT', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-[5%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Organization Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                  <Shield className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  {contactData.name}
                </h3>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-400">Verified NGO</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {contactData.description}
            </p>

    
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Our Programs</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <a
                    href={program.href}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm">{program.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            
            {/* Contact Information */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {contactData.address[0].address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-red-400" />
                <div className="text-sm text-gray-300">
                  <div>{contactData.phoneNo[0].phoneNo}</div>
                  <div className="text-xs text-gray-400">{contactData.phoneNo[1].phoneNo}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">{contactData.email[0].email}</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-medium mb-3 text-gray-200">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target='_blank'
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${social.color} hover:bg-gray-700`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold mb-3 text-white">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to our newsletter to receive updates on our programs, impact stories, and volunteer opportunities.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2025 {contactData.name}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Registered under the Society Registration Act, 1860
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-xs">
              {legalPages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                >
                  {page.name}
                </a>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-center">
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm">1000+ Lives Impacted</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">15+ Years of Service</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm">100% Transparent</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;