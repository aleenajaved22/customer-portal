import { primitive, semantic } from '@signal/design-tokens/colors';

const MuiChip = ({ _palette }) => ({
  styleOverrides: {
    root: {
      padding: '4px 8px',
      gap: '4px',
      height: 'unset',
      textTransform: 'capitalize',
      '& .MuiSvgIcon-root': {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '18px',
        margin: '0',
      },
      '&.MuiChip-outlinedError': {
        backgroundColor: semantic.surface.alertSubtle,
        color: semantic.text.alert,
        borderColor: semantic.surface.alertSubtle,
      },
      '& .MuiChip-label': {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '18px',
        padding: '0px',
        margin: '0',
      },
      '&.MuiChip-colorSuccess': {
        background: semantic.surface.successSubtle,
        color: semantic.status.onSubtle.success,
      },
      // Accessibility: warningSubtle + onSubtle.warning was 3.07:1 (below WCAG AA 4.5:1).
      // Lighter yellow ground + darker orange text = 4.70:1.
      '&.MuiChip-colorWarning': {
        background: primitive.orange[50],
        color: primitive.orange[700],
      },
      '&.MuiChip-colorError': {
        backgroundColor: semantic.surface.alertSubtle,
        color: semantic.text.alert,
      },
      '&.MuiChip-colorPrimary': {
        backgroundColor: semantic.surface.brandSubtle,
        color: semantic.primary.default,
      },
      '&.MuiChip-filledError': {
        backgroundColor: semantic.surface.alertSubtle,
        color: semantic.text.alert,
      },
      '&.MuiChip-colorInfo': {
        backgroundColor: semantic.surface.greySubtle,
        color: semantic.text.secondary2,
      },
      '& .MuiChip-icon': { marginRight: '0', marginLeft: '0' },
    },
  },
});

export default MuiChip;
