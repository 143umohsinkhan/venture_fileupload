import * as React from 'react';
import Navigation from './Navigation';
import './MainPage.css';
import { Container } from 'semantic-ui-react';

class MainPage extends React.Component<{}, {}> {
  render() {
    return (
      <Container fluid >
      <Navigation />
      </Container>
    );
  }
}

export default MainPage;
