/**
 * Display-only sample rows so every category shows cards instead of an empty state.
 *
 * These are NOT persisted and never enter the saved-methods store, so they cannot be
 * selected at checkout — they exist purely to keep Card Management populated.
 */
export const SAMPLE_PAYMENT_METHODS = {
  'credit-card': [
    {
      id: 'sample-credit-card',
      typeId: 'credit-card',
      isSample: true,
      details: { brand: 'visa', last4: '4242', nameOnCard: 'Alex Morgan', expiryMonth: '08', expiryYear: '2027' },
    },
  ],
  ach: [
    {
      id: 'sample-ach',
      typeId: 'ach',
      isSample: true,
      details: { routingNumber: '021000021', accountLast4: '6789', accountHolderName: 'Alex Morgan' },
    },
  ],
  paypal: [
    { id: 'sample-paypal', typeId: 'paypal', isSample: true, details: { email: 'alex.morgan@example.com' } },
  ],
  zelle: [
    {
      id: 'sample-zelle',
      typeId: 'zelle',
      isSample: true,
      details: { contact: 'alex.morgan@example.com', nickname: 'Primary Zelle' },
    },
  ],
  venmo: [
    { id: 'sample-venmo', typeId: 'venmo', isSample: true, details: { username: 'alexmorgan', phone: '(415) 555-0134' } },
  ],
};

export function getSampleMethods(typeId) {
  return SAMPLE_PAYMENT_METHODS[typeId] ?? [];
}
