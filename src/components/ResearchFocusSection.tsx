import { ArrowUpRight } from 'lucide-react';
import { RESEARCH_PILLARS, type PublicationCategory } from '../data/portfolioData';

interface ResearchFocusSectionProps {
  onSelectCategory: (category: PublicationCategory) => void;
}

export function ResearchFocusSection({ onSelectCategory }: ResearchFocusSectionProps) {
  const handleExplore = (category: PublicationCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('publikasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="riset" className="scroll-mt-16 py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">Bidang Kajian</p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-semibold tracking-tight text-[#111315] text-balance">
              Empat pilar riset dan rekayasa terapan.
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-[#525866] max-w-md">
            Setiap lini penelitian disusun untuk menjawab persoalan komputasi nyata — dari pengenalan pola visual hingga sistem operasional masyarakat lokal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_PILLARS.map((pillar) => (
            <article
              key={pillar.index}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#CBD5E1] transition-colors duration-150"
            >
              <div>
                <p className="font-mono text-xs text-[#6B7280] tabular-nums mb-4">
                  {pillar.index}
                </p>
                <h3 className="text-lg font-semibold tracking-tight text-[#111315] leading-snug">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#F1F5F9]">
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  {pillar.keywords}
                </p>
                <button
                  type="button"
                  onClick={() => handleExplore(pillar.relatedCategory)}
                  aria-label={`Lihat publikasi terkait ${pillar.title}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] rounded-sm"
                >
                  <span>Lihat publikasi terkait</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
