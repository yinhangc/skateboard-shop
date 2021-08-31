import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  const onSelect = (selectedKey) => {
    console.log(selectedKey);
  };

  return (
    <>
      <Nav
        className="justify-content-center"
        activeKey="/home"
        onSelect={onSelect}
      >
        <Nav.Item>
          <Nav.Link eventKey="link-1">All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Skateboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Penny</Nav.Link>
        </Nav.Item>
      </Nav>
      <h1 className="my-3">Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
