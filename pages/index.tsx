import Layout from '@/com/Layout';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}>
        <Typography variant="h3" component="h1" gutterBottom>
        Plant-Disease-Detection
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
         
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;

Home.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
