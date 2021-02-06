import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_ADMIN_REQUEST,
  ORDER_LIST_ADMIN_SUCCESS,
  ORDER_LIST_ADMIN_FAIL,
  ORDER_SERVED_REQUEST,
  ORDER_SERVED_SUCCESS,
  ORDER_SERVED_FAIL,
  ORDER_SERVED_RESET,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };

    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [] },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListAdminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return { loading: true };
    case ORDER_LIST_ADMIN_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderServedReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_SERVED_REQUEST:
      return { loading: true };
    case ORDER_SERVED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_SERVED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_SERVED_RESET:
      return {};
    default:
      return state;
  }
};
