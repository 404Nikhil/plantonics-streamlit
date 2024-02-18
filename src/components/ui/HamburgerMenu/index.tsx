import React, { useState, useCallback } from 'react';
import ThemeToggler from '@/com/themes/ThemeToggler';
import { Drawer, DrawerOffset, Box, IconButton, List, Link, ListItemIcon } from './styled';
import { IconButtonProps } from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export interface Hamburger extends IconButtonProps {
  items: IMenuItem[];
  open: boolean;
  setOpen: (update: React.SetStateAction<boolean>) => void;
}

const HamburgerMenu = function (props: Hamburger) {
  const { items, open, setOpen, color, onClick, ...rest } = props;

  function handleToggleDrawer(event: React.KeyboardEvent | React.MouseEvent) {
    // prevent toggle if keyboard down, shift or tab
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setOpen((prev) => !prev);
  }
  return (
    <>
      <IconButton color="inherit" onClick={handleToggleDrawer} {...rest}>
        <MenuIcon />
      </IconButton>
      <HamburgerDrawer items={items} open={open} setOpen={setOpen} />
    </>
  );
};

export default HamburgerMenu;

export const HamburgerDrawer = (props: Hamburger) => {
  const { items, open, setOpen } = props;

  const [subMenu, subMenuSet] = useState<string | null>(null);

  const handleMenuOpenClick = useCallback((event: React.MouseEvent<HTMLDivElement>, item: IMenuItem) => {
    if (item.subMenu) {
      subMenuSet(item.id);
    } else {
      handleMenuClose();
    }
  }, []);

  const handleSubMenuClick = useCallback(() => {
    handleMenuClose();
    handleSubMenuClose();
  }, []);

  function handleMenuClose() {
    setOpen(false);
  }

  function handleSubMenuClose() {
    subMenuSet(null);
  }

  return (
    <Drawer anchor="left" open={open} onClose={handleMenuClose}>
      <DrawerOffset />
      <Box role="navigation" aria-label="Main Navigation Menu">
        <ThemeToggler color={'light' as Color} />
        <List>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <Link href={item.url}>
                <ListItem disablePadding>
                  <ListItemButton onClick={(e) => handleMenuOpenClick(e, item)}>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.label} />
                    {item.subMenu && (
                      <ListItemIcon>
                        <ArrowRightIcon fontSize="large" />
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                </ListItem>
              </Link>
              {item.subMenu && (
                <Drawer anchor="left" open={subMenu === item.id} onClose={handleSubMenuClose}>
                  <DrawerOffset />
                  <Box role="navigation" aria-label="Secondary Navigation Menu">
                    <List>
                      {item.subMenu.map((subItem) => (
                        <Link key={subItem.id} href={subItem.url}>
                          <ListItem disablePadding>
                            <ListItemButton onClick={handleSubMenuClick}>
                              {subItem.icon && <ListItemIcon>{subItem.icon}</ListItemIcon>}
                              <ListItemText primary={subItem.label} />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
