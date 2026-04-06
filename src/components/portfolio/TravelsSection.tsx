import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { getCountries } from '@/data/i18n';

export default function TravelsSection() {
  const { lang, t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const countries = getCountries(lang);

  return (
    <section id="travels" className="section-padding bg-navy">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="tag-label mb-3">{t('tr.tag')}</p>
        <h2 className="font-display font-black leading-tight text-cream" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
          {t('tr.title.1')} <span className="text-gold">{t('tr.title.2')}</span>
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-14">
        <p className="text-[0.97rem] leading-[1.9] text-cream-muted max-w-xl flex-1">{t('tr.desc')}</p>
        <div className="flex gap-5 flex-wrap shrink-0">
          {[
            { num: '17', label: t('hero.s1') },
            { num: '43+', label: t('hero.s2') },
            { num: '2', label: t('tr.continents') },
          ].map((s, i) => (
            <div key={i} className="glass-card-hover rounded-md text-center px-7 py-5">
              <span className="font-display font-black text-gold block leading-none" style={{ fontSize: '2.4rem' }}>
                {s.num}
              </span>
              <span className="text-[0.68rem] tracking-[0.2em] uppercase text-cream-dim mt-1.5 block">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {countries.map((country, i) => {
          const cardRef = useRef(null);
          const cardInView = useInView(cardRef, { once: true, margin: '-30px' });
          return (
            <motion.div
              ref={cardRef}
              key={`${lang}-${country.code}`}
              initial={{ opacity: 0, y: 20 }}
              animate={cardInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="glass-card-hover rounded-md p-5 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, hsla(42,50%,54%,0.03) 0%, transparent 60%)' }}
              />
              <div className="flex items-center gap-2.5 mb-2.5 relative">
                <img
                  src={`https://flagcdn.com/w40/${country.code}.png`}
                  width={28}
                  alt={country.name}
                  className="rounded-sm shrink-0"
                  loading="lazy"
                />
                <span className="font-display font-bold text-cream text-[0.98rem] flex-1">{country.name}</span>
                <span
                  className="text-[0.68rem] font-bold text-teal px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{ background: 'hsla(194,72%,38%,0.12)', border: '1px solid hsla(194,72%,38%,0.25)' }}
                >
                  {country.count}
                </span>
              </div>
              <p className="text-[0.76rem] leading-relaxed text-cream-dim relative">{country.cities}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
