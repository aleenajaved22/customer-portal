import MuiButton from './muiButton';
import MuiCheckbox from './muiCheckbox';
import MuiChip from './muiChip';
import MuiInputLabel from './muiInputLabel';
import MuiMenuItem from './muiMenuItem';
import MuiRadio from './muiRadio';
import MuiSelect from './muiSelect';
import MuiSwitch from './muiSwitch';
import MuiTextField from './muiTextField';
import MuiTooltip from './muiTooltip';

/** Signal Sales light-theme component overrides (portable). */
const overrides = ({ palette }) => ({
  MuiButton: MuiButton({ palette }),
  MuiTextField: MuiTextField({ palette }),
  MuiSwitch: MuiSwitch({ palette }),
  MuiRadio: MuiRadio({ palette }),
  MuiCheckbox: MuiCheckbox({ palette }),
  MuiInputLabel: MuiInputLabel({ palette }),
  MuiChip: MuiChip({ palette }),
  MuiSelect: MuiSelect({ palette }),
  MuiMenuItem: MuiMenuItem({ palette }),
  MuiTooltip: MuiTooltip({ palette }),
});

export default overrides;
