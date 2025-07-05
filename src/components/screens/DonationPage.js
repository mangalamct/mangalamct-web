"use client";
import React, { useState, useEffect } from 'react';
import { 
  Heart, Shield, Phone, Mail, MapPin, Users, BookOpen, Stethoscope, 
  Home, CreditCard, Smartphone, Building2, CheckCircle, Star, Award, 
  Globe, ArrowRight, Lock, Calendar, User, DollarSign, ChevronLeft, 
  Gift, TrendingUp, Target, Banknote, Landmark, QrCode, Info, AlertCircle 
} from 'lucide-react';

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNo: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNo: '',
    aadharNo: '',
    nationality: 'Indian'
  });
  const [formErrors, setFormErrors] = useState({});

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];
  const bankDetails = {
    accountName: "Mangalam charitable trust",
    accountNumber: "029110100000360",
    ifscCode: "NKGS0000029",
    bankName: "NKGSB Co-Operative Bank Ltd.",
    branch: "PAREL MUMBAI-400012",
    upiId: "@hdfc"
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount('');
    }
  };

  const getCurrentAmount = () => {
    return customAmount || selectedAmount;
  };

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

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email';
    
    if (!formData.phoneNo.trim()) errors.phoneNo = 'Phone number is required';
    else if (!/^\+?[\d\s-]{10,15}$/.test(formData.phoneNo)) errors.phoneNo = 'Please enter a valid phone number';
    
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.pincode.trim()) errors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = 'Pincode must be 6 digits';
    
    if (formData.panNo && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) {
      errors.panNo = 'PAN format is invalid (e.g., ABCDE1234F)';
    }
    
    if (formData.aadharNo && !/^\d{12}$/.test(formData.aadharNo.replace(/\s/g, ''))) {
      errors.aadharNo = 'Aadhar number must be 12 digits';
    }
    
    return errors;
  };

  const handleNextStep = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep(2);
    } else {
      setFormErrors(errors);
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const handleDonateClick = async () => {
    const amount = getCurrentAmount();
    if (!amount || amount < 1) {
      alert('Please select or enter a valid donation amount');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
      
      setCurrentStep(1);
      setFormData({
        fullName: '',
        email: '',
        phoneNo: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        panNo: '',
        aadharNo: '',
        nationality: 'Indian'
      });
      setSelectedAmount('');
      setCustomAmount('');
      setFormErrors({});
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-bounce-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Donation Successful!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your generous donation of {formatCurrency(getCurrentAmount())}. 
              A receipt has been sent to your email.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary  to-secondary text-white">
        <img src='https://balrakshabharat.org/wp-content/themes/ngo/images/nwhmpg/ta-1-1.webp' alt="Donation Background" className="absolute inset-0 w-full h-full object-cover opacity-[0.4]" />
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Cause</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Your donation helps us continue our mission to make a difference in people's lives.
          </p>
        </div>
      </div>

      {/* Organization Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-1 gap-12">
          {/* Left Side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                </div>
                <div className={`w-16 h-2 rounded-full mx-2 ${currentStep >= 2 ? 'bg-red-600' : 'bg-gray-200'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
              </div>
            </div>

            {currentStep === 1 ? (
              /* Step 1: Personal Information */
              <div>
                <div className="text-center mb-8">
                  <User className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Personal Information</h2>
                  <p className="text-gray-600">Please provide your details for the donation receipt</p>
                </div>
                
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

                <button
                  onClick={handleNextStep}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Next: Donation Details
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* Step 2: Donation Details */
              <div>
                <div className="text-center mb-8">
                  <DollarSign className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Donation Details</h2>
                  <p className="text-gray-600">Choose your donation amount and payment method</p>
                </div>
                
                {/* Donor Summary */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Donor Information
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Name:</strong> {formData.fullName}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phoneNo}</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-red-600 text-sm hover:underline mt-3 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Edit Information
                  </button>
                </div>

                {/* Donation Type */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">Donation Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        donationType === 'one-time'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Gift className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">One-time</div>
                      <div className="text-sm text-gray-600">Make a single donation</div>
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        donationType === 'monthly'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold">Monthly</div>
                      <div className="text-sm text-gray-600">Recurring donation</div>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">Select Amount</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountClick(amount)}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all duration-200 ${
                          selectedAmount === amount
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Custom Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder="Enter other amount"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                        paymentMethod === 'upi'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">UPI</div>
                        <div className="text-sm text-gray-600">Pay using UPI apps</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                        paymentMethod === 'card'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">Credit/Debit Card</div>
                        <div className="text-sm text-gray-600">Pay using card</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                        paymentMethod === 'netbanking'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Building2 className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">Net Banking</div>
                        <div className="text-sm text-gray-600">Pay using online banking</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setPaymentMethod('banktransfer');
                        setShowBankDetails(true);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                        paymentMethod === 'banktransfer'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Landmark className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">Bank Transfer</div>
                        <div className="text-sm text-gray-600">Direct bank transfer</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Bank Transfer Details */}
                {paymentMethod === 'banktransfer' && showBankDetails && (
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                        <Banknote className="w-5 h-5" />
                        Bank Transfer Details
                      </h3>
                      <button 
                        onClick={() => setShowBankDetails(false)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Account Name:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{bankDetails.accountName}</span>
                          <button 
                            onClick={() => copyToClipboard(bankDetails.accountName)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Copy to clipboard"
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{bankDetails.accountNumber}</span>
                          <button 
                            onClick={() => copyToClipboard(bankDetails.accountNumber)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Copy to clipboard"
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">IFSC Code:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{bankDetails.ifscCode}</span>
                          <button 
                            onClick={() => copyToClipboard(bankDetails.ifscCode)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Copy to clipboard"
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Bank Name:</span>
                        <span className="font-semibold">{bankDetails.bankName}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Branch:</span>
                        <span className="font-semibold">{bankDetails.branch}</span>
                      </div>
                      
                      <div className="pt-4 border-t border-blue-200">
                        <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
                          <Info className="w-4 h-4" />
                          <span>After making the transfer, please share the transaction details with us.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI QR Code */}
                {paymentMethod === 'upi' && (
                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8">
                    <h3 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                      <QrCode className="w-5 h-5" />
                      Scan UPI QR Code
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="bg-white p-4 rounded-lg border border-purple-300">
                        <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                          [UPI QR Code Image]
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-purple-700">UPI ID:</p>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-purple-900">{bankDetails.upiId}</p>
                              <button 
                                onClick={() => copyToClipboard(bankDetails.upiId)}
                                className="text-purple-600 hover:text-purple-800 text-sm"
                              >
                                {copied ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-purple-700">
                            <p>1. Open any UPI app on your phone</p>
                            <p>2. Scan the QR code or enter UPI ID</p>
                            <p>3. Enter amount and complete payment</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Donation Summary */}
                {getCurrentAmount() && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 mb-8 border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Donation Summary
                    </h3>
                    <div className="space-y-2 text-green-700">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-semibold">{formatCurrency(getCurrentAmount())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-semibold">{donationType === 'monthly' ? 'Monthly' : 'One-time'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment:</span>
                        <span className="font-semibold capitalize">
                          {paymentMethod === 'banktransfer' ? 'Bank Transfer' : paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Button */}
                <button
                  onClick={handleDonateClick}
                  disabled={!getCurrentAmount() || isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                    !getCurrentAmount()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transform hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'banktransfer' ? 'I have transferred the amount' : `Donate ${formatCurrency(getCurrentAmount())}`}
                      <Heart className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Security Assurance */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            )}
          </div>

    
        </div>
      </div>
    </div>
  );
};

export default DonationPage;