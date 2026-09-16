import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button } from './design-system';

const STAT_ICON_BY_VARIANT = {
  total: ArticleOutlinedIcon,
  check: CheckCircleOutlineIcon,
  clock: AccessTimeOutlinedIcon,
  alert: ErrorOutlineIcon,
};

function StatIcon({ variant, color, backgroundColor }) {
  const Icon = STAT_ICON_BY_VARIANT[variant] ?? ArticleOutlinedIcon;

  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '4px',
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon sx={{ fontSize: 18, color }} />
    </Box>
  );
}

function DashboardStatCell({ card, showDivider, stackedLayout = false }) {
  const theme = useTheme();

  if (stackedLayout) {
    return (
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          px: '32px',
          py: '24px',
          backgroundColor: theme.palette.surfaceWhite,
          borderRight: showDivider ? `1px solid ${theme.palette.borderSubtle1}` : 'none',
        }}
      >
        <Stack direction="row" spacing={1.25} alignItems="flex-start" sx={{ minWidth: 0 }}>
          <StatIcon variant={card.iconVariant} color={card.color} backgroundColor={card.iconBg} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '20px',
                color: theme.palette.textSecondary3,
              }}
            >
              {card.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                lineHeight: '30px',
                color: theme.palette.textPrimary,
                mt: 0.75,
              }}
            >
              {card.amount}
            </Typography>
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        px: '32px',
        py: '24px',
        backgroundColor: theme.palette.surfaceWhite,
        borderRight: showDivider ? `1px solid ${theme.palette.borderSubtle1}` : 'none',
      }}
    >
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0, mb: 1.5 }}>
        <StatIcon variant={card.iconVariant} color={card.color} backgroundColor={card.iconBg} />
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '20px',
            color: theme.palette.textSecondary3,
          }}
        >
          {card.label}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          lineHeight: '30px',
          color: theme.palette.textPrimary,
        }}
      >
        {card.amount}
      </Typography>
    </Box>
  );
}

export function InvoiceStatsRow({ cards, stackedLayout = false }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        backgroundColor: theme.palette.surfaceWhite,
        borderTop: `1px solid ${theme.palette.borderSubtle1}`,
        borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
      }}
    >
      {cards.map((card, index) => (
        <DashboardStatCell
          key={card.id}
          card={card}
          showDivider={index < cards.length - 1}
          stackedLayout={stackedLayout}
        />
      ))}
    </Box>
  );
}

function SegmentLegendItem({ segment }) {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 0, width: '100%', textAlign: 'left' }}>
      <Stack direction="row" alignItems="center" spacing={0.75} justifyContent="flex-start" sx={{ mb: 0.5 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: segment.dotColor,
            flexShrink: 0,
          }}
        />
        <Typography sx={{ fontSize: 13, fontWeight: 400, color: theme.palette.textSecondary3 }}>{segment.label}</Typography>
      </Stack>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: theme.palette.textPrimary,
          pl: 2,
        }}
      >
        {segment.amountLabel} · {segment.percent}%
      </Typography>
    </Box>
  );
}

export function InvoiceStatsSegmentRow({ totalLabel, segments }) {
  const theme = useTheme();
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  const safeTotal = totalValue || 1;

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, md: '32px' },
        py: '24px',
        backgroundColor: theme.palette.surfaceWhite,
        borderTop: `1px solid ${theme.palette.borderSubtle1}`,
        borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
      }}
    >
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: theme.palette.textPrimary, mb: 2 }}>
        Invoice status{' '}
        <Box component="span" sx={{ fontWeight: 400, color: theme.palette.textSecondary3 }}>
          {totalLabel} total
        </Box>
      </Typography>

      <Stack direction="row" spacing={0.75} sx={{ width: '100%', height: 12, mb: 2.5 }}>
        {segments.map((segment) => {
          const widthPercent = totalValue === 0 ? 100 / segments.length : (segment.value / safeTotal) * 100;

          return (
            <Box
              key={segment.id}
              sx={{
                flex: `${widthPercent} 1 0`,
                minWidth: segment.value > 0 ? 12 : 0,
                height: '100%',
                borderRadius: '6px',
                backgroundColor: segment.barColor,
                opacity: segment.value > 0 ? 1 : 0.35,
              }}
              title={`${segment.label}: ${segment.amountLabel}`}
            />
          );
        })}
      </Stack>

      <Stack direction="row" spacing={0.75} sx={{ width: '100%' }}>
        {segments.map((segment) => {
          const widthPercent = totalValue === 0 ? 100 / segments.length : (segment.value / safeTotal) * 100;

          return (
            <Box
              key={segment.id}
              sx={{
                flex: `${widthPercent} 1 0`,
                minWidth: segment.value > 0 ? 48 : 0,
              }}
            >
              <SegmentLegendItem segment={segment} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

export function InvoiceStatsLayoutToggle({ layout, onChange }) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={0.75}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: theme.zIndex.speedDial,
        p: 0.5,
        borderRadius: '10px',
        backgroundColor: theme.palette.surfaceWhite,
        border: `1px solid ${theme.palette.borderSubtle1}`,
        boxShadow: '0px 8px 16px -4px rgba(16, 24, 40, 0.12)',
      }}
    >
      <Button
        variant={layout === 'grid' ? 'primary' : 'tertiaryGrey'}
        size="small"
        onClick={() => onChange('grid')}
        aria-pressed={layout === 'grid'}
        aria-label="Stats layout V1"
        sx={{ minWidth: 52, fontWeight: 600 }}
      >
        V1
      </Button>
      <Button
        variant={layout === 'board' ? 'primary' : 'tertiaryGrey'}
        size="small"
        onClick={() => onChange('board')}
        aria-pressed={layout === 'board'}
        aria-label="Stats layout V2 board"
        sx={{ minWidth: 52, fontWeight: 600 }}
      >
        V2
      </Button>
    </Stack>
  );
}
