"use client"
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import FixedDonationButton from './FixedDonationButton'
import ScrollToTop from './ScrollToTop'
import { usePathname } from 'next/navigation'

const Layout = ({children}) => {
   const withoutlayout=['/payment/success', '/payment/pending', '/payment/failure', '/payment']
     const pathname=usePathname()
   console.log(pathname,'pathname')
    if(withoutlayout.includes(pathname)){
        return children
    }
  return (
    <div>
               <Header />
        {children}
        <Footer />
        <FixedDonationButton/>
        <ScrollToTop/>
    </div>
  )
}

export default Layout