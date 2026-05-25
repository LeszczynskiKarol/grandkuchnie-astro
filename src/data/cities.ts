// src/data/cities.ts

// Dane miast - hardkodowane
export interface City {
  slug: string;
  name: string;
  nameLocative: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export const cities: City[] = [
  {
    slug: "torun",
    name: "Toruń",
    nameLocative: "Toruniu",
    heroTitle: "Kuchnia na wymiar - Toruń",
    heroSubtitle: "Projekt, produkcja, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/torun-opt.webp",
  },
  {
    slug: "bydgoszcz",
    name: "Bydgoszcz",
    nameLocative: "Bydgoszczy",
    heroTitle: "Kuchnia na wymiar - Bydgoszcz",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/bydgoszcz-opt.webp",
  },
  {
    slug: "wloclawek",
    name: "Włocławek",
    nameLocative: "Włocławku",
    heroTitle: "Kuchnia na wymiar - Włocławek",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/wloclawek-opt.webp",
  },
  {
    slug: "grudziadz",
    name: "Grudziądz",
    nameLocative: "Grudziądzu",
    heroTitle: "Kuchnia na wymiar - Grudziądz",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/grudziadz-opt.webp",
  },
  {
    slug: "inowroclaw",
    name: "Inowrocław",
    nameLocative: "Inowrocławiu",
    heroTitle: "Kuchnia na wymiar - Inowrocław",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/inowroclaw-opt.webp",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

// Dane do sekcji "Gdzie działamy" na stronie głównej
export interface ServiceArea {
  name: string;
  nameLocative?: string;
  image: string;
  slug: string;
  isMain?: boolean;
  description?: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    name: "Kujawsko-pomorskie",
    nameLocative: "województwie kujawsko-pomorskim",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/kujawsko-pomorskie-opt.webp",
    slug: "kujawsko-pomorskie",
    isMain: true,
    description:
      "Działamy na terenie całego województwa kujawsko-pomorskiego, oferując profesjonalne usługi projektowania i montażu kuchni na wymiar.",
  },
  {
    name: "Toruń",
    nameLocative: "Toruniu",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/torun-opt.webp",
    slug: "torun",
  },
  {
    name: "Bydgoszcz",
    nameLocative: "Bydgoszczy",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/bydgoszcz-opt.webp",
    slug: "bydgoszcz",
  },
  {
    name: "Włocławek",
    nameLocative: "Włocławku",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/wloclawek-opt.webp",
    slug: "wloclawek",
  },
  {
    name: "Grudziądz",
    nameLocative: "Grudziądzu",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/grudziadz-opt.webp",
    slug: "grudziadz",
  },
  {
    name: "Inowrocław",
    nameLocative: "Inowrocławiu",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/inowroclaw-opt.webp",
    slug: "inowroclaw",
  },
];
