// src/components/PhoneLink.tsx
import { trackPhoneClick } from "../lib/ga";

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
  
  const handleClick = () => {
    // Śledź konwersję kliknięcia w telefon
    trackPhoneClick();
  };

  // Formatuj numer do href (usuń spacje)
  const hrefNumber = phoneNumber.replace(/\s/g, '');

  return (
    <a 
      href={`tel:${hrefNumber}`}
      onClick={handleClick}
      className={className}
    >
      {displayText || phoneNumber}
    </a>
  );
}
