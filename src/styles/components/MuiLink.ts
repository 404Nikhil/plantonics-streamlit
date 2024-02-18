import { PaletteMode } from '@mui/material';

export default function MuiLink(mode: PaletteMode) {
  return {
    // Create Variant types
    variants: [],
    // Set default props
    defaultProps: {},
    // Override global styles
    styleOverrides: {
      root: {
        color: mode === 'dark' ? '#fff' : '#055f86',
        textDecoration: 'none',
        '&:hover,&:focus': {
          color: mode === 'dark' ? '#fff' : '#41c8e3',
          textDecoration: 'underline',
        },
      },
    },
  };
}
