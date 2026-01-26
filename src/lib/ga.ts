// src/lib/ga.ts - Google Analytics & Ads tracking functions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Wysyła zdarzenie do Google Tag Manager przez dataLayer
 */
export const sendGAEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });

    console.log(`[GA] Event sent: ${eventName}`, parameters);
  }
};

/**
 * Wysyła konwersję do Google Ads
 */
export const sendGoogleAdsConversion = (
  conversionId: string,
  conversionLabel: string,
  value: number = 1.0,
  currency: string = "PLN"
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `${conversionId}/${conversionLabel}`,
      value: value,
      currency: currency,
    });
    console.log(`[Google Ads] Conversion sent: ${conversionId}/${conversionLabel}`);
  }
};

/**
 * Konwersja - wysłanie formularza kontaktowego
 * Google Ads Conversion ID: AW-988030143/IIukCPrJ180aEL_JkNcD
 */
export const trackFormSubmission = () => {
  // Event do GTM/GA4
  sendGAEvent("form_submission", {
    event_category: "conversion",
    event_label: "contact_form_submitted",
    conversion_value: 50,
    conversion_currency: "PLN",
  });

  // Bezpośrednia konwersja Google Ads
  sendGoogleAdsConversion("AW-988030143", "IIukCPrJ180aEL_JkNcD", 1.0, "PLN");
};

/**
 * Konwersja - kliknięcie w numer telefonu
 * Google Ads Conversion ID: AW-988030143/YQkUCNjx1s0aEL_JkNcD
 */
export const trackPhoneClick = () => {
  // Event do GTM/GA4
  sendGAEvent("phone_click", {
    event_category: "engagement",
    event_label: "phone_number_click",
    conversion_value: 50,
    conversion_currency: "PLN",
  });

  // Bezpośrednia konwersja Google Ads
  sendGoogleAdsConversion("AW-988030143", "YQkUCNjx1s0aEL_JkNcD", 1.0, "PLN");
};

/**
 * Śledzi wyświetlenie formularza
 */
export const trackFormView = () => {
  sendGAEvent("form_view", {
    event_category: "engagement",
    event_label: "contact_form_view",
  });
};

/**
 * Śledzi rozpoczęcie wypełniania formularza
 */
export const trackFormStart = () => {
  sendGAEvent("form_start", {
    event_category: "engagement",
    event_label: "contact_form_start",
  });
};

/**
 * Śledzi wyświetlenie strony
 */
export const trackPageView = (pagePath?: string, pageTitle?: string) => {
  sendGAEvent("page_view", {
    page_path: pagePath || window.location.pathname,
    page_title: pageTitle || document.title,
  });
};

// Stałe z nazwami eventów (dla spójności)
export const GA_EVENTS = {
  FORM_SUBMISSION: "form_submission",
  FORM_START: "form_start",
  FORM_VIEW: "form_view",
  PHONE_CLICK: "phone_click",
  PAGE_VIEW: "page_view",
} as const;

// Stałe z ID konwersji Google Ads
export const GOOGLE_ADS_CONVERSIONS = {
  FORM_SUBMISSION: {
    id: "AW-988030143",
    label: "IIukCPrJ180aEL_JkNcD",
  },
  PHONE_CLICK: {
    id: "AW-988030143",
    label: "YQkUCNjx1s0aEL_JkNcD",
  },
} as const;
