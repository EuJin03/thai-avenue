import React, { useState } from "react";
import { ResponsiveEmbed, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Icofont from "react-icofont";

const AboutScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submit, setSubmit] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    setSubmit(true);
    console.log(e);
  };

  return (
    <>
      <div className="about-title">
        <h2>Contact</h2>
      </div>

      <ResponsiveEmbed aspectRatio="21by9" style={{ marginTop: "40px" }}>
        <embed
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=restaurant%20thai%20avenue,%20segambut+(Thai%20Avenue)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          allowfullscreen
        />
      </ResponsiveEmbed>

      <Row className="mt-5 contact">
        <Col md={6}>
          <div className="info">
            <div className="address">
              <Icofont icon="google-map" size="6"></Icofont>
              <h4>Location:</h4>
              <p>Restaurant Thai Avenue, Segambut, 51200, Kuala Lumpur</p>
            </div>
            <div className="open-hours">
              <Icofont icon="clock-time" size="6" rotate="90"></Icofont>
              <h4>Open Hours:</h4>
              <p>
                Monday-Sunday: <br />
                11:30 AM - 02:30 PM <br /> 05:30 PM - 08:00 PM
              </p>
            </div>
            <div className="phone">
              <Icofont icon="brand-whatsapp" size="6"></Icofont>
              <h4>Phone:</h4>
              <p>
                019 638 7215 <br />
                017 252 7896
              </p>
            </div>
          </div>
        </Col>
        <Col md={6} className="my-auto">
          {!submit ? (
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      required
                      onChange={e => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  row="5"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Write a Review"
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="success" className="btn btn-block">
                Submit
              </Button>
            </Form>
          ) : (
            <div>
              <h4>
                Thanks for giving us a response. We will try our best to serve
                better food
              </h4>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AboutScreen;
