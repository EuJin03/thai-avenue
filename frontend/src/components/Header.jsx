import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const recentOrder = useSelector(state => state.recentOrder);
  const { order } = recentOrder;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="py-2" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand id="font-title">Thai Avenue</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-lg">
              <LinkContainer to="/menu/appetizer">
                <Nav.Link className="mr-4 font-nav">Menu</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/about">
                <Nav.Link className="mr-4 font-nav">About Us</Nav.Link>
              </LinkContainer>

              {order && order._id && (
                <LinkContainer to={`/recent/${recentOrder.order._id}`}>
                  <Nav.Link className="mr-4 font-nav">Previous Order</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin ? (
                <>
                  <LinkContainer to="/admin/orderlist">
                    <Nav.Link className="mr-4 font-nav">Orders</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title="Admin"
                    id="adminmenu"
                    className="font-nav"
                  >
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer
                  className="btn btn-outline-success btn-lg"
                  to="/order"
                >
                  <Nav.Link className="font-nav-btn order-nav">
                    Order Now
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
