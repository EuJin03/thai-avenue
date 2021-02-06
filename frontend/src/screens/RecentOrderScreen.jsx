import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, servedOrder } from "../actions/orderActions";
import { ORDER_SERVED_RESET } from "../constants/orderConstants";
import { removeCartItems } from "../actions/cartActions";

const RecentOrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderServed = useSelector(state => state.orderServed);
  const { loading: loadingServed, success: successServed } = orderServed;

  useEffect(() => {
    if (!order || successServed) {
      dispatch(getOrderDetails(orderId));
    }

    dispatch(removeCartItems());
  }, [dispatch, orderId, order, successServed]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2 style={{ marginTop: "80px" }}>
        Order at {order.createdAt.split("T")[0]},{" "}
        {order.createdAt.split("T")[1].match(/\d\d:\d\d/)}
      </h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row className="d-flex justify-content-center align-items-center">
                <Col xs={4} md={3}>
                  {order.name}
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
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default RecentOrderScreen;
