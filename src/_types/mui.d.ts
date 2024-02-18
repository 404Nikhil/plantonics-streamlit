import { Theme, ThemeOptions } from '@mui/material/styles';
import { CSSProperties } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    drawerWidth: number;
  }
  interface ThemeOptions {
    drawerWidth: number;
  }
  interface Palette {
    light: Palette['primary'];
  }
  interface PaletteOptions {
    light: PaletteOptions['primary'];
  }
}
