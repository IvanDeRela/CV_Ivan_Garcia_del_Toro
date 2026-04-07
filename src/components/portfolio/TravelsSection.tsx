import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { getCountries } from '@/data/i18n';

function CountryCard({ country, index }: { country: { name: string; code: string; count: number; cities: string }; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card-hover rounded-lg p-5 relative overflow-hidden group"
    >
      <div className="flex items-center gap-2.5 mb-3 relative">
        <img
          src={`https://flagcdn.com/w40/${country.code}.png`}
          width={28}
          alt={country.name}
          className="rounded-sm shrink-0"
          loading="lazy"
        />
        <span className="font-display font-bold text-foreground text-base flex-1 transition-colors duration-300 group-hover:text-primary">
          {country.name}
        </span>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
          style={{ background: 'hsl(var(--ocean) / 0.08)', color: 'hsl(var(--ocean))', border: '1px solid hsl(var(--ocean) / 0.15)' }}
        >
          {country.count}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{country.cities}</p>
    </motion.div>
  );
}

export default function TravelsSection() {
  const { lang, t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const countries = getCountries(lang);

  return (
    <section id="travels" className="section-padding relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <p className="tag-label mb-3">{t('tr.tag')}</p>
        <h2 className="font-display font-black leading-tight text-foreground" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
          {t('tr.title.1')} <span style={{ color: 'hsl(var(--ocean))' }}>{t('tr.title.2')}</span>
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-12">
        <motion.p
          className="text-base leading-[1.9] text-muted-foreground max-w-xl flex-1"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('tr.desc')}
        </motion.p>
        <div className="flex gap-4 flex-wrap shrink-0">
          {[
            { num: '17', label: t('hero.s1') },
            { num: '43+', label: t('hero.s2') },
            { num: '2', label: t('tr.continents') },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="glass-card-hover rounded-lg text-center px-7 py-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-display font-black block leading-none" style={{ fontSize: '2.6rem', color: 'hsl(var(--ocean))' }}>
                {s.num}
              </span>
              <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground mt-2 block">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {countries.map((country, i) => (
          <CountryCard key={`${lang}-${country.code}`} country={country} index={i} />
        ))}
      </div>
    </section>
  );
}
