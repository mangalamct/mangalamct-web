"use client";
import React, { useState, useEffect } from 'react';
import { 
  Heart, Shield, Phone, Mail, MapPin, Users, BookOpen, Stethoscope, 
  Home, CreditCard, Smartphone, Building2, CheckCircle, Star, Award, 
  Globe, ArrowRight, Lock, Calendar, User, DollarSign, ChevronLeft, 
  Gift, TrendingUp, Target, Banknote, Landmark, QrCode, Info, AlertCircle 
} from 'lucide-react';
import axios from 'axios';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import DonationForm from '../common/DonationForm';
import { db } from '../../../lib/firebase';

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [paymentMethod, setPaymentMethod] = useState('online');
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];
  const bankDetails = {
    accountName: "Mangalam charitable trust",
    accountNumber: "029110100000360",
    ifscCode: "NKGS0000029",
    bankName: "NKGSB Co-Operative Bank Ltd.",
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
    setError(null);

    try {
      // Prepare donation data
      const donationData = {
        amount: parseInt(amount),
        donationType: donationType,
        paymentMethod: paymentMethod,
        fullName: formData.fullName,
        email: formData.email,
        phoneNo: formData.phoneNo,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        panNo: formData.panNo || null,
        nationality: formData.nationality,
        status: paymentMethod === 'banktransfer' ? 'pending' : 'initiated'
      };

      // Save to Firebase first
      // const firebaseDocId = await saveDonationToFirebase(donationData);

      if (paymentMethod === 'online') {
        // Online payment - initiate PhonePe payment
        const paymentData = {
          amount: amount,
          name: formData.fullName,
          email: formData.email,
          mobileNumber: formData.phoneNo,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          panNo: formData.panNo,// Include Firebase document ID for reference
        };

        console.log("Payment data:", paymentData);
        
        const response = await axios.post('/api/initiate-phonepe-payment', paymentData);
        console.log("Payment response:", response.data);
        
        // Redirect to payment gateway
        window.location.href = response.data.url;
      } else {
        // Bank transfer - show success message
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Reset form
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
          setShowBankDetails(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      setError("Failed to process donation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {paymentMethod === 'banktransfer' ? 'Bank Transfer Details Received!' : 'Donation Successful!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {paymentMethod === 'banktransfer' 
                ? `Thank you for choosing bank transfer for your donation of ${formatCurrency(getCurrentAmount())}. Please transfer the amount using the provided bank details. We will verify and confirm your donation once the payment is received.`
                : `Thank you for your generous donation of ${formatCurrency(getCurrentAmount())}. A receipt has been sent to your email.`
              }
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

      {/* Error Display */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
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
         
                <DonationForm formData={formData} formErrors={formErrors} setFormData={setFormData} setFormErrors={setFormErrors} />
                
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setPaymentMethod('online');
                        setShowBankDetails(false);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                        paymentMethod === 'online'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <div className="text-left">
                        <div className="font-semibold">Online Payment</div>
                        <div className="text-sm text-gray-600">Pay securely online</div>
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
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Account Name:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{bankDetails.accountName}</span>
                          <button 
                            onClick={() => copyToClipboard(bankDetails.accountName)}
                            className="text-blue-500 hover:text-blue-700 text-sm"
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
                            className="text-blue-500 hover:text-blue-700 text-sm"
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
                            className="text-blue-500 hover:text-blue-700 text-sm"
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
                          <span>After making the transfer, your donation will be recorded as pending verification. We will confirm once the payment is received.</span>
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
                          {paymentMethod === 'banktransfer' ? 'Bank Transfer' : 'Online Payment'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Button */}
                <button
                  onClick={handleDonateClick}
                  disabled={!getCurrentAmount() || isSubmitting}
                  className={`w-full cursor-pointer py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
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
                      {paymentMethod === 'banktransfer' 
                        ? `Submit Bank Transfer Details` 
                        : `Pay ${formatCurrency(getCurrentAmount())}`
                      }
                      <Heart className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Security Assurance */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'banktransfer' 
                      ? 'Your information is stored securely' 
                      : 'Secure payment processing'
                    }
                  </span>
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