import { useContext, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { ThemeModeContext } from '@/utils/hooks/useDarkMode';
import { IconButton } from './styled';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggler = ({ color }: { color: Color }) => {
  const themeMode = useContext(ThemeModeContext);
  const theme = useTheme();

  const ColorThemeIcon = useCallback(() => {
    return theme.palette.mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />;
  }, []);

  return (
    <IconButton color={color} onClick={themeMode.toggleThemeMode}>
      <ColorThemeIcon />
    </IconButton>
  );
};

export default ThemeToggler;
