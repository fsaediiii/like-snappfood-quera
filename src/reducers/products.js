import { combineReducers } from "redux";
import {
  RECEIVE_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  TOGGLE_LIKE,
} from "../constants/ActionTypes";

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedInventory = Math.max(state.inventory - 1, 0);
      return {
        ...state,
        inventory: updatedInventory,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        inventory: state.inventory + 1,
      };
    case REMOVE_ALL_FROM_CART:
      const newInventory = state.inventory + action.removeCount;
      return {
        ...state,
        inventory: newInventory,
      };
    case TOGGLE_LIKE:
      return state.like ? { ...state, like: false } : { ...state, like: true };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product;
          return obj;
        }, {}),
      };
    default:
      const { productId } = action;
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action),
        };
      }
      return state;
  }
};

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map((product) => product.id);
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds,
});

export const getProduct = (state, id) => state.byId[id];

export const getVisibleProducts = (state) =>
  state.visibleIds.map((id) => getProduct(state, id));
