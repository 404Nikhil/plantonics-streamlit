import Header from './Header';
import Footer from './Footer';
import { Layout, Main } from './styled';
interface LayoutDefault {
  children: React.ReactNode;
}

export default function LayoutDefault({ children }: LayoutDefault) {
  return (
    <>
      <Layout maxWidth={false} disableGutters>
        <Header />
        <Main id="main" role="main">
          {children}
        
        </Main>
  
        
      </Layout>
    </>
  );
}
