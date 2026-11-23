import { ArrowDownRight, ExternalLink } from 'lucide-react';
import { HERO_METRICS, MARQUEE_TOPICS, PROFILE } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  return (
    <section id="beranda" className="pt-12 pb-8 lg:pt-16 lg:pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Split-Screen Editorial Hero with balanced height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-[#1D4ED8] tracking-normal mb-5">
                {PROFILE.heroKicker}
              </p>

              <h1 className="font-editorial text-[clamp(2.35rem,4.4vw,3.75rem)] leading-[1.08] font-semibold tracking-tight text-[#111315] text-balance max-w-2xl">
                {PROFILE.heroHeadline}
              </h1>

              <p className="mt-6 text-base lg:text-[17px] leading-[1.7] text-[#4B5563] max-w-[60ch]">
                {PROFILE.heroLead}
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#E5E7EB] flex flex-wrap items-center gap-5">
              <a
                href="#publikasi"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>Jelajahi Publikasi</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={`https://sinta.kemdikbud.go.id/authors/profile/${PROFILE.sintaId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-0 sm:px-3 py-3 text-sm font-medium text-[#111315] hover:text-[#1D4ED8] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] rounded-lg"
              >
                <span>Profil SINTA {PROFILE.sintaId}</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Compact HD Studio Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <figure className="w-full max-w-[320px] sm:max-w-[340px] flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E5E7EB]">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E9EFF4]">
                <ResilientImage
                  src={PROFILE.heroImage}
                  alt={PROFILE.heroImageAlt}
                  fallbackTitle={PROFILE.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="px-5 py-3.5 text-xs text-[#525866] flex items-center justify-between gap-4 border-t border-[#E5E7EB] bg-white">
                <span className="whitespace-nowrap font-medium text-[#111315]">
                  {PROFILE.name}
                </span>
                <span className="font-mono tabular-nums text-[#525866] whitespace-nowrap">
                  S1 Teknologi Informasi
                </span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 4-Column Metrics Strip directly below the hero split */}
        <div
          aria-label="Ringkasan capaian akademik"
          className="mt-12 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 border border-[#E5E7EB] bg-white rounded-xl overflow-hidden"
        >
          {HERO_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`p-6 ${
                idx % 2 === 1 ? 'border-l border-[#E5E7EB]' : ''
              } ${idx >= 2 ? 'border-t lg:border-t-0 lg:border-l border-[#E5E7EB]' : ''}`}
            >
              <p className="font-mono text-2xl lg:text-3xl font-medium tracking-tight text-[#111315] tabular-nums">
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#111315]">{metric.label}</p>
              <p className="mt-0.5 text-xs text-[#6B7280]">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Editorial Marquee Divider */}
      <div
        aria-hidden="true"
        className="mt-12 border-y border-[#E5E7EB] bg-white/70 py-3.5 overflow-hidden select-none"
      >
        <div className="animate-marquee-ribbon">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8">
              {MARQUEE_TOPICS.map((topic) => (
                <span
                  key={`${dup}-${topic}`}
                  className="inline-flex items-center gap-8 text-xs font-medium text-[#525866] whitespace-nowrap"
                >
                  <span>{topic}</span>
                  <span className="text-[#CBD5E1]">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
