import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, servedOrder } from "../actions/orderActions";
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
    if (!order || orderId !== order._id) {
      dispatch(getOrderDetails(orderId));
    }

    dispatch(removeCartItems());
  }, [dispatch, orderId, order, successServed, loadingServed]);

  const parseISOString = iso => {
    let date = new Date(iso);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hrs = date.getHours();
    let min = date.getMinutes();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    if (min < 10) {
      min = "0" + min;
    }

    return `${year}-${month}-${dt}, ${hrs}:${min}`;
  };

  const servedHandler = id => {
    dispatch(servedOrder(id));
    window.location.reload();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2 style={{ marginTop: "80px" }} className="mb-4">
        Order at {parseISOString(order.createdAt)}
      </h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {order.orderItems.map(item => (
              <ListGroup.Item key={item._id}>
                <Row className="d-flex justify-content-center align-items-center">
                  <Col xs={4} md={3}>
                    <i className="fas fa-utensils mr-1"></i> {item.name}
                  </Col>
                  <Col xs={4} md={2}>
                    RM {(item.price * item.qty).toFixed(2)}
                  </Col>
                  <Col xs={4} md={2}>
                    Qty: {item.qty}
                  </Col>
                  <Col xs={12} md={4} className="text-break">
                    <i className="far fa-question-circle mr-1"></i>{" "}
                    {item.remark}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={12} md={4}>
          <Card className="d-flex justify-content-center align-items-center">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Food</Col>
                  <Col>RM {order.subTotal.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>RM {((order.subTotal * 6) / 100).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    RM{" "}
                    {(order.subTotal + (order.subTotal * 6) / 100).toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              {userInfo && userInfo.isAdmin && !order.isServed ? (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    style={{ borderRadius: "0" }}
                    onClick={() => servedHandler(order._id)}
                  >
                    Mark as Served
                  </Button>
                  {loadingServed && <Loader />}
                </ListGroup.Item>
              ) : userInfo && userInfo.isAdmin && order.isServed ? (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    variant="success"
                    style={{ borderRadius: "0" }}
                  >
                    Order has been served
                    <i className="fas fa-smile-wink ml-2"></i>
                  </Button>
                  {loadingServed && <Loader />}
                </ListGroup.Item>
              ) : !userInfo && order.isServed ? (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    variant="success"
                    style={{ borderRadius: "0" }}
                  >
                    Enjoy your meal! <i className="fas fa-smile-wink ml-2"></i>
                  </Button>
                  {loadingServed && <Loader />}
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    variant="success"
                    style={{ borderRadius: "0" }}
                  >
                    Meal is on the way{" "}
                    <i className="fas fa-smile-wink ml-2"></i>
                  </Button>
                  {loadingServed && <Loader />}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RecentOrderScreen;
