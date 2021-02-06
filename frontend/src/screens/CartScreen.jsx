import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button, Card, Form } from "react-bootstrap";
import Message from "../components/Message";
import { removeFromCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [table, setTable] = useState(0);

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/recent/${order._id}`);
    }
  }, [history, success]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // dispatch order
    dispatch(
      createOrder({
        orderItems: cartItems,
        table,
        subTotal: cartItems
          .reduce((acc, item) => acc + item.qty * item.price, 0)
          .toFixed(2),
      })
    );
  };

  return (
    <>
      <h1
        style={{ marginTop: "80px", marginBottom: "20px", marginLeft: "15px" }}
      >
        Shopping Cart
      </h1>
      <Row>
        <Col xs={12} md={8}>
          {cartItems.length === 0 ? (
            <>
              <Message>Your cart is empty </Message>

              <Link to="/order">
                <Button variant="dark">Go Back</Button>
              </Link>
            </>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={4} md={3}>
                      {item.name}
                    </Col>
                    <Col xs={4} md={2}>
                      RM {item.price * item.qty}
                    </Col>
                    <Col xs={4} md={2}>
                      Qty: {item.qty}
                    </Col>
                    <Col xs={10} md={4}>
                      {item.remark.substring(0, 27)}
                    </Col>
                    <Col xs={2} md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Subtotal{" "}
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}{" "}
                  items
                </h3>
                RM{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <Row className="d-flex align-items-center justify-content-center">
                <Col>Table No.</Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={table}
                    onChange={e => setTable(e.target.value)}
                  >
                    {Array.from(Array(20).keys()).map((num, index) => (
                      <option key={index} value={num}>
                        {num}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0 || table === 0}
              onClick={checkoutHandler}
              variant="success"
              style={{ borderRadius: "0" }}
            >
              Proceed to checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
