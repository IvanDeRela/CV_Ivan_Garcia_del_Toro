import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import TimelineSection from '@/components/portfolio/TimelineSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import TravelsSection from '@/components/portfolio/TravelsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import { useLang } from '@/hooks/useLang';

const tabs = ['about', 'timeline', 'skills', 'travels', 'contact'] as const;
type Tab = typeof tabs[number];

const tabComponents: Record<Tab, React.ComponentType> = {
  about: AboutSection,
  timeline: TimelineSection,
  skills: SkillsSection,
  travels: TravelsSection,
  contact: ContactSection,
};

const tabIcons: Record<Tab, string> = {
  about: '👤',
  timeline: '📋',
  skills: '⚡',
  travels: '🌍',
  contact: '✉️',
};

const tabKeyMap: Record<Tab, string> = {
  about: 'nav.about',
  timeline: 'nav.timeline',
  skills: 'nav.skills',
  travels: 'nav.world',
  contact: 'nav.contact',
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const { t } = useLang();
  const ActiveComponent = tabComponents[activeTab];

  return (
    <>
      <Navbar />
      <HeroSection />

      {/* Tab Navigation */}
      <div className="sticky top-[60px] z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex justify-center px-4">
          <div className="flex gap-1 py-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <span className="text-base">{tabIcons[tab]}</span>
                <span className="hidden sm:inline">{t(tabKeyMap[tab])}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'hsl(var(--ocean) / 0.08)',
                      border: '1px solid hsl(var(--ocean) / 0.2)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Index;
