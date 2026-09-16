/** Added to Card Management when the user saves their first payment method at checkout. */
export const COMPANION_PAYMENT_METHOD_SEEDS = [
  {
    typeId: 'ach',
    details: {
      routingNumber: '021000021',
      accountLast4: '4321',
      accountHolderName: 'Josh Franklin',
    },
  },
  {
    typeId: 'paypal',
    details: {
      email: 'payments@filtergo.com',
    },
  },
  {
    typeId: 'zelle',
    details: {
      contact: 'payments@filtergo.com',
      nickname: 'Business Zelle',
    },
  },
];
