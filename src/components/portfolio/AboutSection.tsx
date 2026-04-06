import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/hooks/useLang';

const infoCards = [
  { icon: '🎓', labelKey: 'about.cl1', valueKey: 'about.cv1' },
  { icon: '📍', labelKey: 'about.cl2', valueKey: 'about.cv2' },
  { icon: '🏛️', labelKey: 'about.cl3', valueKey: 'about.cv3' },
  { icon: '📅', labelKey: 'about.cl4', valueKey: 'about.cv4' },
  { icon: '✉️', labelKey: 'about.cl5', value: 'garciadeltoroivan@gmail.com' },
  { icon: '🚗', labelKey: 'about.cl6', valueKey: 'about.cv6' },
  { icon: '🌍', labelKey: 'about.cl7', valueKey: 'about.cv7' },
];

function FadeIn({ children, delay = 0, direction = 'up' }: { children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const initial = direction === 'up' ? { opacity: 0, y: 40 } : direction === 'left' ? { opacity: 0, x: -40 } : { opacity: 0, x: 40 };
  const animate = inView ? { opacity: 1, y: 0, x: 0 } : {};
  return (
    <motion.div ref={ref} initial={initial} animate={animate} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section id="about" className="section-padding bg-deep relative overflow-hidden" ref={sectionRef}>
      {/* Subtle parallax decorative element */}
      <motion.div
        className="absolute -right-32 -top-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsla(42,50%,54%,0.04) 0%, transparent 70%)',
          y: bgY,
        }}
      />

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
          <FadeIn delay={0.1} direction="left">
            <p className="font-accent italic text-lg leading-relaxed text-cream/90 mb-5">{t('about.p1')}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <motion.blockquote
              className="my-7 pl-6 font-accent italic text-xl leading-snug text-gold relative"
              style={{ borderLeft: '3px solid hsl(42,50%,54%)' }}
              whileInView={{ borderLeftWidth: [0, 3] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('about.quote')}
            </motion.blockquote>
          </FadeIn>
          <FadeIn delay={0.3} direction="left">
            <p className="text-[0.97rem] leading-[1.9] text-cream/80 mb-5">{t('about.p2')}</p>
          </FadeIn>
          <FadeIn delay={0.4} direction="left">
            <p className="text-[0.97rem] leading-[1.9] text-cream/80">{t('about.p3')}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} direction="right">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoCards.map((card, i) => (
              <motion.div
                key={i}
                className="glass-card-hover rounded p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03 }}
              >
                <motion.span
                  className="text-xl mb-1.5 block"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {card.icon}
                </motion.span>
                <span className="text-[0.68rem] tracking-[0.15em] uppercase text-teal block mb-1">
                  {t(card.labelKey)}
                </span>
                <span className="text-sm font-bold text-cream">
                  {card.value || t(card.valueKey!)}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
