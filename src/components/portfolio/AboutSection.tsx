import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/hooks/useLang';

const infoCards = [
  { icon: '🎓', labelKey: 'about.cl1', valueKey: 'about.cv1' },
  { icon: '📍', labelKey: 'about.cl2', valueKey: 'about.cv2' },
  { icon: '🏛️', labelKey: 'about.cl3', valueKey: 'about.cv3' },
  { icon: '📅', labelKey: 'about.cl4', valueKey: 'about.cv4' },
  { icon: '✉️', labelKey: 'about.cl5', value: 'ivangarciadeltoro04@gmail.com' },
  { icon: '🚗', labelKey: 'about.cl6', valueKey: 'about.cv6' },
  { icon: '🌍', labelKey: 'about.cl7', valueKey: 'about.cv7' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const { t } = useLang();

  return (
    <section id="about" className="section-padding bg-deep">
      <FadeIn>
        <div className="mb-14">
          <p className="tag-label mb-3">{t('about.tag')}</p>
          <h2 className="font-display font-black leading-tight text-cream" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
            {t('about.title.1')} <span className="text-gold">{t('about.title.2')}</span>
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <FadeIn delay={0.1}>
            <p className="font-accent italic text-lg leading-relaxed text-cream/90 mb-5">{t('about.p1')}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <blockquote
              className="my-7 pl-6 font-accent italic text-xl leading-snug text-gold"
              style={{ borderLeft: '3px solid hsl(42,50%,54%)' }}
            >
              {t('about.quote')}
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[0.97rem] leading-[1.9] text-cream/80 mb-5">{t('about.p2')}</p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-[0.97rem] leading-[1.9] text-cream/80">{t('about.p3')}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoCards.map((card, i) => (
              <div key={i} className="glass-card-hover rounded p-4">
                <span className="text-xl mb-1.5 block">{card.icon}</span>
                <span className="text-[0.68rem] tracking-[0.15em] uppercase text-teal block mb-1">
                  {t(card.labelKey)}
                </span>
                <span className="text-sm font-bold text-cream">
                  {card.value || t(card.valueKey!)}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
