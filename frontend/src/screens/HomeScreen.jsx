import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Row, Col, Image, Button, Container } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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

      <Container className="mt-5">
        <h1 className="chef-recommended">Chef Recommended</h1>
      </Container>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
    </>
  );
};

export default HomeScreen;
