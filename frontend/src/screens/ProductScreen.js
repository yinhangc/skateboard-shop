import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaCartPlus } from 'react-icons/fa';
import {
  listProductDetails,
  clearProductDetails,
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, productInfo: product } = productDetails;
  const userDetails = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, match.params.id]);

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

  const onAddToCartClick = () => {
    // Redirect user if not yet login
    if (!userDetails) {
      history.push(`/login?redirect=product/${product._id}`);
    } else {
      history.push('/cart');
      dispatch(addToCart(product, qty));
    }
  };

  return (
    <>
      <Link className="btn my-2 w-auto" to="/" style={{ background: '#eee' }}>
        &lt; Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message message={error} />
      ) : (
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
                <Button
                  className="w-100"
                  disabled={product.countInStock === 0}
                  onClick={onAddToCartClick}
                >
                  <FaCartPlus style={{ margin: "0 .2rem .2rem 0" }} /> Add To Cart
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
      )}
    </>
  );
};

export default ProductScreen;
