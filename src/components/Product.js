import React from "react";
import PropTypes from "prop-types";

const Product = ({
  price,
  image,
  like,
  quantity,
  title,
  product_id,
  actions,
}) => (
  <div className="item">
    <div className="buttons">
      <span
        className="delete-btn"
        id={`cart-delete-all-${product_id}`}
        onClick={() => actions.removeAllFromCart(product_id,quantity)}
      />
      <span
        className={like ? `is-active like-btn` : "like-btn"}
        id={`cart-toggle-like-${product_id}`}
        onClick={()=>actions.toggleLike(product_id)}
      />
    </div>

    <div className="image">
      <img width="80px" src={image} alt="" />
    </div>

    <div className="description">
      <span>{title}</span>
      <span>${price}</span>
      <span>{quantity ? ` x ${quantity}` : null}</span>
    </div>

    <div className="quantity">
      <button
        id={`cart-plus-${product_id}`}
        className="plus-btn"
        type="button"
        name="button"
        onClick={() => actions.addToCart(product_id)}
      >
        <img src="/static/images/plus.svg" alt="" />
      </button>
      <input type="text" name="name" value={quantity} />
      <button
        id={`cart-minus-${product_id}`}
        className="minus-btn"
        type="button"
        name="button"
        onClick={() => actions.removeFromCart(product_id)}
      >
        <img src="/static/images/minus.svg" alt="" />
      </button>
    </div>

    <div className="total-price">${price * quantity}</div>
  </div>
);

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
};

export default Product;
