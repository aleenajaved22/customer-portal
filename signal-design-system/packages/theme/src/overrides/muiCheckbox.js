import { overrideColor as borderOverride } from '@signal/design-tokens/borders';
import { semantic } from '@signal/design-tokens/colors';

const MuiCheckbox = ({ _palette }) => ({
  styleOverrides: {
    root: {
      color: semantic.text.placeholder,
      borderRadius: '4px !Important',
      '&.Mui-checked': {
        color: semantic.primary.default, // Customize the color when the Checkbox is checked
        '&:hover': {
          // backgroundColor: 'lightgreen', // Customize the background color on hover when checked
        },
      },

      '&.Mui-disabled': {
        color: borderOverride.inputDefault, // Customize the color when the Checkbox is checked
        '&:hover': {
          // backgroundColor: 'blue', // Customize the background color on hover when checked
        },
      },
    },
  },
});

export default MuiCheckbox;
