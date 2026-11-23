import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-editorial text-base font-semibold text-[#111315]">
            {PROFILE.name}
          </p>
          <p className="mt-1 text-xs text-[#6B7280]">
            {PROFILE.studyProgram} · {PROFILE.institution} · SINTA ID{' '}
            <span className="font-mono tabular-nums">{PROFILE.sintaId}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-[#525866]">
          <a href="#riset" className="hover:text-[#111315] transition-colors">
            Fokus Riset
          </a>
          <a href="#proyek" className="hover:text-[#111315] transition-colors">
            Karya Pilihan
          </a>
          <a href="#publikasi" className="hover:text-[#111315] transition-colors">
            Publikasi
          </a>
          <a
            href="https://brocodeid.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1D4ED8] transition-colors"
          >
            BroCodeid
          </a>
          <a href="#kontak" className="hover:text-[#111315] transition-colors">
            Kontak
          </a>
          <span className="text-[#9CA3AF]">© 2026 {PROFILE.name}</span>
        </div>
      </div>
    </footer>
  );
}
