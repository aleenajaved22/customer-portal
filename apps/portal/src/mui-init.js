import { createTheme } from '@mui/material/styles';

// Vite dev prebundle can evaluate Box before MUI styles init; warm up createTheme first.
createTheme();
