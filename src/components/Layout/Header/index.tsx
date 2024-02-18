import { useState, useMemo } from 'react';
import Navbar from '@/com/ui/Navbar';
import { AppBar, Toolbar, Logo, HeaderOffset } from './styled';
import HamburgerMenu from '@/com/ui/HamburgerMenu';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const MenuItems: IMenuItem[] = [
 
  { id: 'item4', label: 'Menu 4', icon: <InboxIcon />, url: '/' },
  {
    id: 'item5',
    label: 'Menu 5',
    icon: <MailIcon />,
    url: '/',
    subMenu: [
      { id: 'citem1', label: 'Menu 5 Collapse Item 1', icon: <MailIcon />, url: '/' },
      { id: 'citem2', label: 'Menu 5 Collapse Item 2', icon: <InboxIcon />, url: '/' },
      { id: 'citem3', label: 'Menu 5 Collapse Item 3', icon: <MailIcon />, url: '/' },
      { id: 'citem4', label: 'Menu 5 Collapse Item 4', icon: <InboxIcon />, url: '/' },
    ],
  },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = useMemo(() => drawerOpen, [drawerOpen]);

  return (
    <>
      <AppBar>
        <Toolbar component="div" sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Logo>Plantonics</Logo>
          <Navbar items={MenuItems} />
        </Toolbar>
        <HamburgerMenu items={MenuItems} open={open} setOpen={setDrawerOpen} sx={{ display: { xs: 'flex', sm: 'none' } }} />
      </AppBar>
      <HeaderOffset />
    </>
  );
}
