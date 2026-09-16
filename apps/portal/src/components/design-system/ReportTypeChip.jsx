import { Chip } from '@signal/ui';

const TYPE_COLOR = {
  Incident: 'error',
  'Site Summary': 'success',
};

export function ReportTypeChip({ type }) {
  return <Chip label={type} size="small" color={TYPE_COLOR[type] || 'info'} />;
}
