import { PaletteMode } from '@mui/material';
import MuiTypography from './components/MuiTypography';
import MuiLink from './components/MuiLink';

export const getTheme = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#fff' : '#055f86',
      },
      secondary: {
        main: mode === 'dark' ? '#fff' : '#41c8e3',
      },
      light: {
        main: '#fff',
      },
      background: {
        default: mode === 'dark' ? '#000' : '#f8fcff',
      },
    },
    components: {
      MuiTypography: MuiTypography(mode),
      MuiLink: MuiLink(mode),
    },
    drawerWidth: 250,
  };
};
