// src/components/CookieConsent.tsx
import { useState, useEffect } from "react";

interface ConsentSettings {
  analytics_storage: "granted" | "denied";
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  functionality_storage: "granted" | "denied";
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    openCookieSettings: () => void;
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>({
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "denied",
  });

  useEffect(() => {
    // Sprawdź czy użytkownik już wyraził zgodę
    const savedConsent = localStorage.getItem("cookieConsent");
    const savedSettings = localStorage.getItem("consentSettings");

    if (!savedConsent) {
      // Pokaż baner tylko jeśli nie ma zapisanej zgody
      setShowBanner(true);
    } else if (savedSettings) {
      // Wczytaj zapisane ustawienia
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Error parsing consent settings");
      }
    }

    // Eksportuj funkcję do globalnego scope dla linku w footerze
    window.openCookieSettings = () => {
      setShowSettings(true);
    };
  }, []);

  const updateConsent = (newSettings: ConsentSettings) => {
    // Aktualizuj Google Consent Mode
    if (typeof window.gtag !== "undefined") {
      window.gtag("consent", "update", newSettings);
    }

    // Zapisz do localStorage
    localStorage.setItem("consentSettings", JSON.stringify(newSettings));
    localStorage.setItem("cookieConsent", "true");

    // Wyślij event do dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "consent_update",
      ...newSettings,
    });
  };

  const acceptAll = () => {
    const allGranted: ConsentSettings = {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      functionality_storage: "granted",
    };
    setSettings(allGranted);
    updateConsent(allGranted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const allDenied: ConsentSettings = {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "denied",
    };
    setSettings(allDenied);
    updateConsent(allDenied);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveSettings = () => {
    updateConsent(settings);
    setShowBanner(false);
    setShowSettings(false);
  };

  const toggleSetting = (key: keyof ConsentSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: prev[key] === "granted" ? "denied" : "granted",
    }));
  };

  // Nie renderuj nic jeśli baner i modal są zamknięte
  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 md:p-6 z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🍪 Ta strona używa plików cookies
                </h3>
                <p className="text-gray-600 text-sm">
                  Używamy plików cookies, aby zapewnić najlepsze doświadczenia
                  na naszej stronie. Możesz zaakceptować wszystkie cookies lub
                  dostosować swoje preferencje.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Ustawienia
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Odrzuć wszystkie
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Akceptuj wszystkie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Ustawienia cookies
                </h3>
                <button
                  onClick={() => {
                    setShowSettings(false);
                    if (!localStorage.getItem("cookieConsent")) {
                      setShowBanner(true);
                    }
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Niezbędne - zawsze włączone */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">Niezbędne</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Wymagane do prawidłowego działania strony
                      </p>
                    </div>
                    <div className="bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded">
                      Zawsze aktywne
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-gray-900">
                        Analityczne
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Pomagają zrozumieć, jak użytkownicy korzystają ze strony
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.analytics_storage === "granted"}
                        onChange={() => toggleSetting("analytics_storage")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                {/* Funkcjonalne */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-gray-900">
                        Funkcjonalne
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Umożliwiają zapamiętanie preferencji użytkownika
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.functionality_storage === "granted"}
                        onChange={() => toggleSetting("functionality_storage")}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                {/* Reklamowe */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h4 className="font-semibold text-gray-900">Reklamowe</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Służą do wyświetlania spersonalizowanych reklam
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.ad_storage === "granted"}
                        onChange={() => {
                          const newValue =
                            settings.ad_storage === "granted"
                              ? "denied"
                              : "granted";
                          setSettings((prev) => ({
                            ...prev,
                            ad_storage: newValue,
                            ad_user_data: newValue,
                            ad_personalization: newValue,
                          }));
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={rejectAll}
                  className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Odrzuć wszystkie
                </button>
                <button
                  onClick={saveSettings}
                  className="flex-1 px-4 py-3 bg-primary text-secondary font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Zapisz wybrane
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
