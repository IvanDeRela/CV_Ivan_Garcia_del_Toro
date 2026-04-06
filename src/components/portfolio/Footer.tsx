import { useLang } from '@/hooks/useLang';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      className="flex flex-col sm:flex-row justify-between items-center gap-3 px-5 md:px-12 lg:px-20 py-10"
      style={{
        background: 'hsl(216,55%,10%)',
        borderTop: '1px solid hsla(var(--cream) / 0.06)',
      }}
    >
      <span className="font-display font-bold text-gold text-lg">Iván García del Toro</span>
      <span className="text-[0.76rem] text-cream-dim tracking-wide">{t('foot.center')}</span>
    </footer>
  );
}
