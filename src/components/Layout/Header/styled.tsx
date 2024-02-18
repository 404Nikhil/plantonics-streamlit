import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';

export const AppBar = styled(MuiAppBar)`
  display: flex;
  align-content: space-between;
  flex-direction: row;
  background-color: transparent;
  box-shadow: none;
  ${({ theme }) => ({ ...theme.mixins.toolbar })}
`;

export const Toolbar = styled(MuiToolbar)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.mode === 'dark' && theme.palette.common.black}; ;
` as typeof MuiToolbar;

export const Logo = styled('div')`
  font-size: 23px;
  width: 200px;
  white-space: pre;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const HeaderOffset = styled('div')`
  padding: 0 6px;
  ${({ theme }) => ({
    ...theme.mixins.toolbar,
  })};
`;
