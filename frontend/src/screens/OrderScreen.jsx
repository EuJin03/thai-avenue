import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Trolley from "../components/Trolley";
import OrderList from "../components/OrderList";
import { listProducts } from "../actions/productActions";

const OrderScreen = () => {
  const arrange = [];

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products } = productList;

  products.forEach(product => arrange.push(product.category));
  const category = [...new Set(arrange)];

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <div style={{ marginTop: "70px" }}>
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
      <div
        style={{ width: "100%", backgroundColor: "#f1f1f1" }}
        className="d-flex justify-content-center fixed-bottom"
      >
        <Trolley price="0" qty="0" />
      </div>
    </>
  );
};

export default OrderScreen;
