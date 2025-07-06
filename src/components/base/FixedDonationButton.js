"use client"
import React, { useState, useEffect } from 'react';
import { Heart, X, IndianRupee, Gift, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

const FixedDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Pulse animation every 10 seconds
    const pulseInterval = setInterval(() => {
      if (!isExpanded) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }
    }, 10000);

    return () => clearInterval(pulseInterval);
  }, [isExpanded]);

  const donationAmounts = [
    { amount: 500, label: "₹500", description: "Help a family" },
    { amount: 1000, label: "₹1000", description: "Support education" },
    { amount: 2500, label: "₹2500", description: "Healthcare aid" },
    { amount: 5000, label: "₹5000", description: "Community support" }
  ];

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      {/* Expanded Donation Panel */}
      <div className={`absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl border border-red-100 p-6 min-w-[320px] transition-all duration-300 transform ${
        isExpanded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Make a Donation</h3>
              <p className="text-xs text-gray-600">Every contribution counts</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Quick Donation Amounts */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {donationAmounts.map((item, index) => (
            <Link key={index} href={`/donation?amount=${item.amount}`}>
              <button className="group w-full p-3 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 rounded-xl border border-red-200 transition-all duration-200 hover:shadow-md">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4 text-red-600" />
                  <span className="font-semibold text-gray-800">{item.label}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 group-hover:text-gray-700">{item.description}</p>
              </button>
            </Link>
          ))}
        </div>

        {/* Custom Amount Button */}
        <Link href="/donation">
          <button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
            <Gift className="w-4 h-4" />
            <span>Custom Amount</span>
          </button>
        </Link>

        {/* Impact Stats */}
        <div className="mt-4 pt-4 border-t border-red-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1 text-gray-600">
              <Users className="w-3 h-3" />
              <span>1,250+ lives impacted</span>
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <Sparkles className="w-3 h-3" />
              <span>Tax benefits available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Donation Button */}
       <Link href="/donation">
      <button
      
        className={`group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-3 ${
          pulse ? 'animate-pulse' : ''
        }`}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300 -z-10"></div>
        
        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-60 animate-float-1"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full opacity-40 animate-float-2"></div>
          <div className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full opacity-50 animate-float-3"></div>
        </div>
        
        {/* Button Content */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="relative">
            <Heart className={`w-5 h-5 transition-transform duration-200 ${
              isExpanded ? 'scale-110 text-red-200' : 'group-hover:scale-110'
            }`} />
            {/* Heartbeat animation */}
            <div className="absolute inset-0 w-5 h-5 bg-white rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300"></div>
          </div>
          <div className="text-left">
            <div className="font-bold text-sm">Donate Now</div>
            <div className="text-xs text-red-200">Make a difference</div>
          </div>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 group-hover:scale-150 transition-all duration-300"></div>
      </button>
       </Link>

      {/* Floating Sparkles */}
      <div className="absolute -top-2 -right-2 w-4 h-4 opacity-75">
        <div className="w-1 h-1 bg-yellow-400 rounded-full animate-twinkle-1"></div>
        <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-twinkle-2"></div>
        <div className="absolute bottom-0 right-0 w-1 h-1 bg-yellow-500 rounded-full animate-twinkle-3"></div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(90deg); }
        }
        
        @keyframes twinkle-1 {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes twinkle-2 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.6); }
        }
        
        @keyframes twinkle-3 {
          0%, 100% { opacity: 0.4; transform: scale(1.1); }
          50% { opacity: 0.9; transform: scale(0.9); }
        }
        
        .animate-float-1 {
          animation: float-1 3s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 2.5s ease-in-out infinite 0.5s;
        }
        
        .animate-float-3 {
          animation: float-3 3.5s ease-in-out infinite 1s;
        }
        
        .animate-twinkle-1 {
          animation: twinkle-1 2s ease-in-out infinite;
        }
        
        .animate-twinkle-2 {
          animation: twinkle-2 2.5s ease-in-out infinite 0.3s;
        }
        
        .animate-twinkle-3 {
          animation: twinkle-3 1.8s ease-in-out infinite 0.8s;
        }
      `}</style>
    </div>
  );
};

export default FixedDonationButton;