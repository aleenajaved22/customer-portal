import { Chip } from '@signal/ui';

const STATUS_COLOR = {
  Ready: 'success',
  Processing: 'warning',
};

export function StatusChip({ status }) {
  return (
    <Chip
      label={status}
      size="small"
      color={STATUS_COLOR[status] || 'warning'}
    />
  );
}
