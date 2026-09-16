import Box from '@mui/material/Box';
import filtergoWordmark from '../assets/login/filtergo-wordmark.svg';

/** Green Filtergo wordmark (same asset as login). */
export function FiltergoWordmark({ height = 37, sx, ...props }) {
  return (
    <Box
      component="img"
      src={filtergoWordmark}
      alt="Filtergo"
      {...props}
      sx={{
        height,
        width: 'fit-content',
        maxWidth: 'unset',
        display: 'block',
        objectFit: 'contain',
        flexShrink: 0,
        alignSelf: 'flex-start',
        ...sx,
      }}
    />
  );
}
