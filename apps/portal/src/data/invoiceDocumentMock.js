import { formatInvoiceTotal, parseInvoiceAmount } from './mockInvoices';

export function getPaidInvoiceDocument(invoice) {
  const total = parseInvoiceAmount(invoice?.amount) || 120;
  const discount = 10;
  const tax = 20;
  const subtotal = total - tax + discount;

  return {
    invoiceToLines: [
      invoice?.site ?? 'Customer site',
      '14508 Owen Tech Blvd',
      'Austin, TX 78728',
    ],
    invoiceNumber: invoice?.invoiceNumber ?? 'OPS-002',
    invoiceDate: invoice?.invoiceDate ?? '12/22/25',
    dueDate: invoice?.dueDate ?? '12/28/25',
    terms: invoice?.paymentTerms ?? 'Net 15',
    lineItems: invoice?.paidLineItems ?? buildPaidLineItems(total),
    message: 'Thanks for choosing Filtergo. Breezy service, crisp results. FilterGo',
    subtotal: formatInvoiceTotal(subtotal),
    discount: formatInvoiceTotal(discount),
    tax: formatInvoiceTotal(tax),
    total: formatInvoiceTotal(total),
    balanceDue: formatInvoiceTotal(total),
  };
}

function buildPaidLineItems(total) {
  if (total <= 0) {
    return [
      { title: 'Filter Replacement Service', subtitle: '100x100x2', qty: '01', rate: '$20.00', amount: '$20.00' },
    ];
  }

  const quarter = total / 4;
  return [
    { title: 'Filter Replacement Service', subtitle: '100x100x2', qty: '01', rate: formatInvoiceTotal(quarter), amount: formatInvoiceTotal(quarter) },
    { title: 'Filter Replacement Service', subtitle: '100x100x1', qty: '01', rate: formatInvoiceTotal(quarter), amount: formatInvoiceTotal(quarter) },
    { title: 'Filter Replacement Service', subtitle: '25x25x1', qty: '01', rate: formatInvoiceTotal(quarter), amount: formatInvoiceTotal(quarter) },
    { title: 'Filter Replacement Service', subtitle: 'Metal Filter Cleaning', qty: '01', rate: formatInvoiceTotal(quarter), amount: formatInvoiceTotal(total - quarter * 3) },
  ];
}
