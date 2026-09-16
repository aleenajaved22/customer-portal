import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Drawer } from './design-system';
import { InvoiceDetailPreview } from './InvoiceDetailPreview';
import { InvoiceDocumentPreview } from './InvoiceDocumentPreview';

export function InvoicePreviewDrawer({ open, invoice, onClose }) {
  const theme = useTheme();
  const isPaid = invoice?.status === 'Paid';
  const drawerWidth = isPaid ? 'min(869px, 96vw)' : 'min(1157px, 96vw)';

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: drawerWidth },
          maxWidth: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: theme.shadows?.[16] ?? '0 8px 32px rgba(0,0,0,0.2)',
        },
      }}
      SlideProps={{
        direction: 'left',
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close invoice preview"
        size="small"
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 2,
          color: isPaid ? '#fff' : theme.palette.textSecondary2,
        }}
      >
        <CloseIcon sx={{ fontSize: 24 }} />
      </IconButton>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: theme.palette.surfaceWhite,
        }}
      >
        {isPaid ? <InvoiceDocumentPreview invoice={invoice} /> : <InvoiceDetailPreview invoice={invoice} />}
      </Box>

      {isPaid ? (
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.borderSubtle1}`,
            px: 4,
            py: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: theme.palette.surfaceWhite,
            flexShrink: 0,
          }}
        >
          <Button variant="secondaryBlue" sx={{ minWidth: 'auto' }}>
            Download Invoice
          </Button>
        </Box>
      ) : null}
    </Drawer>
  );
}
