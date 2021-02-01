import React from "react";
import { Card, Button } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="my-3 py-3 card-box" border="secondary">
      <Card.Img
        src={product.image}
        variant="top"
        className="mx-auto card-image"
      />

      <Card.Body className="card-body">
        <Card.Title as="p" className="card-name">
          <strong>{product.name}</strong>
        </Card.Title>

        <Button size="sm" className=" card-btn" variant="success" disabled>
          {product.category}
        </Button>

        <Card.Text as="p" className="card-p">{`${product.description.substring(
          0,
          70
        )} ...`}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
