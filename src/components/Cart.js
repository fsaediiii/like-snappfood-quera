import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const Cart = ({money, products, total, actions, onCheckoutClicked}) => {
    const hasProducts = products.length > 0;
    const nodes = hasProducts ? (
        products.map(product =>
            <Product
                title={product.title}
                price={product.price}
                image={product.image}
                like={product.like}
                quantity={product.quantity}
                key={product.id}
                product_id={product.id}
                actions={actions}
            />
        )
    ) : (
        <div className="show-message">
            <em>Please add some products to cart.</em>
        </div>
    )
    return (
        <div>
            <div className="shopping-cart">
                <div className="title">Your Cart</div>
                <div>{nodes}</div>
            </div>
            <div className="final-approve">
                <p>Money: &#36;{money}</p>
                <p>Total: &#36;{total}</p>
                <button onClick={onCheckoutClicked}
                        disabled={hasProducts ? '' : 'disabled'}>
                    Checkout
                </button>
            </div>
        </div>
    )
}

Cart.propTypes = {
    products: PropTypes.array,
    total: PropTypes.string,
    onCheckoutClicked: PropTypes.func
}

export default Cart
