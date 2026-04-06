import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';

const languages = [
  { nameKey: 'sk.l1', levelKey: 'sk.l1lv', flag: 'es', percent: 100 },
  { nameKey: 'sk.l2', levelKey: 'sk.l2lv', certKey: 'sk.l2ct', flag: 'gb', percent: 85 },
  { nameKey: 'sk.l3', levelKey: 'sk.l3lv', certKey: 'sk.l3ct', flag: 'fr', percent: 70 },
  { nameKey: 'sk.l4', levelKey: 'sk.l4lv', certKey: 'sk.l4ct', flag: 'de', percent: 25 },
];

const skillEmojis = ['📊', '💻', '🤝', '🗣️', '🌍', '📝', '🏛️', '🔍', '📋', '🚀', '⚖️', '🗺️'];

export default function SkillsSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const barsRef = useRef(null);
  const barsInView = useInView(barsRef, { once: true, margin: '-40px' });
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    if (barsInView) setBarsAnimated(true);
  }, [barsInView]);

  const skillTags = t('sk.tags').split(',');

  return (
    <section id="skills" className="section-padding bg-deep">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="tag-label mb-3">{t('sk.tag')}</p>
        <h2 className="font-display font-black leading-tight text-cream" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
          {t('sk.title.1')} <span className="text-gold">{t('sk.title.2')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" ref={barsRef}>
        {/* Languages */}
        <div>
          <h3 className="text-[0.73rem] tracking-[0.2em] uppercase text-teal mb-6">{t('sk.ltitle')}</h3>
          {languages.map((lang, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-[0.9rem] text-cream flex items-center gap-1.5">
                  <img src={`https://flagcdn.com/w40/${lang.flag}.png`} width={20} alt="" className="rounded-sm" />
                  {t(lang.nameKey)}
                </span>
                <div className="text-right">
                  <span className="text-[0.68rem] tracking-[0.1em] uppercase text-teal font-bold block">{t(lang.levelKey)}</span>
                  {lang.certKey && (
                    <span className="text-[0.63rem] text-cream-dim block">{t(lang.certKey)}</span>
                  )}
                </div>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: barsAnimated ? `${lang.percent}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Professional skills */}
        <div>
          <h3 className="text-[0.73rem] tracking-[0.2em] uppercase text-teal mb-6">{t('sk.ptitle')}</h3>
          <div className="flex flex-wrap gap-1.5">
            {skillTags.map((tag, i) => (
              <span key={i} className="skill-chip">
                {skillEmojis[i] || '✦'} {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[0.73rem] tracking-[0.2em] uppercase text-teal mb-6">{t('sk.ctitle')}</h3>
          <div className="space-y-0">
            <a
              href="mailto:garciadeltoroivan@gmail.com"
              className="flex items-center gap-3 py-3 text-cream-muted text-sm transition-colors duration-300 hover:text-gold"
              style={{ borderBottom: '1px solid hsla(var(--cream) / 0.06)' }}
            >
              <span
                className="w-[30px] h-[30px] flex items-center justify-center rounded text-sm shrink-0"
                style={{ background: 'hsla(194,72%,38%,0.1)', border: '1px solid hsla(194,72%,38%,0.2)' }}
              >
                ✉️
              </span>
              garciadeltoroivan@gmail.com
            </a>
            <a
              href="tel:+34645694245"
              className="flex items-center gap-3 py-3 text-cream-muted text-sm transition-colors duration-300 hover:text-gold"
              style={{ borderBottom: '1px solid hsla(var(--cream) / 0.06)' }}
            >
              <span
                className="w-[30px] h-[30px] flex items-center justify-center rounded text-sm shrink-0"
                style={{ background: 'hsla(194,72%,38%,0.1)', border: '1px solid hsla(194,72%,38%,0.2)' }}
              >
                📞
              </span>
              +34 645 69 42 45
            </a>
            <a
              href="https://www.linkedin.com/in/iv%C3%A1n-garc%C3%ADa-del-toro/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-3 text-cream-muted text-sm transition-all duration-300 hover:text-[#0A66C2]"
            >
              <span
                className="w-[30px] h-[30px] flex items-center justify-center rounded text-sm shrink-0 overflow-hidden"
                style={{ background: 'hsla(194,72%,38%,0.1)', border: '1px solid hsla(194,72%,38%,0.2)' }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </span>
              Iván García del Toro — LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
