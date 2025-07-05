"use client"
import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, User, MessageCircle } from 'lucide-react'
import { contactData } from '../../../public/data/Constent'

const ContactSection = ({hideHeadding=false}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        {
            !hideHeadding &&    <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        }
     

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              {/* Organization Details */}
              <div className="mb-8 p-6 bg-red-50 rounded-xl">
                <h4 className="text-xl font-semibold text-red-800 mb-2">{contactData.name}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{contactData.description}</p>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                  {contactData.email.map((item, index) => (
                    <a
                      key={index}
                      href={`mailto:${item.email}`}
                      className="text-red-600 hover:text-red-700 transition-colors block"
                    >
                      {item.email}
                    </a>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Phone</h4>
                  {contactData.phoneNo.map((item, index) => (
                    <a
                      key={index}
                      href={`tel:${item.phoneNo}`}
                      className="text-teal-600 hover:text-teal-700 transition-colors block"
                    >
                      {item.phoneNo}
                    </a>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Address</h4>
                  {contactData.address.map((item, index) => (
                    <p key={index} className="text-gray-700 text-sm leading-relaxed">
                      {item.address}
                    </p>
                  ))}
                </div>
              </div>

              {/* Registration Details */}
              <div className="border-t pt-6 mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Registration Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Reg. No:</span>
                    <span className="text-gray-600 ml-2">{contactData.regNo}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">PAN No:</span>
                    <span className="text-gray-600 ml-2">{contactData.panNo}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-medium text-gray-700">NGO Darpan ID:</span>
                    <span className="text-gray-600 ml-2">{contactData.ngoDarpanId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="What is this regarding?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-lg font-medium hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

