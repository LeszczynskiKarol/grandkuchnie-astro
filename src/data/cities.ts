// Dane miast - hardkodowane
export interface City {
  slug: string;
  name: string;
  nameLocative: string; // odmiana miejscownikowa (w Toruniu, w Bydgoszczy)
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export const cities: City[] = [
  {
    slug: "torun",
    name: "Toruń",
    nameLocative: "Toruniu",
    heroTitle: "Kuchnie na wymiar - Toruń",
    heroSubtitle: "Projekt, produkcja, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/torun.jpg",
  },
  {
    slug: "bydgoszcz",
    name: "Bydgoszcz",
    nameLocative: "Bydgoszczy",
    heroTitle: "Kuchnia na wymiar - Bydgoszcz",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/bydgoszcz.jpg",
  },
  {
    slug: "wloclawek",
    name: "Włocławek",
    nameLocative: "Włocławku",
    heroTitle: "Kuchnia na wymiar - Włocławek",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/wloclawek.jpg",
  },
  {
    slug: "grudziadz",
    name: "Grudziądz",
    nameLocative: "Grudziądzu",
    heroTitle: "Kuchnia na wymiar - Grudziądz",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/grudziadz.jpg",
  },
  {
    slug: "inowroclaw",
    name: "Inowrocław",
    nameLocative: "Inowrocławiu",
    heroTitle: "Kuchnia na wymiar - Inowrocław",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/inowroclaw.jpg",
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

// Dane do sekcji "Gdzie działamy" na stronie głównej
export const serviceAreas = [
  {
    name: "Kujawsko-pomorskie",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/kujawsko-pomorskie.png",
    slug: "kujawsko-pomorskie",
    isMain: true,
    description:
      "Działamy na terenie całego województwa kujawsko-pomorskiego, oferując profesjonalne usługi projektowania i montażu kuchni na wymiar.",
  },
  {
    name: "Toruń",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/torun.jpg",
    slug: "/miasto/torun",
  },
  {
    name: "Bydgoszcz",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/bydgoszcz.jpg",
    slug: "/miasto/bydgoszcz",
  },
  {
    name: "Włocławek",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/wloclawek.jpg",
    slug: "/miasto/wloclawek",
  },
  {
    name: "Grudziądz",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/grudziadz.jpg",
    slug: "/miasto/grudziadz",
  },
  {
    name: "Inowrocław",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/inowroclaw.jpg",
    slug: "/miasto/inowroclaw",
  },
];
