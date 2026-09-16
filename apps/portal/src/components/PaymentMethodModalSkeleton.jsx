import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function PaymentMethodModalSkeleton() {
  return (
    <Stack spacing={2.5} sx={{ width: '100%', minWidth: 0 }}>
      <Skeleton variant="rounded" height={22} width="40%" sx={{ borderRadius: '6px' }} />
      <Stack direction="row" spacing={1.25} flexWrap="wrap">
        {[1, 2, 3, 4, 5].map((key) => (
          <Skeleton key={key} variant="rounded" width={120} height={82} sx={{ borderRadius: '12px' }} />
        ))}
      </Stack>
      <Skeleton variant="rounded" height={1} sx={{ borderRadius: 0 }} />
      <Stack spacing={2}>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" height={44} sx={{ flex: 1, borderRadius: '8px' }} />
          <Skeleton variant="rounded" height={44} width={148} sx={{ borderRadius: '8px', flexShrink: 0 }} />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" height={44} sx={{ flex: 1, borderRadius: '8px' }} />
          <Skeleton variant="rounded" height={44} width={148} sx={{ borderRadius: '8px', flexShrink: 0 }} />
        </Stack>
      </Stack>
      <Box sx={{ mt: 'auto', pt: 1 }}>
        <Skeleton variant="rounded" height={44} sx={{ borderRadius: '8px' }} />
      </Box>
    </Stack>
  );
}
