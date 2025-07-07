"use client"
import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    duration: 1000,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  }, [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ])

  const heroSlides = [
    {
      id: 1,
      title: "Transforming Lives Through Education",
      subtitle: "Empowering Communities",
      description: "Supporting underprivileged children with quality education, scholarships, and learning resources to build a brighter future.",
      buttonText: "Support Education",
      buttonSecondary: "Learn More",
      bgGradient: "from-blue-600 via-indigo-600 to-purple-600",
      image: "/images/base/Empowering-Communities.jpg"
    },
    {
      id: 2,
      title: "Healthcare for All",
      subtitle: "Compassionate Care",
      description: "Providing essential healthcare services, medical camps, and health awareness programs to underserved communities.",
      buttonText: "Healthcare Programs",
      buttonSecondary: "Our Impact",
      bgGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      image: "/images/base/new-healthcare.jpg"
    },
    {
      id: 3,
      title: "Women Empowerment",
      subtitle: "Building Stronger Communities",
      description: "Empowering women through skill development, vocational training, and entrepreneurship programs for economic independence.",
      buttonText: "Join Our Mission",
      buttonSecondary: "Success Stories",
      bgGradient: "from-pink-600 via-rose-600 to-red-600",
      image: "/images/base/community-empowerment.jpg"
    },
    {
      id: 4,
      title: "Rural Development",
      subtitle: "Sustainable Growth",
      description: "Creating sustainable development opportunities in rural areas through infrastructure, clean water, and livelihood programs.",
      buttonText: "Rural Projects",
      buttonSecondary: "View Projects",
      bgGradient: "from-amber-600 via-orange-600 to-red-600",
      image: "/images/base/ruler-developement.jpg"
    },
    {
      id: 5,
      title: "Child Welfare",
      subtitle: "Protecting Young Lives",
      description: "Ensuring child safety, nutrition, and development through comprehensive care programs and protective services.",
      buttonText: "Child Programs",
      buttonSecondary: "Get Involved",
      bgGradient: "from-violet-600 via-purple-600 to-indigo-600",
      image: "/images/base/Child-Welfare.jpg"
    },
    {
      id: 6,
      title: "Environmental Conservation",
      subtitle: "Protecting Our Planet",
      description: "Promoting environmental awareness, tree plantation drives, and sustainable practices for a greener tomorrow.",
      buttonText: "Go Green",
      buttonSecondary: "Our Initiatives",
      bgGradient: "from-green-600 via-emerald-600 to-teal-600",
      image: "/images/base/Environmental-Conservation.jpg"
    }
  ]

  return (
    <div className="relative w-full h-[calc(100vh-140px)] overflow-hidden">
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-30">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-sm">Loading...</p>
          </div>
        </div>
      )}

      <div 
        ref={sliderRef} 
        className={`keen-slider h-full transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          // Hide all slides initially until slider is loaded
          visibility: loaded ? 'visible' : 'hidden'
        }}
      >
        {heroSlides.map((slide, idx) => (
          <div key={slide.id} className={`keen-slider__slide number-slide${slide.id} relative`}>
            {/* Background with gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} opacity-85`}></div>
            
            {/* Background image */}
            <div 
              className="absolute inset-0"
              style={{
                filter: 'brightness(0.3)'
              }}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
            
            {/* Content overlay */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto text-center">
                {/* Animated subtitle */}
                <div className="mb-4 opacity-90">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-white border border-white/30">
                    {slide.subtitle}
                  </span>
                </div>
                
                {/* Main title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                
                {/* Action buttons */}
                {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <button 
                    className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                    style={{
                      background: 'linear-gradient(135deg, #e74c3c 0%, #ff6b5e 100%)',
                      color: 'white'
                    }}
                  >
                    <span className="relative z-10">{slide.buttonText}</span>
                    <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  <button className="group px-4 sm:px-6 py-2 sm:py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm text-sm sm:text-base">
                    <span className="relative z-10">{slide.buttonSecondary}</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e) => {
              e.stopPropagation()
              instanceRef.current?.prev()
            }}
            disabled={false}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20"
          />
          <Arrow
            onClick={(e) => {
              e.stopPropagation()
              instanceRef.current?.next()
            }}
            disabled={false}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20"
          />
        </>
      )}

      {/* Dots indicator */}
      {loaded && instanceRef.current && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2 sm:space-x-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Arrow({ disabled, left, onClick, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {left ? (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )
}

export default HeroSection