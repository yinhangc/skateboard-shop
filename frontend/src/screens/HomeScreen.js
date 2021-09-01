import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const onSelect = (selectedKey) => {
    console.log(selectedKey);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
