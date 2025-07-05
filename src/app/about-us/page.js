import BannerCom from '@/components/base/BannerCom'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <BannerCom name='About Us' pagetext='about us' description='Learn more about our mission, vision, and the team behind our initiatives.' />
    
      
      {/* Rest of your page content goes here */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center">Your about page content...</p>
        </div>
      </div>
    </div>
  )
}

export default page