import { ExternalLink } from 'lucide-react';
import { ACADEMIC_LINKS, PROFILE } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

export function ProfileSection() {
  return (
    <section id="profil" className="scroll-mt-16 py-16 lg:py-20 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Biography & Institutional Trajectory */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">Profil Akademik</p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-semibold tracking-tight text-[#111315] text-balance">
              Rekam jejak institusi dan jejaring kolaborasi riset.
            </h2>

            <div className="mt-7 flex items-center gap-4 pb-6 border-b border-[#E5E7EB]">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#E9EFF4] shrink-0">
                <ResilientImage
                  src={PROFILE.heroImage}
                  alt={PROFILE.heroImageAlt}
                  fallbackTitle={PROFILE.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <p className="font-editorial text-xl font-semibold text-[#111315] leading-tight">
                  {PROFILE.name}
                </p>
                <p className="mt-1 text-sm text-[#4B5563]">
                  {PROFILE.shortRole}
                </p>
                <p className="mt-0.5 text-xs text-[#6B7280]">
                  {PROFILE.institution} · {PROFILE.location}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-[15px] leading-[1.75] text-[#4B5563]">
              {PROFILE.bioParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Institutional Facts Table (Clean Hairlines, No Pills) */}
            <dl className="mt-10 divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="text-xs font-semibold text-[#6B7280]">Afiliasi Utama</dt>
                <dd className="sm:col-span-2 text-sm text-[#111315] font-medium">
                  {PROFILE.institution} ({PROFILE.legacyAffiliation})
                </dd>
              </div>
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="text-xs font-semibold text-[#6B7280]">Program Studi</dt>
                <dd className="sm:col-span-2 text-sm text-[#111315]">
                  {PROFILE.studyProgram}
                </dd>
              </div>
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="text-xs font-semibold text-[#6B7280]">Praktik Industri</dt>
                <dd className="sm:col-span-2 text-sm text-[#111315]">
                  Pengembang Web-App —{' '}
                  <a
                    href="https://brocodeid.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1D4ED8] hover:text-[#1E40AF] underline underline-offset-4"
                  >
                    BroCodeid (brocodeid.com)
                  </a>
                </dd>
              </div>
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="text-xs font-semibold text-[#6B7280]">Lokasi</dt>
                <dd className="sm:col-span-2 text-sm text-[#111315]">{PROFILE.location}</dd>
              </div>
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <dt className="text-xs font-semibold text-[#6B7280]">Identitas SINTA</dt>
                <dd className="sm:col-span-2 text-sm text-[#111315] font-mono tabular-nums">
                  ID {PROFILE.sintaId} · Skor SINTA {PROFILE.sintaScore} · Google Scholar H-Index{' '}
                  {PROFILE.scholarHIndex}
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: Verified Indexing Profiles & Collaborators */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <h3 className="text-base font-semibold text-[#111315] mb-4">
                Indeksasi &amp; Tautan Resmi
              </h3>
              <div className="space-y-3">
                {ACADEMIC_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#1D4ED8]/50 hover:bg-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#111315] group-hover:text-[#1D4ED8] transition-colors">
                          {link.label}
                        </p>
                        <p className="mt-0.5 font-mono text-xs text-[#525866] tabular-nums">
                          {link.handle}
                        </p>
                      </div>
                      <ExternalLink
                        className="w-4 h-4 text-[#6B7280] group-hover:text-[#1D4ED8] shrink-0 mt-0.5 transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#525866]">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#111315] mb-4">
                Rekan Kolaborasi Riset
              </h3>
              <ul className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB]">
                {PROFILE.collaborators.map((collab) => (
                  <li key={collab.name} className="py-3 flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-[#111315]">{collab.name}</span>
                    <span className="text-xs text-[#6B7280]">{collab.focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
