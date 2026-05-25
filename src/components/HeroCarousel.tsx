import { useState, useEffect } from 'react';

const images = [
  '/img/kuchnia_na_wymiar.webp',
  '/img/kuchnia_na_wymiar1.webp',
  '/img/kuchnia_na_wymiar2.webp',
  '/img/kuchnia_na_wymiar3.webp',
];

const alts = [
  'Nowoczesna kuchnia na wymiar z białymi frontami',
  'Elegancka kuchnia z drewnianymi akcentami',
  'Kuchnia z wyspą — projekt Grand Kuchnie',
  'Funkcjonalna kuchnia na wymiar — realizacja',
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 z-10 rounded-2xl pointer-events-none" />

      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alts[i]}
          width={1200}
          height={800}
          fetchPriority={i === 0 ? 'high' : 'low'}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding={i === 0 ? 'sync' : 'async'}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            i === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: i === currentIndex ? 'opacity' : 'auto' }}
        />
      ))}

      <div
        className={`absolute inset-y-0 left-4 flex items-center z-20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
          aria-label="Poprzednie zdjęcie"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div
        className={`absolute inset-y-0 right-4 flex items-center z-20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
          aria-label="Następne zdjęcie"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-2'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Przejdź do slajdu ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
