import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
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

              <LinkContainer
                className="btn btn-outline-success btn-lg"
                to="/order"
              >
                <Nav.Link className="font-nav-btn order-nav">
                  Order Now
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
