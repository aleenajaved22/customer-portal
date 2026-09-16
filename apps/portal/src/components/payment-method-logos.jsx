export function CreditCardLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="6" width="28" height="20" rx="3" fill="#444446" />
      <rect x="2" y="11" width="28" height="5" fill="#262527" />
      <rect x="6" y="20" width="8" height="2" rx="1" fill="#F5F5F6" />
    </svg>
  );
}

export function AchLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="4" y="5" width="24" height="22" rx="3" fill="#EFF8EF" stroke="#2DA551" strokeWidth="1.5" />
      <path d="M10 14h12M10 18h8" stroke="#2DA551" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="22" cy="20" r="3" fill="#2DA551" />
    </svg>
  );
}

export function PaypalLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="32" height="32" rx="6" fill="#003087" />
      <path
        d="M11.2 9h5.1c2.4 0 4.1 1.3 3.7 3.9-.3 2.1-1.8 3.2-4 3.2h-2l-.6 3.4H9l1.2-10.5zm3.4 6.1c1.2 0 1.9-.7 2.1-2 .2-1.3-.4-2-1.6-2h-1.5l-.7 4h1.7z"
        fill="#fff"
      />
      <path
        d="M18.5 9h5c2.2 0 3.7 1.1 3.4 3.5-.3 2-1.7 3.1-3.8 3.1h-1.9l-.6 3.4h-2.3l1.2-10.5zm3.2 6c1.1 0 1.8-.6 2-1.8.2-1.2-.3-1.8-1.5-1.8h-1.4l-.6 3.6h1.5z"
        fill="#009CDE"
      />
    </svg>
  );
}

export function ZelleLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="32" height="32" rx="6" fill="#6D1ED4" />
      <path
        d="M9 11h14v2.2H13.5l8.5 7.6V23H9v-2.2h9.5L9 13.4V11z"
        fill="#fff"
      />
    </svg>
  );
}

export function VenmoLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="32" height="32" rx="6" fill="#008CFF" />
      <path
        d="M19.2 9c-2.8 3.5-4.5 7.2-5.1 10.8-.4 2.4.2 4.5 2.8 4.5 2.2 0 4.1-1.5 5.5-4.2l1.4 1c-1.8 3.2-4.2 5.1-7.4 5.1-4.2 0-5.8-2.8-5-6.8.7-3.5 2.6-7.6 5.5-12.4H19.2z"
        fill="#fff"
      />
    </svg>
  );
}

export const PAYMENT_METHODS = [
  { id: 'credit-card', label: 'Credit card', Logo: CreditCardLogo },
  { id: 'ach', label: 'ACH', Logo: AchLogo },
  { id: 'paypal', label: 'PayPal', Logo: PaypalLogo },
  { id: 'zelle', label: 'Zelle', Logo: ZelleLogo },
  { id: 'venmo', label: 'Venmo', Logo: VenmoLogo },
];

export const PAYMENT_METHOD_TYPES = PAYMENT_METHODS;
