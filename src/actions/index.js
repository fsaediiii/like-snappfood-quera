import shop from "../api/shop";
import * as types from "../constants/ActionTypes";
import { getTotal } from "../reducers";

const addToFavorite = (productId) => ({
  type: types.TOGGLE_LIKE,
  productId,
});

const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const getAllProducts = () => (dispatch) => {
  shop.getProducts((products) => {
    dispatch(receiveProducts(products));
  });
};

const receiveMoney = (money) => ({
  type: types.RECEIVE_MONEY,
  money,
});

export const getMoney = () => (dispatch) => {
  shop.getMoney((money) => {
    dispatch(receiveMoney(money));
  });
};

const addToCartUnsafe = (productId) => ({
  type: types.ADD_TO_CART,
  productId,
});

export const addToCart = (productId) => (dispatch, getState) => {
  const { products, cart } = getState();
  const product = products?.byId[productId];

  if (!product) {
    console.error(`Product with id ${productId} not found.`);
    return;
  }

  if (product.inventory <= 0) {
    console.warn(`Product ${product.title} is out of stock.`);
    return;
  }

  if (cart.money < product.price) {
    console.warn(`Insufficient funds to purchase ${product.title}.`);
    return;
  }

  const updatedCartMoney = cart.money - product.price;

  dispatch(addToCartUnsafe(productId));
  dispatch(receiveMoney(updatedCartMoney));
};

export const toggleLike = (productId) => (dispatch, getState) => {
  dispatch(addToFavorite(productId));
};

const removeFromCartUnsafe = (productId) => ({
  type: types.REMOVE_FROM_CART,
  productId,
});

export const removeFromCart = (productId) => (dispatch, getState) => {
  const { products, cart } = getState();
  const product = products?.byId[productId];

  if (!product) console.error(`Product with id ${productId} not found.`);

  dispatch(removeFromCartUnsafe(productId));
  dispatch(receiveMoney((cart?.money || 0) + product.price));
};

const removeAllFromCartUnsafe = (productId, removeCount) => ({
  type: types.REMOVE_ALL_FROM_CART,
  productId,
  removeCount,
});

export const removeAllFromCart =
  (productId, removeCount) => (dispatch, getState) => {
    const { products, cart } = getState();
    const removedProduct = products.byId[productId];

    if (!removedProduct) {
      console.error(`Product with id ${productId} not found.`);
      return;
    }

    const cashBackAmount = removedProduct.price * removeCount;
    const updatedMoney = cart.money + cashBackAmount;

    dispatch(removeAllFromCartUnsafe(productId, removeCount));
    dispatch(receiveMoney(updatedMoney));
  };

export const checkout = (products) => (dispatch, getState) => {
  const { cart } = getState();
  const totalPrice = getTotal(getState());
  dispatch({
    type: types.CHECKOUT_REQUEST,
    totalPrice,
  });
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart,
    });
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  });
};
