import { buildPaymentMethodSummary } from './paymentMethodCategories';

const SEED_METHODS = [
  {
    id: 'pm_seed_credit_1',
    typeId: 'credit-card',
    details: {
      last4: '3456',
      nameOnCard: 'Josh Franklin',
      expiryMonth: '09',
      expiryYear: '28',
      reference: '009001706623',
      accountCode: '45700',
    },
  },
  {
    id: 'pm_seed_credit_2',
    typeId: 'credit-card',
    details: {
      last4: '9012',
      nameOnCard: 'Maria Chen',
      expiryMonth: '03',
      expiryYear: '27',
      reference: '009001706628',
      accountCode: '45705',
    },
  },
  {
    id: 'pm_seed_ach',
    typeId: 'ach',
    details: {
      accountLast4: '6789',
      accountHolderName: 'Josh Franklin',
      reference: '009001706624',
      accountCode: '45701',
    },
  },
  {
    id: 'pm_seed_paypal',
    typeId: 'paypal',
    details: {
      email: 'you@example.com',
      reference: '009001706625',
      accountCode: '45702',
    },
  },
  {
    id: 'pm_seed_zelle',
    typeId: 'zelle',
    details: {
      contact: 'payments@filtergo.com',
      nickname: 'Business Zelle',
      reference: '009001706626',
      accountCode: '45703',
    },
  },
  {
    id: 'pm_seed_venmo',
    typeId: 'venmo',
    details: {
      username: '@filtergo',
      phone: '(402) 555-0100',
      reference: '009001706627',
      accountCode: '45704',
    },
  },
];

export function getDefaultPaymentMethodsState() {
  const methods = SEED_METHODS.map(({ id, typeId, details }) => {
    const summary = buildPaymentMethodSummary(typeId, details);
    return {
      id,
      typeId,
      details,
      label: summary.label,
      subtitle: summary.subtitle,
      createdAt: '2025-01-01T00:00:00.000Z',
    };
  });

  return {
    methods,
    defaultMethodId: methods[0].id,
  };
}
