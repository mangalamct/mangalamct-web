import React from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Phone, Mail, Calendar, Info, Globe, FileText } from 'lucide-react';

const ShippingDeliveryPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-20">
          <div className="flex items-center gap-4 mb-6">
            <Package className="w-12 h-12 text-blue-200" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Shipping & Delivery Policy</h1>
              <p className="text-blue-100 text-lg mt-2">Transparent delivery information for our donors</p>
            </div>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
            Learn about how Mangalam Charitable Trust handles delivery of donation receipts, certificates, and promotional materials to our valued supporters.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/10 z-10">
          <img src="/images/base/bannerImg.webp" alt="Background Pattern" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" />
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Truck className="w-6 h-6 text-primary" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Delivery Items",
              "Processing Times",
              "Delivery Methods",
              "Tracking",
              "Contact Support"
            ].map((item, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="text-secondary hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200 text-sm font-medium border border-blue-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Policy Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Digital receipts sent instantly</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Free delivery on all items</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Trackable shipments</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Pan-India coverage</span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Last Updated</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  January 2025
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Delivery Services</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Mangalam Charitable Trust is committed to ensuring that all donation-related documents, certificates, and materials reach our donors and stakeholders in a timely and secure manner. This policy outlines our delivery procedures, timelines, and commitment to service excellence.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <p className="text-blue-800 font-medium">
                  As a charitable organization, we primarily deliver digital documents. Physical deliveries are made for certificates of appreciation, annual reports, and special recognition items for our valued donors.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <Section
              id="section-1"
              icon={<Package className="w-6 h-6" />}
              title="1. Items We Deliver"
              badge="Deliverables"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Digital Deliveries (Instant)</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h5 className="font-semibold text-green-800">Tax Receipts</h5>
                      </div>
                      <p className="text-green-700 text-sm">80G donation receipts sent via email within 24 hours</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h5 className="font-semibold text-green-800">Donation Confirmations</h5>
                      </div>
                      <p className="text-green-700 text-sm">Instant email confirmation upon successful payment</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h5 className="font-semibold text-green-800">Impact Reports</h5>
                      </div>
                      <p className="text-green-700 text-sm">Quarterly updates on how your donation made a difference</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h5 className="font-semibold text-green-800">Newsletters</h5>
                      </div>
                      <p className="text-green-700 text-sm">Monthly digital newsletters with trust updates</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Physical Deliveries</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Certificate of Appreciation:</strong> For donors contributing above ₹50,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Annual Reports:</strong> Printed annual reports for major donors and partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Promotional Materials:</strong> Brochures, event invitations, and campaign materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Corporate Partnership Documents:</strong> MOUs and partnership agreements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 2 */}
            <Section
              id="section-2"
              icon={<Clock className="w-6 h-6" />}
              title="2. Processing & Delivery Times"
              badge="Timelines"
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-800 mb-4">Digital Documents</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-blue-700 font-medium">Donation Receipt (80G)</span>
                      <span className="text-blue-600 font-semibold">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-blue-700 font-medium">Payment Confirmation</span>
                      <span className="text-blue-600 font-semibold">Instant</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-blue-700 font-medium">Quarterly Reports</span>
                      <span className="text-blue-600 font-semibold">Every 3 months</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">Physical Deliveries</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-green-700 font-medium">Within Mumbai</span>
                      <span className="text-green-600 font-semibold">3-5 business days</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-green-700 font-medium">Within Maharashtra</span>
                      <span className="text-green-600 font-semibold">5-7 business days</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-green-700 font-medium">Other States</span>
                      <span className="text-green-600 font-semibold">7-10 business days</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded">
                      <span className="text-green-700 font-medium">Remote Areas</span>
                      <span className="text-green-600 font-semibold">10-15 business days</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> Delivery times may vary during festive seasons, natural calamities, or unforeseen circumstances beyond our control. We appreciate your patience during such times.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 3 */}
            <Section
              id="section-3"
              icon={<Truck className="w-6 h-6" />}
              title="3. Delivery Methods & Partners"
              badge="Logistics"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="w-8 h-8 text-blue-600" />
                      <h4 className="text-lg font-semibold text-gray-800">Email Delivery</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Tax receipts and confirmations</li>
                      <li>• Impact reports and newsletters</li>
                      <li>• Event invitations and updates</li>
                      <li>• Digital certificates</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Package className="w-8 h-8 text-green-600" />
                      <h4 className="text-lg font-semibold text-gray-800">Courier Services</h4>
                    </div>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Physical certificates</li>
                      <li>• Annual reports and publications</li>
                      <li>• Promotional materials</li>
                      <li>• Partnership documents</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">Our Delivery Partners</h4>
                  <p className="text-blue-700 mb-4">
                    We work with trusted courier services to ensure safe and timely delivery of physical items:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white rounded p-3 text-center">
                      <p className="text-blue-800 font-medium">India Post</p>
                      <p className="text-blue-600 text-xs">Speed Post</p>
                    </div>
                    <div className="bg-white rounded p-3 text-center">
                      <p className="text-blue-800 font-medium">Professional Couriers</p>
                      <p className="text-blue-600 text-xs">Express Delivery</p>
                    </div>
                    <div className="bg-white rounded p-3 text-center">
                      <p className="text-blue-800 font-medium">Hand Delivery</p>
                      <p className="text-blue-600 text-xs">Within Mumbai</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Delivery Costs</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-semibold mb-2">All Deliveries are FREE</p>
                        <p className="text-green-700 text-sm">
                          Mangalam Charitable Trust bears all delivery costs for donation receipts, certificates, and materials sent to our donors and stakeholders. There are no hidden charges or delivery fees.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 4 */}
            <Section
              id="section-4"
              icon={<MapPin className="w-6 h-6" />}
              title="4. Tracking & Updates"
              badge="Tracking"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Digital Items</h4>
                    <ul className="space-y-2 text-purple-700">
                      <li>• Instant email confirmation</li>
                      <li>• Check spam/promotions folder if not received</li>
                      <li>• Download from donor portal anytime</li>
                      <li>• Request resend via email</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Physical Items</h4>
                    <ul className="space-y-2 text-orange-700">
                      <li>• Tracking number sent via email</li>
                      <li>• SMS updates on delivery status</li>
                      <li>• Contact us for tracking support</li>
                      <li>• Signature on delivery required</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Delivery Status Updates</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Processing</p>
                        <p className="text-gray-600 text-sm">Your item is being prepared for dispatch</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Dispatched</p>
                        <p className="text-gray-600 text-sm">Your item is with our courier partner</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">In Transit</p>
                        <p className="text-gray-600 text-sm">Your item is on its way to you</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 font-bold">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Delivered</p>
                        <p className="text-gray-600 text-sm">Your item has been successfully delivered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 5 */}
            <Section
              id="section-5"
              icon={<Info className="w-6 h-6" />}
              title="5. Delivery Issues & Support"
              badge="Support"
            >
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-red-800 mb-3">Common Issues & Solutions</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-red-700 mb-1">Didn't receive digital receipt?</p>
                      <p className="text-red-600 text-sm">Check spam/promotions folder or contact us for resend within 24 hours</p>
                    </div>
                    <div>
                      <p className="font-medium text-red-700 mb-1">Physical delivery delayed?</p>
                      <p className="text-red-600 text-sm">Contact us with your tracking number for investigation and resolution</p>
                    </div>
                    <div>
                      <p className="font-medium text-red-700 mb-1">Wrong address provided?</p>
                      <p className="text-red-600 text-sm">Inform us immediately. We'll attempt address correction with courier partner</p>
                    </div>
                    <div>
                      <p className="font-medium text-red-700 mb-1">Damaged delivery?</p>
                      <p className="text-red-600 text-sm">Refuse acceptance and contact us. We'll arrange replacement shipment</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Undelivered Items</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      If a physical item is returned to us as undelivered, we will:
                    </p>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Contact you to verify address</li>
                      <li>• Reattempt delivery to correct address</li>
                      <li>• Offer alternative delivery method</li>
                      <li>• Arrange pickup from our office if needed</li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Address Updates</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      To update your delivery address:
                    </p>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>• Email us with new address</li>
                      <li>• Provide reference number if applicable</li>
                      <li>• Updates processed within 1 business day</li>
                      <li>• Confirmation sent via email</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Section>

            {/* Additional Sections */}
            <Section
              icon={<Globe className="w-6 h-6" />}
              title="6. International Donors"
              badge="International"
            >
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-800 mb-4">
                  For our international donors and supporters:
                </p>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>All donation receipts are sent digitally via email (instant delivery worldwide)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Physical certificates for major donors can be arranged (delivery time varies by country)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>International courier charges are borne by the trust for major donors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Alternative: Pick up certificates during your visit to India</span>
                  </li>
                </ul>
              </div>
            </Section>

            <Section
              icon={<FileText className="w-6 h-6" />}
              title="7. Important Terms"
              badge="Terms"
            >
              <div className="space-y-4 text-gray-700">
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Delivery Attempts</p>
                  <p className="text-sm">Couriers typically make 2-3 delivery attempts before returning items to sender</p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Delivery Confirmation</p>
                  <p className="text-sm">Signature or OTP verification required for physical deliveries</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Retention Period</p>
                  <p className="text-sm">Undelivered items held for 30 days before disposal as per policy</p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <p className="font-medium text-gray-800 mb-1">Force Majeure</p>
                  <p className="text-sm">Delays due to natural disasters, strikes, or government restrictions are beyond our control</p>
                </div>
              </div>
            </Section>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Phone className="w-6 h-6" />
                Contact Support
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Mangalam Charitable Trust</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-200 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-blue-100 text-sm">
                          E-6, 5th FLR 2. Dimpal APT, CHS<br />
                          Jerbai Wadia Road, Parel<br />
                          Mumbai - 400012, Maharashtra, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-200 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:mangalamctm@gmail.com" className="text-blue-100 text-sm hover:underline">mangalamctm@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-200 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-blue-100 text-sm">+91 9326833121 / +91 9321837673</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support Hours</h3>
                  <div className="space-y-3 text-blue-100">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-200" />
                      <div>
                        <p className="font-medium">Monday - Friday</p>
                        <p className="text-sm">10:00 AM - 6:00 PM IST</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-200" />
                      <div>
                        <p className="font-medium">Saturday</p>
                        <p className="text-sm">10:00 AM - 2:00 PM IST</p>
                      </div>
                    </div>
                    <div className="bg-blue-600/30 rounded-lg p-4 mt-4">
                      <p className="text-sm">
                        <strong>Response Time:</strong> We typically respond to delivery queries within 24 hours on business days.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-blue-400">
                    <p className="text-blue-100 text-sm mb-2">
                      <strong>For urgent delivery issues:</strong>
                    </p>
                    <p className="text-blue-100 text-sm">
                      Call us during business hours or email with "URGENT" in the subject line
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Section Component
const Section = ({ id, icon, title, badge, children }) => (
  <div id={id} className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-blue-600">{icon}</div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        {badge && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {badge}
          </span>
        )}
      </div>
    </div>
    <div className="p-8">
      {children}
    </div>
  </div>
);

export default ShippingDeliveryPage;