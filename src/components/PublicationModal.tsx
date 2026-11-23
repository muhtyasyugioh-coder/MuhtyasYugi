import { useEffect, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';
import type { PublicationItem } from '../data/portfolioData';
import { formatCitation, type CitationFormat } from '../utils/portfolioLogic';
import { ResilientImage } from './ResilientImage';

interface PublicationModalProps {
  publication: PublicationItem | null;
  onClose: () => void;
}

export function PublicationModal({ publication, onClose }: PublicationModalProps) {
  const [citationFormat, setCitationFormat] = useState<CitationFormat>('apa');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCitationFormat('apa');
    setCopied(false);
  }, [publication?.id]);

  useEffect(() => {
    if (!publication) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [publication, onClose]);

  if (!publication) {
    return null;
  }

  const citationText = formatCitation(publication, citationFormat);

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="publication-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111315]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden rounded-2xl bg-white border border-[#E5E7EB] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 text-xs text-[#525866] truncate">
            <span className="font-mono tabular-nums font-medium text-[#111315]">
              {publication.year}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{publication.venueShort}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{publication.category}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup jendela detail publikasi"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-[#4B5563] hover:text-[#111315] hover:bg-[#F3F4F6] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto">
          {publication.image && (
            <div
              className={`w-full overflow-hidden border-b border-[#E5E7EB] ${
                publication.bentoSpan === 'wide'
                  ? 'bg-[#F3EFE6] p-4 flex items-center justify-center'
                  : 'h-56 bg-[#ECEFF3]'
              }`}
            >
              <ResilientImage
                src={publication.image}
                alt={publication.imageAlt || publication.title}
                fallbackTitle={publication.title}
                className={
                  publication.bentoSpan === 'wide'
                    ? 'w-full max-h-56 object-contain'
                    : 'w-full h-full object-cover'
                }
              />
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h3
              id="publication-modal-title"
              className="font-editorial text-2xl font-semibold tracking-tight text-[#111315] leading-snug"
            >
              {publication.title}
            </h3>
            <p className="mt-3 text-sm text-[#4B5563]">
              {publication.authors.join(', ')}
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              Dipublikasikan di <span className="text-[#111315] font-medium">{publication.venue}</span>{' '}
              ({publication.year})
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            <div>
              <h4 className="text-xs font-semibold text-[#111315] mb-1.5">Ringkasan</h4>
              <p className="text-sm leading-relaxed text-[#4B5563]">{publication.summary}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#111315] mb-1.5">Metodologi</h4>
              <p className="text-sm leading-relaxed text-[#4B5563]">
                {publication.methodology}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#111315] mb-1.5">Kontribusi</h4>
              <p className="text-sm leading-relaxed text-[#4B5563]">{publication.impact}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#111315] mb-1.5">
                Kata Kunci &amp; Metode
              </h4>
              <p className="text-xs text-[#525866]">{publication.methods.join(' · ')}</p>
            </div>
          </div>

          {/* Interactive Citation Switcher */}
          <div className="pt-5 border-t border-[#E5E7EB]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div
                role="group"
                aria-label="Pilih format sitasi"
                className="inline-flex items-center p-1 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB]"
              >
                <button
                  type="button"
                  onClick={() => setCitationFormat('apa')}
                  aria-pressed={citationFormat === 'apa'}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    citationFormat === 'apa'
                      ? 'bg-white text-[#111315] shadow-xs'
                      : 'text-[#525866] hover:text-[#111315]'
                  }`}
                >
                  APA 7th
                </button>
                <button
                  type="button"
                  onClick={() => setCitationFormat('bibtex')}
                  aria-pressed={citationFormat === 'bibtex'}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    citationFormat === 'bibtex'
                      ? 'bg-white text-[#111315] shadow-xs'
                      : 'text-[#525866] hover:text-[#111315]'
                  }`}
                >
                  BibTeX
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#111315] bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                    <span>Sitasi Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Salin Sitasi</span>
                  </>
                )}
              </button>
            </div>

            <pre
              data-testid="citation-output"
              className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] font-mono text-xs leading-relaxed text-[#1F2937] whitespace-pre-wrap break-words overflow-x-auto"
            >
              {citationText}
            </pre>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
