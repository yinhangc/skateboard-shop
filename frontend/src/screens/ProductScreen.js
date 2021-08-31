import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import products from '../products';

const ProductScreen = ({ match }) => {
  const [qty, setQty] = useState(1);
  const product = products.find((p) => p._id === match.params.id);

  // Maximum buying quantity for each product: 8
  const qtyDropdown = () => {
    const jsxArr = [];
    for (let i = 0; i < product.countInStock; i++) {
      if (i > 7) break;
      jsxArr.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    return jsxArr;
  };

  return (
    <>
      <Link className="btn btn-primary my-3" to="/">
        Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item as="h2">{product.name}</ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>HKD {product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col style={{ color: product.countInStock > 0 || 'red' }}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty:</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      className="product-details-qty"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {qtyDropdown()}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button className="w-100" disabled={product.countInStock === 0}>
                Add To Cart
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <p className="mb-1" style={{ textDecoration: 'underline' }}>
                Description:
              </p>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
