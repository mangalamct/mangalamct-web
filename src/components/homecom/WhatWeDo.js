"use client";
import React, { useState, useEffect } from 'react';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { 
  GraduationCap, 
  Heart, 
  Users, 
  Home,
  ArrowRight,
  Target,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  HandHeart
} from 'lucide-react';

const whatWeDoData = {
  title: "What We Do",
  subtitle: "Transforming Lives Through Compassionate Action",
  description: "We believe in creating lasting change through comprehensive support programs that address the core needs of underprivileged communities.",
  
  focusAreas: [
    {
      id: 'education',
      title: 'Education & Skill Development',
      icon: GraduationCap,
      description: 'Providing quality education opportunities, scholarships, and vocational training to empower individuals with knowledge and skills for a brighter future.',
      image: '/images/whatWeDo/skill-training.jpg'
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Medical Support',
      icon: Stethoscope,
      description: 'Ensuring access to quality healthcare services through medical camps, health awareness programs, and emergency medical assistance.',
      image: '/images/whatWeDo/heelth-help.avif'
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      icon: Users,
      description: 'Supporting women through empowerment programs and various initiatives to ensure dignity and independence in their lives.',
      image: '/images/whatWeDo/women-empowerment-in-india.webp'
    },
    {
      id: 'social-welfare',
      title: 'Social Welfare & Community Development',
      icon: Home,
      description: 'Building stronger communities through infrastructure development, social support programs, and emergency relief initiatives.',
      image: 'https://sukanyaujjwalwelfarefoundation.in/soci.jpeg'
    },
    {
      id: 'elderly-care',
      title: 'Elderly Care & Support',
      icon: HandHeart,
      description: 'Providing comprehensive care and support services for elderly community members to ensure their dignity and well-being.',
      image: '/images/whatWeDo/elderly-care.jpg'
    },
    {
      id: 'disaster-relief',
      title: 'Disaster Relief & Emergency Support',
      icon: Target,
      description: 'Rapid response and relief services during natural disasters and emergencies to help affected communities recover.',
      image: '/images/whatWeDo/disaster-relief.jpg'
    }
  ]
};

const AdvancedSlider = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
     
      breakpoints: {
           "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
       "(min-width: 1280px)": {
        slides: { perView: 4, spacing: 10 },
      }
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('what-we-do-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    instanceRef.current?.next();
  };

  const prevSlide = () => {
    instanceRef.current?.prev();
  };

  const goToSlide = (index) => {
    instanceRef.current?.moveToIdx(index);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
   
      
      <section id="what-we-do-section" className="py-16 lg:py-24 bg-[var(--color-background)] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-40 h-40 bg-[var(--color-primary)] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-[var(--color-orange)] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[var(--color-secondary)] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl mb-6 shadow-xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {whatWeDoData.title}
            </h2>
            <p className="text-xl text-[var(--color-primary)] font-semibold mb-4">
              {whatWeDoData.subtitle}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {whatWeDoData.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-orange)] mx-auto rounded-full mt-6"></div>
          </div>

          {/* Keen Slider */}
          <div className={`mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative">
              {/* Slider Container */}
              <div ref={sliderRef} className="keen-slider py-2">
                {whatWeDoData.focusAreas.map((area, index) => (
                  <div key={area.id} className="keen-slider__slide">
                    <div className="h-full px-2">
                      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 h-[480px]">
                        {/* Image Section */}
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={area.image} 
                            alt={area.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Icon */}
                          {/* <div className="absolute top-4 left-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                            <area.icon className="w-7 h-7 text-[var(--color-primary)]" />
                          </div> */}

                          {/* Gradient Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col justify-between h-[250px]">
                          <div className="flex-1 h-[250px]">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                              {area.title}
                            </h3>
                            
                            <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                              {area.description}
                            </p>
                          </div>

                          {/* Read More Button */}
                          <div className="mt-4">
                            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-secondary-dark)] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 group/btn shadow-md hover:shadow-lg">
                              <span>Read More</span>
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>

                        {/* Hover Effect Border */}
                        <div className="absolute inset-0 border-2 border-[var(--color-primary)] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group z-10 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-[var(--color-primary)] transition-colors duration-300" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 hover:bg-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group z-10 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-[var(--color-primary)] transition-colors duration-300" />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {whatWeDoData.focusAreas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] w-8 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400 w-2'
                  }`}
                />
              ))}
            </div>

        
          </div>

        </div>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-orange)] to-[var(--color-secondary)]"></div>
      </section>
    </div>
  );
};

export default AdvancedSlider;