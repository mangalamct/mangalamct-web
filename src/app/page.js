import AboutSection from "@/components/homecom/AboutSection";
import ContactSection from "@/components/homecom/ContactSection";
import HeroSection from "@/components/homecom/HeroSection";
import WhatWeDoSection from "@/components/homecom/WhatWeDo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
     <HeroSection/>
     <AboutSection/>
     <WhatWeDoSection/>
     <ContactSection/>
    </div>
  );
}
