import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getInvoicePdfUrl } from '../data/invoiceDocumentMock';

function resolvePdfUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return new URL(path, window.location.origin).href;
}

export function InvoiceDocumentPreview({ invoice }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  const pdfUrl = invoice ? getInvoicePdfUrl(invoice) : null;
  const resolvedPdfUrl = resolvePdfUrl(pdfUrl);
  const iframeSrc = resolvedPdfUrl ? `${resolvedPdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH` : null;

  useEffect(() => {
    setLoading(true);
    const safety = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(safety);
  }, [resolvedPdfUrl]);

  if (!invoice || !iframeSrc) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 140px)',
        backgroundColor: theme.palette.surfaceWhite,
        position: 'relative',
      }}
    >
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            backgroundColor: theme.palette.surfaceWhite,
          }}
        >
          <CircularProgress size={24} />
          <Typography sx={{ fontSize: 14, color: theme.palette.textSecondary2 }}>Loading invoice…</Typography>
        </Box>
      ) : null}

      <Box
        component="iframe"
        title={`Invoice ${invoice.invoiceNumber}`}
        src={iframeSrc}
        onLoad={() => setLoading(false)}
        sx={{
          width: '100%',
          height: 'calc(100vh - 140px)',
          minHeight: 480,
          border: 0,
          display: 'block',
        }}
      />
    </Box>
  );
}
