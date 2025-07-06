import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Phone, Mail, MapPin, Calendar, CheckCircle } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 relative">
        <div className="max-w-6xl mx-auto px-4 relative z-20">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-12 h-12 text-blue-200" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              <p className="text-blue-100 text-lg mt-2">Your privacy is our priority</p>
            </div>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
            Learn how Mangalam Charitable Trust collects, uses, and protects your personal information in accordance with the highest privacy standards.
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
            <Eye className="w-6 h-6 text-primary" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Information Collection",
              "Data Usage",
              "Information Sharing",
              "Data Security",
              "Your Rights"
            ].map((item, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="text-secondary  hover:bg-blue-50 p-3 rounded-lg transition-colors duration-200 text-sm font-medium border border-blue-200"
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
                  <span className="text-sm text-gray-600">We never sell your data</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">GDPR compliant</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600">You control your data</span>
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
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Commitment to Privacy</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Mangalam Charitable Trust ("we," "us," "our") is deeply committed to protecting the privacy and personal information of our donors, beneficiaries, volunteers, website visitors, and all stakeholders who interact with us. This Privacy Policy outlines our comprehensive approach to data protection and your rights regarding your personal information.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <p className="text-blue-800 font-medium">
                  This policy applies to all personal information collected through our website, mobile applications, donation platforms, events, and any other interactions with our organization.
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <Section
              id="section-1"
              icon={<FileText className="w-6 h-6" />}
              title="1. Information We Collect"
              badge="Data Collection"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Identity Information:</strong> Full name, date of birth, gender, nationality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Contact Information:</strong> Email address, phone number, postal address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Financial Information:</strong> PAN card details, donation history, payment preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Professional Information:</strong> Occupation, employer details (for CSR partnerships)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Technical Information</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Usage Data:</strong> Pages visited, time spent, interaction patterns, referral sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>Cookies & Tracking:</strong> Session cookies, preference cookies, analytics cookies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 2 */}
            <Section
              id="section-2"
              icon={<Users className="w-6 h-6" />}
              title="2. How We Use Your Information"
              badge="Data Processing"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">Primary Uses</h4>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Process donations and issue receipts</li>
                    <li>• Communicate about our programs and impact</li>
                    <li>• Provide volunteer opportunities</li>
                    <li>• Send newsletters and updates</li>
                    <li>• Maintain donor relationships</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">Administrative Uses</h4>
                  <ul className="space-y-2 text-green-700">
                    <li>• Comply with legal requirements</li>
                    <li>• Maintain internal records</li>
                    <li>• Analyze donation patterns</li>
                    <li>• Improve our services</li>
                    <li>• Prevent fraud and abuse</li>
                  </ul>
                </div>
              </div>
            </Section>

            {/* Section 3 */}
            <Section
              id="section-3"
              icon={<Lock className="w-6 h-6" />}
              title="3. Information Sharing & Disclosure"
              badge="Data Sharing"
            >
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-red-800 mb-3">What We DON'T Do</h4>
                  <ul className="space-y-2 text-red-700">
                    <li>• We never sell your personal information</li>
                    <li>• We don't rent or lease your data to third parties</li>
                    <li>• We don't share your information for marketing purposes</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">When We May Share Information</h4>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-700">Authorized Personnel</h5>
                      <p className="text-gray-600 mt-1">Trusted staff and volunteers who need access to perform their duties</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-700">Service Providers</h5>
                      <p className="text-gray-600 mt-1">Payment processors, email service providers, and IT support (under strict confidentiality agreements)</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-700">Legal Requirements</h5>
                      <p className="text-gray-600 mt-1">Government authorities when required by law, court orders, or regulatory compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* Section 4 */}
            <Section
              id="section-4"
              icon={<Shield className="w-6 h-6" />}
              title="4. Data Security Measures"
              badge="Security"
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
                  <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-blue-800 mb-2">Encryption</h4>
                  <p className="text-blue-700 text-sm">All data transmission and storage uses industry-standard encryption protocols</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-green-800 mb-2">Access Control</h4>
                  <p className="text-green-700 text-sm">Strict access controls ensure only authorized personnel can access your data</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg">
                  <Eye className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-semibold text-purple-800 mb-2">Monitoring</h4>
                  <p className="text-purple-700 text-sm">Continuous monitoring and regular security audits protect against threats</p>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Important Note:</strong> While we implement robust security measures, no system is 100% secure. We continuously update our security practices to address emerging threats.
                </p>
              </div>
            </Section>

            {/* Section 5 */}
            <Section
              id="section-5"
              icon={<CheckCircle className="w-6 h-6" />}
              title="5. Your Rights & Choices"
              badge="Your Rights"
            >
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Data Access Rights</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Request a copy of your personal data</li>
                      <li>• View your donation history</li>
                      <li>• Access your communication preferences</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-800">Data Control Rights</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Correct inaccurate information</li>
                      <li>• Request data deletion</li>
                      <li>• Opt-out of communications</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">How to Exercise Your Rights</h4>
                  <p className="text-blue-700 mb-4">
                    To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-blue-800 font-medium">Email: <a href="mailto:mangalamctm@gmail.com" className="underline">mangalamctm@gmail.com</a></p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Additional Sections */}
            <Section
              icon={<FileText className="w-6 h-6" />}
              title="6. Cookies & Tracking Technologies"
              badge="Cookies"
            >
              <div className="space-y-4">
                <p className="text-gray-700">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800">Essential Cookies</h5>
                    <p className="text-gray-600 text-sm mt-1">Required for basic site functionality</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800">Analytics Cookies</h5>
                    <p className="text-gray-600 text-sm mt-1">Help us understand site usage</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800">Preference Cookies</h5>
                    <p className="text-gray-600 text-sm mt-1">Remember your choices and settings</p>
                  </div>
                </div>
              </div>
            </Section>

            <Section
              icon={<Users className="w-6 h-6" />}
              title="7. Children's Privacy"
              badge="Child Protection"
            >
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <p className="text-orange-800">
                  We are committed to protecting children's privacy. We do not knowingly collect personal information from children under 18 years of age without verified parental consent. If you believe we have inadvertently collected such information, please contact us immediately.
                </p>
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
                  <h3 className="text-lg font-semibold mb-4">Legal Information</h3>
                  <div className="space-y-2 text-blue-100">
                    <p><strong>Registration No:</strong> E-0039188 (GBR)</p>
                    <p><strong>PAN:</strong> AAJTM8547M</p>
                    <p><strong>NGO Darpan ID:</strong> MH/2025/0522249</p>
                    <p><strong>Website:</strong> <a href="https://mangalamct.org" className="hover:underline">mangalamct.org</a></p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-blue-400">
                    <p className="text-blue-100 text-sm">
                      For privacy-related queries, contact our Data Protection Officer at: <br />
                      <a href="mailto:mangalamctm@gmail.com" className="text-white hover:underline">mangalamctm@gmail.com</a>
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

export default PrivacyPolicyPage;