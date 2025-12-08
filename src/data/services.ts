// Dane usług - hardkodowane zamiast pobierania z bazy danych
export interface ServiceBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceHighlight {
  title: string;
  description: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface Service {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImages: string[];
  ctaButton: string;
  ctaUrl: string;
  benefitsTitle: string;
  benefits: ServiceBenefit[];
  contactTitle: string;
  contactSubtitle: string;
  contactCta: string;
  highlights?: ServiceHighlight[];
  realizationsCategorySlug?: string;
}

export const services: Service[] = [
  {
    slug: "plyta-laminowana",
    title: "Kuchnie płyta laminowana",
    heroTitle: "Kuchnia płyta laminowana na wymiar",
    heroSubtitle: "Projekt, wykonanie, montaż",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739372336299-kuku-5_opt.webp",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Kuchnia laminowana - zalety",
    benefits: [
      {
        title: "Ekonomiczność",
        description:
          "Doskonały wybór dla osób szukających rozsądnego kompromisu między ceną a jakością. Płyty laminowane oferują szeroki wybór wzorów i kolorów, jednocześnie zachowując przystępną cenę. Materiał jest łatwy w utrzymaniu czystości i odporny na codzienne użytkowanie.",
        icon: "Wallet",
      },
      {
        title: "Trwałość",
        description:
          "Nowoczesna technologia produkcji zapewnia wysoką odporność na zarysowania i uszkodzenia mechaniczne. Powierzchnia jest zabezpieczona przed wilgocią i promieniowaniem UV, co gwarantuje długotrwałe zachowanie pierwotnego wyglądu.",
        icon: "Shield",
      },
      {
        title: "Różnorodność",
        description:
          "Bogata paleta wzorów i tekstur pozwala na dopasowanie do każdego stylu wnętrza. Od imitacji drewna po jednolite kolory i wzory - możliwości aranżacyjne są praktycznie nieograniczone.",
        icon: "Palette",
      },
    ],
    contactTitle: "Chcesz zlecić kuchnię laminowaną na wymiar?",
    contactSubtitle: "Skontaktuj się i uzyskaj darmową wycenę!",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "plyta-laminowana",
  },
  {
    slug: "mdf-lakierowany",
    title: "Kuchnie MDF lakierowany",
    heroTitle: "Kuchnia MDF lakierowany na wymiar",
    heroSubtitle: "Projekt, wykonanie, montaż",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739377197489-Meble-Tu-4.jpg",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Kuchnia MDF lakierowany - zalety",
    benefits: [
      {
        title: "Elegancja",
        description:
          "Lakierowany MDF oferuje wyjątkową gładkość i głębię koloru, nadając kuchni luksusowy charakter. Doskonałe wykończenie powierzchni sprawia, że fronty prezentują się niezwykle estetycznie i elegancko. Możliwość personalizacji koloru pozwala na stworzenie unikalnej przestrzeni dopasowanej do indywidualnych preferencji.",
        icon: "Sparkles",
      },
      {
        title: "Odporność",
        description:
          "Wysokiej jakości lakier zabezpiecza powierzchnię przed uszkodzeniami i ułatwia czyszczenie. Powłoka ochronna skutecznie chroni przed wilgocią, tłuszczem oraz zabrudzeniami, co znacząco wydłuża żywotność mebli kuchennych wykonanych w technologii MDF lakierowany.",
        icon: "ShieldCheck",
      },
      {
        title: "Uniwersalność",
        description:
          "MDF lakierowany doskonale sprawdza się w różnorodnych stylach wnętrzarskich - od klasyki po nowoczesny minimalizm. Możliwość wyboru wykończenia matowego lub z połyskiem dodatkowo zwiększa możliwości aranżacyjne w kuchni na wymiar, którą z przyjemność dla Ciebie wykonamy!",
        icon: "Layers",
      },
    ],
    contactTitle: "Chcesz zlecić kuchnię MDF lakierowany na wymiar?",
    contactSubtitle:
      "Skontaktuj się z nami już teraz i daj znać, czego oczekujesz!",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "mdf-lakierowany",
  },
  {
    slug: "akryl-lakier-plyta",
    title: "Kuchnie akryl/lakier + płyta",
    heroTitle: "Kuchnia akryl/lakier + płyta na wymiar",
    heroSubtitle: "Projekt, montaż, produkcja",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739376104808-meble-wa-16.jpg",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Kuchnia akryl/lakier + płyta - zalety",
    benefits: [
      {
        title: "Nowoczesność",
        description:
          "Połączenie akrylu lub lakieru z płytą meblową to idealne rozwiązanie dla miłośników współczesnego designu. Wysokie wykończenie z połyskiem nadaje kuchni na wymiar dynamicznego charakteru, jednocześnie optycznie powiększając przestrzeń. Kontrastowe zestawienie materiałów tworzy ciekawą kompozycję wizualną.",
        icon: "Zap",
      },
      {
        title: "Praktyczność",
        description:
          "Zastosowanie dwóch materiałów pozwala na optymalne wykorzystanie ich zalet. Fronty akrylowe lub lakierowane zapewniają efektowny wygląd, podczas gdy elementy z płyty zwiększają funkcjonalność i obniżają całkowity koszt zabudowy.",
        icon: "Settings",
      },
      {
        title: "Wytrzymałość",
        description:
          "Nowoczesne powłoki akrylowe charakteryzują się doskonałą odpornością na zarysowania i promienie UV, co zapobiega żółknięciu powierzchni. Konstrukcja z płyty gwarantuje stabilność i odporność na odkształcenia, a to niezwykle istotne w kuchni na wymiar.",
        icon: "Shield",
      },
    ],
    contactTitle: "Chcesz zlecić kuchnię akryl/lakier + płyta?",
    contactSubtitle:
      "Napisz wiadomość i daj znać, co możemy dla Ciebie zrobić!",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "akryl-lakier-plyta",
  },
  {
    slug: "akrylowe-mata",
    title: "Kuchnie akrylowe / mata",
    heroTitle: "Kuchnia akrylowa na wymiar",
    heroSubtitle: "Projekt, produkcja, montaż",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739376513294-KA2-4.jpg",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Kuchnia akrylowa - zalety",
    benefits: [
      {
        title: "Luksus",
        description:
          "Wykończenie akrylowe to synonim ekskluzywności w przestrzeni kuchennej. Niezrównana głębia koloru oraz idealnie gładka powierzchnia tworzą efekt tafli szkła. Wersja matowa zapewnia elegancki, stonowany wygląd, eliminując problem widocznych odcisków palców.",
        icon: "Crown",
      },
      {
        title: "Trwałość",
        description:
          "Materiał akrylowy jest wyjątkowo odporny na uszkodzenia mechaniczne oraz działanie promieni słonecznych. Powierzchnia zachowuje swój pierwotny wygląd przez lata, nie tracąc intensywności koloru ani połysku.",
        icon: "Shield",
      },
      {
        title: "Łatwość pielęgnacji",
        description:
          "Bezporowata struktura materiału zapobiega wchłanianiu zabrudzeń i tłuszczu, co sprawia, że czyszczenie jest szybkie i efektywne. Fronty akrylowe w kuchni na wymiar nie wymagają stosowania specjalistycznych środków czyszczących.",
        icon: "Sparkles",
      },
    ],
    contactTitle: "Chcesz zlecić kuchnię akrylową na wymiar?",
    contactSubtitle:
      "Napisz wiadomość i daj znać, co możemy dla Ciebie zrobić!",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "akryl",
  },
  {
    slug: "blaty-hpl",
    title: "Kuchnie blaty HPL",
    heroTitle: "Kuchnie blaty HPL na wymiar",
    heroSubtitle: "Projekt, produkcja, montaż",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739376882960-kik-1_opt.webp",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Kuchnia blat HPL - zalety",
    benefits: [
      {
        title: "Wyjątkowa odporność",
        description:
          "Blaty HPL (High Pressure Laminate) należą do najbardziej wytrzymałych rozwiązań, jeśli chodzi o wykończenie kuchni na wymiar. Są odporne na zarysowania, uderzenia, wysokie temperatury oraz działanie substancji chemicznych. Dzięki temu idealnie sprawdzają się w intensywnie użytkowanych kuchniach.",
        icon: "Shield",
      },
      {
        title: "Higiena",
        description:
          "Powierzchnia HPL jest pozbawiona mikroporów, co uniemożliwia rozwój bakterii i grzybów. Jest całkowicie nieprzepuszczalna dla płynów i łatwa w utrzymaniu czystości, a dzięki temu bezpieczna i higieniczna w użytkowaniu.",
        icon: "Heart",
      },
      {
        title: "Estetyka",
        description:
          "Szeroka gama wzorów i kolorów pozwala na dopasowanie blatów HPL do każdego stylu kuchni na wymiar. Dostępne są imitacje kamienia, drewna, betonu oraz jednolite kolory o matowym lub półmatowym wykończeniu, co daje nieograniczone możliwości projektowe.",
        icon: "Palette",
      },
    ],
    contactTitle: "Chcesz zlecić kuchnię blat HPL?",
    contactSubtitle: "Napisz do nas i daj znać, jak możemy Ci pomóc!",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "blaty-hpl",
  },
  {
    slug: "fornir",
    title: "Kuchnie z fornirem",
    heroTitle: "Kuchnia z fornirem na wymiar",
    heroSubtitle: "Projekt, produkcja, montaż",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739377196824-kuchsier-3.jpg",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Kuchnia z fornirem - zalety",
    benefits: [
      {
        title: "Naturalność",
        description:
          "Fornir to cienka warstwa prawdziwego drewna, która nadaje meblom kuchennym autentyczny charakter. Naturalne usłojenie i niepowtarzalna struktura każdego elementu sprawiają, że kuchnia na wymiar zyskuje unikalny, ciepły wyraz. To rozwiązanie dla osób ceniących kontakt z naturą w nowoczesnym wydaniu.",
        icon: "Leaf",
      },
      {
        title: "Szlachetność",
        description:
          "Fornirowane fronty łączą elegancję naturalnego drewna z nowoczesną technologią. Specjalne lakiery zabezpieczają powierzchnię przed uszkodzeniami, jednocześnie podkreślając piękno naturalnego surowca. Z czasem fornir nabiera szlachetnego charakteru.",
        icon: "Gem",
      },
      {
        title: "Ekologiczność",
        description:
          "Zastosowanie forniru to ekologiczna alternatywa dla litego drewna. Pozwala na ekonomiczne wykorzystanie cennego surowca przy zachowaniu wszystkich walorów estetycznych naturalnego materiału. To świadomy wybór dla osób dbających o środowisko.",
        icon: "TreePine",
      },
    ],
    contactTitle: "Chcesz zlecić wykonanie kuchni z fornirem?",
    contactSubtitle: "Napisz do nas i daj znać, jak możemy Ci pomóc!",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "z-fornirem",
  },
  {
    slug: "projektowanie-kuchni",
    title: "Projektowanie kuchni",
    heroTitle: "Projektujemy piękne i praktyczne kuchnie",
    heroSubtitle: "Zamów swoją wymarzoną aranżację kuchenną",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1751701550370-IMG_1811.jpeg",
    ],
    ctaButton: "Zamów projekt",
    ctaUrl: "/kontakt",
    benefitsTitle: "Dlaczego warto",
    benefits: [
      {
        title: "Kompleksowe projektowanie kuchni",
        description:
          "Tworzymy projekty kuchni idealnie dopasowane do Twojej przestrzeni i stylu życia. Projektowanie rozpoczynamy od dokładnego poznania Twoich potrzeb i możliwości lokalu. Dbamy o funkcjonalność, ergonomię i estetykę w najmniejszym szczególe.",
        icon: "PenTool",
      },
      {
        title: "Realizacje od A do Z",
        description:
          "Zajmujemy się kompleksową realizacją Twojej wymarzonej kuchni od projektu po montaż. Dysponujemy doświadczoną ekipą montażową, współpracujemy z elektrykami i hydraulikami. Nie musisz martwić się o koordynację prac - my wszystkim się zajmiemy.",
        icon: "Wrench",
      },
      {
        title: "Realistyczne wizualizacje 3D",
        description:
          "Przygotowujemy fotorealistyczne wizualizacje kuchni, które pokazują dokładny efekt końcowy. Możesz zobaczyć swoją przyszłą kuchnię z każdej perspektywy przed rozpoczęciem prac. Wprowadzamy zmiany w projekcie aż do uzyskania Twojej pełnej akceptacji.",
        icon: "Monitor",
      },
    ],
    highlights: [
      {
        title: "Dorota Stefańska",
        description:
          "Zajmuję się projektowaniem wnętrz, tworząc funkcjonalne i estetyczne przestrzenie dopasowane do indywidualnych potrzeb klientów. Łączę kreatywność z praktycznymi rozwiązaniami, dbając o każdy detal – od koncepcji po finalną realizację. Moim celem jest tworzenie wnętrz, w których chce się żyć, pracować i odpoczywać.",
        imageUrl:
          "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1751702133785-Dorota-Stefa%C5%84ska_opt.webp",
      },
      {
        title: "Cezary Mazurkiewicz",
        description:
          "Tworzę przestrzenie, które odpowiadają na indywidualne potrzeby. Nie trzymam się jednego stylu, ważniejsza jest dla mnie atmosfera niż estetyczna etykieta. Czasem to czysta linia, kiedy indziej detal z przeszłości. Liczy się to, co buduje sens miejsca i wspiera rytm życia jego mieszkańców.",
        imageUrl:
          "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1751702133786-Cezary-Mazurkiewicz_opt.webp",
      },
    ],
    contactTitle: "Zamów projekt kuchni",
    contactSubtitle: "Rozpocznij współpracę już dziś",
    contactCta: "Zamów projekt",
  },
  {
    slug: "lazienka-na-wymiar",
    title: "Łazienki na wymiar",
    heroTitle: "Łazienki na wymiar",
    heroSubtitle: "Piękne i praktyczne przestrzenie od projektu po montaż",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1754927990972-lazi-1_opt-1_opt.webp",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Dlaczego warto",
    benefits: [
      {
        title: "Doświadczenie i profesjonalizm",
        description:
          "Projektujemy i wykonujemy łazienki na wymiar z pasją i pełnym zaangażowaniem. Nasze wieloletnie doświadczenie w branży pozwala nam tworzyć przestrzenie idealnie dopasowane do Twoich potrzeb. Każdy projekt traktujemy indywidualnie, dbając o najmniejsze detale i funkcjonalność rozwiązań.",
        icon: "Award",
      },
      {
        title: "Materiały i wykonanie",
        description:
          "Stosujemy wyłącznie sprawdzone materiały odporne na wilgoć i intensywne użytkowanie. Współpracujemy z renomowanymi producentami płytek, armatury i wyposażenia łazienkowego. Nasze realizacje łączą estetykę z trwałością, zapewniając komfort użytkowania na lata.",
        icon: "Gem",
      },
      {
        title: "Pewność i kompleksowość",
        description:
          "Oferujemy pełną obsługę - od projektu przez montaż po wykończenie każdego elementu Twojej łazienki. Wszystkie prace wykonujemy zgodnie z harmonogramem, minimalizując niedogodności związane z remontem. Wycena projektu jest całkowicie bezpłatna!",
        icon: "CheckCircle",
      },
    ],
    contactTitle: "Zamów łazienkę na wymiar",
    contactSubtitle: "Rozpocznij współpracę już dziś",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "lazienki-na-wymiar",
  },
  {
    slug: "szafy-zabudowy-garderoby",
    title: "Szafy, zabudowy, garderoby",
    heroTitle: "Szafy, zabudowy, garderoby na wymiar",
    heroSubtitle: "Stylowe i praktyczne rozwiązania dla Twojego komfortu",
    heroImages: [
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1755073547033-ram1-7_opt_opt.webp",
    ],
    ctaButton: "Zamów wycenę",
    ctaUrl: "/kontakt",
    benefitsTitle: "Dlaczego warto",
    benefits: [
      {
        title: "Przestrzeń i funkcjonalność",
        description:
          "Specjalizujemy się w maksymalnym wykorzystaniu każdego centymetra Twojego wnętrza. Projektujemy szafy i garderoby na wymiar, które idealnie wpasowują się w dostępną przestrzeń - od podłogi po sufit, w każdej wnęce i pod skosami. Nasze zabudowy to przemyślane systemy przechowywania, które ułatwiają codzienną organizację.",
        icon: "Maximize",
      },
      {
        title: "Personalizacja i design",
        description:
          "Każda realizacja powstaje według Twoich indywidualnych preferencji - od układu półek i szuflad po wybór frontów i kolorystyki. Łączymy nowoczesny design z praktycznymi rozwiązaniami, takimi jak oświetlenie LED, ciche domyki czy systemy organizerów. Tworzymy meble, które nie tylko wyglądają elegancko, ale przede wszystkim spełniają Twoje oczekiwania.",
        icon: "Sliders",
      },
      {
        title: "Precyzja i trwałość",
        description:
          "Wykorzystujemy wysokiej jakości płyty meblowe, okucia renomowanych producentów oraz solidne systemy przesuwne. Każdy element wykonujemy z dbałością o detale - od dokładnych pomiarów po perfekcyjny montaż. Oferujemy bezpłatną wycenę - napisz lub zadzwoń już teraz!",
        icon: "Target",
      },
    ],
    contactTitle: "Zamów szafę, garderobę, zabudowę na wymiar",
    contactSubtitle: "Rozpocznij współpracę już dziś",
    contactCta: "Bezpłatna wycena",
    realizationsCategorySlug: "szafy-garderoby-zabudowy",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// Typy kuchni wyświetlane na stronie głównej
export const kitchenTypes = [
  {
    name: "Kuchnie płyta laminowana",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739372336299-kuku-5_opt.webp",
    slug: "plyta-laminowana",
    description: "Funkcjonalne i trwałe rozwiązanie w atrakcyjnej cenie",
  },
  {
    name: "Kuchnie MDF lakierowany",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739377197489-Meble-Tu-4.jpg",
    slug: "mdf-lakierowany",
    description: "Eleganckie wykończenie z możliwością personalizacji koloru",
  },
  {
    name: "Kuchnie akryl/lakier + płyta",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739376104808-meble-wa-16.jpg",
    slug: "akryl-lakier-plyta",
    description: "Nowoczesne połączenie wysokiego połysku z praktyczną płytą",
  },
  {
    name: "Kuchnie akrylowe / mata",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739376513294-KA2-4.jpg",
    slug: "akrylowe-mata",
    description: "Ekskluzywne wykończenie o wyjątkowej głębi koloru",
  },
  {
    name: "Kuchnie blaty HPL",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739376882960-kik-1_opt.webp",
    slug: "blaty-hpl",
    description: "Wytrzymałe i odporne na uszkodzenia powierzchnie",
  },
  {
    name: "Kuchnie z fornirem",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1739377196824-kuchsier-3.jpg",
    slug: "fornir",
    description: "Naturalne piękno drewna w nowoczesnym wydaniu",
  },
  {
    name: "Projektowanie kuchni",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1751701550370-IMG_1811.jpeg",
    slug: "projektowanie-kuchni",
    description: "Zamów projekt Twojej wymarzonej kuchni",
  },
  {
    name: "Łazienki na wymiar",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1754927990972-lazi-1_opt-1_opt.webp",
    slug: "lazienka-na-wymiar",
    description: "Powierz nam kompleksowe wykonanie łazienki",
  },
  {
    name: "Szafy, zabudowy, garderoby",
    image:
      "https://s3.eu-north-1.amazonaws.com/piszemy.com.pl/grandkuchnie/1755073547033-ram1-7_opt_opt.webp",
    slug: "szafy-zabudowy-garderoby",
    description: "Tworzymy idealnie dopasowane meble na wymiar",
  },
];
