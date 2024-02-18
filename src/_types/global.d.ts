import { ReactElement } from 'react';
import { IconButtonProps } from '@mui/material/IconButton';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

declare global {
  interface IMenuItem {
    id: string;
    label: string;
    icon?: ReactNode;
    url: string;
    subMenu?: IMenuItem[];
  }

  type Color = IconButtonProps['color'];

  interface AnchorEl {
    id: string;
    anchorEl: HTMLElement;
  }
}
