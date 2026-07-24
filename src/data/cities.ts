// src/data/cities.ts

// Dane miast - hardkodowane
export interface City {
  slug: string;
  name: string;
  nameLocative: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  localContentHeading: string;
  localContent: string;
}

// Toruń to siedziba firmy, nie „obsługiwane miasto" — treść lokalna żyje na stronie
// głównej, a /miasto/torun/ przekierowuje na `/` (301 w CloudFront Function).
// Powód: strona główna i strona miejska kanibalizowały się na „kuchnie na wymiar toruń"
// (GSC 28 dni: `/` poz. 13,9 przy 56 wyśw. vs `/miasto/torun/` poz. 41,0 przy 55 wyśw.).
// Dlatego tego wpisu NIE MA w tablicy `cities` — jej jedynym zadaniem jest napędzanie
// getStaticPaths w src/pages/miasto/[slug].astro.
export const torunHeading = "Kuchnie na wymiar w Toruniu — pracownia przy ul. Polnej 134";

export const torunLocalContent = `Pracownia Grand Kuchnie znajduje się w Toruniu przy ul. Polnej 134 (hala nr 3) — to nasza siedziba, salon i zakład produkcyjny w jednym miejscu. Wszystkie meble kuchenne powstają u nas na hali, dzięki czemu kontrolujemy każdy etap produkcji i mamy najkrótszy czas realizacji w regionie.

Realizujemy projekty w całym mieście. W kamienicach Starówki i Bydgoskiego Przedmieścia pracujemy często z wąskimi pomieszczeniami z lat 30. — zabudowy zachowujemy ze sztukateriami i oryginalnymi futrynami, a wysokie sufity wykorzystujemy montując szafki sięgające do 3 m wysokości. Na osiedlach Rubinkowo, Skarpa i Bielany najczęściej realizujemy kuchnie połączone z salonem (open space) po wyburzeniu ścianki działowej. Nowe inwestycje deweloperskie w dzielnicach Wrzosy, Stawki i JAR otrzymują u nas projekty dopasowane do mieszkań 50-80 m², z optymalizacją przestrzeni przez wysokie zabudowy i wyspy kuchenne.

Dla klientów z Torunia oferujemy bezpłatny pomiar w tym samym tygodniu — najczęściej dzień lub dwa od telefonicznego ustalenia terminu. Montaż w mieszkaniach na wyższych piętrach bez windy realizujemy bez dopłat (dotyczy to wielu kamienic toruńskiej Starówki i Bydgoskiego). Pełna realizacja od podpisania umowy do montażu trwa średnio 4-6 tygodni dla kuchni standardowych, 6-8 tygodni dla nietypowych projektów z elementami lakierowanymi.`;

