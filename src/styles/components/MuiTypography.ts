import { PaletteMode } from '@mui/material';

export default function MuiTypography(mode: PaletteMode) {
  return {
    // Create Variant types
    variants: [],
    // Set default props
    defaultProps: {},
    // Override global styles
    styleOverrides: {
      root: {
        color: mode === 'dark' ? '#fff' : '#3c3c3c',
      },
    },
  };
}
