import jsPDF from 'jspdf';
import { translations, type Lang } from '@/data/i18n';

const academic = ['a1', 'a2', 'a3', 'a4'] as const;
const work = ['w1', 'w2', 'w3', 'w4'] as const;
const languages = ['l1', 'l2', 'l3', 'l4'] as const;

const fileNames: Record<Lang, string> = {
  es: 'CV_Ivan_Garcia_del_Toro.pdf',
  en: 'CV_Ivan_Garcia_del_Toro_EN.pdf',
  fr: 'CV_Ivan_Garcia_del_Toro_FR.pdf',
  de: 'Lebenslauf_Ivan_Garcia_del_Toro.pdf',
};

const headings: Record<Lang, { education: string; experience: string; languages: string; skills: string; contact: string }> = {
  es: { education: 'Formación Académica', experience: 'Experiencia Profesional', languages: 'Idiomas', skills: 'Competencias', contact: 'Contacto' },
  en: { education: 'Education', experience: 'Work Experience', languages: 'Languages', skills: 'Skills', contact: 'Contact' },
  fr: { education: 'Formation', experience: 'Expérience Professionnelle', languages: 'Langues', skills: 'Compétences', contact: 'Contact' },
  de: { education: 'Ausbildung', experience: 'Berufserfahrung', languages: 'Sprachen', skills: 'Kompetenzen', contact: 'Kontakt' },
};

export function generateCv(lang: Lang) {
  const t = (key: string) => translations[lang]?.[key] ?? translations.es[key] ?? key;
  const h = headings[lang];

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const margin = 16;
  const contentW = pageW - margin * 2;
  let y = margin;

  const ensureSpace = (h: number) => {
    if (y + h > 285) {
      doc.addPage();
      y = margin;
    }
  };

  const heading = (text: string) => {
    ensureSpace(12);
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(28, 60, 120);
    doc.text(text.toUpperCase(), margin, y);
    y += 1.5;
    doc.setDrawColor(28, 60, 120);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + contentW, y);
    y += 5;
    doc.setTextColor(40, 40, 40);
  };

  const body = (text: string, opts: { bold?: boolean; size?: number; color?: [number, number, number] } = {}) => {
    doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    doc.setFontSize(opts.size ?? 10);
    if (opts.color) doc.setTextColor(...opts.color);
    const lines = doc.splitTextToSize(text, contentW);
    ensureSpace(lines.length * (opts.size ?? 10) * 0.4);
    doc.text(lines, margin, y);
    y += lines.length * (opts.size ?? 10) * 0.4 + 1;
    doc.setTextColor(40, 40, 40);
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(20, 30, 50);
  doc.text('Iván García del Toro', margin, y + 6);
  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(t('hero.subtitle'), margin, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(28, 60, 120);
  doc.text('garciadeltoroivan@gmail.com  ·  +34 645 69 42 45  ·  ' + t('about.cv2') + '  ·  linkedin.com/in/ivan-garcia-del-toro-691849210', margin, y);
  y += 4;

  // Profile
  heading(h.education === 'Education' ? 'Profile' : h.education === 'Formación Académica' ? 'Perfil' : h.education === 'Formation' ? 'Profil' : 'Profil');
  body(t('hero.tagline'));

  // Education
  heading(h.education);
  academic.forEach((k) => {
    body(t(`tl.${k}d`), { bold: true, size: 9, color: [28, 110, 130] });
    body(t(`tl.${k}r`), { bold: true, size: 11 });
    body(t(`tl.${k}o`), { size: 10, color: [28, 60, 120] });
    body(t(`tl.${k}e`), { size: 9, color: [80, 80, 80] });
    y += 1;
  });

  // Experience
  heading(h.experience);
  work.forEach((k) => {
    body(t(`tl.${k}d`), { bold: true, size: 9, color: [28, 110, 130] });
    body(t(`tl.${k}r`), { bold: true, size: 11 });
    body(t(`tl.${k}o`), { size: 10, color: [28, 60, 120] });
    body(t(`tl.${k}e`), { size: 9, color: [80, 80, 80] });
    y += 1;
  });

  // Languages
  heading(h.languages);
  languages.forEach((k) => {
    const cert = t(`sk.${k}ct`);
    const line = `• ${t(`sk.${k}`)} — ${t(`sk.${k}lv`)}${cert && !cert.startsWith('sk.') ? ' (' + cert + ')' : ''}`;
    body(line, { size: 10 });
  });

  // Skills
  heading(h.skills);
  body(t('sk.tags').split(',').map(s => s.trim()).join(' · '), { size: 9, color: [60, 60, 60] });

  doc.save(fileNames[lang]);
}
