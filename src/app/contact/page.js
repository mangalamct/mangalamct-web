import BannerCom from '@/components/base/BannerCom'
import ContactSection from '@/components/homecom/ContactSection'
import React from 'react'

const page = () => {
  return (
    <div>
           <BannerCom name='Contact Us' pagetext='Contact us'/>
           <ContactSection hideHeadding={true}/>

    </div>
  )
}

export default page