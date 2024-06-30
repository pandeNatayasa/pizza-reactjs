import React from 'react';
import Header from '../components/Header';
import { Container } from '@mui/material';

function CoreLayout({ children , history }) {
  return (
    <Container maxWidth="lg">
      <Header history={history} />
      <div className="main__content__child">
        {children}
      </div>
    </Container>
  );
}

export default CoreLayout;
