export const PAYMENT_METHOD_CATEGORIES = [
  { title: 'Credit card', typeId: 'credit-card' },
  { title: 'ACH', typeId: 'ach' },
  { title: 'PayPal', typeId: 'paypal' },
  { title: 'Zelle', typeId: 'zelle' },
  { title: 'Venmo', typeId: 'venmo' },
];

export const EMPTY_PAYMENT_METHOD_FORMS = {
  'credit-card': {
    cardNumber: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: '',
    nameOnCard: '',
  },
  ach: {
    routingNumber: '',
    accountNumber: '',
    accountHolderName: '',
  },
  paypal: {
    email: '',
    password: '',
  },
  zelle: {
    contact: '',
    nickname: '',
  },
  venmo: {
    username: '',
    phone: '',
  },
};

export function getPaymentMethodType(typeId, types = []) {
  return types.find((method) => method.id === typeId);
}

function formatCardExpiry(details = {}) {
  const month = details.expiryMonth ?? '';
  const year = details.expiryYear ?? '';
  if (!month && !year) return '';
  const mm = String(month).padStart(2, '0');
  const yy = String(year).length === 4 ? String(year).slice(-2) : String(year).padStart(2, '0');
  return `${mm}/${yy}`;
}

export function buildDetailsFromForm(typeId, form = {}) {
  switch (typeId) {
    case 'credit-card': {
      const digits = String(form.cardNumber ?? '').replace(/\D/g, '');
      return {
        last4: digits.slice(-4),
        nameOnCard: String(form.nameOnCard ?? '').trim(),
        expiryMonth: String(form.expiryMonth ?? '').trim(),
        expiryYear: String(form.expiryYear ?? '').trim(),
      };
    }
    case 'ach': {
      const acctDigits = String(form.accountNumber ?? '').replace(/\D/g, '');
      return {
        routingNumber: String(form.routingNumber ?? '').trim(),
        accountLast4: acctDigits.slice(-4),
        accountHolderName: String(form.accountHolderName ?? '').trim(),
      };
    }
    case 'paypal':
      return {
        email: String(form.email ?? '').trim(),
      };
    case 'zelle':
      return {
        contact: String(form.contact ?? '').trim(),
        nickname: String(form.nickname ?? '').trim(),
      };
    case 'venmo':
      return {
        username: String(form.username ?? '').trim(),
        phone: String(form.phone ?? '').trim(),
      };
    default:
      return {};
  }
}

export function buildPaymentMethodSummary(typeId, details = {}) {
  switch (typeId) {
    case 'credit-card': {
      const masked = details.last4 ? `•••• ${details.last4}` : '';
      const expiry = formatCardExpiry(details);
      return {
        label: details.nameOnCard?.trim() || masked || 'Credit card',
        subtitle: [masked && details.nameOnCard ? masked : '', expiry ? `Exp ${expiry}` : '']
          .filter(Boolean)
          .join(' · '),
      };
    }
    case 'ach':
      return {
        label: details.accountHolderName || 'Bank account',
        subtitle: details.accountLast4 ? `•••• ${details.accountLast4}` : '',
      };
    case 'paypal':
      return {
        label: details.email || 'PayPal',
        subtitle: '',
      };
    case 'zelle':
      return {
        label: details.contact || details.nickname || 'Zelle',
        subtitle: details.nickname && details.contact ? details.nickname : '',
      };
    case 'venmo':
      return {
        label: details.username || 'Venmo',
        subtitle: details.phone ?? '',
      };
    default:
      return { label: 'Payment method', subtitle: '' };
  }
}

export function getPaymentMethodRowDisplay(method) {
  const details = method.details ?? {};
  const reference = details.reference ?? digitsFromId(method.id).padStart(12, '0').slice(-12);
  const legacyAccountCode =
    details.accountCode ?? (digitsFromId(method.id).slice(-5).padStart(5, '0') || '45700');

  switch (method.typeId) {
    case 'credit-card': {
      const expiryRef = formatCardExpiryRowLabel(details);
      const referenceLine = expiryRef || method.subtitle || 'Visa credit card';
      return {
        primary: details.nameOnCard?.trim() || method.label || 'Credit card',
        reference: referenceLine,
        accountCode: details.last4 ? `Card no **** ${details.last4}` : 'Card no ****',
        secondary: referenceLine,
      };
    }
    case 'ach': {
      const referenceLine = details.routingNumber ? `Routing ${details.routingNumber}` : 'Checking account';
      return {
        primary: details.accountHolderName?.trim() || method.label || 'Bank account',
        reference: referenceLine,
        accountCode: details.accountLast4 ? `Acct no **** ${details.accountLast4}` : 'Acct no ****',
        secondary: referenceLine,
      };
    }
    case 'paypal': {
      const referenceLine = `Ref. ${reference}`;
      return {
        primary: details.email || method.label || 'PayPal',
        reference: referenceLine,
        accountCode: legacyAccountCode,
        secondary: referenceLine,
      };
    }
    case 'zelle': {
      const referenceLine = `Ref. ${reference}`;
      return {
        primary: details.contact || method.label || 'Zelle',
        reference: referenceLine,
        accountCode: legacyAccountCode,
        secondary: referenceLine,
      };
    }
    case 'venmo': {
      const referenceLine = `Ref. ${reference}`;
      return {
        primary: details.username || method.label || 'Venmo',
        reference: referenceLine,
        accountCode: legacyAccountCode,
        secondary: referenceLine,
      };
    }
    default: {
      const referenceLine = `Ref. ${reference}`;
      return {
        primary: method.label ?? 'Payment method',
        reference: referenceLine,
        accountCode: legacyAccountCode,
        secondary: referenceLine,
      };
    }
  }
}

function digitsFromId(id = '') {
  return String(id).replace(/\D/g, '');
}

function formatCardExpiryRowLabel(details = {}) {
  const month = details.expiryMonth ?? '';
  const year = details.expiryYear ?? '';
  if (!month && !year) return '';
  const mm = String(month).padStart(2, '0');
  const yy = String(year).length === 4 ? String(year).slice(-2) : String(year).padStart(2, '0');
  return `Card expiry ${mm}/${yy}`;
}
