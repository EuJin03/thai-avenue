import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  Button,
  Image,
  Card,
  ListGroup,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { addToCart } from "../actions/cartActions";

const OrderModal = props => {
  const dispatch = useDispatch();

  const { product } = props;

  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [remark, setRemark] = useState("");

  const submitHandler = hide => {
    dispatch(addToCart(props.product._id, qty, remark, size));
    hide();
  };

  useEffect(() => {
    const comparePrice = product.size;

    comparePrice[0].name === size
      ? setPrice(comparePrice[0].price)
      : comparePrice.length > 1 && setPrice(comparePrice[1].price);
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Image
          src={product.image}
          fluid
          rounded
          style={{ marginRight: "20px", height: "50px", width: "50px" }}
        />
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center" variant="secondary">
        <Card style={{ width: "500px" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row className="d-flex align-items-center justify-content-center">
                <Col>Size:</Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                  >
                    {product.size.map(item => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
            {product.size[0].name === "standard" ? (
              <ListGroup.Item>
                <Row className="d-flex align-items-center justify-content-center">
                  <Col>Price:</Col>
                  <Col>{price}</Col>
                </Row>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item>
                <Row className="d-flex align-items-center justify-content-center">
                  <Col>Price:</Col>
                  <Col>{product.size[1].price}</Col>
                </Row>
              </ListGroup.Item>
            )}

            {/* footer */}
          </ListGroup>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => submitHandler(props.onHide)} variant="success">
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
