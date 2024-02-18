import { styled } from '@mui/material/styles';
import NextLink from '@/com/ui/Link';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListItemIcon from '@mui/material/ListItemIcon';

export const Menu = styled(MuiMenu)`
  .MuiPaper-root {
    overflow: visible;
    border: ${({ theme }) => (theme.palette.mode === 'dark' ? '1px solid #444444' : '1px solid #bfbfbf')};
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0px;
      right: 18px;
      width: 10px;
      height: 10px;
      border-top: ${({ theme }) => (theme.palette.mode === 'dark' ? '1px solid #444444' : '1px solid #bfbfbf')};
      border-left: ${({ theme }) => (theme.palette.mode === 'dark' ? '1px solid #444444' : '1px solid #bfbfbf')};
      background-color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#2e2e2e' : 'rgb(255, 255, 255)')};
      transform: translateY(-50%) rotate(47deg);
      z-index: 0;
    }
  }
`;

export const SubMenu = styled(MuiMenu)`
  .MuiPaper-root {
    overflow: visible;
    border: ${({ theme }) => (theme.palette.mode === 'dark' ? '1px solid #444444' : '1px solid #bfbfbf')};
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      width: 10px;
      height: 10px;
      border-top: ${({ theme }) => (theme.palette.mode === 'dark' ? '1px solid #444444' : '1px solid #bfbfbf')};
      border-left: ${({ theme }) => (theme.palette.mode === 'dark' ? '1px solid #444444' : '1px solid #bfbfbf')};
      background-color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#2e2e2e' : 'rgb(255, 255, 255)')};
      transform: translateY(-50%) rotate(47deg);
      z-index: 0;
    }
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  min-height: 32px;
  padding: 12px 5px 12px 16px;
  color: ${({ theme, color }) => (color ? theme.palette[color].main : '#5c5c5c')};
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0;
    color: inherit;
  }
`;

export const Link = styled(NextLink)`
  :hover,
  :focus {
    text-decoration: none;
    color: inherit;
  }
`;

export const ListItemIcon = styled(MuiListItemIcon)`
  color: ${({ theme }) => theme.palette.mode === 'light' && 'inherit'};
`;

export const ListItemText = styled(MuiListItemText)`
  padding: 0 12px;
  .MuiTypography-root {
    color: ${({ theme }) => theme.palette.mode === 'light' && 'inherit'};
  }
`;
