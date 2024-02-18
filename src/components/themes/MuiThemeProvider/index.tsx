import { useMemo } from 'react';
import { NextPageWithLayout } from '@/types/global';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeModeContext } from '@/utils/hooks/useDarkMode';
import { useDarkMode } from '@/utils/hooks/useDarkMode';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/styles/theme';

interface DarkThemeProvider {
  Component: NextPageWithLayout;
  children: React.ReactElement;
}
export default function MuiThemeProvider({ Component, children }: DarkThemeProvider) {
  // Get theme mode and toggle setter function from useDarkMode
  const { mode, themeMode } = useDarkMode();
  // Set MUI theme according to the theme mode
  const theme = useMemo(() => responsiveFontSizes(createTheme(getTheme(mode!))), [mode]);

  // Next.js Per-Page layout
  const getLayout = Component.getLayout ?? ((page: React.ReactNode) => page);

  // Prevent FOUC flash before page renders
  if (!mode) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme!}>
        <CssBaseline />
        {getLayout(children)}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
