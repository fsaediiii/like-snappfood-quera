import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  checkout,
  addToCart,
  removeAllFromCart,
  removeFromCart,
  toggleLike,
} from "../actions";
import { getTotal, getCartProducts, getMoney } from "../reducers";
import Cart from "../components/Cart";
import { bindActionCreators } from "redux";

const CartContainer = ({ products, money, total, actions }) => {
  return (
    <Cart
      products={products}
      total={total}
      money={money}
      actions={actions}
      onCheckoutClicked={() => actions.checkout(products)}
    />
  );
};

CartContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  money: PropTypes.number.isRequired,
  total: PropTypes.string,
  actions: PropTypes.shape({
    checkout: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    removeAllFromCart: PropTypes.func.isRequired,
    toggleLike: PropTypes.func.isRequired,
  }).isRequired,
  // checkout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state),
  money: getMoney(state),
});

export default connect(mapStateToProps, (dispatch) => ({
  actions: bindActionCreators(
    { checkout, addToCart, removeAllFromCart, removeFromCart, toggleLike },
    dispatch
  ),
}))(CartContainer);
