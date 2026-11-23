import type { PublicationCategory, PublicationItem } from '../data/portfolioData';

export type PublicationSortOrder = 'newest' | 'oldest' | 'first-author';
export type CitationFormat = 'apa' | 'bibtex';

export interface PublicationFilterOptions {
  query: string;
  category: PublicationCategory;
  sortBy: PublicationSortOrder;
}

export interface ContactFormValues {
  name: string;
  email: string;
  institution: string;
  topic: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

/**
 * Filters publications by search query and category, then applies deterministic sorting.
 */
export function filterAndSortPublications(
  publications: PublicationItem[],
  options: PublicationFilterOptions,
): PublicationItem[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  const filtered = publications.filter((item) => {
    const matchesCategory =
      options.category === 'Semua' || item.category === options.category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      item.title,
      item.venue,
      item.venueShort,
      item.category,
      item.summary,
      String(item.year),
      ...item.authors,
      ...item.methods,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return [...filtered].sort((a, b) => {
    if (options.sortBy === 'oldest') {
      if (a.year !== b.year) return a.year - b.year;
      return a.title.localeCompare(b.title);
    }

    if (options.sortBy === 'first-author') {
      if (a.isFirstAuthor !== b.isFirstAuthor) {
        return a.isFirstAuthor ? -1 : 1;
      }
      if (b.year !== a.year) return b.year - a.year;
      return a.title.localeCompare(b.title);
    }

    // Default: newest first, with first-author items prioritized within the same year
    if (b.year !== a.year) return b.year - a.year;
    if (a.isFirstAuthor !== b.isFirstAuthor) {
      return a.isFirstAuthor ? -1 : 1;
    }
    return a.title.localeCompare(b.title);
  });
}

/**
 * Generates an APA 7th edition or BibTeX citation string for a publication.
 */
export function formatCitation(
  publication: PublicationItem,
  format: CitationFormat,
): string {
  if (format === 'apa') {
    const authorsFormatted =
      publication.authors.length > 1
        ? `${publication.authors.slice(0, -1).join(', ')}, & ${publication.authors[publication.authors.length - 1]}`
        : publication.authors[0];

    return `${authorsFormatted} (${publication.year}). ${publication.title}. ${publication.venue}.`;
  }

  const bibAuthors = publication.authors.join(' and ');
  return [
    `@article{${publication.citationKey},`,
    `  author  = {${bibAuthors}},`,
    `  title   = {${publication.title}},`,
    `  journal = {${publication.venue}},`,
    `  year    = {${publication.year}}`,
    `}`,
  ].join('\n');
}

/**
 * Counts publications per category for filter controls.
 */
export function countPublicationsByCategory(
  publications: PublicationItem[],
): Record<PublicationCategory, number> {
  const counts: Record<PublicationCategory, number> = {
    Semua: publications.length,
    'Deep Learning & Computer Vision': 0,
    'Machine Learning & NLP': 0,
    'Sistem Pendukung Keputusan': 0,
    'Generative AI & Pendidikan': 0,
    'Sistem Informasi & Web': 0,
  };

  for (const pub of publications) {
    counts[pub.category] += 1;
  }

  return counts;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Strictly validates contact & collaboration form values without bypassing required checks.
 */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Nama lengkap wajib diisi.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Nama lengkap minimal 2 karakter.';
  }

  if (!values.email.trim()) {
    errors.email = 'Alamat email wajib diisi.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Masukkan format alamat email yang valid.';
  }

  if (!values.institution.trim()) {
    errors.institution = 'Instansi atau afiliasi wajib diisi.';
  }

  if (!values.topic.trim()) {
    errors.topic = 'Pilih topik kolaborasi terlebih dahulu.';
  }

  if (!values.message.trim()) {
    errors.message = 'Pesan atau ringkasan kebutuhan wajib diisi.';
  } else if (values.message.trim().length < 15) {
    errors.message = 'Tuliskan pesan minimal 15 karakter agar jelas konteksnya.';
  }

  return errors;
}
