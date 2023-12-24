import React from 'react'
import PropTypes from 'prop-types'

const ProductCard = ({price, product_id, quantity, title, onAddToCartClicked}) => (
    <div className="column">
        <div className="card">
            <h3>{title} - &#36;{price}</h3>
            <p>{quantity ? ` x ${quantity}` : null}</p>
            <p>
                <button
                    id={`products-add-${product_id}`}
                    onClick={onAddToCartClicked}
                    disabled={quantity > 0 ? '' : 'disabled'}>
                    {quantity > 0 ? 'Add to cart' : 'Sold Out'}
                </button>
            </p>
        </div>
    </div>
)

ProductCard.propTypes = {
    price: PropTypes.number,
    quantity: PropTypes.number,
    title: PropTypes.string,
    onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductCard
