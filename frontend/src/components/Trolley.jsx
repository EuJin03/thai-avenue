import React from "react";
import { Button } from "react-bootstrap";

const Trolley = ({ qty, price }) => {
  return (
    <Button
      variant="info"
      size="md"
      className="d-flex justify-content-around my-4"
      style={{ width: "350px" }}
    >
      <div>{qty}</div>
      <div>
        <i className="fas fa-shopping-cart"> </i> &#160; View your cart
      </div>
      <div>RM {price}</div>
    </Button>
  );
};

export default Trolley;
