import { Chip } from '@signal/ui';

const STATUS_COLOR = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
};

export function InvoiceStatusChip({ status }) {
  return <Chip label={status} size="small" color={STATUS_COLOR[status] || 'info'} />;
}
