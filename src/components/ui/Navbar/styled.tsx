import { styled } from '@mui/material/styles';
import MuiStack from '@mui/material/Stack';
import MuitToolbar from '@mui/material/Toolbar';
import NextLink from '@/com/ui/Link';
import MuiList from '@mui/material/List';
import MuiIconButton from '@mui/material/IconButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListItemButton from '@mui/material/ListItemButton';

export const Toolbar = styled(MuitToolbar)`
  width: 100%;
  max-width: 70vw;
  justify-content: flex-end;
` as typeof MuitToolbar;

export const Stack = styled(MuiStack)`
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

export const Link = styled(NextLink)`
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.palette.secondary.main};
    text-decoration: none;
  }
`;

// overriding Mui ListItem class directly
export const List = styled(MuiList)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  transition: 0.5s ease-in-out;
  left: 0px;
  padding: 0;
`;

export const ListItemButton = styled(MuiListItemButton)`
  :hover {
    background-color: transparent;
  }
`;

export const IconButton = styled(MuiIconButton)`
  height: 38px;
`;

export const ListItemIcon = styled(MuiListItemIcon)`
  color: ${({ theme }) => theme.palette.primary.main};
  min-width: 0px;
  padding-right: 18px;
`;

export const ListItemText = styled(MuiListItemText)`
  padding-right: 10px;
  white-space: nowrap;
  span {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
