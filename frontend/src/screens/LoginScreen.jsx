import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, ProgressBar } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, location, userInfo]);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(login(name, password));
  };

  const revealPasswordHandler = e => {
    e.preventDefault();

    setReveal(!reveal);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}></div>
      <FormContainer>
        <h1>Login</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className="my-2">Username</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter username"
              name="name"
              value={name}
              required
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div>
              <Form.Control
                type={reveal ? `text` : `password`}
                placeholder="Enter password"
                value={password}
                name="current-password"
                required
                onChange={e => setPassword(e.target.value)}
              ></Form.Control>
              <i
                className={reveal ? `fas fa-eye` : `fas fa-eye-slash`}
                style={{
                  float: "right",
                  marginTop: "-28px",
                  marginRight: "15px",
                }}
                onClick={revealPasswordHandler}
              ></i>
            </div>
          </Form.Group>

          <Button type="submit" variant="success">
            Login
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New User?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : `/login`}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
