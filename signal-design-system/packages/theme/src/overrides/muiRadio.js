import { semantic } from '@signal/design-tokens/colors';

const MuiRadio = ({ _palette }) => ({
  styleOverrides: {
    root: {
      color: semantic.text.placeholder,
      '& .MuiSvgIcon-root': {
        width: '24px',
        height: '24px',
      },
      '& + .MuiTypography-root, & + .MuiFormControlLabel-label': {
        fontSize: '14px',
        fontWeight: '400',
        color: semantic.text.primary,
      },
      '&.Mui-checked': {
        color: semantic.primary.default, // Customize the color when the Checkbox is checked
        '&:hover': {
          // backgroundColor: 'lightgreen', // Customize the background color on hover when checked
        },
      },

      '&.Mui-disabled': {
        color: semantic.text.disabled, // Customize the color when the Checkbox is checked
        '&:hover': {
          // backgroundColor: 'blue', // Customize the background color on hover when checked
        },
      },
    },
  },
});

export default MuiRadio;
