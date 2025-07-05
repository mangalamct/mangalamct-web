import Link from 'next/link'
import React from 'react'

const BannerCom = ({name="",pagetext=""}) => {
  return (
    <div>

          <div className="relative bg-gradient-to-r from-primary to-secondary text-white h-[400px] flex items-center">
        <div className="absolute inset-0 bg-black/10">
        
          <img src="https://balrakshabharat.org/wp-content/themes/ngo/images/nwhmpg/ta-1-1.webp" alt="Background Pattern" className="absolute inset-0 w-full h-full object-cover opacity-[0.4]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <nav className="flex items-center space-x-2 text-sm mb-6">
                <Link href="/" className="text-white/80 hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <span className="text-white/60">/</span>
                <span className="text-white font-medium">{pagetext}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerCom