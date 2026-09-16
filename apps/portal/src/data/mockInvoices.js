import { semantic } from '@signal/design-tokens/colors';

/** Saturated status fills from the DS strong-surface ramp (bar fills). */
const SEGMENT_BAR_FILL = {
  paid: semantic.surface.successStrong,
  pending: semantic.surface.warningStrong,
  overdue: semantic.surface.alertStrong,
};
const DASHBOARD_STAT_THEME = {
  total: {
    color: semantic.text.secondary2,
    iconBg: semantic.surface.greySubtle,
  },
  paid: {
    color: semantic.status.onSubtle.success,
    iconBg: semantic.surface.successSubtle,
  },
  pending: {
    color: semantic.status.onSubtle.warning,
    iconBg: semantic.surface.warningSubtle,
  },
  overdue: {
    color: semantic.text.alert,
    iconBg: semantic.surface.alertSubtle,
  },
};

/** Shared bill-to details keyed by site (FilterGo customer portal). */
export const billToBySite = {
  KFC: {
    address: '14508 Owen Tech Blvd Austin, TX 78728',
    contactPerson: 'John Hairgrove',
    contactPhone: '(512) 251-4900',
    contactEmail: 'john.hairgrove@filtergo.com',
  },
  'Zorinski Lake': {
    address: '892 Lakeview Dr Omaha, NE 68114',
    contactPerson: 'Maria Chen',
    contactPhone: '(402) 555-0182',
    contactEmail: 'maria.chen@filtergo.com',
  },
  Altadena: {
    address: '2200 Altadena Dr Pasadena, CA 91107',
    contactPerson: 'David Reyes',
    contactPhone: '(626) 555-0144',
    contactEmail: 'david.reyes@filtergo.com',
  },
};

export const mockInvoices = [
  {
    id: '1',
    invoiceNumber: 'INV-10482',
    site: 'KFC',
    amount: '$4,250.00',
    status: 'Pending',
    contract: 'Contract Q1-2024',
    dueDate: '08/15/25',
    invoiceDate: '12/12/2024',
    paymentTerms: 'NET 10',
  },
  {
    id: '2',
    invoiceNumber: 'INV-10481',
    site: 'Zorinski Lake',
    amount: '$2,180.00',
    status: 'Paid',
    contract: 'Contract Q2-2024',
    dueDate: '08/10/25',
    invoiceDate: '11/28/2024',
    paymentTerms: 'NET 10',
  },
  {
    id: '3',
    invoiceNumber: 'INV-10480',
    site: 'Zorinski Lake',
    amount: '$3,420.00',
    status: 'Overdue',
    contract: 'Contract Q1-2024',
    dueDate: '08/01/25',
    invoiceDate: '12/01/2024',
    paymentTerms: 'NET 10',
  },
  {
    id: '4',
    invoiceNumber: 'INV-10479',
    site: 'Altadena',
    amount: '$1,890.00',
    status: 'Paid',
    contract: 'Contract Q2-2024',
    dueDate: '07/28/25',
    invoiceDate: '11/15/2024',
    paymentTerms: 'NET 10',
  },
  {
    id: '5',
    invoiceNumber: 'INV-10478',
    site: 'KFC',
    amount: '$5,100.00',
    status: 'Pending',
    contract: 'Contract Q2-2024',
    dueDate: '08/20/25',
    invoiceDate: '12/05/2024',
    paymentTerms: 'NET 10',
  },
  {
    id: '6',
    invoiceNumber: 'INV-10477',
    site: 'Zorinski Lake',
    amount: '$2,650.00',
    status: 'Paid',
    contract: 'Contract Q1-2024',
    dueDate: '07/22/25',
    invoiceDate: '11/20/2024',
    paymentTerms: 'NET 10',
  },
  {
    id: '7',
    invoiceNumber: 'INV-10476',
    site: 'Altadena',
    amount: '$980.00',
    status: 'Overdue',
    contract: 'Contract Q1-2024',
    dueDate: '07/15/25',
    invoiceDate: '11/10/2024',
    paymentTerms: 'NET 10',
  },
  {
    id: '8',
    invoiceNumber: 'INV-10475',
    site: 'KFC',
    amount: '$3,775.00',
    status: 'Pending',
    contract: 'Contract Q1-2024',
    dueDate: '08/25/25',
    invoiceDate: '12/08/2024',
    paymentTerms: 'NET 10',
  },
];

export function getUniqueInvoiceSites(invoices = mockInvoices) {
  const seen = new Set();
  const sites = [];
  for (const invoice of invoices) {
    if (!seen.has(invoice.site)) {
      seen.add(invoice.site);
      sites.push(invoice.site);
    }
  }
  return sites;
}

export const invoiceSiteFilterOptions = ['All sites', ...getUniqueInvoiceSites()];
export const invoiceStatusFilterOptions = ['All statuses', 'Paid', 'Pending', 'Overdue'];

export function filterInvoicesByStatus(invoices, status) {
  if (!status) return invoices;
  return invoices.filter((invoice) => invoice.status === status);
}

export function getPendingInvoices(invoices = mockInvoices) {
  return filterInvoicesByStatus(invoices, 'Pending');
}

export function getOverdueInvoices(invoices = mockInvoices) {
  return filterInvoicesByStatus(invoices, 'Overdue');
}

export function getUnpaidInvoices(invoices = mockInvoices) {
  return invoices.filter((invoice) => invoice.status === 'Pending' || invoice.status === 'Overdue');
}

export function getBillToForSite(site) {
  return (
    billToBySite[site] ?? {
      address: '14508 Owen Tech Blvd Austin, TX 78728',
      contactPerson: 'John Hairgrove',
      contactPhone: '(512) 251-4900',
      contactEmail: 'john.hairgrove@filtergo.com',
    }
  );
}

export function getInvoiceStats(invoices = mockInvoices) {
  const pending = getPendingInvoices(invoices).length;
  const overdue = getOverdueInvoices(invoices).length;

  return [
    { label: 'Total Invoices', value: invoices.length, iconKey: 'total' },
    { label: 'Pending Payment', value: pending, iconKey: 'pending' },
    { label: 'Overdue', value: overdue, iconKey: 'overdue' },
  ];
}

/** Matches “Pending Payment” stat — banner and Pay Now from banner. */
export function getAwaitingPaymentCount(invoices = mockInvoices) {
  return getPendingInvoices(invoices).length;
}

export function parseInvoiceAmount(amountStr) {
  const value = Number(String(amountStr).replace(/[^0-9.-]/g, ''));
  return Number.isFinite(value) ? value : 0;
}

