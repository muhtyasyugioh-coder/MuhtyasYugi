import { useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { FeaturedBentoSection } from './components/FeaturedBentoSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { PublicationModal } from './components/PublicationModal';
import { PublicationsSection } from './components/PublicationsSection';
import { ResearchFocusSection } from './components/ResearchFocusSection';
import type { PublicationCategory, PublicationItem } from './data/portfolioData';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<PublicationCategory>('Semua');
  const [activePublication, setActivePublication] = useState<PublicationItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#111315]">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <ResearchFocusSection onSelectCategory={setSelectedCategory} />
        <FeaturedBentoSection onOpenDetail={setActivePublication} />
        <PublicationsSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOpenDetail={setActivePublication}
        />
        <ProfileSection />
        <ContactSection />
      </main>

      <Footer />

      <PublicationModal
        publication={activePublication}
        onClose={() => setActivePublication(null)}
      />
    </div>
  );
}
