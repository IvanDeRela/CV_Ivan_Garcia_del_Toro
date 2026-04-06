import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import type { Lang } from '@/data/i18n';

const langs: { code: Lang; flag: string; label: string }[] = [
  { code: 'es', flag: 'es', label: 'Español' },
  { code: 'fr', flag: 'fr', label: 'Français' },
  { code: 'en', flag: 'gb', label: 'English' },
  { code: 'de', flag: 'de', label: 'Deutsch' },
];

const navLinks = ['about', 'timeline', 'skills', 'travels', 'contact'] as const;
const navKeyMap: Record<string, string> = {
  about: 'nav.about',
  timeline: 'nav.timeline',
  skills: 'nav.skills',
  travels: 'nav.world',
  contact: 'nav.contact',
};

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      style={{
        background: scrolled ? 'hsla(216,55%,7%,0.97)' : 'hsla(216,55%,7%,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid hsla(42,50%,54%,0.12)',
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-12 min-h-[60px]">
        <a href="#hero" className="font-display font-bold text-gold tracking-[0.1em] uppercase text-sm shrink-0">
          Iván G.T.
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7 flex-1 ml-10">
          {navLinks.map((id) => (
            <a
              key={id}
              href={`#${id === 'contact' ? 'skills' : id}`}
              className="text-cream-muted text-[0.72rem] font-bold tracking-[0.15em] uppercase transition-colors duration-300 hover:text-gold whitespace-nowrap"
            >
              {t(navKeyMap[id])}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[0.68rem] font-bold tracking-wide transition-all duration-200 border ${
                lang === l.code
                  ? 'border-gold/50 bg-gold/15 text-gold'
                  : 'border-foreground/10 bg-foreground/[0.03] text-cream-dim hover:border-gold/30 hover:bg-gold/10 hover:text-gold'
              }`}
            >
              <img
                src={`https://flagcdn.com/w40/${l.flag}.png`}
                width={18}
                alt={l.label}
                className="rounded-sm"
              />
              <span className="hidden xl:inline">{l.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-gold text-2xl p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: 'hsla(216,55%,7%,0.98)',
              borderBottom: '1px solid hsla(42,50%,54%,0.15)',
            }}
          >
            <div className="flex flex-col pb-4">
              {navLinks.map((id) => (
                <a
                  key={id}
                  href={`#${id === 'contact' ? 'skills' : id}`}
                  className="text-cream-muted text-sm font-bold tracking-[0.12em] uppercase px-6 py-3 hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(navKeyMap[id])}
                </a>
              ))}
              <div className="flex gap-2 px-6 pt-3 flex-wrap">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setMobileOpen(false); }}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[0.7rem] font-bold border transition-all ${
                      lang === l.code
                        ? 'border-gold/50 bg-gold/15 text-gold'
                        : 'border-foreground/10 bg-foreground/[0.03] text-cream-dim'
                    }`}
                  >
                    <img src={`https://flagcdn.com/w40/${l.flag}.png`} width={18} alt={l.label} className="rounded-sm" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
