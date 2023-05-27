import React from 'react';
import ContainerLayout from '../../components/Layouts/ContainerLayout';
import CreateUser from '../../components/CreateUser/CreateUser';
import UserRecords from '../../components/UserRecords/UserRecords';
import { Box, Typography } from '@mui/material';

const UserPage: React.FC = () => {
  return (
    <ContainerLayout>
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom component="div">
          User Page
        </Typography>
        <Box sx={{ mt: 3, mb: 6 }}>
          <CreateUser />
        </Box>
        <Box sx={{ mt: 3, mb: 6 }}>
          <UserRecords />
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default UserPage;
