import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/hooks/useLang';
import { generateCv } from '@/lib/generateCv';
import profilePhoto from '@/assets/profile-photo.jpeg';

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
      className="font-display font-bold block"
      style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: 'hsl(var(--ocean))' }}
    >
      {value}
    </motion.span>
  );
}

export default function HeroSection() {
  const { t, lang } = useLang();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const decorScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const decorOpacity = useTransform(scrollYProgress, [0, 0.8], [0.15, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(165deg, hsl(220 30% 14%) 0%, hsl(220 40% 22%) 40%, hsl(194 45% 30%) 100%)' }}
    >
      {/* Decorative shapes */}
      <motion.div
        className="absolute right-[-100px] top-1/2 w-[550px] h-[550px] lg:w-[700px] lg:h-[700px] rounded-full pointer-events-none"
        style={{
          border: '1px solid hsla(0,0%,100%,0.08)',
          scale: decorScale,
          opacity: decorOpacity,
          translateY: '-50%',
        }}
      >
        <motion.div
          className="absolute inset-12 rounded-full"
          style={{ border: '1px solid hsla(0,0%,100%,0.06)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-24 rounded-full"
          style={{ border: '1px solid hsla(0,0%,100%,0.04)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 4 + i * 2,
            height: 4 + i * 2,
            background: `hsla(0,0%,100%,${0.06 + i * 0.03})`,
            left: `${20 + i * 20}%`,
            top: `${25 + i * 12}%`,
          }}
          animate={{
            y: [0, -25 - i * 8, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Main content - two column layout */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-5 md:px-12 lg:px-20 pt-32 pb-20 gap-8 lg:gap-16">
        {/* Left: Text content */}
        <motion.div
          className="max-w-2xl flex-1"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-[0.18em] uppercase font-bold mb-7"
            style={{
              background: 'hsla(0,0%,100%,0.12)',
              border: '1px solid hsla(0,0%,100%,0.2)',
              color: 'hsla(0,0%,100%,0.9)',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
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
            className="font-display font-black leading-[1.05] mb-3"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            <motion.span
              className="inline-block"
              style={{ color: 'hsla(0,0%,100%,0.95)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Iván García
            </motion.span>
            <motion.span
              className="block"
              style={{ color: 'hsl(38,80%,60%)' }}
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
            className="font-accent italic font-light mb-8 leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', color: 'hsla(0,0%,100%,0.7)' }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="leading-[1.9] max-w-[560px] mb-12"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', color: 'hsla(0,0%,100%,0.6)' }}
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-6 md:gap-8 mb-12 flex-wrap"
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
                <span className="text-xs tracking-[0.15em] uppercase" style={{ color: 'hsla(0,0%,100%,0.5)' }}>
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
            <a
              href="#about"
              className="inline-flex items-center justify-center px-7 py-3.5 font-bold text-sm tracking-[0.1em] uppercase rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'white', color: 'hsl(220,30%,14%)' }}
            >
              {t('hero.cta1')}
            </a>
            <a
              href="#travels"
              className="inline-flex items-center justify-center px-7 py-3.5 font-bold text-sm tracking-[0.1em] uppercase rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'transparent', color: 'white', border: '2px solid hsla(0,0%,100%,0.3)' }}
            >
              {t('hero.cta2')}
            </a>
            <a
              href="/CV_Ivan_Garcia_del_Toro.pdf"
              download
              className="inline-flex items-center gap-2 justify-center px-7 py-3.5 font-bold text-sm tracking-[0.1em] uppercase rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'transparent', color: 'white', border: '2px solid hsla(0,0%,100%,0.3)' }}
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

        {/* Right: Profile photo */}
        <motion.div
          className="relative flex-shrink-0 order-first lg:order-last"
          style={{ y: photoY, scale: photoScale }}
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glowing ring behind photo */}
          <motion.div
            className="absolute inset-[-12px] rounded-full pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, hsla(220,65%,42%,0.3), hsla(194,55%,42%,0.2), hsla(38,80%,60%,0.3), hsla(220,65%,42%,0.3))',
              filter: 'blur(20px)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Photo container */}
          <div
            className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden"
            style={{
              border: '3px solid hsla(0,0%,100%,0.2)',
              boxShadow: '0 20px 60px -15px hsla(220,40%,10%,0.5)',
            }}
          >
            <img
              src={profilePhoto}
              alt="Iván García del Toro"
              width={512}
              height={640}
              className="w-full h-full object-cover object-top"
              style={{ filter: 'brightness(1.1) contrast(1.05)' }}
            />
            {/* Subtle overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, transparent 50%, hsla(220,40%,15%,0.3) 100%)',
              }}
            />
          </div>

          {/* Decorative dots */}
          <motion.div
            className="absolute -top-4 -right-4 w-3 h-3 rounded-full"
            style={{ background: 'hsl(38,80%,60%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full"
            style={{ background: 'hsl(194,55%,50%)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-5 h-9 rounded-full flex items-start justify-center p-1"
          style={{ border: '1.5px solid hsla(0,0%,100%,0.25)' }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
