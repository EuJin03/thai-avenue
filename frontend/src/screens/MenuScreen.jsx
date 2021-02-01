import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import CategoryList from "../components/CategoryList";
import ProductCarousel from "../components/ProductCarousel";
import Product from "../components/Product";
import { categoryProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MenuScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productCategory = useSelector(state => state.productCategory);
  const { loading, error, products } = productCategory;

  useEffect(() => {
    dispatch(categoryProducts(match.params.category));
  }, [dispatch, match]);

  return (
    <>
      <div style={{ height: "100px" }}></div>
      <ProductCarousel />
      <CategoryList />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <Row>
        {products.map(product => (
          <Col xs={6} md={4}>
            <Product key={product._id} product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MenuScreen;
