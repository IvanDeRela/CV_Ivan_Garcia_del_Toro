import { LangProvider } from '@/hooks/useLang';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import TimelineSection from '@/components/portfolio/TimelineSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import TravelsSection from '@/components/portfolio/TravelsSection';
import Footer from '@/components/portfolio/Footer';

const Index = () => {
  return (
    <LangProvider>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <TravelsSection />
      <Footer />
    </LangProvider>
  );
};

export default Index;
