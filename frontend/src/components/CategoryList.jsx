import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryList = () => {
  return (
    <Nav
      className="justify-content-center my-5"
      variant="pills"
      defaultActiveKey="/menu/appetizer"
    >
      <Nav.Item>
        <LinkContainer to="/menu/appetizer">
          <Nav.Link className="green-nav">APPETIZER</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/soup">
          <Nav.Link className="green-nav">SOUP</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/meat">
          <Nav.Link className="green-nav">MEAT</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/seafood">
          <Nav.Link className="green-nav">SEAFOOD</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/chicken">
          <Nav.Link className="green-nav">CHICKEN</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/vegetable">
          <Nav.Link className="green-nav">VEGETABLE</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/set">
          <Nav.Link className="green-nav">RICE & NOODLE</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/dessert">
          <Nav.Link className="green-nav">DESSERT</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/menu/beverage">
          <Nav.Link className="green-nav">BEVERAGE</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default CategoryList;
