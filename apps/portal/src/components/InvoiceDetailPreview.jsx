import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { FiltergoWordmark } from './FiltergoWordmark';
import infoAdjustmentsIcon from '../assets/icons/icon-info-adjustments.svg';
import { getInvoiceDetailExtras } from '../data/invoiceDetailMock';
import { formatInvoiceDueDate } from '../data/mockInvoices';
import { ContractChip } from './design-system/ContractChip';

function DetailRow({ label, value }) {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={3} sx={{ width: '100%', alignItems: 'center' }}>
      <Typography sx={{ width: 225, flexShrink: 0, fontSize: 14, fontWeight: 500, lineHeight: '20px', color: theme.palette.textPrimary }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 400, lineHeight: '24px', color: theme.palette.textSecondary2, letterSpacing: '0.25px' }}>
        {value}
      </Typography>
    </Stack>
  );
}

function SectionTitle({ children }) {
  const theme = useTheme();

  return (
    <Typography sx={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', color: theme.palette.textPrimary }}>
      {children}
    </Typography>
  );
}

const headerCellSx = {
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  color: '#5B5B5F',
  py: 1.5,
  px: 3,
  backgroundColor: '#F5F5F6',
  borderBottom: '1px solid #E6E6E7',
  borderTop: '1px solid #E6E6E7',
};

function formatCellNumber(value) {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  return value;
}

function InvoiceLineItemsTable({ rows, descriptionHeader, theme }) {
  return (
    <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
      <TableHead>
        <TableRow>
          <TableCell sx={{ ...headerCellSx, width: '28%' }}>Line Item</TableCell>
          <TableCell sx={{ ...headerCellSx, width: '32%' }}>{descriptionHeader}</TableCell>
          <TableCell sx={{ ...headerCellSx, width: '12%', textAlign: 'center' }}>Quantity</TableCell>
          <TableCell sx={{ ...headerCellSx, width: '14%', textAlign: 'center' }}>Unit Price($)</TableCell>
          <TableCell sx={{ ...headerCellSx, width: '14%', textAlign: 'center' }}>Total($)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => {
          const description = row.productDescription ?? row.description ?? '—';

          return (
            <TableRow key={`${row.lineItem}-${index}`}>
              <TableCell sx={{ py: 2, px: 1.5, borderBottom: `1px solid ${theme.palette.borderSubtle1}` }}>
                <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: theme.palette.textPrimary }}>
                  {row.lineItem}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, borderBottom: `1px solid ${theme.palette.borderSubtle1}`, fontSize: 14, color: theme.palette.textPrimary }}>
                {description}
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, borderBottom: `1px solid ${theme.palette.borderSubtle1}`, textAlign: 'center', fontSize: 14 }}>
                {row.quantity}
              </TableCell>
              <TableCell sx={{ py: 2, px: 3, borderBottom: `1px solid ${theme.palette.borderSubtle1}`, textAlign: 'center', fontSize: 14 }}>
                {formatCellNumber(row.unitPrice)}
              </TableCell>
              <TableCell
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#86868B',
                }}
              >
                {formatCellNumber(row.total)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function InvoiceDetailPreview({ invoice }) {
  const theme = useTheme();

  if (!invoice) {
    return null;
  }

  const detail = getInvoiceDetailExtras(invoice);

  return (
    <Box sx={{ px: '36px', py: '36px', backgroundColor: theme.palette.surfaceWhite }}>
      <Stack spacing={3} alignItems="flex-start" sx={{ width: '100%' }}>
        <FiltergoWordmark height={44} />

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3} sx={{ width: '100%' }}>
          <Box sx={{ maxWidth: 293 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: theme.palette.textPrimary, lineHeight: 'normal', mb: 0.625 }}>
              Bill From
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: theme.palette.textPrimary, lineHeight: 'normal', mb: 0.625 }}>
              Filtergo
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: '24px', color: theme.palette.textSecondary2 }}>
              PO Box 8246
              <br />
              Omaha, NE 68108
              <br />
              Email: remittance@filtergo.com
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 293 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: theme.palette.textPrimary, lineHeight: 'normal', mb: 0.625 }}>
              Bill To
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: theme.palette.textPrimary, lineHeight: 'normal', mb: 0.625 }}>
              {invoice.site}
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: '24px', color: theme.palette.textSecondary2 }}>
              {detail.billToAddress}
              <br />
              Contact Person: {detail.contactPerson}
              <br />
              Phone: {detail.contactPhone}
              <br />
              Email: {detail.contactEmail}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: theme.palette.textPrimary, lineHeight: 'normal', mb: 0.625 }}>
              Invoice Number
            </Typography>
            <Typography sx={{ fontSize: 14, lineHeight: '24px', color: theme.palette.textSecondary2 }}>
              {invoice.invoiceNumber}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: theme.palette.borderSubtle1, width: '100%' }} />

        <Stack spacing={1} sx={{ width: '100%' }}>
          <SectionTitle>Contract Details</SectionTitle>
          <DetailRow label="Site Name" value={invoice.site} />
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography sx={{ width: 225, flexShrink: 0, fontSize: 14, fontWeight: 500, color: theme.palette.textPrimary }}>
              Contract
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {detail.contracts.map((contract) => (
                <ContractChip key={contract} label={contract} />
              ))}
            </Stack>
          </Stack>
          <Divider sx={{ borderColor: theme.palette.borderSubtle1, mt: 1 }} />
        </Stack>

        <Stack spacing={1} sx={{ width: '100%' }}>
          <SectionTitle>Billing Details</SectionTitle>
          <DetailRow label="Invoice Generated" value={detail.invoiceGenerated} />
          <DetailRow label="Due Date" value={formatInvoiceDueDate(invoice.dueDate)} />
          <DetailRow label="Invoice Duration" value={detail.invoiceDuration} />
          <DetailRow label="PO Number" value={detail.poNumber} />
          <DetailRow label="Payment Terms" value={detail.paymentTerms} />
        </Stack>

        <Stack spacing={4} sx={{ width: '100%' }}>
          <InvoiceLineItemsTable rows={detail.lineItems} descriptionHeader="Product Description" theme={theme} />

          <Stack spacing={1}>
            <Stack direction="row" spacing={0.25} alignItems="flex-start">
              <Box component="img" src={infoAdjustmentsIcon} alt="" sx={{ width: 20, height: 20, mt: 0.25, flexShrink: 0 }} />
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: theme.palette.textSecondary2 }}>
                  Adjustments
                </Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#86868B', mt: 0.25 }}>
                  {detail.adjustmentsHelperText}
                </Typography>
              </Box>
            </Stack>
            <InvoiceLineItemsTable rows={detail.adjustmentLineItems} descriptionHeader="Description" theme={theme} />
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3} alignItems={{ md: 'flex-start' }} sx={{ width: '100%' }}>
          <Box sx={{ flex: 1, maxWidth: 703 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', mb: 1, color: theme.palette.textPrimary }}>
              Invoice Memos
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500, lineHeight: '18px', color: '#86868B' }}>{detail.invoiceMemo}</Typography>
          </Box>
          <Stack spacing={0.75} sx={{ width: { xs: '100%', md: 334 }, flexShrink: 0 }}>
            {[
              { label: 'Line Items', value: detail.lineItemsSubtotal },
              { label: 'Adjustments', value: detail.adjustments },
              { label: 'Taxes', value: detail.taxes },
              { label: 'Grand Total', value: detail.grandTotal },
            ].map((row) => (
              <Box key={row.label}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.textSecondary2 }}>{row.label}</Typography>
                  <Typography sx={{ fontSize: 16, fontWeight: 500, color: theme.palette.textPrimary }}>{row.value}</Typography>
                </Stack>
                {row.label !== 'Grand Total' ? <Divider sx={{ borderColor: theme.palette.borderSubtle1, mt: 0.75 }} /> : null}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