/** Parse invoice due/invoice date strings (MM/DD/YY, MM/DD/YYYY, or locale long form). */
export function parseInvoiceDate(value) {
  if (value == null || value === '') return null;

  const slashMatch = String(value).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashMatch) {
    const month = Number(slashMatch[1]);
    const day = Number(slashMatch[2]);
    let year = Number(slashMatch[3]);
    if (year < 100) year += 2000;
    const date = new Date(year, month - 1, day);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

/** Display due dates as MM/DD/YY in tables and detail views. */
export function formatInvoiceDueDate(value) {
  const parsed = parseInvoiceDate(value);
  if (!parsed) return value ?? '';
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const dd = String(parsed.getDate()).padStart(2, '0');
  const yy = String(parsed.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

export function formatInvoiceTotal(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function sumInvoiceAmounts(invoices = []) {
  return invoices.reduce((sum, invoice) => sum + parseInvoiceAmount(invoice.amount), 0);
}

export function sumInvoicesByStatus(invoices, status) {
  return sumInvoiceAmounts(filterInvoicesByStatus(invoices, status));
}

/** One bar per invoice; height = share of largest amount in the set (sorted low → high). */
export function getInvoiceSparklinePoints(invoices = []) {
  if (!invoices.length) {
    return [{ id: 'empty', label: 'No invoices', amount: '$0', value: 0.15 }];
  }

  const sorted = [...invoices].sort(
    (a, b) => parseInvoiceAmount(a.amount) - parseInvoiceAmount(b.amount),
  );
  const maxAmount = Math.max(...sorted.map((invoice) => parseInvoiceAmount(invoice.amount)), 1);

  return sorted.map((invoice) => {
    const ratio = parseInvoiceAmount(invoice.amount) / maxAmount;
    return {
      id: invoice.id,
      label: invoice.invoiceNumber,
      amount: invoice.amount,
      value: Math.max(0.22, ratio),
    };
  });
}

export function getInvoiceDashboardCards(invoices = mockInvoices) {
  const totalAmount = sumInvoiceAmounts(invoices);
  const paidTotal = sumInvoicesByStatus(invoices, 'Paid');
  const pendingTotal = sumInvoicesByStatus(invoices, 'Pending');
  const overdueTotal = sumInvoicesByStatus(invoices, 'Overdue');

  return [
    {
      id: 'total',
      label: 'Total',
      amount: formatInvoiceTotal(totalAmount),
      ...DASHBOARD_STAT_THEME.total,
      iconVariant: 'total',
      sparkline: getInvoiceSparklinePoints(invoices),
    },
    {
      id: 'paid',
      label: 'Paid',
      amount: formatInvoiceTotal(paidTotal),
      ...DASHBOARD_STAT_THEME.paid,
      iconVariant: 'check',
      sparkline: getInvoiceSparklinePoints(filterInvoicesByStatus(invoices, 'Paid')),
    },
    {
      id: 'pending',
      label: 'Pending',
      amount: formatInvoiceTotal(pendingTotal),
      ...DASHBOARD_STAT_THEME.pending,
      iconVariant: 'clock',
      sparkline: getInvoiceSparklinePoints(getPendingInvoices(invoices)),
    },
    {
      id: 'overdue',
      label: 'Overdue',
      amount: formatInvoiceTotal(overdueTotal),
      ...DASHBOARD_STAT_THEME.overdue,
      iconVariant: 'alert',
      sparkline: getInvoiceSparklinePoints(getOverdueInvoices(invoices)),
    },
  ];
}

export function getInvoiceStatusSegmentStats(invoices = mockInvoices) {
  const segments = [
    {
      id: 'paid',
      label: 'Paid',
      barColor: SEGMENT_BAR_FILL.paid,
      dotColor: SEGMENT_BAR_FILL.paid,
    },
    {
      id: 'pending',
      label: 'Pending',
      barColor: SEGMENT_BAR_FILL.pending,
      dotColor: SEGMENT_BAR_FILL.pending,
    },
    {
      id: 'overdue',
      label: 'Overdue',
      barColor: SEGMENT_BAR_FILL.overdue,
      dotColor: SEGMENT_BAR_FILL.overdue,
    },
  ].map((segment) => {
    const value = sumInvoicesByStatus(invoices, segment.label);
    return {
      ...segment,
      value,
      amountLabel: formatInvoiceTotal(value),
    };
  });

  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  const safeTotal = totalValue || 1;

  return {
    totalLabel: formatInvoiceTotal(totalValue),
    segments: segments.map((segment) => ({
      ...segment,
      percent: totalValue === 0 ? 0 : Math.round((segment.value / safeTotal) * 100),
    })),
  };
}

/** Line-item subtotal + adjustments = table amount (for detail drawer totals). */
export function getInvoiceAmountBreakdown(invoice) {
  const grandTotal = parseInvoiceAmount(invoice?.amount);
  const adjustments = grandTotal > 2500 ? 2000 : 0;
  const lineItemsSubtotal = Math.max(0, grandTotal - adjustments);

  return {
    lineItemsSubtotal: formatInvoiceTotal(lineItemsSubtotal),
    adjustments: formatInvoiceTotal(adjustments),
    taxes: 'N/A',
    grandTotal: formatInvoiceTotal(grandTotal),
  };
}
