import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import MuiBox from '@mui/material/Box';
import MuiList from '@mui/material/List';
import NextLink from '@/com/ui/Link';
import MuiListItemIcon from '@mui/material/ListItemIcon';

export const IconButton = styled(MuiIconButton)`
  top: 10px;
  left: 10px;
  height: 38px;
  .MuiSvgIcon-root {
    background-color: ${({ theme }) => theme.palette.mode === 'light' && theme.palette.primary.main};
  }
`;

export const DrawerOffset = styled('div')`
  ${({ theme }) => ({
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  })};
`;

export const Drawer = styled(MuiDrawer)`
  .MuiPaper-root {
    background-color: #fff0 !important;
  }
`;

export const Box = styled(MuiBox)`
  height: inherit;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  width: ${({ theme }) => theme.drawerWidth}px;
  background-color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#282828' : '#15749d')};
`;

// overriding Mui ListItem class directly
export const List = styled(MuiList)`
  .MuiListItemButton-root {
    padding-top: 8px;
    padding-bottom: 8px;
    margin: 0;
  }
  .MuiListItem-root .Mui-selected {
    background-color: #15749d;
  }
  .MuiListItemText-root > span,
  .MuiListItemIcon-root {
    color: #fff;
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
  color: ${({ theme }) => theme.palette.primary.main};
  min-width: 0px;
  padding-right: 18px;
`;
