import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const OrderList = ({ products, onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const orderCreate = useSelector(state => state.orderCreate);
  const { order } = orderCreate;

  const addToCartHandler = id => {
    history.push(`/order?id=${id}`);
    onClick();

    if (order) {
      // dispatch order create reset
      dispatch({ type: ORDER_CREATE_RESET });
    }
  };

  return (
    <>
      <Table borderless responsive className="table-sm">
        <thead className="bg-success text-white">
          <tr>
            <th>NAME</th>
            <th>PRICE</th>
            <th>SIZE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                {product.size.length > 1 ? (
                  <>
                    {product.size[0].price} <div className="my-2" />
                    {product.size[1].price}
                  </>
                ) : (
                  product.size[0].price
                )}
              </td>
              <td>
                {product.size.length > 1 ? (
                  <>
                    {product.size[0].name} <div className="my-2" />
                    {product.size[1].name}
                  </>
                ) : (
                  product.size[0].name
                )}
              </td>

              <td width="50px">
                <Button
                  type="button"
                  variant="warning"
                  block
                  className="my-auto"
                  onClick={() => addToCartHandler(product._id)}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderList;
