import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const onSelect = (selectedKey) => {
    console.log(selectedKey);
  };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
