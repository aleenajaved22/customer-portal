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

/**
 * Legend emphasis tiers: Overdue leads (it has a deadline), Pending sits at the
 * default weight, Paid recedes — it is settled and needs no action.
 */
const EMPHASIS_BY_STATUS = {
  Overdue: 'primary',
  Pending: 'default',
  Paid: 'secondary',
};

function SegmentLegendItem({ segment, isActive, onSelect }) {
  const theme = useTheme();
  const emphasis = EMPHASIS_BY_STATUS[segment.label] ?? 'default';
  const labelSx = {
    primary: { color: theme.palette.textAlert, fontWeight: 500 },
    default: { color: theme.palette.textSecondary3, fontWeight: 400 },
    secondary: { color: theme.palette.textSecondary3, fontWeight: 400 },
  }[emphasis];
  const amountSx = {
    primary: { color: theme.palette.textAlert, fontWeight: 700 },
    default: { color: theme.palette.textPrimary, fontWeight: 600 },
    secondary: { color: theme.palette.textSecondary2, fontWeight: 500 },
  }[emphasis];
  const interactive = Boolean(onSelect);
  const countLabel = `${segment.count} ${segment.count === 1 ? 'invoice' : 'invoices'}`;

  return (
    <Stack
      component={interactive ? 'button' : 'div'}
      type={interactive ? 'button' : undefined}
      onClick={interactive ? () => onSelect(segment.label) : undefined}
      aria-pressed={interactive ? isActive : undefined}
      aria-label={interactive ? `Filter by ${segment.label}: ${segment.amountLabel}, ${countLabel}` : undefined}
      direction="row"
      spacing={0.75}
      sx={{
        minWidth: 0,
        flexShrink: 0,
        textAlign: 'left',
        font: 'inherit',
        p: '4px 6px',
        ml: '-6px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: isActive ? theme.palette.surfaceGreySubtle : 'transparent',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease',
        '&:hover': interactive ? { backgroundColor: theme.palette.surfaceGreySubtle } : undefined,
      }}
    >
      <Box
        sx={{
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: segment.dotColor,
          }}
        />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: '18px',
            ...labelSx,
          }}
        >
          {segment.label}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: '20px',
            fontVariantNumeric: 'tabular-nums',
            mt: '2px',
            ...amountSx,
          }}
        >
          {segment.amountLabel}
          <Box
            component="span"
            sx={{ fontWeight: 400, color: theme.palette.textSecondary3 }}
          >
            {' · '}
            {countLabel}
          </Box>
        </Typography>
      </Box>
    </Stack>
  );
}

export function InvoiceStatsSegmentRow({
  totalLabel,
  outstandingLabel,
  segments,
  activeStatus = '',
  onSelectStatus,
}) {
  const theme = useTheme();
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  const safeTotal = totalValue || 1;
  /** Clicking the active segment clears the filter rather than re-applying it. */
  const handleSelect = onSelectStatus
    ? (label) => onSelectStatus(activeStatus === label ? '' : label)
    : undefined;

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, md: '32px' },
        py: '16px',
        backgroundColor: theme.palette.surfaceWhite,
        borderTop: `1px solid ${theme.palette.borderSubtle1}`,
        borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
      }}
    >
      <Box sx={{ mb: 1.25 }}>
        <Typography
          sx={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: theme.palette.textSecondary3 }}
        >
          Outstanding balance
        </Typography>
        <Typography
          sx={{
            mt: '2px',
            fontSize: 22,
            fontWeight: 700,
            lineHeight: '28px',
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
            color: theme.palette.textPrimary,
          }}
        >
          {outstandingLabel}
          <Box
            component="span"
            sx={{
              ml: '6px',
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: 'normal',
              color: theme.palette.textSecondary3,
            }}
          >
            / {totalLabel}
          </Box>
        </Typography>
      </Box>

      <Stack
        direction="row"
        sx={{ width: '100%', height: 5, mb: 1.25, borderRadius: '999px', overflow: 'hidden' }}
      >
        {segments.map((segment) => {
          const widthPercent = totalValue === 0 ? 100 / segments.length : (segment.value / safeTotal) * 100;

          return (
            <Box
              key={segment.id}
              sx={{
                flex: `${widthPercent} 1 0`,
                minWidth: segment.value > 0 ? 5 : 0,
                height: '100%',
                backgroundColor: segment.barColor,
                opacity:
                  segment.value === 0 ? 0.35 : activeStatus && activeStatus !== segment.label ? 0.3 : 1,
                transition: 'opacity 0.15s ease',
              }}
              title={`${segment.label}: ${segment.amountLabel}`}
            />
          );
        })}
      </Stack>

      {/* Evenly spaced legend. Positioning items proportionally under their bar
          segment left erratic gaps — a 28% segment pushed its label to the far
          right — and the bar already carries the proportion. */}
      <Stack direction="row" spacing={4} sx={{ width: '100%', flexWrap: 'wrap' }}>
        {segments.map((segment) => (
          <SegmentLegendItem
            key={segment.id}
            segment={segment}
            isActive={activeStatus === segment.label}
            onSelect={handleSelect}
          />
        ))}
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
