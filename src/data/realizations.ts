// Dane realizacji - hardkodowane
// UWAGA: Te URL-e musisz uzupełnić prawdziwymi linkami do zdjęć realizacji z S3

export interface RealizationCategory {
  id: number;
  name: string;
  slug: string;
  order: number;
}

export interface Realization {
  id: number;
  imageUrl: string;
  categoryId: number;
}

export const realizationCategories: RealizationCategory[] = [
  { id: 1, name: "Płyta laminowana", slug: "plyta-laminowana", order: 1 },
  { id: 2, name: "Akryl", slug: "akryl", order: 2 },
  {
    id: 3,
    name: "Akryl, lakier + płyta",
    slug: "akryl-lakier-plyta",
    order: 3,
  },
  { id: 4, name: "Blaty HPL", slug: "blaty-hpl", order: 4 },
  { id: 5, name: "MDF lakierowany", slug: "mdf-lakierowany", order: 5 },
  { id: 6, name: "Z fornirem", slug: "z-fornirem", order: 6 },
  { id: 7, name: "Łazienki na wymiar", slug: "lazienki-na-wymiar", order: 100 },
  {
    id: 8,
    name: "Szafy, garderoby, zabudowy",
    slug: "szafy-garderoby-zabudowy",
    order: 101,
  },
];

// ============================================
// UZUPEŁNIJ PONIŻSZE URL-E PRAWDZIWYMI LINKAMI DO ZDJĘĆ Z S3
// Przykładowa struktura - dodaj wszystkie zdjęcia realizacji
// ============================================

export const realizations: Realization[] = [
  // Płyta laminowana (categoryId: 1)
  {
    id: 1,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-1.jpg",
    categoryId: 1,
  },
  {
    id: 2,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-2.jpg",
    categoryId: 1,
  },
  {
    id: 3,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-3.jpg",
    categoryId: 1,
  },

  // Akryl (categoryId: 2)
  {
    id: 4,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-4.jpg",
    categoryId: 2,
  },
  {
    id: 5,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-5.jpg",
    categoryId: 2,
  },

  // Akryl, lakier + płyta (categoryId: 3)
  {
    id: 6,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-6.jpg",
    categoryId: 3,
  },
  {
    id: 7,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-7.jpg",
    categoryId: 3,
  },

  // Blaty HPL (categoryId: 4)
  {
    id: 8,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-8.jpg",
    categoryId: 4,
  },
  {
    id: 9,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-9.jpg",
    categoryId: 4,
  },

  // MDF lakierowany (categoryId: 5)
  {
    id: 10,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-10.jpg",
    categoryId: 5,
  },
  {
    id: 11,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-11.jpg",
    categoryId: 5,
  },

  // Z fornirem (categoryId: 6)
  {
    id: 12,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-12.jpg",
    categoryId: 6,
  },
  {
    id: 13,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/realizacja-13.jpg",
    categoryId: 6,
  },

  // Łazienki na wymiar (categoryId: 7)
  {
    id: 14,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/lazienka-1.jpg",
    categoryId: 7,
  },
  {
    id: 15,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/lazienka-2.jpg",
    categoryId: 7,
  },

  // Szafy, garderoby, zabudowy (categoryId: 8)
  {
    id: 16,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/szafa-1.jpg",
    categoryId: 8,
  },
  {
    id: 17,
    imageUrl:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/szafa-2.jpg",
    categoryId: 8,
  },
];

// Funkcje pomocnicze
export function getRealizationsByCategory(
  categoryId: number | null
): Realization[] {
  if (categoryId === null) {
    return realizations;
  }
  return realizations.filter((r) => r.categoryId === categoryId);
}

export function getCategoryById(id: number): RealizationCategory | undefined {
  return realizationCategories.find((c) => c.id === id);
}

export function getCategoryBySlug(
  slug: string
): RealizationCategory | undefined {
  return realizationCategories.find((c) => c.slug === slug);
}

// Paginacja
export function getPaginatedRealizations(
  categoryId: number | null,
  page: number = 1,
  limit: number = 12
): { realizations: Realization[]; total: number; pages: number } {
  const filtered =
    categoryId === null
      ? realizations
      : realizations.filter((r) => r.categoryId === categoryId);

  const total = filtered.length;
  const pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    realizations: filtered.slice(start, end),
    total,
    pages,
  };
}
