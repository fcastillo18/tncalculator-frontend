import { Container } from '@mui/material';
import { ReactNode, FC } from 'react';

interface BodyContainerProps {
  children: ReactNode;
}

const ContainerLayout: FC<BodyContainerProps> = ({ children }) => {
  return <Container maxWidth="lg">{children}</Container>;
};

export default ContainerLayout;