export const cities: City[] = [
  {
    slug: "bydgoszcz",
    name: "Bydgoszcz",
    nameLocative: "Bydgoszczy",
    heroTitle: "Kuchnia na wymiar - Bydgoszcz",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/bydgoszcz-opt.webp",
    localContentHeading: "Kuchnie na wymiar w Bydgoszczy — dojazd i realizacja",
    localContent: `Bydgoszcz to drugie po Toruniu największe miasto, w którym regularnie realizujemy kuchnie na wymiar — dojazd na pomiar z naszej pracowni przy ul. Polnej w Toruniu zajmuje około 45 minut autostradą A1 i S5. Obsługujemy wszystkie dzielnice mieszkaniowe Bydgoszczy bez doliczania opłat za dojazd do standardowej wyceny.

Nowoczesne osiedla w Fordonie (Bohaterów, Tatrzańskie, Bajka) to najczęstsza lokalizacja naszych realizacji w Bydgoszczy. W mieszkaniach 50-70 m² kluczowa jest optymalizacja przestrzeni — proponujemy wysokie zabudowy do sufitu, narożne carousele typu Le Mans i wąskie cargo. Apartamentowce na Bartodziejach i Czyżkówku oraz mieszkania na Wyżynach i Szwederowie częściej dostają u nas projekty kuchni otwartych na salon ze wspólną wyspą. W kamienicach Śródmieścia i wokół Placu Wolności (ul. Gdańska, Cieszkowskiego) pracujemy z wysokimi pomieszczeniami i nietypowymi rzutami — zabudowy meblowe sięgają częściowo sufitu, zachowując otwartą przestrzeń na żyrandol lub dekoracyjne półki.

Pomiar w Bydgoszczy realizujemy w terminie 2-5 dni od pierwszego kontaktu, łącząc często wizyty w jednym kursie. Transport gotowych mebli i ekipa montażowa dojeżdżają jednym kursem z Torunia — całość zajmuje 1-2 dni roboczych, bez dopłat za dojazd. Bydgoscy klienci najczęściej wybierają nowoczesny styl: matowe fronty MDF lakierowany w odcieniach kaszmiru, kawy lub szałwii, blaty z konglomeratu lub HPL, oświetlenie LED pod szafkami górnymi.`,
  },
  {
    slug: "wloclawek",
    name: "Włocławek",
    nameLocative: "Włocławku",
    heroTitle: "Kuchnia na wymiar - Włocławek",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/wloclawek-opt.webp",
    localContentHeading: "Kuchnie na wymiar we Włocławku — lokalna obsługa",
    localContent: `Włocławek odwiedzamy regularnie — dojazd z naszej siedziby w Toruniu zajmuje około 50 minut drogą krajową nr 91. Realizujemy kuchnie w całym mieście, zarówno w nowych inwestycjach deweloperskich na Południu i Zazamczu, jak i w blokach z lat 70. na osiedlach Kazimierza Wielkiego, Bielnie i Mielęcinie, a także w kamienicach śródmiejskich wokół Pl. Wolności i ul. 3 Maja.

We Włocławku obserwujemy częsty trend kompleksowych remontów mieszkań w starym budownictwie. Wówczas projektujemy kuchnie dopasowane do pomieszczeń o nietypowych proporcjach, z zachowaniem oryginalnych elementów takich jak parapety, boazeria czy ozdobne futryny. W bardziej standardowych mieszkaniach na Południu i Zachodzie najczęściej realizujemy zabudowy w stylu nowoczesnym minimalistycznym — gładkie fronty bezuchwytowe (system push-to-open lub frezowane uchwyty integralne), wyspy kuchenne z miejscem do jedzenia i blaty kamienne lub HPL imitujące marmur.

Pomiar wykonujemy w dni robocze, terminy zwykle 3-7 dni od pierwszego kontaktu. Klienci z Włocławka cenią u nas to, że nie zlecamy nic podwykonawcom — od projektu, przez produkcję w naszej hali w Toruniu, po montaż jeden zespół odpowiada za całość. Transport i montaż jednym kursem, zwykle w jeden dzień dla standardowej kuchni o powierzchni do 12 m². Cena dojazdu zawarta w wycenie — żadnych ukrytych kosztów. Pełna realizacja od umowy do gotowej kuchni trwa średnio 5-7 tygodni.`,
  },
  {
    slug: "grudziadz",
    name: "Grudziądz",
    nameLocative: "Grudziądzu",
    heroTitle: "Kuchnia na wymiar - Grudziądz",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/grudziadz-opt.webp",
    localContentHeading: "Kuchnie na wymiar w Grudziądzu — kompleksowa realizacja",
    localContent: `Grudziądz to nasza najdalej położona regularna lokalizacja — dojazd z Torunia zajmuje około 1 godziny i 15 minut autostradą A1. Pomimo odległości obsługujemy miasto kompleksowo, bez doliczania opłat za dojazd do wyceny standardowych kuchni.

Realizujemy projekty w głównych dzielnicach mieszkaniowych: nowoczesnych apartamentowcach przy ul. Chełmińskiej i osiedlu Lotnisko, blokach z wielkiej płyty na osiedlach Strzemięcin, Kopernika i Mniszek, a także w kamienicach Śródmieścia (rejony ul. Toruńskiej i Pl. Niepodległości) i w starszej zabudowie na Tarpnie i Wielkim Wełczu. Specyfika grudziądzkiego rynku to przewaga remontów w istniejących mieszkaniach nad nowymi realizacjami w stanie deweloperskim — dla klientów na osiedlu Strzemięcin czy w starszych blokach często projektujemy kuchnie wraz z propozycją wyburzenia ścianki działowej do salonu, co znacząco poszerza przestrzeń wizualnie.

W kamienicach Śródmieścia priorytetem jest często wpasowanie zabudowy w wysokie, wąskie pomieszczenia — wówczas proponujemy zabudowy sięgające do sufitu (2.8-3.2 m), zwiększające pojemność szafek górnych o 40-60%. Pomiar w Grudziądzu wykonujemy najczęściej w terminie 5-10 dni od kontaktu, łącząc go z innymi wizytami w okolicy dla optymalizacji czasu. Montaż realizujemy w 1-2 dni roboczych jednym kursem ekipy z Torunia. Standardowa realizacja od umowy do montażu trwa 5-7 tygodni.`,
  },
  {
    slug: "inowroclaw",
    name: "Inowrocław",
    nameLocative: "Inowrocławiu",
    heroTitle: "Kuchnia na wymiar - Inowrocław",
    heroSubtitle: "Projektowanie, wykonanie, montaż",
    heroImage:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/inowroclaw-opt.webp",
    localContentHeading: "Kuchnie na wymiar w Inowrocławiu — od kamienic po deweloperkę",
    localContent: `Inowrocław odwiedzamy z naszej siedziby w Toruniu z dojazdem około 50-55 minut drogą S5/A1 i krajową nr 25. Miasto słynące z uzdrowiska solankowego i charakterystycznej secesyjnej zabudowy stawia przed nami ciekawe wyzwania projektowe.

Często realizujemy kuchnie w zabytkowych kamienicach przy ul. Solankowej i wokół Parku Solankowego, gdzie zachowanie oryginalnego charakteru wnętrz jest dla klientów priorytetem. Projektujemy wówczas zabudowy z frontami w stylu klasycznym lub modern-classic (frezowane ramki, lekko stonowane kolory, drewniane akcenty), które komponują się z secesyjną architekturą bez ją przytłaczać.

Drugi typ realizacji to nowoczesne kuchnie w deweloperce w dzielnicach Mątwy, Rąbin i nowych osiedlach przy ul. Wojska Polskiego — tam częściej stosujemy minimalistyczne fronty akrylowe lub MDF lakierowany z systemami bezuchwytowymi i wyspami kuchennymi. W starszej zabudowie na osiedlu Piastowskim i przy ul. Andrzeja często modernizujemy kuchnie po właścicielach senioralnych — wówczas projekt uwzględnia ergonomię (niższe szafki górne, wysuwane półki Magic Corner, oświetlenie LED, eliminację rączek wymagających siły).

Pomiar w Inowrocławiu realizujemy w terminie 4-8 dni od pierwszego kontaktu, montaż jednym kursem ekipy z Torunia w 1-2 dni. Dla kuchni z mieszkań kuracjuszowych przeznaczanych pod krótkoterminowy wynajem proponujemy szczególnie wytrzymałe rozwiązania (HPL, akryl z powłoką anti-fingerprint) odporne na intensywną eksploatację.`,
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
  /** Nadpisuje domyślne `/miasto/<slug>/`. Używane dla Torunia, który nie ma
   *  własnej podstrony — jego treść siedzi na stronie głównej. */
  href?: string;
}

/** Jedyne miejsce, które decyduje dokąd prowadzi link do obszaru działania.
 *  Header, Footer i ServiceAreasSection muszą używać tego helpera, żeby nie
 *  powstał link do nieistniejącego /miasto/torun/. */
export const areaHref = (area: Pick<ServiceArea, "slug" | "href">): string =>
  area.href ?? `/miasto/${area.slug}/`;

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
    // Siedziba — treść lokalna jest na stronie głównej, nie na osobnej podstronie.
    href: "/#kuchnie-na-wymiar-torun",
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
