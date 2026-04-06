import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/hooks/useLang';

interface TimelineEntry {
  dateKey: string;
  roleKey: string;
  orgKey: string;
  descKey: string;
  hasGpa?: boolean;
}

const academic: TimelineEntry[] = [
  { dateKey: 'tl.a1d', roleKey: 'tl.a1r', orgKey: 'tl.a1o', descKey: 'tl.a1e', hasGpa: true },
  { dateKey: 'tl.a2d', roleKey: 'tl.a2r', orgKey: 'tl.a2o', descKey: 'tl.a2e' },
  { dateKey: 'tl.a3d', roleKey: 'tl.a3r', orgKey: 'tl.a3o', descKey: 'tl.a3e' },
  { dateKey: 'tl.a4d', roleKey: 'tl.a4r', orgKey: 'tl.a4o', descKey: 'tl.a4e' },
];

const work: TimelineEntry[] = [
  { dateKey: 'tl.w1d', roleKey: 'tl.w1r', orgKey: 'tl.w1o', descKey: 'tl.w1e' },
  { dateKey: 'tl.w2d', roleKey: 'tl.w2r', orgKey: 'tl.w2o', descKey: 'tl.w2e' },
  { dateKey: 'tl.w3d', roleKey: 'tl.w3r', orgKey: 'tl.w3o', descKey: 'tl.w3e' },
  { dateKey: 'tl.w4d', roleKey: 'tl.w4r', orgKey: 'tl.w4o', descKey: 'tl.w4e' },
];

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-7 mb-9"
    >
      {/* Dot */}
      <div
        className="absolute left-0 top-1.5 w-[9px] h-[9px] rounded-full"
        style={{
          background: 'hsl(42,50%,54%)',
          boxShadow: '0 0 0 3px hsla(42,50%,54%,0.2)',
        }}
      />
      {/* Line */}
      <div
        className="absolute left-1 top-4 w-px"
        style={{
          height: 'calc(100% + 16px)',
          background: 'linear-gradient(to bottom, hsla(42,50%,54%,0.3), transparent)',
        }}
      />

      <span className="text-[0.68rem] tracking-[0.15em] uppercase text-teal block mb-1">{t(entry.dateKey)}</span>
      <h4 className="font-display font-bold text-cream text-base mb-0.5">
        {t(entry.roleKey)}
        {entry.hasGpa && (
          <span
            className="inline-block ml-2 px-2 py-0.5 rounded-full text-[0.7rem] font-bold text-gold align-middle"
            style={{ background: 'hsla(42,50%,54%,0.15)', border: '1px solid hsla(42,50%,54%,0.3)' }}
          >
            8.3/10
          </span>
        )}
      </h4>
      <span className="text-sm font-bold text-gold block mb-1.5">{t(entry.orgKey)}</span>
      <p className="text-[0.82rem] leading-relaxed text-cream-muted">{t(entry.descKey)}</p>
    </motion.div>
  );
}

export default function TimelineSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="timeline" className="section-padding bg-navy">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <p className="tag-label mb-3">{t('tl.tag')}</p>
        <h2 className="font-display font-black leading-tight text-cream" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
          {t('tl.title.1')} <span className="text-gold">{t('tl.title.2')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div>
          <h3
            className="text-[0.76rem] tracking-[0.2em] uppercase text-teal mb-9 flex items-center gap-3"
          >
            {t('tl.acol')}
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, hsla(194,72%,38%,0.4), transparent)' }} />
          </h3>
          {academic.map((e, i) => (
            <TimelineItem key={i} entry={e} index={i} />
          ))}
        </div>

        <div>
          <h3
            className="text-[0.76rem] tracking-[0.2em] uppercase text-teal mb-9 flex items-center gap-3"
          >
            {t('tl.wcol')}
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, hsla(194,72%,38%,0.4), transparent)' }} />
          </h3>
          {work.map((e, i) => (
            <TimelineItem key={i} entry={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
