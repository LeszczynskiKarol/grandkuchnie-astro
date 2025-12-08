import { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";

interface ConsentSettings {
  ad_storage: "granted" | "denied";
  ad_user_data: "granted" | "denied";
  ad_personalization: "granted" | "denied";
  analytics_storage: "granted" | "denied";
  functionality_storage: "granted" | "denied";
}

const defaultSettings: ConsentSettings = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
};

export default function CookieConsent() {
  const [hasConsent, setHasConsent] = useState(true); // Default to true to hide on SSR
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ConsentSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("consentSettings");
    if (saved) {
      setHasConsent(true);
      setSettings(JSON.parse(saved));
    } else {
      setHasConsent(false);
    }
  }, []);

  const updateConsent = (newSettings: ConsentSettings) => {
    setSettings(newSettings);
    localStorage.setItem("consentSettings", JSON.stringify(newSettings));

    // Update GTM consent
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", newSettings);
    }

    // Push event to dataLayer
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "consent_update",
        consent_changed: true,
      });
    }
  };

  const handleAcceptAll = () => {
    const allGranted: ConsentSettings = {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      functionality_storage: "granted",
    };
    updateConsent(allGranted);
    setHasConsent(true);
  };

  const handleRejectAll = () => {
    updateConsent(defaultSettings);
    setHasConsent(true);
  };

  const handleSaveSettings = () => {
    updateConsent(settings);
    setHasConsent(true);
    setShowSettings(false);
  };

  // Cookie banner
  if (!hasConsent) {
    return (
      <>
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                <p>
                  Używamy plików cookie i podobnych technologii, aby poprawić
                  Twoje doświadczenia. Możesz zaakceptować wszystkie lub
                  dostosować ustawienia.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Ustawienia
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Odrzuć
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-secondary text-white rounded hover:bg-secondary/90"
                >
                  Akceptuj wszystkie
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Ustawienia prywatności
                </h2>
                <button onClick={() => setShowSettings(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Niezbędne</h3>
                    <p className="text-sm text-gray-500">
                      Wymagane do działania strony
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="toggle toggle-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Analityczne</h3>
                    <p className="text-sm text-gray-500">
                      Pomaga nam zrozumieć jak używasz strony
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.analytics_storage === "granted"}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        analytics_storage: e.target.checked
                          ? "granted"
                          : "denied",
                      }))
                    }
                    className="toggle toggle-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Funkcjonalne</h3>
                    <p className="text-sm text-gray-500">
                      Zapamiętuje Twoje preferencje
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.functionality_storage === "granted"}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        functionality_storage: e.target.checked
                          ? "granted"
                          : "denied",
                      }))
                    }
                    className="toggle toggle-primary"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Reklamowe</h3>
                    <p className="text-sm text-gray-500">
                      Pozwala na wyświetlanie spersonalizowanych reklam
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.ad_storage === "granted"}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        ad_storage: e.target.checked ? "granted" : "denied",
                        ad_user_data: e.target.checked ? "granted" : "denied",
                        ad_personalization: e.target.checked
                          ? "granted"
                          : "denied",
                      }))
                    }
                    className="toggle toggle-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary/90"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Settings button (after consent given)
  return (
    <button
      onClick={() => setShowSettings(true)}
      className="fixed bottom-4 right-4 p-3 bg-white rounded-full shadow-lg z-50 hover:bg-gray-50 transition-all border border-gray-200"
      aria-label="Ustawienia prywatności"
    >
      <Settings className="w-5 h-5 text-gray-700" />
    </button>
  );
}
