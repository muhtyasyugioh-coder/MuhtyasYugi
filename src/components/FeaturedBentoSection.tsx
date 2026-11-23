import { ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  BROCODEID_PORTFOLIO,
  PUBLICATIONS,
  type PublicationItem,
} from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface FeaturedBentoSectionProps {
  onOpenDetail: (item: PublicationItem) => void;
}

export function FeaturedBentoSection({ onOpenDetail }: FeaturedBentoSectionProps) {
  const featuredItems = PUBLICATIONS.filter((p) => p.featured);
  const leadItem = featuredItems[0];
  const companionItems = featuredItems.slice(1);

  return (
    <section id="proyek" className="scroll-mt-16 py-16 lg:py-20 border-t border-[#E5E7EB] bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">Karya Pilihan</p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-semibold tracking-tight text-[#111315] text-balance">
              Portofolio pengembang web-app dan studi kasus riset.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#525866] max-w-md">
            Menggabungkan pengembangan aplikasi web produksi di BroCodeid dengan publikasi riset terapan di bidang kecerdasan buatan dan sistem informasi.
          </p>
        </div>

        {/* Dedicated Production Web-App Developer Showcase: BroCodeid */}
        <article
          aria-label="Portofolio Pengembang Web-App di BroCodeid"
          className="mb-8 rounded-2xl overflow-hidden bg-[#F8F9FA] border border-[#E5E7EB]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-7 lg:p-9 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#525866] mb-3">
                  <span className="font-semibold text-[#1D4ED8]">
                    {BROCODEID_PORTFOLIO.role}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#111315]">
                    {BROCODEID_PORTFOLIO.brand}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{BROCODEID_PORTFOLIO.trustStatement}</span>
                </div>

                <h3 className="font-editorial text-2xl lg:text-[26px] font-semibold tracking-tight text-[#111315] leading-snug text-balance">
                  {BROCODEID_PORTFOLIO.headline}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
                  {BROCODEID_PORTFOLIO.description}
                </p>

                <p className="mt-4 text-xs text-[#6B7280] leading-relaxed">
                  {BROCODEID_PORTFOLIO.notableSectors}
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-[#E5E7EB] flex flex-wrap items-center gap-4">
                <a
                  href={BROCODEID_PORTFOLIO.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <span>Kunjungi brocodeid.com</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={BROCODEID_PORTFOLIO.newsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111315] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] rounded-sm"
                >
                  <span>Portal news.brocodeid.com</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden bg-[#ECEFF3] border-t lg:border-t-0 lg:border-l border-[#E5E7EB]">
              <ResilientImage
                src={BROCODEID_PORTFOLIO.image}
                alt={BROCODEID_PORTFOLIO.imageAlt}
                fallbackTitle={`${BROCODEID_PORTFOLIO.brand} — ${BROCODEID_PORTFOLIO.role}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 4-Column Web-App Deliverables Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#E5E7EB] bg-white">
            {BROCODEID_PORTFOLIO.capabilities.map((cap, idx) => (
              <div
                key={cap.index}
                className={`p-5 lg:p-6 ${
                  idx > 0 ? 'border-t sm:border-t-0 border-[#E5E7EB]' : ''
                } ${idx % 2 === 1 ? 'sm:border-l border-[#E5E7EB]' : ''} ${
                  idx >= 2 ? 'sm:border-t lg:border-t-0 lg:border-l border-[#E5E7EB]' : ''
                }`}
              >
                <p className="font-mono text-[11px] text-[#6B7280] tabular-nums mb-2">
                  {cap.index}
                </p>
                <h4 className="text-sm font-semibold text-[#111315]">{cap.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#525866]">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </article>

        {/* Dynamic Bento Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wide Lead Showcase Card */}
          {leadItem && (
            <button
              type="button"
              onClick={() => onOpenDetail(leadItem)}
              aria-label={`Buka detail karya: ${leadItem.title}`}
              className="group lg:col-span-12 text-left rounded-2xl overflow-hidden bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#94A3B8] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 relative flex items-center justify-center p-4 sm:p-6 bg-[#F3EFE6] border-b lg:border-b-0 lg:border-r border-[#E5E7EB]">
                  <ResilientImage
                    src={leadItem.image || ''}
                    alt={leadItem.imageAlt || leadItem.title}
                    fallbackTitle={leadItem.title}
                    className="w-full h-auto max-h-[360px] object-contain group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
                <div className="lg:col-span-5 p-7 lg:p-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#525866] mb-3">
                      <span className="font-mono tabular-nums text-[#111315] font-medium">
                        {leadItem.year}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{leadItem.venueShort}</span>
                      <span aria-hidden="true">·</span>
                      <span>{leadItem.projectTagline || leadItem.category}</span>
                    </div>

                    <h3 className="font-editorial text-2xl font-semibold tracking-tight text-[#111315] group-hover:text-[#1D4ED8] transition-colors leading-snug">
                      {leadItem.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
                      {leadItem.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-[#E5E7EB] flex items-center justify-between gap-4">
                    <span className="text-xs text-[#525866] truncate">
                      {leadItem.authors.join(', ')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] whitespace-nowrap shrink-0">
                      <span>Tinjau Studi</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )}

          {/* Companion Showcase Cards */}
          {companionItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenDetail(item)}
              aria-label={`Buka detail karya: ${item.title}`}
              className="group lg:col-span-6 text-left flex flex-col rounded-2xl overflow-hidden bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#94A3B8] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#ECEFF3]">
                <ResilientImage
                  src={item.image || ''}
                  alt={item.imageAlt || item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#525866] mb-3">
                    <span className="font-mono tabular-nums text-[#111315] font-medium">
                      {item.year}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.venueShort}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.projectTagline || item.category}</span>
                  </div>

                  <h3 className="font-editorial text-xl font-semibold tracking-tight text-[#111315] group-hover:text-[#1D4ED8] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-4">
                  <span className="text-xs text-[#525866] truncate">
                    {item.methods.join(' · ')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] whitespace-nowrap shrink-0">
                    <span>Detail</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
