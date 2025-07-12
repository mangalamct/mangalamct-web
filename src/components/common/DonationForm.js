"use client";
import { AlertCircle } from 'lucide-react';
import React from 'react'

const DonationForm = ({formData,setFormData,formErrors,setFormErrors}) => {
      const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  return (
    <div>
           <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        formErrors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {formErrors.fullName}
                    </p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                        }`}
                        placeholder="your@email.com"
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {formErrors.email}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          formErrors.phoneNo ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                        }`}
                        placeholder="+91 9876543210"
                      />
                      {formErrors.phoneNo && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {formErrors.phoneNo}
                      </p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                        formErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                      }`}
                      placeholder="Enter your complete address"
                    />
                    {formErrors.address && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {formErrors.address}
                    </p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          formErrors.city ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                        }`}
                        placeholder="City"
                      />
                      {formErrors.city && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {formErrors.city}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          formErrors.state ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                        }`}
                        placeholder="State"
                      />
                      {formErrors.state && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {formErrors.state}
                      </p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          formErrors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                        }`}
                        placeholder="400001"
                      />
                      {formErrors.pincode && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {formErrors.pincode}
                      </p>}
                    </div>
                  </div>

                  <div className="w-full">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        PAN Number <span className="text-gray-500">(Optional, for 80G receipt)</span>
                      </label>
                      <input
                        type="text"
                        name="panNo"
                        value={formData.panNo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          formErrors.panNo ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                        }`}
                        placeholder="ABCDE1234F"
                        style={{ textTransform: 'uppercase' }}
                      />
                      {formErrors.panNo && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {formErrors.panNo}
                      </p>}
                    </div>

                    {/* <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Aadhar Number <span className="text-gray-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="aadharNo"
                        value={formData.aadharNo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${
                          formErrors.aadharNo ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-red-500'
                        }`}
                        placeholder="1234 5678 9012"
                      />
                      {formErrors.aadharNo && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {formErrors.aadharNo}
                      </p>}
                    </div> */}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                    >
                      <option value="Indian">Indian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
    </div>
  )
}

export default DonationForm