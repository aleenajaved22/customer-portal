import { semantic } from '@signal/design-tokens/colors';

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
      '&.MuiChip-colorWarning': {
        background: semantic.surface.warningSubtle,
        color: semantic.status.onSubtle.warning,
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
