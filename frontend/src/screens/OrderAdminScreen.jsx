import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAdminOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderListAdmin = useSelector(state => state.orderListAdmin);
  const { loading, error, orders } = orderListAdmin;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAdminOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const parseISOString = iso => {
    let date = new Date(iso);
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

    return `${month}-${dt}, ${hrs}:${min}`;
  };

  return (
    <>
      <h1 style={{ marginTop: "80px" }} className="mb-4">
        Today's Orders
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TABLE</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>SERVED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.table}</td>
                <td>{parseISOString(order.createdAt)}</td>
                <td>
                  RM {(order.subTotal + (order.subTotal * 6) / 100).toFixed(2)}
                </td>
                <td>
                  {order.isServed ? (
                    parseISOString(order.servedAt)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/recent/${order._id}`}>
                    <Button
                      variant="light"
                      className="btn-sm d-flex justify-content-center"
                      style={{ borderRadius: "0" }}
                    >
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
