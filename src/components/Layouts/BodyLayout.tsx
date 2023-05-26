import { Box, Grid } from '@mui/material';
import { ReactNode, FC } from 'react';

interface BodyLayoutProps {
  children: ReactNode;
}

const BodyLayout: FC<BodyLayoutProps> = ({ children }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Box p={2}>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default BodyLayout;
