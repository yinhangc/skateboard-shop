import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';

const Product = ({ product }) => {
  return (
    <LinkContainer to={`/product/${product._id}`}>
      <Card className="my-3 p-2 rounded product-card">
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title as="h4">{product.name}</Card.Title>
          <Card.Text>HKD {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default Product;
