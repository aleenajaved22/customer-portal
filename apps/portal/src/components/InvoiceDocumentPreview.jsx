import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { FiltergoWordmark } from './FiltergoWordmark';
import { getPaidInvoiceDocument } from '../data/invoiceDocumentMock';

const HEADER_BG = '#2B2B2B';
const TABLE_HEADER_GREEN = '#4CAF50';

function MetaField({ label, value }) {
  return (
    <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ minWidth: 280 }}>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#555555', textAlign: 'right', minWidth: 88 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#333333', minWidth: 72 }}>{value}</Typography>
    </Stack>
  );
}

function TotalRow({ label, value, bold }) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#555555' }}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: bold ? 700 : 400, color: '#333333' }}>{value}</Typography>
    </Stack>
  );
}

export function InvoiceDocumentPreview({ invoice }) {
  if (!invoice) {
    return null;
  }

  const doc = getPaidInvoiceDocument(invoice);

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100%' }}>
      <Box sx={{ backgroundColor: HEADER_BG, px: 4, pt: 3, pb: 2.5, position: 'relative' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <FiltergoWordmark height={28} sx={{ mb: 1.5, filter: 'brightness(0) invert(1)' }} />
            <Typography sx={{ fontSize: 13, color: '#CCCCCC', lineHeight: 1.6 }}>
              3880 S 149th Street, Suite 106
              <br />
              Omaha, NE 68144
              <br />
              (402) 000-0000
              <br />
              hello@filter-go.com
              <br />
              <Box component="span" sx={{ color: '#AAAAAA' }}>
                www.filter-go.com
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ fontSize: { xs: 40, sm: 56 }, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: 1 }}>
            INVOICE
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ height: 4, backgroundColor: TABLE_HEADER_GREEN }} />

      <Box sx={{ px: 4, py: 3 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3} sx={{ mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#2B2B2B', mb: 1 }}>INVOICE TO</Typography>
            {doc.invoiceToLines.map((line) => (
              <Typography key={line} sx={{ fontSize: 14, color: '#555555', lineHeight: 1.6 }}>
                {line}
              </Typography>
            ))}
          </Box>
          <Stack spacing={0.75}>
            <MetaField label="INVOICE #" value={doc.invoiceNumber} />
            <MetaField label="DATE" value={doc.invoiceDate} />
            <MetaField label="DUE DATE" value={doc.dueDate} />
            <MetaField label="TERMS" value={doc.terms} />
          </Stack>
        </Stack>

        <Table sx={{ mb: 3, borderCollapse: 'separate', borderSpacing: 0 }}>
          <TableHead>
            <TableRow>
              {[
                { label: 'DESCRIPTION', align: 'left' },
                { label: 'QTY', align: 'center', width: 80 },
                { label: 'RATE', align: 'center', width: 100 },
                { label: 'AMOUNT', align: 'right', width: 100 },
              ].map((col) => (
                <TableCell
                  key={col.label}
                  align={col.align}
                  sx={{
                    backgroundColor: TABLE_HEADER_GREEN,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 14,
                    py: 1.25,
                    px: 2,
                    border: 0,
                    width: col.width,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {doc.lineItems.map((item, index) => (
              <TableRow key={`${item.title}-${index}`}>
                <TableCell sx={{ py: 2, px: 2, borderBottom: '1px solid #E6E6E7' }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#2B2B2B' }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: 13, color: '#777777', mt: 0.25 }}>{item.subtitle}</Typography>
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, color: '#555555', borderBottom: '1px solid #E6E6E7' }}>
                  {item.qty}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 14, color: '#555555', borderBottom: '1px solid #E6E6E7' }}>
                  {item.rate}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 14, color: '#333333', borderBottom: '1px solid #E6E6E7' }}>
                  {item.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between" alignItems="flex-start">
          <Box sx={{ flex: 1, maxWidth: 420 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#2B2B2B', mb: 1 }}>MESSAGE</Typography>
            <Box
              sx={{
                border: '1px solid #E6E6E7',
                borderRadius: '4px',
                px: 2,
                py: 1.5,
                minHeight: 100,
              }}
            >
              <Typography sx={{ fontSize: 13, color: '#888888', lineHeight: 1.5 }}>{doc.message}</Typography>
            </Box>
          </Box>

          <Box sx={{ width: { xs: '100%', md: 320 }, flexShrink: 0 }}>
            <TotalRow label="SUBTOTAL" value={doc.subtotal} />
            <Divider sx={{ borderColor: '#E6E6E7' }} />
            <TotalRow label="DISCOUNT" value={doc.discount} />
            <Divider sx={{ borderColor: '#E6E6E7' }} />
            <TotalRow label="TAX" value={doc.tax} />
            <Divider sx={{ borderColor: '#E6E6E7' }} />
            <TotalRow label="TOTAL" value={doc.total} bold />
            <Box
              sx={{
                mt: 2,
                px: 2,
                py: 1.5,
                border: `2px solid ${TABLE_HEADER_GREEN}`,
                borderRadius: '4px',
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#2B2B2B' }}>BALANCE DUE</Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 700, color: TABLE_HEADER_GREEN }}>{doc.balanceDue}</Typography>
            </Box>
          </Box>
        </Stack>
      </Box>

    </Box>
  );
}
