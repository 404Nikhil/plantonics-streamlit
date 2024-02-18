import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';

export const Layout = styled(MuiContainer)`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const Main = styled('main')`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
