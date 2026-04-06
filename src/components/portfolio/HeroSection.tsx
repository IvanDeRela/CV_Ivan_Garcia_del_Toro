import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import heroBg from '@/assets/hero-bg.jpg';

const stats = [
  { value: '17', key: 'hero.s1' },
  { value: '43+', key: 'hero.s2' },
  { value: '4', key: 'hero.s3' },
  { value: '8.3', label: 'GPA' },
];

function AnimatedCounter({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      className="font-display font-bold text-gold block"
      style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
    >
      {value}
    </motion.span>
  );
}

export default function HeroSection() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsla(216,55%,7%,0.85) 0%, hsla(216,55%,7%,0.55) 50%, hsla(216,55%,7%,0.9) 100%)' }} />
      </motion.div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 3 + i * 2,
            height: 3 + i * 2,
            background: `hsla(42,50%,54%,${0.15 + i * 0.05})`,
            left: `${15 + i * 18}%`,
            top: `${20 + i * 12}%`,
          }}
          animate={{
            y: [0, -30 - i * 10, 0],
            x: [0, 10 + i * 5, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Animated rings with parallax */}
      <motion.div
        className="absolute right-[-80px] top-1/2 w-[500px] h-[500px] lg:w-[650px] lg:h-[650px] rounded-full pointer-events-none"
        style={{
          border: '1px solid hsla(194,72%,38%,0.12)',
          scale: ringScale,
          opacity: ringOpacity,
          translateY: '-50%',
        }}
      >
        <motion.div
          className="absolute inset-10 rounded-full"
          style={{ border: '1px solid hsla(42,50%,54%,0.08)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-20 rounded-full"
          style={{ border: '1px solid hsla(194,72%,38%,0.06)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 px-5 md:px-12 lg:px-20 pt-32 pb-20 max-w-3xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.72rem] tracking-[0.2em] uppercase font-bold mb-6"
          style={{
            background: 'hsla(194,72%,38%,0.15)',
            border: '1px solid hsla(194,72%,38%,0.3)',
            color: 'hsl(194,72%,38%)',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ●
          </motion.span>
          {t('hero.tag')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black leading-[1.05] mb-2"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
        >
          <motion.span
            className="text-cream inline-block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Iván García
          </motion.span>
          <motion.span
            className="text-gold block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            del Toro.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-accent italic font-light text-cream-muted mb-8 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-cream-muted leading-[1.8] max-w-[520px] mb-12"
          style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1rem)' }}
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-8 md:gap-10 mb-12 flex-wrap"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            >
              <AnimatedCounter value={s.value} />
              <span className="text-[0.72rem] tracking-[0.15em] uppercase text-cream-dim">
                {s.label || t(s.key!)}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex gap-4 flex-wrap"
        >
          <a href="#timeline" className="btn-gold">{t('hero.cta1')}</a>
          <a href="#travels" className="btn-outline">{t('hero.cta2')}</a>
          <a
            href="/CV_Ivan_Garcia_del_Toro.pdf"
            download
            className="btn-outline flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t('hero.cv')}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-cream/20 flex items-start justify-center p-1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ background: 'hsl(42,50%,54%)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
