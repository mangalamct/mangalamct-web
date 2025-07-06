import React from 'react';
import { RefreshCw, AlertCircle, CheckCircle, XCircle, Clock, Shield, Phone, Mail, MapPin, CreditCard, FileText, Heart, DollarSign } from 'lucide-react';

const RefundPolicyPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-orange-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 relative">
        <div className="max-w-6xl mx-auto px-4 z-20 relative">
          <div className="flex items-center gap-4 mb-6">
            <RefreshCw className="w-12 h-12 text-orange-200" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Refund Policy</h1>
              <p className="text-orange-100 text-lg mt-2">Transparent guidelines for donation refunds</p>
            </div>
          </div>
          <p className="text-xl text-orange-100 max-w-3xl leading-relaxed">
            Understanding our approach to donation refunds and the circumstances under which refunds may be considered.
          </p>
        </div>
          <div className="absolute inset-0 bg-black/10 z-10">
        
          <img src="/images/base/bannerImg.webp" alt="Background Pattern" className="absolute inset-0 w-full h-full object-cover opacity-[0.1]" />
        </div>
      </div>

      {/* Important Notice */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-blue-200 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">Our Commitment to Donors</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Every donation to Mangalam Charitable Trust directly supports our mission to create positive change in education, healthcare, women empowerment, and social welfare. We are committed to transparency and donor satisfaction while maintaining the integrity of our charitable programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Guide</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">General Rule</p>
                    <p className="text-xs text-gray-600">Donations are non-refundable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Exceptions</p>
                    <p className="text-xs text-gray-600">Technical errors & fraud</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Time Limit</p>
                    <p className="text-xs text-gray-600">7 days from transaction</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Processing</p>
                    <p className="text-xs text-gray-600">7-14 business days</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-md font-semibold text-gray-800 mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <a href="mailto:mangalamctm@gmail.com" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                    <Mail className="w-4 h-4" />
                    Email Support
                  </a>
                  <a href="tel:+919326833121" className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Policy Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Policy Overview</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Mangalam Charitable Trust is a registered non-profit organization dedicated to creating meaningful social impact. As a charitable organization, donations and contributions are essential to sustaining our programs and are generally considered non-refundable commitments to our cause.
                </p>
                
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Notice</h3>
                      <p className="text-amber-700">
                        By making a donation, you acknowledge that your contribution is voluntary and supports our charitable mission. We encourage donors to carefully consider their contribution before completing the transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: Donation Policy */}
            <Section
              icon={<Heart className="w-6 h-6" />}
              title="1. Donations and Contributions"
              badge="Non-Refundable"
              badgeColor="bg-red-100 text-red-800"
            >
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  All donations made to Mangalam Charitable Trust are voluntary contributions that directly support our charitable programs and initiatives. These include but are not limited to:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Education Programs</h4>
                    <ul className="space-y-1 text-blue-700 text-sm">
                      <li>• Scholarships for underprivileged students</li>
                      <li>• Educational infrastructure development</li>
                      <li>• Learning material distribution</li>
                      <li>• Teacher training programs</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Healthcare Initiatives</h4>
                    <ul className="space-y-1 text-green-700 text-sm">
                      <li>• Medical camps and screenings</li>
                      <li>• Healthcare accessibility programs</li>
                      <li>• Medicine distribution</li>
                      <li>• Health awareness campaigns</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Women Empowerment</h4>
                    <ul className="space-y-1 text-purple-700 text-sm">
                      <li>• Skill development workshops</li>
                      <li>• Entrepreneurship support</li>
                      <li>• Women's safety initiatives</li>
                      <li>• Leadership training programs</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Social Welfare</h4>
                    <ul className="space-y-1 text-orange-700 text-sm">
                      <li>• Community development projects</li>
                      <li>• Emergency relief programs</li>
                      <li>• Environmental initiatives</li>
                      <li>• Social awareness campaigns</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Why Donations Are Non-Refundable</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Immediate Utilization:</strong> Donations are promptly allocated to ongoing programs and beneficiaries</li>
                    <li>• <strong>Administrative Efficiency:</strong> Non-refundable policy ensures maximum funds reach those in need</li>
                    <li>• <strong>Program Continuity:</strong> Consistent funding enables long-term project planning and execution</li>
                    <li>• <strong>Legal Compliance:</strong> Aligns with charitable organization regulations and tax exemption requirements</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 2: Exceptional Circumstances */}
            <Section
              icon={<Shield className="w-6 h-6" />}
              title="2. Exceptional Circumstances for Refunds"
              badge="Limited Cases"
              badgeColor="bg-yellow-100 text-yellow-800"
            >
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  While donations are generally non-refundable, we recognize that certain exceptional circumstances may warrant consideration for refunds. We will evaluate each case individually and may approve refunds under the following conditions:
                </p>
                
                <div className="grid gap-6">
                  <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-red-800 mb-3">Technical Errors</h4>
                        <ul className="space-y-2 text-red-700">
                          <li>• <strong>Duplicate Transactions:</strong> Multiple charges for the same donation due to technical glitches</li>
                          <li>• <strong>Incorrect Amount:</strong> System errors resulting in wrong donation amounts being processed</li>
                          <li>• <strong>Payment Gateway Issues:</strong> Failed transactions that were incorrectly charged</li>
                          <li>• <strong>Currency Conversion Errors:</strong> Incorrect exchange rate applications for international donations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                    <div className="flex items-start gap-4">
                      <Shield className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-orange-800 mb-3">Unauthorized Transactions</h4>
                        <ul className="space-y-2 text-orange-700">
                          <li>• <strong>Fraudulent Activity:</strong> Donations made without the account holder's knowledge or consent</li>
                          <li>• <strong>Identity Theft:</strong> Transactions made using stolen payment information</li>
                          <li>• <strong>Disputed Charges:</strong> Donations contested by the legitimate account holder</li>
                          <li>• <strong>Minor's Unauthorized Use:</strong> Donations made by minors without parental consent</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-blue-200 rounded-lg p-6 bg-blue-50">
                    <div className="flex items-start gap-4">
                      <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-lg font-semibold text-blue-800 mb-3">Documentation Required</h4>
                        <p className="text-blue-700 mb-3">For all refund requests, you must provide:</p>
                        <ul className="space-y-1 text-blue-700">
                          <li>• Official police report (for fraudulent transactions)</li>
                          <li>• Bank statements showing the disputed transaction</li>
                          <li>• Screenshots of error messages (for technical issues)</li>
                          <li>• Any other relevant supporting documentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 3: Refund Request Process */}
            <Section
              icon={<FileText className="w-6 h-6" />}
              title="3. How to Request a Refund"
              badge="Step-by-Step"
              badgeColor="bg-blue-100 text-blue-800"
            >
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-red-600" />
                    <h4 className="text-lg font-semibold text-red-800">Time Limit: 7 Days</h4>
                  </div>
                  <p className="text-red-700">
                    All refund requests must be submitted within 7 calendar days of the transaction date. Requests submitted after this period will not be considered unless exceptional circumstances apply.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Contact Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Email (Preferred)</p>
                          <a href="mailto:mangalamctm@gmail.com" className="text-blue-600 hover:underline">mangalamctm@gmail.com</a>
                          <p className="text-sm text-gray-600 mt-1">Include all required documentation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800">Phone Support</p>
                          <p className="text-green-600">+91 9326833121 / +91 9321837673</p>
                          <p className="text-sm text-gray-600 mt-1">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Required Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Full Name:</strong> As per donation record</li>
                        <li>• <strong>Transaction ID:</strong> Payment reference number</li>
                        <li>• <strong>Donation Amount:</strong> Exact amount donated</li>
                        <li>• <strong>Transaction Date:</strong> When the donation was made</li>
                        <li>• <strong>Payment Method:</strong> Card, UPI, Net Banking, etc.</li>
                        <li>• <strong>Reason for Refund:</strong> Detailed explanation</li>
                        <li>• <strong>Supporting Documents:</strong> As applicable</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 4: Processing Timeline */}
            <Section
              icon={<Clock className="w-6 h-6" />}
              title="4. Refund Processing Timeline"
              badge="Processing Time"
              badgeColor="bg-purple-100 text-purple-800"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">1</span>
                    </div>
                    <h4 className="font-semibold text-blue-800 mb-2">Request Received</h4>
                    <p className="text-blue-700 text-sm">Within 24 hours</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">2</span>
                    </div>
                    <h4 className="font-semibold text-green-800 mb-2">Review Process</h4>
                    <p className="text-green-700 text-sm">3-5 business days</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg">
                    <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">3</span>
                    </div>
                    <h4 className="font-semibold text-purple-800 mb-2">Decision</h4>
                    <p className="text-purple-700 text-sm">Within 7 days</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold">4</span>
                    </div>
                    <h4 className="font-semibold text-orange-800 mb-2">Refund Processed</h4>
                    <p className="text-orange-700 text-sm">7-14 business days</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-3">Important Notes</h4>
                  <ul className="space-y-2 text-yellow-700">
                    <li>• <strong>Review Process:</strong> Each request is individually reviewed by our finance team</li>
                    <li>• <strong>Payment Method:</strong> Refunds are processed to the original payment method only</li>
                    <li>• <strong>Bank Processing:</strong> Additional processing time may be required by your bank</li>
                    <li>• <strong>International Transactions:</strong> May take longer due to currency conversion</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 5: Alternatives to Refunds */}
            <Section
              icon={<Heart className="w-6 h-6" />}
              title="5. Alternatives to Refunds"
              badge="Other Options"
              badgeColor="bg-green-100 text-green-800"
            >
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  If your request doesn't qualify for a refund, we offer these alternatives to ensure your contribution makes the intended impact:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <DollarSign className="w-8 h-8 text-blue-600 mb-4" />
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">Program Reallocation</h4>
                    <p className="text-blue-700 text-sm">
                      Redirect your donation to a different program that better aligns with your charitable intentions.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <FileText className="w-8 h-8 text-green-600 mb-4" />
                    <h4 className="text-lg font-semibold text-green-800 mb-3">Tax Receipt Amendment</h4>
                    <p className="text-green-700 text-sm">
                      Modify donation receipts for tax purposes if there were errors in the original documentation.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <Heart className="w-8 h-8 text-purple-600 mb-4" />
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">Future Donation Credit</h4>
                    <p className="text-purple-700 text-sm">
                      Apply the amount as a credit towards future donations, allowing you to support causes at a later time.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-orange-600 mb-4" />
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">Impact Reporting</h4>
                    <p className="text-orange-700 text-sm">
                      Receive detailed reports on how your specific donation was utilized to create positive impact.
                    </p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Phone className="w-6 h-6" />
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Mangalam Charitable Trust</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-orange-200 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-orange-100 text-sm">
                          E-6, 5th FLR 2. Dimpal APT, CHS<br />
                          Jerbai Wadia Road, Parel<br />
                          Mumbai - 400012, Maharashtra, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-orange-200 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:mangalamctm@gmail.com" className="text-orange-100 text-sm hover:underline">mangalamctm@gmail.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-orange-200 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-orange-100 text-sm">+91 9326833121 / +91 9321837673</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Legal Information</h3>
                  <div className="space-y-2 text-orange-100">
                    <p><strong>Registration No:</strong> E-0039188 (GBR)</p>
                    <p><strong>PAN:</strong> AAJTM8547M</p>
                    <p><strong>NGO Darpan ID:</strong> MH/2025/0522249</p>
                    <p><strong>Website:</strong> <a href="https://mangalamct.org" className="hover:underline">mangalamct.org</a></p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-orange-400">
                    <p className="text-orange-100 text-sm">
                      For refund-related queries, please contact our finance team at: <br />
                      <a href="mailto:refunds@mangalamct.org" className="text-white hover:underline">mangalamctm@gmail.com</a>
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
const Section = ({ icon, title, badge, badgeColor, children }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-orange-600">{icon}</div>
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        {badge && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor}`}>
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

export default RefundPolicyPage;