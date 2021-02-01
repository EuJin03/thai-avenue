import React from "react";
import { Table, Button, Image } from "react-bootstrap";

const OrderList = ({ products }) => {
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
              <td width="500px">{product.name}</td>
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
                <Button size="md" variant="warning" block className="my-auto">
                  <i className="fas fa-plus"> </i>
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
