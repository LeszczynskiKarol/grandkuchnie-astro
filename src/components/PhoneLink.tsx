// src/components/PhoneLink.tsx
// Tracking klikniec obsluguje globalny delegowany listener w Layout.astro
// (nie dublowac go tutaj — bylaby podwojna konwersja).

interface PhoneLinkProps {
  phoneNumber: string;
  displayText?: string;
  className?: string;
}

export default function PhoneLink({
  phoneNumber,
  displayText,
  className = "text-gray-600 hover:text-primary transition-colors"
}: PhoneLinkProps) {
  // Formatuj numer do href (usuń spacje)
  const hrefNumber = phoneNumber.replace(/\s/g, '');

  return (
    <a
      href={`tel:${hrefNumber}`}
      className={className}
    >
      {displayText || phoneNumber}
    </a>
  );
}
