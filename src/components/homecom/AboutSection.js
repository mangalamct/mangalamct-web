"use client";
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Target, 
  ArrowRight,
  Quote,
  Users,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

const aboutUsHomeSection = {
  title: "About Us",
  shortDescription:
    "Mangalam Charitable Trust is a registered non-profit organization dedicated to uplifting underprivileged communities through education, healthcare, women empowerment, and social welfare programs.",
  mission:
    "To create a compassionate and equitable society by supporting vulnerable individuals and empowering communities with opportunities for a better future.",
  keyHighlights: `Our focus areas encompass education, healthcare, women empowerment, and rural social development, creating comprehensive support systems for communities in need. Through our special initiative, the Kanya Vivah Sahyog Yojana, we operate a collective contribution scheme that provides crucial support to girls at the time of marriage, ensuring they have the resources needed for this important life milestone.

We remain actively engaged in providing direct community support through regular medical camps, financial aid programs, and emergency assistance to those facing challenging circumstances. Our commitment extends beyond immediate relief to creating sustainable change through skill development programs and educational initiatives that empower individuals to build better futures for themselves and their families.`,
  callToActionLinks: [
    { label: "Learn More", url: "/about-us" },
    { label: "Donate Now", url: "/donation" }
  ]
};

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-section" className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--color-primary)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-[var(--color-orange)] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[var(--color-secondary)] rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-[5%] relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl mb-6 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {aboutUsHomeSection.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-orange)] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            {/* Description */}
            <div className="mb-8">
              <div className="flex items-start space-x-3 mb-6">
                <Quote className="w-6 h-6 text-[var(--color-primary)] mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-700 leading-relaxed">
                  {aboutUsHomeSection.shortDescription}
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-[var(--color-primary-muted)] to-[var(--color-secondary-muted)] rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Target className="w-5 h-5 text-[var(--color-primary)] mr-2" />
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {aboutUsHomeSection.mission}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-[var(--color-orange)] mr-2" />
                Our Work & Impact
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {aboutUsHomeSection.keyHighlights.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="hover:text-gray-900 transition-colors duration-200">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {aboutUsHomeSection.callToActionLinks.map((link, index) => (
                <Link href={link.url} className=' cursor-pointer'>
                <button
                  key={index}
                  className={`px-6 py-3 cursor-pointer rounded-full font-semibold transition-all duration-200 flex items-center space-x-2 group ${
                    index === 0
                      ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white shadow-lg hover:shadow-xl'
                      : 'bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/base/aboutImg.webp" 
                  alt="Community support and charitable work" 
                  className="w-full h-auto object-fill"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[var(--color-border)]">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Trusted NGO</div>
                    <div className="text-xs text-gray-600">Registered & Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-orange)] to-[var(--color-secondary)]"></div>
    </section>
  );
};

export default AboutSection;