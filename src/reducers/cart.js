import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  REMOVE_FROM_CART,
  RECEIVE_MONEY,
  REMOVE_ALL_FROM_CART,
} from "../constants/ActionTypes";

const initialState = {
  money: 0,
  addedIds: [],
  quantityById: {},
};

const setMoney = (state = 0, action) => {
  switch (action.type) {
    case RECEIVE_MONEY:
      return action.money;
    default:
      return state;
  }
};

const addedIds = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state.addedIds.includes(action.productId)
        ? state.addedIds
        : [action.productId, ...state.addedIds];
    case REMOVE_FROM_CART:
      return state.quantityById[action.productId] === 1
      ? state.addedIds.filter((x) => x !== action.productId)
      : state.addedIds;
    case REMOVE_ALL_FROM_CART:
      const productIdToRemove = action.productId;
      const newAddedIds = state.addedIds.filter(
        (id) => id !== productIdToRemove
      );
      return newAddedIds;
    default:
      return state.addedIds;
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productId = action.productId;
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1,
      };
    case REMOVE_FROM_CART:
      const { [action.productId]: removedItemQuantity, ...updatedCart } = state;
      return removedItemQuantity > 1
        ? { ...updatedCart, [action.productId]: removedItemQuantity - 1 }
        : updatedCart;
    case REMOVE_ALL_FROM_CART:
      const { [action.productId]: _, ...newQuantityById } = state || {};
      return newQuantityById;
    default:
      return state;
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = (state) => state.addedIds;
export const getMoney = (state) => state.money;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        money: setMoney(state.money, action),
        addedIds: addedIds(state, action),
        quantityById: quantityById(state.quantityById, action),
      };
  }
};

export default cart;
