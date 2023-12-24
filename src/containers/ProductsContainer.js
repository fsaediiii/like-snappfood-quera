import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductsList from '../components/ProductsList'
import ProductCard from '../components/ProductCard';

const ProductsContainer = ({ products, addToCart }) => (
  <>
    <ProductsList title="Products">
      {products.map(product =>
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          product_id={product.id}
          quantity={product.inventory}
          onAddToCartClicked={() => addToCart(product.id)} />
      )}
    </ProductsList>
    <div style={{clear:"both"}} />
  </>
)

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductsContainer)