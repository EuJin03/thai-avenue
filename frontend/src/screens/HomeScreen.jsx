import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Button } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <>
      <Image
        src="/resources/desktop-homepage.jpg"
        alt="desktop-backgroundImage"
        className="background-image"
        fluid
      />
      <Image
        src="/resources/phone-homepage.jpg"
        alt="phone-backgroundImage"
        className="background-phone"
        fluid
      />
      <Row className="quotes">
        <Col className="d-flex justify-content-center align-items-center">
          <div>
            <h1>Good Food,</h1>
            <h1>Good People,</h1>
            <h1>Good Times.</h1>
            <Link to="/order">
              <Button
                type="button"
                variant="success"
                size="lg"
                className="mt-2"
              >
                Order Now
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
