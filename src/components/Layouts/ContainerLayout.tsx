import { Box, Container, Grid } from '@mui/material';
import { ReactNode, FC } from 'react';
import Navbar from '../NavBar/NavBar';

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
    <>
      <Navbar />
      <Container maxWidth="lg" sx={containerStyles}>
        {children}
      </Container>
    </>
  );
};

export default ContainerLayout;
