import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';
import heroBg from '@/assets/hero-bg.jpg';

const stats = [
  { value: '17', key: 'hero.s1' },
  { value: '43+', key: 'hero.s2' },
  { value: '4', key: 'hero.s3' },
  { value: '8.3', label: 'GPA' },
];

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsla(216,55%,7%,0.85) 0%, hsla(216,55%,7%,0.6) 50%, hsla(216,55%,7%,0.9) 100%)' }} />
      </div>

      {/* Animated rings */}
      <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[650px] lg:h-[650px] rounded-full border border-secondary/10 animate-pulse-ring pointer-events-none" />

      <div className="relative z-10 px-5 md:px-12 lg:px-20 pt-32 pb-20 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[0.72rem] tracking-[0.2em] uppercase font-bold mb-6"
          style={{
            background: 'hsla(194,72%,38%,0.15)',
            border: '1px solid hsla(194,72%,38%,0.3)',
            color: 'hsl(194,72%,38%)',
          }}
        >
          {t('hero.tag')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-black leading-[1.05] mb-2"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
        >
          <span className="text-cream">Iván García</span>
          <span className="text-gold block">del Toro.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-accent italic font-light text-cream-muted mb-8 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-cream-muted leading-[1.8] max-w-[520px] mb-12"
          style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1rem)' }}
        >
          {t('hero.tagline')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex gap-8 md:gap-10 mb-12 flex-wrap"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <span className="font-display font-bold text-gold block" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                {s.value}
              </span>
              <span className="text-[0.72rem] tracking-[0.15em] uppercase text-cream-dim">
                {s.label || t(s.key!)}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex gap-4 flex-wrap"
        >
          <a href="#timeline" className="btn-gold">{t('hero.cta1')}</a>
          <a href="#travels" className="btn-outline">{t('hero.cta2')}</a>
        </motion.div>
      </div>
    </section>
  );
}
