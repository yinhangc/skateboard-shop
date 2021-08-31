import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <Container className="py-3">
        <Route path="/product/:id" component={ProductScreen} exact />
        <Route path="/" component={HomeScreen} exact />
      </Container>
    </Router>
  );
};

export default App;
