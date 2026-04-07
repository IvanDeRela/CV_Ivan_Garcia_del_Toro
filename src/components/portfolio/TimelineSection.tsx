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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-8 mb-10 group"
    >
      <div
        className="absolute left-0 top-2 w-[10px] h-[10px] rounded-full"
        style={{
          background: 'hsl(var(--ocean))',
          boxShadow: '0 0 0 4px hsl(var(--ocean) / 0.15)',
        }}
      />
      <div
        className="absolute left-[4px] top-5 w-[2px]"
        style={{
          height: 'calc(100% + 12px)',
          background: 'linear-gradient(to bottom, hsl(var(--border)), transparent)',
        }}
      />

      <span className="text-xs tracking-[0.15em] uppercase text-teal block mb-1.5 font-semibold">{t(entry.dateKey)}</span>
      <h4 className="font-display font-bold text-foreground text-lg mb-1 transition-colors duration-300 group-hover:text-primary">
        {t(entry.roleKey)}
        {entry.hasGpa && (
          <span
            className="inline-block ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold align-middle"
            style={{ background: 'hsl(var(--ocean) / 0.1)', color: 'hsl(var(--ocean))', border: '1px solid hsl(var(--ocean) / 0.2)' }}
          >
            8.3/10
          </span>
        )}
      </h4>
      <span className="text-sm font-bold block mb-2" style={{ color: 'hsl(var(--ocean))' }}>{t(entry.orgKey)}</span>
      <p className="text-sm leading-relaxed text-muted-foreground">{t(entry.descKey)}</p>
    </motion.div>
  );
}

export default function TimelineSection() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="timeline" className="section-padding relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <p className="tag-label mb-3">{t('tl.tag')}</p>
        <h2 className="font-display font-black leading-tight text-foreground" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
          {t('tl.title.1')} <span style={{ color: 'hsl(var(--ocean))' }}>{t('tl.title.2')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div>
          <motion.h3
            className="text-sm tracking-[0.18em] uppercase text-teal mb-8 flex items-center gap-3 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('tl.acol')}
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, hsl(var(--border)), transparent)' }} />
          </motion.h3>
          {academic.map((e, i) => (
            <TimelineItem key={i} entry={e} index={i} />
          ))}
        </div>

        <div>
          <motion.h3
            className="text-sm tracking-[0.18em] uppercase text-teal mb-8 flex items-center gap-3 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('tl.wcol')}
            <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, hsl(var(--border)), transparent)' }} />
          </motion.h3>
          {work.map((e, i) => (
            <TimelineItem key={i} entry={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
