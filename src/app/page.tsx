import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ArticlesSection from '@/components/articles-section';
import EventsSection from '@/components/events-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import QuickLinksSection from '@/components/quick-links-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <QuickLinksSection />
        <ArticlesSection />
        <EventsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
