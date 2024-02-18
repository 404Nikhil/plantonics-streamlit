import { useState, useCallback } from 'react';
import { Menu, SubMenu, MenuItem, Link, ListItemText, ListItemIcon } from './styled';
import { MenuProps } from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { DistributiveOmit } from '@mui/types';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

type AchorMenu = DistributiveOmit<MenuProps, 'onClick' | 'onClose'> & {
  items: IMenuItem[];
  anchorEl: HTMLElement;
  anchorElSet: React.Dispatch<React.SetStateAction<any>>;
  color?: Color;
  onClick?: (...arg: any[]) => void;
};

const AnchorMenu = function (props: AchorMenu) {
  const { id, open, items, anchorEl, anchorElSet, color, onClick, ...rest } = props;

  const [subAnchorEl, subAnchorElSet] = useState<AnchorEl | null>(null);

  const handleOnClick = useCallback((event: React.MouseEvent<HTMLLIElement>, item: IMenuItem) => {
    if (item.subMenu) {
      // disable link routing if item has subMenu and open subMenu
      event.preventDefault();
      subAnchorElSet({ id: item.id, anchorEl: event?.currentTarget });
    } else {
      closeMenu();
    }
  }, []);

  const handleSubMenuOnClick = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
    // prevent sequential event from propagating
    event.stopPropagation();
    closeMenu();
  }, []);

  const closeSubMenu = useCallback((event: any) => {
    // prevent sequential event from propagating
    event.stopPropagation();
    subAnchorElSet(null);
  }, []);

  function handleMenuOpen(id: string) {
    if (subAnchorEl?.id === id) return subAnchorEl;
    else return undefined;
  }

  function closeMenu() {
    subAnchorElSet(null);
    anchorElSet(null);
  }

  return (
    <Menu
      id={id}
      anchorEl={anchorEl!}
      open={open}
      onClose={closeMenu}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={Fade}
      MenuListProps={{
        'aria-labelledby': id,
      }}
      {...rest}>
      {items?.map((item) => (
        <MenuItem key={item.id} color={color} onClick={(e) => handleOnClick(e, item)}>
          <Link href={item.url}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
            {item.subMenu && (
              <ListItemIcon>
                <ArrowRightIcon
                  fontSize="large"
                  sx={{ transition: '0.3s ease-in-out', transform: Boolean(subAnchorEl?.id === item.id) ? 'rotate(90deg)' : 'rotate(0deg)' }}
                />
              </ListItemIcon>
            )}
          </Link>
          {item.subMenu && (
            <SubMenu
              id="popup-submenu"
              aria-labelledby="popup-submenu"
              anchorEl={handleMenuOpen(item.id)?.anchorEl!}
              open={Boolean(handleMenuOpen(item.id))}
              onClose={closeSubMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              MenuListProps={{
                'aria-labelledby': 'popup-submenu',
              }}>
              {item.subMenu?.map((subItem) => (
                <MenuItem key={subItem.id} onClick={(e) => handleSubMenuOnClick(e)}>
                  <Link href={subItem.url}>
                    {subItem.icon && <ListItemIcon>{subItem.icon}</ListItemIcon>}
                    <ListItemText primary={subItem.label} />
                    {subItem.subMenu && (
                      <ListItemIcon>
                        <ArrowRightIcon fontSize="large" />
                      </ListItemIcon>
                    )}
                  </Link>
                </MenuItem>
              ))}
            </SubMenu>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AnchorMenu;
