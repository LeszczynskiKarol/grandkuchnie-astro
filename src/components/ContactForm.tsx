import { useState, useRef } from "react";
import { X, Plus, FileText } from "lucide-react";

// Konfiguracja EmailJS i Cloudinary
const EMAILJS_SERVICE_ID = "service_h3jd20g";
const EMAILJS_TEMPLATE_ID = "template_okptqlg";
const EMAILJS_PUBLIC_KEY = "gjau8dneW58l9l3tz";
const CLOUDINARY_UPLOAD_PRESET = "grandkuchnie";
const CLOUDINARY_CLOUD_NAME = "drpll3ho2";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
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

    const tooLargeFiles = newFiles.filter(
      (file) => file.size > 50 * 1024 * 1024
    );
    if (tooLargeFiles.length > 0) {
      setError(
        `Pliki: ${tooLargeFiles
          .map((f) => f.name)
          .join(", ")} przekraczają limit 50 MB`
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

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Błąd podczas uploadu pliku");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      let attachmentsHtml =
        '<span style="color: #64748b;">Brak załączników</span>';

      if (attachments.length > 0) {
        const uploadedUrls = await Promise.all(
          attachments.map((file) => uploadToCloudinary(file))
        );

        attachmentsHtml = uploadedUrls
          .map(
            (url, i) =>
              `<a href="${url}" target="_blank" style="display: inline-block; margin: 5px; padding: 10px 16px; background: #fbbf24; color: #1e293b; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 14px;">📎 Załącznik ${
                i + 1
              }</a>`
          )
          .join(" ");
      }

      const emailjs = await import("@emailjs/browser");

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Nie podano",
        message: formData.message,
        attachments: attachmentsHtml,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
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
