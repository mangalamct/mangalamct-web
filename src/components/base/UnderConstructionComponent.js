"use client"
import React from 'react'
import { Construction, ArrowLeft, Home, Mail, Phone, Clock, Wrench, AlertCircle } from 'lucide-react'

const UnderConstructionComponent = ({ 
  title = "Page Under Construction", 
  message = "We're working hard to bring you this content. Please check back soon!",
  showBackButton = true,
  showContactInfo = true,
  estimatedTime = "Coming Soon"
}) => {
  const handleGoBack = () => {
    window.history.back()
  }

  const handleGoHome = () => {
    // You can replace this with your actual home route
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-teal-500 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-40 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Construction Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Construction className="w-16 h-16 text-white animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-red-100">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertCircle className="w-4 h-4" />
            <span>Under Construction</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>

          {/* Message */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {message}
          </p>

          {/* Estimated Time */}
          <div className="bg-gradient-to-r from-red-50 to-teal-50 rounded-2xl p-6 mb-8 border border-red-100">
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-6 h-6 text-red-600" />
              <span className="text-lg font-semibold text-gray-900">
                {estimatedTime}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {showBackButton && (
              <button
                onClick={handleGoBack}
                className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            )}
            
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              <span>Go to Home</span>
            </button>
          </div>

          {/* Contact Information */}
          {showContactInfo && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help? Contact Us
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:mangalamctm@gmail.com"
                  className="flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>mangalamctm@gmail.com</span>
                </a>
                <a
                  href="tel:+919326833121"
                  className="flex items-center justify-center space-x-2 text-teal-600 hover:text-teal-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 9326833121</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            We appreciate your patience as we work to improve your experience.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UnderConstructionComponent;