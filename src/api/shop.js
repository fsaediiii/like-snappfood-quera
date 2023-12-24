/**
 * Mocking client-server processing
 */
import _products from './products.json'
const _money = 125
const TIMEOUT = 100

export default {
  getProducts: (cb, timeout) => setTimeout(() => cb(_products), timeout || TIMEOUT),
  getMoney: (cb, timeout) => setTimeout(() => cb(_money), timeout || TIMEOUT),
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
