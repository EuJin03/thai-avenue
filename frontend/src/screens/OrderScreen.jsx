import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Trolley from "../components/Trolley";
import OrderList from "../components/OrderList";
import { listProductDetails, listProducts } from "../actions/productActions";
import OrderModal from "../components/OrderModal";

const useQuery = () => new URLSearchParams(useLocation().search);

const OrderScreen = ({ location }) => {
  const base = location.search;

  const query = useQuery();

  const arrange = [];

  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { products } = productList;

  const productDetails = useSelector(state => state.productDetails);
  const { product } = productDetails;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  products.forEach(product => arrange.push(product.category));
  const category = [...new Set(arrange)];

  useEffect(() => {
    dispatch(listProducts());

    if (base !== "") {
      dispatch(listProductDetails(query.get("id")));
    }
    // eslint-disable-next-line
  }, [dispatch, base]);

  const selectModal = () => {
    setModalShow(true);
  };

  return (
    <>
      <div style={{ marginTop: "70px" }}>
        {category.map(food => (
          <>
            <h1 key={food._id}>{food}</h1>

            <OrderList
              products={products.filter(product =>
                product.category.includes(food)
              )}
              onClick={selectModal}
            />
          </>
        ))}
      </div>
      <div
        style={{ width: "100%", backgroundColor: "#f1f1f1" }}
        className="d-flex justify-content-center fixed-bottom"
      >
        <Trolley
          price={cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
          qty={cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
        />

        {product && product.inStock && (
          <OrderModal
            show={modalShow}
            product={product}
            onHide={() => setModalShow(false)}
          />
        )}
      </div>
    </>
  );
};

export default OrderScreen;
