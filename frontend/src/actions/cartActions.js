import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, qty, remark, size) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/products/${id}`);

  const itemSize = data.size.filter(item => item.name === size);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      size: itemSize[0].name,
      price: itemSize[0].price,
      remark,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
// get state allow you to grab all the reducers that combined

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCartItems = () => dispatch => {
  dispatch({
    type: CART_RESET_ITEM,
  });

  localStorage.removeItem("cartItems");
};
