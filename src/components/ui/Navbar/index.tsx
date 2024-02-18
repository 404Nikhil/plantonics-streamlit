import { useState, useEffect, useCallback, createRef, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import useResizeObserver from '@/utils/hooks/useResizeObserver';
import withClientRender from '@/utils/hoc/withClientRender';
import ThemeToggler from '@/com/themes/ThemeToggler';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Toolbar, Stack, Link, List, ListItemButton, ListItemIcon, ListItemText } from './styled';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { IconButton } from './styled';

const AnchorMenu = dynamic(() => import('../AnchorMenu'), { ssr: false });

interface NavMenuItems extends IMenuItem {
  width?: number;
}

interface HiddenAnchorEl {
  anchorEl: HTMLElement;
}

function Navbar({ items }: { items: IMenuItem[] }) {
  // refs
  const navbarRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<React.RefObject<HTMLAnchorElement>[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  // showMore state
  const [showMore, showMoreSet] = useState<boolean>(false);
  // hidden menu items state
  const [hiddenItems, hiddenItemsSet] = useState<NavMenuItems[]>([]);
  // anchor elements ref states
  const [anchorEl, anchorElSet] = useState<AnchorEl | undefined>(undefined);
  const [hiddenAnchorEl, hiddenAnchorElSet] = useState<HiddenAnchorEl | undefined>(undefined);

  // observe navbar stack container width changes and box item.
  const [menuWidth] = useResizeObserver(navbarRef);

  // memorize showmore icon value
  const memShowMore = useMemo(() => showMore, [showMore]);

  useEffect(() => {
    // create refs for each menu item
    itemsRef.current = Array(items.length)
      .fill(undefined)
      .map((_, i) => createRef());
  }, []);

  useEffect(() => {
    if (menuWidth > 0 && itemsRef?.current!) {
      let overflowIndex = -1,
        offset;

      itemsRef.current.forEach((item, index) => {
        if (item.current!) {
          const width = item.current.getBoundingClientRect().width + item.current.offsetLeft;

          if (width > menuWidth) {
            // overflow nav items' visibility to hidden
            item.current.style.visibility = 'hidden';
          } else {
            if (index === itemsRef.current.length - 1) {
              listRef.current!.style.left = '0px';
              overflowIndex = -1;
            } else {
              // slide nav items to the right by offset value
              offset = menuWidth - width;
              listRef.current!.style.left = offset + 'px';

              // get index ofthe overflow nav items be stored into the achor menu
              overflowIndex = index;
            }

            item.current.style.visibility = 'visible';
          }
        }
      });

      if (overflowIndex === -1) {
        hiddenItemsSet([]);
        showMoreSet(false);
        navbarRef.current!.style.justifyContent = 'flex-end';
      } else {
        hiddenItemsSet(items.slice(overflowIndex + 1));
        showMoreSet(true);
        navbarRef.current!.style.justifyContent = 'flex-start';
      }
    }
  }, [itemsRef?.current, menuWidth]);

  const handleMenuOpenClick = useCallback((event: React.MouseEvent<HTMLDivElement>, item: IMenuItem) => {
    // disable link routing if item has subMenu
    if (item.subMenu) event.preventDefault();

    anchorElSet({ id: item.id, anchorEl: event?.currentTarget });
  }, []);

  const handleHiddenMoreClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    hiddenAnchorElSet({ anchorEl: event?.currentTarget });
  }, []);

  function handleMenuOpen(id: string) {
    if (anchorEl?.id === id) return anchorEl;
    else return undefined;
  }

  function handleHiddenMenuOpen() {
    if (hiddenAnchorEl?.anchorEl) return hiddenAnchorEl;
    else return undefined;
  }

  return (
    <Toolbar component="nav" aria-labelledby="navbar" disableGutters>
      <Stack ref={navbarRef} direction="row" spacing={0}>
        <List ref={listRef}>
          {items?.map((item, index) => (
            <Box key={item.id} ref={itemsRef.current[index]}>
              <Link href={item.url}>
                <ListItem disablePadding>
                  <ListItemButton
                    disableRipple
                    onClick={(e) => handleMenuOpenClick(e, item)}
                    aria-haspopup={Boolean(item.subMenu)}
                    aria-expanded={Boolean(handleMenuOpen(item.id)) ? 'true' : undefined}>
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText primary={item.label} />
                    {item.subMenu && (
                      <ListItemIcon>
                        <ArrowDropUpIcon
                          fontSize="large"
                          sx={{ transition: '0.3s ease-in-out', transform: Boolean(anchorEl?.id === item.id) ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </ListItemIcon>
                    )}
                  </ListItemButton>
                </ListItem>
              </Link>
              {item.subMenu && (
                <AnchorMenu
                  id={'navbar-submenu-' + item.id}
                  key={'navbar-submenu-' + item.id}
                  items={item.subMenu}
                  open={Boolean(handleMenuOpen(item.id))}
                  anchorEl={handleMenuOpen(item.id)?.anchorEl!}
                  anchorElSet={anchorElSet}
                />
              )}
            </Box>
          ))}
        </List>
      </Stack>
      {memShowMore && (
        <>
          <IconButton aria-label="Show more items" onClick={(e) => handleHiddenMoreClick(e)}>
            <MoreVertIcon color="primary" />
          </IconButton>
          <AnchorMenu
            id={'navbar-hidden-items'}
            key={'navbar-hidden-items'}
            items={hiddenItems}
            open={Boolean(handleHiddenMenuOpen())}
            anchorEl={handleHiddenMenuOpen()?.anchorEl!}
            anchorElSet={hiddenAnchorElSet}
            color="primary"
          />
        </>
      )}
      <ThemeToggler color="primary" />
    </Toolbar>
  );
}

export default withClientRender(Navbar);
