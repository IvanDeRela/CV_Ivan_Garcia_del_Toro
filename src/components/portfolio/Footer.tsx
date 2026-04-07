import { useLang } from '@/hooks/useLang';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center gap-3 px-5 md:px-12 lg:px-20 py-10 border-t border-border bg-accent">
      <span className="font-display font-bold text-lg" style={{ color: 'hsl(var(--ocean))' }}>Iván García del Toro</span>
      <span className="text-sm text-muted-foreground tracking-wide">{t('foot.center')}</span>
    </footer>
  );
}
