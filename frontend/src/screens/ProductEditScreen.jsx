import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [set, setSet] = useState({
    size: "",
    price: "",
  });
  const [newSet, setNewSet] = useState({
    size: "",
    price: "",
  });
  const [toggleSet, setToggleSet] = useState(false);
  const [uploading, setUploading] = useState(false);

  const catList = [
    "Appetizer",
    "Soup",
    "Meat",
    "Seafood",
    "Chicken",
    "Vegetable",
    "Rice and Noodle",
    "Dessert",
    "Beverage",
    "Others",
  ];

  const dispatch = useDispatch();

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push(`/admin/productlist`);
    } else {
      if (!product.name || productId !== product._id) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setCategory(product.category);
        setImage(product.image);
        setDescription(product.description);
        setSet({
          name: product.size[0].name,
          price: product.size[0].price,
        });

        product.size.length > 1 &&
          setNewSet({
            name: product.size[1].name,
            price: product.size[1].price,
          });
      }
    }
    // eslint-disable-next-line
  }, [dispatch, history, product, productId, successUpdate]);

  const submitHandler = e => {
    e.preventDefault();
    // UPDATE PRODUCT
    if (newSet.size === "" || newSet.price === "") {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          image,
          description,
          category,
          size: [set],
        })
      );
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          image,
          description,
          category,
          size: [set, newSet],
        })
      );
    }
  };

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const setHandler = e => {
    const { name, value } = e.target;
    setSet(prevValue => ({ ...prevValue, [name]: value }));
  };

  const setNewHandler = e => {
    const { name, value } = e.target;
    setNewSet(prevValue => ({ ...prevValue, [name]: value }));
  };

  const toggleHandler = () => {
    setToggleSet(!toggleSet);
  };

  return (
    <>
      <div style={{ marginTop: "60px" }}></div>
      <Link to="/admin/productlist" className="btn btn-dark my-3 ">
        Go Back
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Enter name"
                value={name}
                required
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Upload Image"
                value={image}
                required
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                placeholder="Category"
                value={category}
                required
                onChange={e => setCategory(e.target.value)}
              >
                {catList.map((cat, index) => (
                  <option key={index} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                row="4"
                placeholder="Write something"
                value={description}
                required
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row>
              <Col md={6} xs={6}>
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>

                  <Form.Control
                    as="select"
                    name="size"
                    placeholder="Size"
                    value={set.name}
                    required
                    onChange={setHandler}
                  >
                    <option value="standard">Standard</option>
                    <option value="large">Large</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} xs={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>RM</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      name="price"
                      placeholder="Price"
                      value={set.price}
                      required
                      onChange={setHandler}
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            {/*New Set*/}
            <Row>
              <Col md={6} xs={6}>
                <Form.Group controlId="size">
                  <Form.Label>Size</Form.Label>

                  <Form.Control
                    as="select"
                    name="size"
                    placeholder="Size"
                    value={newSet.name}
                    onChange={setNewHandler}
                  >
                    <option value="large">Large</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} xs={6}>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>RM</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      name="price"
                      placeholder="Price"
                      value={newSet.price}
                      onChange={setNewHandler}
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            {/*Buttons*/}
            <Row>
              <Col md={6} xs={6}>
                {}
                <Button
                  variant="danger"
                  className="btn btn-block"
                  onClick={toggleHandler}
                >
                  Add Item
                </Button>
              </Col>
              <Col md={6} xs={6}>
                <Button
                  variant="danger"
                  className="btn btn-block"
                  onClick={toggleHandler}
                >
                  Remove Item
                </Button>
              </Col>

              <Col md={6} xs={6}>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn btn-block"
                >
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
