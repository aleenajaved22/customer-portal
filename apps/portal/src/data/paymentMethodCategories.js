export const PAYMENT_METHOD_CATEGORIES = [
  { title: 'Credit card', typeId: 'credit-card' },
  { title: 'ACH', typeId: 'ach' },
  { title: 'PayPal', typeId: 'paypal' },
  { title: 'Zelle', typeId: 'zelle' },
  { title: 'Venmo', typeId: 'venmo' },
];

export function getPaymentMethodType(typeId, types = []) {
  return types.find((method) => method.id === typeId);
}

export function buildPaymentMethodSummary(typeId, details = {}) {
  switch (typeId) {
    case 'credit-card':
      return {
        label: details.nameOnCard ?? 'Cardholder',
        subtitle: formatCardExpiry(details),
      };
    case 'ach':
      return {
        label: `Account ending in ${details.accountLast4 ?? '6789'}`,
        subtitle: details.accountHolderName ?? 'Bank account',
      };
    case 'paypal':
      return {
        label: details.email ?? 'PayPal account',
        subtitle: 'PayPal',
      };
    case 'zelle':
      return {
        label: details.contact ?? 'Zelle account',
        subtitle: details.nickname ?? 'Zelle',
      };
    case 'venmo':
      return {
        label: details.username ?? '@username',
        subtitle: details.phone ?? 'Venmo',
      };
    default:
      return { label: 'Payment method', subtitle: '' };
  }
}

function digitsFromId(id = '') {
  return id.replace(/\D/g, '');
}

function formatCardExpiry(details = {}) {
  const month = details.expiryMonth ?? details.expMonth ?? '09';
  const year = details.expiryYear ?? details.expYear ?? '28';
  const mm = String(month).padStart(2, '0');
  const yy =
    String(year).length === 4 ? String(year).slice(-2) : String(year).padStart(2, '0');
  return `Card expiry ${mm}/${yy}`;
}

export function getPaymentMethodRowDisplay(method) {
  const details = method.details ?? {};
  const reference = details.reference ?? digitsFromId(method.id).padStart(12, '0').slice(-12);
  const legacyAccountCode =
    details.accountCode ?? (digitsFromId(method.id).slice(-5).padStart(5, '0') || '45700');

  switch (method.typeId) {
    case 'credit-card':
      return {
        primary: details.nameOnCard ?? 'Josh Franklin',
        reference: formatCardExpiry(details),
        accountCode: `Card no **** ${details.last4 ?? '6789'}`,
        info: method.subtitle ?? 'Visa credit card',
      };
    case 'ach':
      return {
        primary: details.accountHolderName ?? 'Josh Franklin',
        reference: details.bankName ?? 'Checking account',
        accountCode: `Acct no **** ${details.accountLast4 ?? '6789'}`,
        info: 'ACH bank transfer',
      };
    case 'paypal':
      return {
        primary: details.email ?? method.label,
        reference: `Ref. ${reference}`,
        accountCode: legacyAccountCode,
        info: 'PayPal wallet',
      };
    case 'zelle':
      return {
        primary: details.contact ?? method.label,
        reference: `Ref. ${reference}`,
        accountCode: legacyAccountCode,
        info: details.nickname ?? 'Zelle',
      };
    case 'venmo':
      return {
        primary: details.username ?? method.label,
        reference: `Ref. ${reference}`,
        accountCode: legacyAccountCode,
        info: details.phone ?? 'Venmo',
      };
    default:
      return {
        primary: method.label,
        reference: `Ref. ${reference}`,
        accountCode: legacyAccountCode,
        info: method.subtitle,
      };
  }
}
