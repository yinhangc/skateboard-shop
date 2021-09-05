import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const { products } = useSelector((state) => state.productList);
  const { loading, error } = useSelector((state) => state.cart);

  if (!userDetails)
    return (
      <>
        <h1 className="my-3">Shopping Cart</h1>
        <Message message="Please login first" variant="info" />
        <Link className="btn my-2 w-auto" to="/" style={{ background: '#eee' }}>
          &lt; Back
        </Link>
      </>
    );

  const { cartItems } = userDetails;

  if (!cartItems || cartItems.length === 0)
    return (
      <>
        <h1 className="my-3">Shopping Cart</h1>
        <Message message="Your cart is empty" variant="info" />
        <Link className="btn my-2 w-auto" to="/" style={{ background: '#eee' }}>
          &lt; Back
        </Link>
      </>
    );

  // Match cartItems in userDetails w/ products in productList
  let cart = products.filter((product) =>
    cartItems.some((item) => item.productId === product._id)
  );

  // Match cartItems qty w/ filtered product list
  cart = cart.map((item) => {
    for (let i of cartItems) {
      if (i.productId === item._id) {
        return { ...item, qty: i.qty };
      }
    }
  });

  // Maximum buying quantity for each product: 8
  const qtyDropdown = (countInStock) => {
    const jsxArr = [];
    for (let i = 0; i < countInStock; i++) {
      if (i > 7) break;
      jsxArr.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    return jsxArr;
  };

  const onCartQtyChange = (product, newQty) => {
    dispatch(addToCart(product, newQty));
  };

  const onRemoveClick = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Link className="btn my-2 w-auto" to="/" style={{ background: '#eee' }}>
        &lt; Back
      </Link>
      <Row>
        <Col md={8}>
          <h1 className="my-3">Shopping Cart</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message message={error} />
          ) : (
            <ListGroup variant="flush">
              {cartItems.length > 0 &&
                cartItems &&
                cart.map((item) => (
                  <ListGroup.Item key={item._id} className="pt-3">
                    <Row>
                      <Col md={2}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col md={3}>
                        <Link
                          to={`/product/${item._id}`}
                          style={{ fontSize: '1.2rem', fontWeight: '700' }}
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>HKD {item.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          className="cart-qty"
                          value={item.qty}
                          onChange={(e) =>
                            onCartQtyChange(item, Number(e.target.value))
                          }
                        >
                          {qtyDropdown(item.countInStock)}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => onRemoveClick(item._id)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="mt-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cart.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                <h5 className="mt-3" style={{ textTransform: 'none' }}>
                  Price: HKD{' '}
                  {cart
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
