import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = 'w-full h-full object-cover',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full min-h-[220px] flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#F1F3F6] via-[#E9EDF2] to-[#E2E8F0] text-[#334155] text-center"
      >
        <BookOpen className="w-7 h-7 text-[#1D4ED8]/70" aria-hidden="true" />
        <p className="font-editorial text-base font-semibold text-[#111315] max-w-xs">
          {fallbackTitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
