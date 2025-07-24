import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import Footer from '@/components/footer';
import QuickLinksSection from '@/components/quick-links-section';
import WhatWeDoSection from '@/components/what-we-do-section';
import OurGoalsSection from '@/components/our-goals-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <WhatWeDoSection />
        <OurGoalsSection />
        <QuickLinksSection />
      </main>
      <Footer />
    </div>
  );
}
