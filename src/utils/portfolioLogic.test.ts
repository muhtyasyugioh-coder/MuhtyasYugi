import test from 'node:test';
import assert from 'node:assert/strict';
import { PUBLICATIONS } from '../data/portfolioData';
import {
  countPublicationsByCategory,
  filterAndSortPublications,
  formatCitation,
  validateContactForm,
} from './portfolioLogic';

test('filterAndSortPublications returns all 8 verified publications by default sorted newest first', () => {
  const result = filterAndSortPublications(PUBLICATIONS, {
    query: '',
    category: 'Semua',
    sortBy: 'newest',
  });

  assert.equal(result.length, 8);
  assert.equal(result[0].year, 2026);
  assert.equal(result[result.length - 1].year, 2022);
});

test('filterAndSortPublications filters by category accurately', () => {
  const cvPapers = filterAndSortPublications(PUBLICATIONS, {
    query: '',
    category: 'Deep Learning & Computer Vision',
    sortBy: 'newest',
  });

  assert.equal(cvPapers.length, 2);
  assert.ok(cvPapers.every((p) => p.category === 'Deep Learning & Computer Vision'));
});

test('filterAndSortPublications searches across title, methods, venue, and authors case-insensitively', () => {
  const byMethod = filterAndSortPublications(PUBLICATIONS, {
    query: 'cyclegan',
    category: 'Semua',
    sortBy: 'newest',
  });
  assert.equal(byMethod.length, 1);
  assert.equal(byMethod[0].id, 'pub-cyclegan-jitk-2025');

  const byVenue = filterAndSortPublications(PUBLICATIONS, {
    query: 'INFOKABIN',
    category: 'Semua',
    sortBy: 'newest',
  });
  assert.equal(byVenue.length, 1);
  assert.equal(byVenue[0].id, 'pub-debalong-infokabin-2026');

  const empty = filterAndSortPublications(PUBLICATIONS, {
    query: 'quantum-blockchain-nonexistent',
    category: 'Semua',
    sortBy: 'newest',
  });
  assert.equal(empty.length, 0);
});

test('filterAndSortPublications sorts oldest and first-author deterministically', () => {
  const oldest = filterAndSortPublications(PUBLICATIONS, {
    query: '',
    category: 'Semua',
    sortBy: 'oldest',
  });
  assert.equal(oldest[0].year, 2022);
  assert.equal(oldest[0].id, 'pub-emyepos-jtb-2022');

  const firstAuthor = filterAndSortPublications(PUBLICATIONS, {
    query: '',
    category: 'Semua',
    sortBy: 'first-author',
  });
  assert.equal(firstAuthor[0].isFirstAuthor, true);
  assert.equal(firstAuthor[3].isFirstAuthor, true);
  assert.equal(firstAuthor[4].isFirstAuthor, false);
});

test('formatCitation generates valid APA and BibTeX formats', () => {
  const sample = PUBLICATIONS[0];
  const apa = formatCitation(sample, 'apa');
  assert.match(apa, /^M\. Yugi, F\. S\. Utomo, & A\. S\. Barkah \(2025\)\./);
  assert.ok(apa.includes('JITK'));

  const bibtex = formatCitation(sample, 'bibtex');
  assert.ok(bibtex.startsWith('@article{yugi2025cyclegan,'));
  assert.ok(bibtex.includes('author  = {M. Yugi and F. S. Utomo and A. S. Barkah}'));
  assert.ok(bibtex.includes('year    = {2025}'));
});

test('countPublicationsByCategory tallies every domain cleanly', () => {
  const counts = countPublicationsByCategory(PUBLICATIONS);
  assert.equal(counts['Semua'], 8);
  assert.equal(counts['Deep Learning & Computer Vision'], 2);
  assert.equal(counts['Machine Learning & NLP'], 2);
  assert.equal(counts['Sistem Pendukung Keputusan'], 1);
  assert.equal(counts['Generative AI & Pendidikan'], 1);
  assert.equal(counts['Sistem Informasi & Web'], 2);
});

test('validateContactForm rejects empty or malformed fields and passes valid input', () => {
  const emptyErrors = validateContactForm({
    name: '',
    email: 'bukan-email',
    institution: '',
    topic: '',
    message: 'terlalu pendek',
  });
  assert.ok(emptyErrors.name);
  assert.ok(emptyErrors.email);
  assert.ok(emptyErrors.institution);
  assert.ok(emptyErrors.topic);
  assert.ok(emptyErrors.message);

  const validErrors = validateContactForm({
    name: 'Dr. Budi Santoso',
    email: 'budi.santoso@kampus.ac.id',
    institution: 'Universitas Komputama',
    topic: 'Kolaborasi Riset AI',
    message: 'Kami ingin mendiskusikan kolaborasi riset computer vision untuk semester depan.',
  });
  assert.deepEqual(validErrors, {});
});
