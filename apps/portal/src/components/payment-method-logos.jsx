import Box from '@mui/material/Box';

export function PaymentMethodLogoIcon({ Logo, size = 32 }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        lineHeight: 0,
        overflow: 'hidden',
        '& svg': {
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          display: 'block',
          flexShrink: 0,
        },
      }}
    >
      <Logo />
    </Box>
  );
}

const logoSvgProps = {
  viewBox: '0 0 32 32',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
  preserveAspectRatio: 'xMidYMid meet',
};

export function CreditCardLogo() {
  return (
    <svg {...logoSvgProps}>
      <rect x="3" y="8" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 14h26" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 21h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AchLogo() {
  return (
    <svg {...logoSvgProps}>
      <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 15h12M10 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="23" cy="21" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function PaypalLogo() {
  return (
    <svg {...logoSvgProps}>
      <path
        d="M11.2 9h5.1c2.4 0 4.1 1.3 3.7 3.9-.3 2.1-1.8 3.2-4 3.2h-2l-.6 3.4H9l1.2-10.5zm3.4 6.1c1.2 0 1.9-.7 2.1-2 .2-1.3-.4-2-1.6-2h-1.5l-.7 4h1.7z"
        fill="#003087"
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
    <svg {...logoSvgProps}>
      <g transform="translate(4 4)">
        <path
          d="M13.559 24h-2.841a.483.483 0 0 1-.483-.483v-2.765H5.638a.667.667 0 0 1-.666-.666v-2.234a.67.67 0 0 1 .142-.412l8.139-10.382h-7.25a.667.667 0 0 1-.667-.667V3.914c0-.367.299-.666.666-.666h4.23V.483c0-.266.217-.483.483-.483h2.841c.266 0 .483.217.483.483v2.765h4.323c.367 0 .666.299.666.666v2.137a.67.67 0 0 1-.141.41l-8.19 10.481h7.665c.367 0 .666.299.666.666v2.477a.667.667 0 0 1-.666.667h-4.32v2.765a.483.483 0 0 1-.483.483Z"
          fill="#6D1ED4"
        />
      </g>
    </svg>
  );
}

export function VenmoLogo() {
  return (
    <svg {...logoSvgProps}>
      <path
        d="M19.2 9c-2.8 3.5-4.5 7.2-5.1 10.8-.4 2.4.2 4.5 2.8 4.5 2.2 0 4.1-1.5 5.5-4.2l1.4 1c-1.8 3.2-4.2 5.1-7.4 5.1-4.2 0-5.8-2.8-5-6.8.7-3.5 2.6-7.6 5.5-12.4H19.2z"
        fill="#008CFF"
      />
    </svg>
  );
}

export const PAYMENT_METHODS = [
  { id: 'credit-card', label: 'Credit card', Logo: CreditCardLogo },
  { id: 'ach', label: 'ACH', Logo: AchLogo },
  { id: 'paypal', label: 'PayPal', Logo: PaypalLogo, preserveLogoColor: true },
  { id: 'zelle', label: 'Zelle', Logo: ZelleLogo, preserveLogoColor: true },
  { id: 'venmo', label: 'Venmo', Logo: VenmoLogo, preserveLogoColor: true },
];

export const PAYMENT_METHOD_TYPES = PAYMENT_METHODS;
