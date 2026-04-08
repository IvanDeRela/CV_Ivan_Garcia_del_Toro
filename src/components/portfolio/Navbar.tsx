import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useLang } from '@/hooks/useLang';
import { useTheme } from '@/hooks/useTheme';
import type { Lang } from '@/data/i18n';

const langs: { code: Lang; flag: string; label: string }[] = [
  { code: 'es', flag: 'es', label: 'ES' },
  { code: 'fr', flag: 'fr', label: 'FR' },
  { code: 'en', flag: 'gb', label: 'EN' },
  { code: 'de', flag: 'de', label: 'DE' },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { dark, toggle } = useTheme();
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
        scrolled ? 'shadow-md bg-background/97' : 'bg-transparent'
      }`}
      style={{
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid hsl(var(--border))' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-12 min-h-[60px]">
        <a
          href="#hero"
          className="font-display font-bold tracking-[0.08em] uppercase text-sm shrink-0 transition-colors"
          style={{ color: scrolled ? 'hsl(var(--ocean))' : 'white' }}
        >
          Iván G.T.
        </a>

        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className={`p-2 rounded-md transition-all duration-200 mr-2 ${
              scrolled
                ? 'text-muted-foreground hover:bg-accent hover:text-foreground'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={dark ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold tracking-wide transition-all duration-200 border ${
                lang === l.code
                  ? scrolled
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-white/40 bg-white/15 text-white'
                  : scrolled
                    ? 'border-transparent bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground'
                    : 'border-transparent bg-transparent text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              <img
                src={`https://flagcdn.com/w40/${l.flag}.png`}
                width={18}
                alt={l.label}
                className="rounded-sm"
              />
              <span>{l.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggle}
            className={`p-2 rounded-md transition-all duration-200 ${
              scrolled
                ? 'text-muted-foreground hover:bg-accent'
                : 'text-white/60 hover:text-white'
            }`}
            aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-2xl p-2 transition-colors"
            style={{ color: scrolled ? 'hsl(var(--ocean))' : 'white' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex gap-2 px-6 py-4 flex-wrap">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMobileOpen(false); }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-bold border transition-all ${
                    lang === l.code
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : 'border-border bg-accent text-muted-foreground'
                  }`}
                >
                  <img src={`https://flagcdn.com/w40/${l.flag}.png`} width={18} alt={l.label} className="rounded-sm" />
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
