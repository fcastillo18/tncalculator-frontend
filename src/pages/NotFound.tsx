import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContainerLayout from '../components/Layouts/ContainerLayout';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ContainerLayout isNavbarEnabled={false}>
      <Container
        maxWidth="sm"
        sx={{
          pt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h1" align="center" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          The page you are looking for doesn’t exist or an other error occurred.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 3 }}
        >
          Go to home page
        </Button>
      </Container>
    </ContainerLayout>
  );
};

export default NotFound;
