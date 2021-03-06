import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Trolley = ({ qty, price }) => {
  return (
    <Link to="/cart" style={{ textDecoration: "none" }}>
      <Button
        variant="info"
        size="md"
        className="d-flex justify-content-around my-4"
        style={{ width: "350px" }}
        type="button"
      >
        <div>{qty}</div>
        <div>
          <i className="fas fa-shopping-cart"> </i> &#160; View your cart
        </div>
        <div>RM {price}</div>
      </Button>
    </Link>
  );
};

export default Trolley;
