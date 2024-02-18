# Responsive Multi-level Menu Navbar Example

## The idea behind the example

The lack of space for menu items is a major challenge for websites with a large number of categories and menu items. In this example, we'll extend on our previous project [Next.js + MUI 5 Light/Dark Mode Theme + TypeScript example](https://github.com/tamvo22/mui-v5-theme) by adding a responsive multi-level menu Navbar and corresponding Hamburger menu to it.

## Feedback

Please leave a message on my portfolio website. Your comments are always appreciated and aid my quest for knowledge.
[https://tamvo.vercel.app/](https://tamvo.vercel.app/)

## CodeSandbox

[![CodeSandbox Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/tamvo22/responsive-navbar)

## Objective

This project's objective is to achieve a Navbar menu that could shrink and grow in response to the element's width. The overflow Navbar menu items will be shown under the ShowMore AnchorMenu. In additional, the Navbar menu, the ShowMore AnchorMenu and the Hamburger menu will support submenu items. In order to achieve this goal, we would need to do the following:

- Implement the useResizeObserver hook to observe the element's width changes. 

- Enhance our Navabar component to determine if our menu items are overflowing compared to the useResizeObserver's menuWidth value. If it is overflowed, we will add it to the ShowMore menu. To accomplish this, we would need to create a ref of an array of menu items for us to determine each menu item's width and compare it to our navbar width value returned from our useResizeObserver function.

- Add dropdown submenu item functionality. The ShowMore menu will also show a secondary popup menu for corresponding submenu items.

- Implement our ShowMore AnchorMenu to display overflow menu items. Our AnchorMenu opens an additional menu for submenu items.

- Create the Hamburger menu based on the MUI 5 Drawer menu component as well as submenu item functionality as well.


## Key points

- We will be using a few types throughout our example. Therefore, it's nice to declare them global so we can use them freely across our project.

```jsx
// src/_types/global.d.ts
declare global {
  interface IMenuItem {
    id: string;
    label: string;
    icon?: ReactNode;
    url: string;
    subMenu?: IMenuItem[];
  }

  type Color = IconButtonProps['color']; // "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined

  interface AnchorEl {
    id: string;
    anchorEl: HTMLElement;
  }
}
```

- Although I could simply use MUI 5 sx prop to style/override all my components' styles, I prefer to utilize MUI 5 Emotion styled-component because I prefer to separate the styles from the JSX component, making it easier to interpret. Although, I would use sx prop for variable conditional styling since it's more convenient. In addition, I prefer to edit component styles in Chrome DevTools and copy and paste CSS styles into my designed components directly.

```jsx
// src/components/ui/Navbar/styled.tsx
export const ListItemIcon = styled(MuiListItemIcon)`
  color: ${({ theme }) => theme.palette.primary.main};
  min-width: 0px;
  padding-right: 18px;
`;

// src/components/ui/Navbar/index.tsx
<ListItemIcon>
  <ArrowDropUpIcon
    fontSize="large"
    sx={{ transition: '0.3s ease-in-out', transform: Boolean(anchorEl?.id === item.id) ? 'rotate(180deg)' : 'rotate(0deg)' }}
  />
</ListItemIcon>
```

- An issue that arise when using MUI 5 Emotion styled-components is that component props does not get forward. However, there was a work around to overcome this issue as illustrated in the [MUI Issues #15695 discussion](https://github.com/mui/material-ui/issues/15695).

```jsx
// src/components/ui/Navbar/styled.tsx
export const Toolbar = styled(MuitToolbar)`
  width: 100%;
  max-width: 70vw;
  justify-content: flex-end;
` as typeof MuitToolbar;
```

## Let's get started


#### Implement the useResizeObserver and withClientRender HOC function

The first thing we would need to do is to implement our [useResizeObserver.ts](https://github.com/tamvo22/responsive-navbar/blob/master/src/_utils/hooks/useResizeObserver.ts) function to observe changes to our menu's width. We would need to utilize the [Web API ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to report changes to the dimensions of our element's content or border box. In addition, we would have to use ResizeObserver inside of [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) to get its value before the browser has a chance to paint. Another key point is that when we use useLayoutEffect with Next.js, we would need to create a [withClientRender HOC](https://github.com/tamvo22/responsive-navbar/blob/master/src/_utils/hoc/withClientRender.tsx) to wrap our Navbar component to ensure that the useResizeObserver only runs on the client to avoid the Next.js running useLayoutEffect on the server warning message.

```jsx
// src/_utils/hooks/useResizeObserver.ts
useLayoutEffect(() => {
  if (!ref.current) return;

  const observer = new ResizeObserver((entries) => {
    // recalculate our element's dimension 
    handleResize(entries);
  });
  observer.observe(ref.current);

  return () => {
    observer.disconnect();
  };
}, [ref]);
```

#### Enhancing the Navbar menu component

To improve our navbar component, we'll use useResizeObserver and withClientRender. We're essentially finding the width + offsetLeft value of each menu item in the ref array and comparing it to menuWidth. The overflow items would be stored based on the overflow index, and the ShowMore icon would be enabled to reveal the concealed overflow items. The visibility of the overflow items must also be set to hidden, and the offset value should be set such that the menu items always shift to the right side. Here we also added the Anchor dropdown functionality for menus that have submenu items.

https://github.com/tamvo22/responsive-navbar/blob/master/src/components/ui/Navbar/index.tsx

```jsx
// src/components/ui/Navbar/index.tsx
import useResizeObserver from '@/utils/hooks/useResizeObserver';
import withClientRender from '@/utils/hoc/withClientRender';
...

// observe navbar stack container width changes and box item.
const [menuWidth] = useResizeObserver(navbarRef);

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
...

export default withClientRender(Navbar);
```

#### ShowMore and Submenu Anchor Menu

The [Anchor menu](https://github.com/tamvo22/responsive-navbar/blob/master/src/components/ui/AnchorMenu/index.tsx) serves as two menus for the ShowMore and submenu items and is pretty straight-forward based on the [MUI 5 Menu](https://mui.com/material-ui/react-menu/) example implementation. The only tricky part when opening the submenu under the ShowMore menu is that we have to ensure we stop the propagation of submenu mouse click events from traveling back to the ShowMore menu for it to work properly.



```jsx
function handleSubMenuOnClick(event: React.MouseEvent<HTMLLIElement>) {
  // prevent sequential event from propagating
  event.stopPropagation();
  closeMenu();
}
```

#### Hamburger Menu

The [Hamburger menu](https://github.com/tamvo22/responsive-navbar/blob/master/src/components/ui/HamburgerMenu/index.tsx) is similar to the [MUI 5 Drawer](https://mui.com/material-ui/react-drawer/) example, except we're opening an additional drawer for our submenu items for a menu that has submenu items. A critical point we might come across while adding the second drawer component is the warning: "Each child in a list should have a unique 'key' prop." Since we have multiple JSX elements under the same List element, we would need to wrap it with around React.Fragment as well as provide a key value. 

```jsx
// src/components/ui/HamburgerMenu/index.tsx
<List>
  {items.map((item) => (
    <React.Fragment key={item.id}>
      <Link href={item.url}>
        <ListItem disablePadding>
          ...
        </ListItem>
      </Link>
      {item.subMenu && (
        <Drawer anchor="left" open={subMenu === item.id} onClose={handleSubMenuClose}>
          ...
        </Drawer>
      )}
    </React.Fragment>
  ))}
</List>
```

## Conclusion

In this example, we'll show you how to create a responsive multi-level navbar menu to make up for a lack of space in the navbar and hamburger menus. The navbar is the most crucial component of a website, and making sure we have enough capacity for all of our menus is equally important. This is just one of a number of options. Adding a secondary menu bar underneath the main menu is the most typical solution. However, using this strategy is more enjoyable and intriguing. I hope you enjoy this example and stay tuned for future projects that will be even more entertaining.
