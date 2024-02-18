import { useState, useEffect, useMemo, createContext } from 'react';
import { PaletteMode } from '@mui/material';

export const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

export function useDarkMode() {
  const [mode, modeSet] = useState<'light' | 'dark' | undefined>(undefined);

  // MUI theme mode setter function
  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        modeSet((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // Set client theme state recieved from _document document.documentElement.setAttribute: theme-mode
  useEffect(() => {
    const dataTheme = document.documentElement.getAttribute('theme-mode');
    if (dataTheme) {
      modeSet(dataTheme as PaletteMode);
    }
  }, []);

  // Store selected theme to local storage when mode changes
  useEffect(() => {
    if (mode) {
      window.localStorage.setItem('theme-mode', mode);
    }
  }, [mode]);

  return { mode, themeMode };
}

export function getInitialThemeMode() {
  function getSavedThemeMode() {
    // get theme mode from local storage
    const localMode = window.localStorage.getItem('theme-mode');
    if (typeof localMode === 'string') return localMode;

    // get theme mode from user's system color preference
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mql.matches === 'boolean') return mql.matches ? 'dark' : 'light';

    return 'light';
  }

  const themeMode = getSavedThemeMode();

  // set <html> "theme-mode" attribute
  if (themeMode === 'dark') document.documentElement.setAttribute('theme-mode', 'dark');
  else document.documentElement.setAttribute('theme-mode', 'light');
}

// script string function
export const InitialThemeMode = `(function() {
    ${getInitialThemeMode.toString()}
    getInitialThemeMode();
})()
`;
