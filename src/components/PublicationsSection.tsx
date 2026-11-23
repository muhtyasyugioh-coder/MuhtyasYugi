import { useMemo, useState } from 'react';
import { BookText, RotateCcw, Search } from 'lucide-react';
import {
  PUBLICATION_CATEGORIES,
  PUBLICATIONS,
  type PublicationCategory,
  type PublicationItem,
} from '../data/portfolioData';
import {
  countPublicationsByCategory,
  filterAndSortPublications,
  type PublicationSortOrder,
} from '../utils/portfolioLogic';

interface PublicationsSectionProps {
  selectedCategory: PublicationCategory;
  onCategoryChange: (category: PublicationCategory) => void;
  onOpenDetail: (item: PublicationItem) => void;
}

export function PublicationsSection({
  selectedCategory,
  onCategoryChange,
  onOpenDetail,
}: PublicationsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<PublicationSortOrder>('newest');

  const categoryCounts = useMemo(() => countPublicationsByCategory(PUBLICATIONS), []);

  const filteredPublications = useMemo(
    () =>
      filterAndSortPublications(PUBLICATIONS, {
        query: searchQuery,
        category: selectedCategory,
        sortBy,
      }),
    [searchQuery, selectedCategory, sortBy],
  );

  const hasActiveFilters =
    selectedCategory !== 'Semua' || searchQuery.trim().length > 0 || sortBy !== 'newest';

  const handleResetFilters = () => {
    setSearchQuery('');
    onCategoryChange('Semua');
    setSortBy('newest');
  };

  return (
    <section id="publikasi" className="scroll-mt-16 py-16 lg:py-20 border-t border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">Arsip Karya Ilmiah</p>
            <h2 className="font-editorial text-3xl lg:text-4xl font-semibold tracking-tight text-[#111315] text-balance">
              Publikasi terindeks dan prosiding riset.
            </h2>
          </div>
          <p
            data-testid="publication-count"
            className="font-mono text-xs text-[#525866] tabular-nums"
          >
            Menampilkan {filteredPublications.length} dari {PUBLICATIONS.length} publikasi
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="publication-search" className="sr-only">
                Cari judul publikasi, jurnal, penulis, atau metode
              </label>
              <Search
                className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="publication-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul, metode (CycleGAN, Naive Bayes, SVM), atau jurnal..."
                className="w-full h-11 pl-10 pr-4 text-sm bg-white border border-[#E5E7EB] rounded-lg text-[#111315] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <label htmlFor="publication-sort" className="sr-only">
                Urutkan publikasi
              </label>
              <select
                id="publication-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as PublicationSortOrder)}
                className="h-11 px-3.5 text-sm bg-white border border-[#E5E7EB] rounded-lg text-[#111315] focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/15 transition-colors"
              >
                <option value="newest">Urutkan: Terbaru</option>
                <option value="oldest">Urutkan: Terlama</option>
                <option value="first-author">Urutkan: Penulis Utama</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="h-11 inline-flex items-center gap-1.5 px-3.5 text-sm font-medium text-[#4B5563] hover:text-[#111315] bg-white border border-[#E5E7EB] hover:border-[#CBD5E1] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Filter Controls (Functional buttons) */}
          <div
            role="group"
            aria-label="Filter kategori publikasi"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFEFEF]/80 rounded-xl border border-[#E5E7EB]"
          >
            {PUBLICATION_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                    isActive
                      ? 'bg-white text-[#111315] shadow-xs border border-[#E5E7EB]'
                      : 'text-[#525866] hover:text-[#111315] hover:bg-white/60 border border-transparent'
                  }`}
                >
                  <span>{category}</span>
                  <span className="ml-1.5 font-mono tabular-nums text-[11px] opacity-70">
                    ({categoryCounts[category]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Publication Monograph List */}
        {filteredPublications.length === 0 ? (
          <div
            data-testid="publications-empty"
            className="py-16 px-6 text-center bg-white rounded-2xl border border-[#E5E7EB]"
          >
            <BookText className="w-8 h-8 text-[#9CA3AF] mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-editorial text-xl font-semibold text-[#111315]">
              Tidak ada publikasi yang cocok
            </h3>
            <p className="mt-2 text-sm text-[#525866] max-w-md mx-auto">
              Coba ubah kata kunci pencarian atau pilih kategori riset lainnya untuk menelusuri seluruh arsip publikasi.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Tampilkan Semua Publikasi</span>
            </button>
          </div>
        ) : (
          <ol
            data-testid="publications-list"
            className="divide-y divide-[#E5E7EB] border-y border-[#E5E7EB] bg-white rounded-2xl overflow-hidden"
          >
            {filteredPublications.map((pub) => (
              <li
                key={pub.id}
                className="p-6 lg:px-8 lg:py-7 hover:bg-[#F9FAFB] transition-colors duration-150"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                  {/* Left Column: Year & Venue */}
                  <div className="lg:col-span-2 flex lg:flex-col items-baseline lg:items-start gap-3 lg:gap-1">
                    <span className="font-mono text-sm font-medium text-[#111315] tabular-nums">
                      {pub.year}
                    </span>
                    <span className="text-xs text-[#6B7280]">{pub.venueShort}</span>
                  </div>

                  {/* Middle Column: Editorial Title, Authors & Quiet Metadata */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#525866] mb-2">
                      <span>{pub.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pub.isFirstAuthor ? 'Penulis Utama' : 'Rekan Penulis'}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pub.venue}</span>
                    </div>

                    <h3 className="font-editorial text-lg lg:text-xl font-semibold text-[#111315] leading-snug">
                      {pub.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#4B5563]">
                      {pub.authors.join(', ')}
                    </p>

                    <p className="mt-2.5 text-xs text-[#6B7280] leading-relaxed">
                      {pub.methods.join(' · ')}
                    </p>
                  </div>

                  {/* Right Column: Action */}
                  <div className="lg:col-span-2 flex lg:justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenDetail(pub)}
                      aria-label={`Detail dan sitasi untuk ${pub.title}`}
                      className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#1D4ED8] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                    >
                      Detail &amp; Sitasi
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
