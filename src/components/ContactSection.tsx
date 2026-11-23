import { useEffect, useState, type FormEvent } from 'react';
import { Check, Copy, Mail, MapPin, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/portfolioLogic';

interface SubmittedInquiry extends ContactFormValues {
  submittedAt: string;
}

const STORAGE_KEY = 'muhtyas-portfolio-last-inquiry';

const COLLABORATION_TOPICS = [
  'Kolaborasi Riset AI & Machine Learning',
  'Publikasi & Penelaahan Artikel Ilmiah',
  'Pengembangan Sistem Informasi & Web',
  'Undangan Seminar / Kuliah Tamu',
  'Lainnya',
];

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  institution: '',
  topic: COLLABORATION_TOPICS[0],
  message: '',
};

export function ContactSection() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState<SubmittedInquiry | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SubmittedInquiry;
        if (parsed && parsed.name && parsed.email) {
          setSubmitted(parsed);
        }
      }
    } catch {
      // Ignore storage access issues in restricted contexts
    }
  }, []);

  const handleFieldChange = (field: keyof ContactFormValues, nextValue: string) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateContactForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const record: SubmittedInquiry = {
      name: values.name.trim(),
      email: values.email.trim(),
      institution: values.institution.trim(),
      topic: values.topic.trim(),
      message: values.message.trim(),
      submittedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };

    setSubmitted(record);
    setValues(INITIAL_VALUES);
    setErrors({});

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage errors
    }
  };

  const handleNewMessage = () => {
    setSubmitted(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="kontak" className="scroll-mt-16 py-16 lg:py-20 border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">Kontak &amp; Kolaborasi</p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-semibold tracking-tight text-[#111315] text-balance">
              Terbuka untuk kolaborasi riset dan pengembangan sistem.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
              Silakan kirimkan pesan terkait kerja sama penelitian kecerdasan buatan, penulisan jurnal bersama, seminar akademik, maupun perancangan sistem informasi berbasis web.
            </p>

            <div className="mt-8 space-y-5 pt-6 border-t border-[#E5E7EB]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#1D4ED8] mt-1 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-[#6B7280]">Surel Akademik</p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm font-medium text-[#111315] hover:text-[#1D4ED8] transition-colors"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Salin alamat email Muhtyas Yugi"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4B5563] hover:text-[#111315] bg-white border border-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#1D4ED8] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-[#6B7280]">Institusi &amp; Domisili</p>
                  <p className="text-sm text-[#111315]">{PROFILE.institution}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{PROFILE.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Collaboration Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB]">
              {submitted ? (
                <div data-testid="contact-receipt" className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold text-[#15803D]">
                      Pesan Tercatat · {submitted.submittedAt}
                    </p>
                    <h3 className="mt-1 font-editorial text-2xl font-semibold text-[#111315]">
                      Terima kasih, {submitted.name}.
                    </h3>
                    <p className="mt-2 text-sm text-[#4B5563] leading-relaxed">
                      Ringkasan pengajuan kolaborasi Anda telah disimpan di sesi ini. Anda juga dapat meneruskannya langsung melalui klien email Anda.
                    </p>
                  </div>

                  <dl className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB] text-sm">
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#6B7280]">Instansi</dt>
                      <dd className="text-[#111315] font-medium text-right">
                        {submitted.institution}
                      </dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#6B7280]">Email</dt>
                      <dd className="text-[#111315] text-right">{submitted.email}</dd>
                    </div>
                    <div className="py-3 flex justify-between gap-4">
                      <dt className="text-[#6B7280]">Topik</dt>
                      <dd className="text-[#111315] text-right">{submitted.topic}</dd>
                    </div>
                    <div className="py-3">
                      <dt className="text-[#6B7280] mb-1">Pesan</dt>
                      <dd className="text-[#111315] leading-relaxed">{submitted.message}</dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(
                        `[${submitted.topic}] ${submitted.name} - ${submitted.institution}`,
                      )}&body=${encodeURIComponent(submitted.message)}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Buka di Aplikasi Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleNewMessage}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#111315] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#111315] mb-1.5"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        placeholder="Dr. Ahmad Latif"
                        className={`w-full h-11 px-3.5 text-sm bg-[#F8F9FA] border rounded-lg text-[#111315] placeholder:text-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.name
                            ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/15'
                            : 'border-[#E5E7EB] focus:border-[#1D4ED8] focus:ring-[#1D4ED8]/15'
                        }`}
                      />
                      {errors.name && (
                        <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-[#DC2626]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#111315] mb-1.5"
                      >
                        Alamat Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        placeholder="nama@institusi.ac.id"
                        className={`w-full h-11 px-3.5 text-sm bg-[#F8F9FA] border rounded-lg text-[#111315] placeholder:text-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.email
                            ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/15'
                            : 'border-[#E5E7EB] focus:border-[#1D4ED8] focus:ring-[#1D4ED8]/15'
                        }`}
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-[#DC2626]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-institution"
                        className="block text-xs font-semibold text-[#111315] mb-1.5"
                      >
                        Instansi / Afiliasi
                      </label>
                      <input
                        id="contact-institution"
                        name="institution"
                        type="text"
                        value={values.institution}
                        onChange={(e) => handleFieldChange('institution', e.target.value)}
                        aria-invalid={Boolean(errors.institution)}
                        aria-describedby={
                          errors.institution ? 'contact-institution-error' : undefined
                        }
                        placeholder="Universitas / Perusahaan / Komunitas"
                        className={`w-full h-11 px-3.5 text-sm bg-[#F8F9FA] border rounded-lg text-[#111315] placeholder:text-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 transition-colors ${
                          errors.institution
                            ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/15'
                            : 'border-[#E5E7EB] focus:border-[#1D4ED8] focus:ring-[#1D4ED8]/15'
                        }`}
                      />
                      {errors.institution && (
                        <p
                          id="contact-institution-error"
                          role="alert"
                          className="mt-1.5 text-xs text-[#DC2626]"
                        >
                          {errors.institution}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-semibold text-[#111315] mb-1.5"
                      >
                        Topik Kolaborasi
                      </label>
                      <select
                        id="contact-topic"
                        name="topic"
                        value={values.topic}
                        onChange={(e) => handleFieldChange('topic', e.target.value)}
                        className="w-full h-11 px-3.5 text-sm bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg text-[#111315] focus:bg-white focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-colors"
                      >
                        {COLLABORATION_TOPICS.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#111315] mb-1.5"
                    >
                      Ringkasan Pesan
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      placeholder="Ceritakan rencana riset, kebutuhan pengembangan sistem, atau jadwal diskusi yang diusulkan..."
                      className={`w-full p-3.5 text-sm bg-[#F8F9FA] border rounded-lg text-[#111315] placeholder:text-[#9CA3AF] focus:bg-white focus:outline-none focus:ring-2 transition-colors resize-y ${
                        errors.message
                          ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/15'
                          : 'border-[#E5E7EB] focus:border-[#1D4ED8] focus:ring-[#1D4ED8]/15'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 text-xs text-[#DC2626]"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-[#6B7280]">
                      Seluruh bidang wajib diisi dengan jelas.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#111315] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Kirim Pesan</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
