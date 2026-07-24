import { FileText, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { trackFormSubmission } from "../lib/ga";

// Backend meblowe-portfolio: SES (kontakt@grandkuchnie.pl + kopia na hub
// oferta@meblesystem.pl + BCC) + zapis leada w panelu + presign S3 na załączniki
const CONTACT_ENDPOINT =
  "https://elk3bw9gj4.execute-api.eu-central-1.amazonaws.com/contact-form";
const PRESIGN_ENDPOINT =
  "https://elk3bw9gj4.execute-api.eu-central-1.amazonaws.com/form-presign";
const DOMAIN = "grandkuchnie.pl";
const MAX_FILE_SIZE = 15 * 1024 * 1024; // limit presign w Lambdzie

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

function __leadSource() {
  try {
    const p = new URLSearchParams(location.search);
    const u = p.get("utm_source");
    if (u) return u;
    const r = document.referrer;
    if (!r) return "direct";
    const h = new URL(r).hostname;
    if (h.includes(location.hostname)) return "direct";
    if (/google\./.test(h)) return "google";
    if (/bing\./.test(h)) return "bing";
    if (/facebook|fb\.|instagram|t\.co/.test(h)) return "social";
    return h;
  } catch (e) {
    return "referral";
  }
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    if (attachments.length + newFiles.length > 10) {
      setError("Możesz dodać maksymalnie 10 plików");
      return;
    }

    const tooLargeFiles = newFiles.filter((file) => file.size > MAX_FILE_SIZE);
    if (tooLargeFiles.length > 0) {
      setError(
        `Pliki: ${tooLargeFiles
          .map((f) => f.name)
          .join(", ")} przekraczają limit 15 MB`
      );
      return;
    }

    setAttachments((prev) => [...prev, ...newFiles]);
    setError("");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload przez presign: /form-presign -> PUT na S3 -> {key, name, size}
  const uploadAttachment = async (
    file: File
  ): Promise<{ key: string; name: string; size: number }> => {
    const presignRes = await fetch(PRESIGN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain: DOMAIN,
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
      }),
    });
    if (!presignRes.ok) throw new Error("Błąd podczas przygotowania uploadu");
    const { uploadUrl, key } = await presignRes.json();

    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });
    if (!putRes.ok) throw new Error("Błąd podczas uploadu pliku");

    return { key, name: file.name, size: file.size };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      // Załączniki: presign -> S3, po kolei
      const uploaded: { key: string; name: string; size: number }[] = [];
      for (const file of attachments) {
        uploaded.push(await uploadAttachment(file));
      }

      // Jedna wysyłka: e-mail SES (kontakt@ + hub + BCC) i zapis leada w panelu
      const params = new URLSearchParams(location.search);
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: DOMAIN,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          message: formData.message,
          company: honeypotRef.current?.value || "", // honeypot
          attachments: uploaded,
          source: __leadSource(),
          referrer: document.referrer || "",
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          landing: location.pathname,
        }),
      });

      if (!response.ok) {
        throw new Error("Błąd wysyłania");
      }

      setStatus("success");
      trackFormSubmission();
      setFormData({ name: "", email: "", phone: "", message: "" });
      setAttachments([]);

      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
      setError(
        "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później."
      );
    }
  };

  const StatusMessage = () => {
    if (status === "success") {
      return (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>
            Dziękujemy! Odpowiemy na Twoją wiadomość w ciągu 1-2 dni roboczych.
          </span>
        </div>
      );
    }

    if (status === "error") {
      return (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
          <span>{error}</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {(status === "success" || status === "error") && (
          <div className="mb-4">
            <StatusMessage />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot antyspamowy — ukryte pole, wypełniają tylko boty */}
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
            <label htmlFor="company">Firma</label>
            <input
              type="text"
              id="company"
              name="company"
              ref={honeypotRef}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Twoje imię *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email *</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Telefon (nieobowiązkowe)</span>
            </label>
            <input
              type="tel"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Wiadomość *</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-64"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Załączniki</span>
              <span className="label-text-alt">
                {attachments.length}/10 plików (max. 50 MB każdy)
              </span>
            </label>

            <div className="mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-outline btn-sm mb-3 flex items-center justify-center gap-2"
                disabled={attachments.length >= 10}
              >
                <Plus className="w-4 h-4" />
                <span>Dodaj pliki</span>
              </button>

              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-base-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="overflow-hidden max-w-[200px]">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="w-6 h-6 bg-base-300 hover:bg-error hover:text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Wyślij wiadomość"
            )}
          </button>

          {(status === "success" || status === "error") && (
            <div className="mt-4">
              <StatusMessage />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
