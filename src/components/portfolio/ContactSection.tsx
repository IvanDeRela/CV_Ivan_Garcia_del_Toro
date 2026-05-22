import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { useLang } from '@/hooks/useLang';
import { toast } from '@/hooks/use-toast';
import { generateCv } from '@/lib/generateCv';

export default function ContactSection() {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const schema = z.object({
    name: z.string().trim().min(2, t('ct.err.name')).max(80, t('ct.err.name')),
    email: z.string().trim().email(t('ct.err.email')).max(255),
    subject: z.string().trim().min(3, t('ct.err.subject')).max(150),
    message: z.string().trim().min(10, t('ct.err.message')).max(1500, t('ct.err.message')),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { name, email, subject, message } = result.data;
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    const subj = encodeURIComponent(subject);
    window.location.href = `mailto:garciadeltoroivan@gmail.com?subject=${subj}&body=${body}`;
    toast({ title: t('ct.sent') });
    setTimeout(() => setSubmitting(false), 800);
  };

  const field = (key: 'name' | 'email' | 'subject', type = 'text') => (
    <div>
      <input
        type={type}
        placeholder={t(`ct.${key}`)}
        value={form[key]}
        maxLength={key === 'email' ? 255 : key === 'subject' ? 150 : 80}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
      />
      {errors[key] && <p className="text-xs text-destructive mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <p className="tag-label mb-3">{t('ct.tag')}</p>
        <h2 className="font-display font-black leading-tight text-foreground" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
          {t('ct.title.1')} <span style={{ color: 'hsl(var(--ocean))' }}>{t('ct.title.2')}</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-accent italic text-xl leading-relaxed text-foreground/85 mb-8">{t('ct.lead')}</p>

          <button
            onClick={() => generateCv(lang)}
            className="btn-gold w-full sm:w-auto mb-6 inline-flex items-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t('ct.cv')}
          </button>

          <div className="mt-6">
            <p className="text-xs tracking-[0.18em] uppercase text-teal font-bold mb-3">{t('ct.or')}</p>
            <div className="space-y-2">
              <a href="mailto:garciadeltoroivan@gmail.com" className="block text-sm text-muted-foreground hover:text-primary transition-colors">✉️ garciadeltoroivan@gmail.com</a>
              <a href="tel:+34645694245" className="block text-sm text-muted-foreground hover:text-primary transition-colors">📞 +34 645 69 42 45</a>
              <a href="https://www.linkedin.com/in/ivan-garcia-del-toro-691849210" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">🔗 LinkedIn</a>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-xl p-6 md:p-8 space-y-4"
          noValidate
        >
          {field('name')}
          {field('email', 'email')}
          {field('subject')}
          <div>
            <textarea
              placeholder={t('ct.message')}
              value={form.message}
              maxLength={1500}
              rows={6}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
          </div>
          <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60">
            {t('ct.send')}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
