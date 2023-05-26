import { Box, Container, Grid } from '@mui/material';
import { ReactNode, FC } from 'react';

interface BodyContainerProps {
  children: ReactNode;
}

const containerStyles = {
  maxWidth: '724px',
  margin: '0 auto',
  padding: '20px 20px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const ContainerLayout: FC<BodyContainerProps> = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Box p={2}>{children}</Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContainerLayout;
