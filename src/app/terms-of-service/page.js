import React from 'react';
import BannerCom from '@/components/base/BannerCom';
import { Mail, MapPin, Phone } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="bg-[color:var(--color-background)] text-[color:var(--color-foreground)] font-[color:var(--font-sans)] min-h-screen">
      <BannerCom
        name="Terms of Service"
        pagetext="Terms of Service"
        description="Read the terms and conditions that govern your use of our website and services."
      />

      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--color-primary)] mb-4">
            Terms of Service
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[color:var(--color-primary)] via-[color:var(--color-secondary)] to-[color:var(--color-orange)] mx-auto rounded-full"></div>
          <p className="text-xl text-[color:var(--color-secondary-dark)] mt-6 max-w-3xl mx-auto leading-relaxed">
            Welcome to Mangalam Charitable Trust. These terms govern your use of our website and services. 
            By accessing our platform, you agree to these terms and our commitment to transparency and accountability.
          </p>
          <p className="text-sm text-[color:var(--color-primary-muted)] mt-4">
            <strong>Last Updated:</strong> January 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Table of Contents */}
          <div className="lg:col-span-3">
            <div className="sticky top-6 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-[color:var(--color-primary)] mb-4">
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {[
                  "Acceptance of Terms",
                  "Website Usage",
                  "Donations & Payments",
                  "User Responsibilities",
                  "Intellectual Property",
                  "Privacy & Data Protection",
                  "Limitation of Liability",
                  "Third-Party Services",
                  "Termination",
                  "Governing Law",
                  "Contact Information"
                ].map((item, index) => (
                  <a
                    key={index}
                    href={`#section-${index + 1}`}
                    className="block text-sm text-[color:var(--color-secondary-dark)] hover:text-[color:var(--color-primary)] transition-colors duration-200 py-1"
                  >
                    {index + 1}. {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:col-span-9 space-y-8">
            <Section 
              id="section-1" 
              title="1. Acceptance of Terms" 
              icon="✓"
              iconColor="text-[color:var(--color-primary)]"
            >
              <p className="mb-4">
                By accessing, browsing, or using the Mangalam Charitable Trust website ("Website"), 
                you acknowledge that you have read, understood, and agree to be bound by these Terms of Service 
                and our Privacy Policy.
              </p>
              <p className="mb-4">
                If you do not agree with any part of these terms, you must discontinue use of our Website immediately. 
                Your continued use of our services constitutes acceptance of any updates to these terms.
              </p>
              <div className="bg-[color:var(--color-primary-muted)] bg-opacity-20 border-l-4 border-[color:var(--color-primary)] p-4 rounded-r-lg">
                <p className="text-sm">
                  <strong>Important:</strong> These terms create a legally binding agreement between you and Mangalam Charitable Trust.
                </p>
              </div>
            </Section>

            <Section 
              id="section-2" 
              title="2. Website Usage" 
              icon="🌐"
              iconColor="text-[color:var(--color-secondary)]"
            >
              <p className="mb-4">
                You agree to use our Website only for lawful purposes and in accordance with these Terms. 
                You are responsible for ensuring that your use complies with all applicable laws and regulations.
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-lg p-4">
                  <h4 className="font-semibold text-[color:var(--color-primary)] mb-2">✅ Permitted Uses</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Making donations</li>
                    <li>• Accessing information</li>
                    <li>• Contacting our team</li>
                    <li>• Sharing our content</li>
                  </ul>
                </div>
                <div className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-lg p-4">
                  <h4 className="font-semibold text-[color:var(--color-orange)] mb-2">❌ Prohibited Uses</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Unauthorized access attempts</li>
                    <li>• Malicious software distribution</li>
                    <li>• Harassment or abuse</li>
                    <li>• Commercial exploitation</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section 
              id="section-3" 
              title="3. Donations & Payments" 
              icon="💝"
              iconColor="text-[color:var(--color-orange)]"
            >
              <p className="mb-4">
                All donations to Mangalam Charitable Trust are voluntary contributions to support our charitable activities. 
                By making a donation, you agree to the following terms:
              </p>
              <div className="space-y-4">
                <div className="bg-[color:var(--color-secondary-muted)] bg-opacity-20 border border-[color:var(--color-secondary)] rounded-lg p-4">
                  <h4 className="font-semibold text-[color:var(--color-secondary-dark)] mb-2">Donation Policy</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Non-refundable:</strong> Donations are generally non-refundable except in cases of technical errors or fraud</li>
                    <li>• <strong>Tax Benefits:</strong> You may be eligible for tax deductions as per Indian tax laws</li>
                    <li>• <strong>Transparency:</strong> We provide regular updates on how donations are utilized</li>
                    <li>• <strong>Receipts:</strong> Official donation receipts will be provided for all contributions</li>
                  </ul>
                </div>
                <p className="text-sm text-[color:var(--color-primary-muted)]">
                  For refund requests due to technical issues, please contact us within 7 days of the transaction.
                </p>
              </div>
            </Section>

            <Section 
              id="section-4" 
              title="4. User Responsibilities" 
              icon="👤"
              iconColor="text-[color:var(--color-primary)]"
            >
              <p className="mb-4">
                As a user of our Website, you are responsible for:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[color:var(--color-primary)] mb-3">Account Security</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Providing accurate information</li>
                    <li>• Maintaining confidentiality</li>
                    <li>• Reporting suspicious activity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[color:var(--color-secondary)] mb-3">Compliance</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Following all applicable laws</li>
                    <li>• Respecting others' rights</li>
                    <li>• Using services appropriately</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section 
              id="section-5" 
              title="5. Intellectual Property" 
              icon="©️"
              iconColor="text-[color:var(--color-orange)]"
            >
              <p className="mb-4">
                All content on this Website, including but not limited to text, images, logos, graphics, videos, 
                and software, is the property of Mangalam Charitable Trust or our licensors and is protected by 
                Indian and international copyright laws.
              </p>
              <div className="bg-[color:var(--color-orange-muted)] bg-opacity-20 border-l-4 border-[color:var(--color-orange)] p-4 rounded-r-lg">
                <p className="text-sm mb-2">
                  <strong>Usage Rights:</strong> You may view and download content for personal, non-commercial use only.
                </p>
                <p className="text-sm">
                  Written permission is required for any commercial use, reproduction, or distribution of our content.
                </p>
              </div>
            </Section>

            <Section 
              id="section-6" 
              title="6. Privacy & Data Protection" 
              icon="🔒"
              iconColor="text-[color:var(--color-secondary)]"
            >
              <p className="mb-4">
                We are committed to protecting your privacy and personal data. Our data practices are governed by 
                our Privacy Policy, which forms an integral part of these Terms.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-lg">
                  <div className="text-2xl mb-2">🛡️</div>
                  <h4 className="font-semibold text-[color:var(--color-primary)] text-sm">Data Security</h4>
                  <p className="text-xs text-[color:var(--color-secondary-dark)] mt-1">SSL encryption & secure storage</p>
                </div>
                <div className="text-center p-4 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-lg">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold text-[color:var(--color-primary)] text-sm">Limited Use</h4>
                  <p className="text-xs text-[color:var(--color-secondary-dark)] mt-1">Data used only for stated purposes</p>
                </div>
                <div className="text-center p-4 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-lg">
                  <div className="text-2xl mb-2">✋</div>
                  <h4 className="font-semibold text-[color:var(--color-primary)] text-sm">Your Rights</h4>
                  <p className="text-xs text-[color:var(--color-secondary-dark)] mt-1">Access, update, or delete your data</p>
                </div>
              </div>
            </Section>

            <Section 
              id="section-7" 
              title="7. Limitation of Liability" 
              icon="⚖️"
              iconColor="text-[color:var(--color-primary)]"
            >
              <p className="mb-4">
                To the fullest extent permitted by law, Mangalam Charitable Trust shall not be liable for any 
                direct, indirect, incidental, special, consequential, or punitive damages arising from your use 
                of our Website or services.
              </p>
              <div className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-lg p-4">
                <p className="text-sm">
                  <strong>Disclaimer:</strong> Our Website and services are provided on an "as-is" and "as-available" 
                  basis. We make no warranties, expressed or implied, regarding the accuracy, reliability, or 
                  availability of our services.
                </p>
              </div>
            </Section>

            <Section 
              id="section-8" 
              title="8. Third-Party Services" 
              icon="🔗"
              iconColor="text-[color:var(--color-orange)]"
            >
              <p className="mb-4">
                Our Website may contain links to third-party websites or integrate with third-party services. 
                We are not responsible for the content, privacy policies, or practices of these external services.
              </p>
              <div className="bg-[color:var(--color-orange-muted)] bg-opacity-20 border border-[color:var(--color-orange)] rounded-lg p-4">
                <p className="text-sm">
                  <strong>Third-Party Links:</strong> We encourage you to review the terms and privacy policies 
                  of any third-party websites you visit through our links.
                </p>
              </div>
            </Section>

            <Section 
              id="section-9" 
              title="9. Termination" 
              icon="🚪"
              iconColor="text-[color:var(--color-secondary)]"
            >
              <p className="mb-4">
                We reserve the right to terminate or suspend your access to our Website at any time, 
                without prior notice, for conduct that we believe violates these Terms or is harmful 
                to other users or our organization.
              </p>
              <p className="text-sm text-[color:var(--color-secondary-dark)]">
                Upon termination, your right to use our services will cease immediately, but all 
                provisions of these Terms that should survive termination will remain in effect.
              </p>
            </Section>

            <Section 
              id="section-10" 
              title="10. Governing Law" 
              icon="🏛️"
              iconColor="text-[color:var(--color-primary)]"
            >
              <p className="mb-4">
                These Terms of Service are governed by and construed in accordance with the laws of India. 
                Any disputes arising from these Terms or your use of our Website shall be resolved exclusively 
                in the courts of Mumbai, Maharashtra.
              </p>
            </Section>

            <Section 
              id="section-11" 
              title="11. Contact Information" 
              icon="📞"
              iconColor="text-[color:var(--color-orange)]"
            >
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
            </Section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center p-6 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-xl">
          <p className="text-[color:var(--color-secondary-dark)] mb-2">
            Thank you for supporting Mangalam Charitable Trust's mission to make a positive impact in our communities.
          </p>
          <p className="text-sm text-[color:var(--color-primary-muted)]">
            For questions about these Terms of Service, please contact us using the information provided above.
          </p>
        </div>
      </section>
    </div>
  );
};

const Section = ({ id, title, children, icon, iconColor }) => (
  <div id={id} className="scroll-mt-6">
    <div className="bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <span className={`text-3xl mr-4 ${iconColor}`}>{icon}</span>
        <h3 className="text-2xl font-bold text-[color:var(--color-primary-dark)]">
          {title}
        </h3>
      </div>
      <div className="text-[color:var(--color-foreground)] leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export default TermsOfServicePage;