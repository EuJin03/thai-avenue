import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import OrderList from "../components/OrderList";
import { listProducts } from "../actions/productActions";

const OrderScreen = () => {
  const arrange = [];

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;

  products.forEach(product => arrange.push(product.category));
  const category = [...new Set(arrange)];

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <div
        style={{ marginTop: "70px", marginLeft: "100px", marginRight: "100px" }}
      >
        {category.map(food => (
          <>
            <h1>{food}</h1>
            <OrderList
              products={products.filter(product =>
                product.category.includes(food)
              )}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default OrderScreen;
