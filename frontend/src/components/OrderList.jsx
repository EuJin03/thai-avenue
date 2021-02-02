import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import OrderModal from "./OrderModal";

const OrderList = ({ products }) => {
  const [modalShow, setModalShow] = useState(false);

  const addToCartHandler = () => {
    setModalShow(true);
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
                  size="md"
                  variant="warning"
                  block
                  className="my-auto"
                  disabled={!product.inStock}
                  onClick={() => addToCartHandler(product._id)}
                >
                  <i className="fas fa-plus"></i>
                </Button>

                <OrderModal
                  show={modalShow}
                  product={product}
                  onHide={() => setModalShow(false)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderList;
