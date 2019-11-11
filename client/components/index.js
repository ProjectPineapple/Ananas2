/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './products/allProducts'
export {default as ProductListing} from './products/ProductListing'
export {default as checkoutForm} from './checkoutForm'
export {default as ViewCart} from './ViewCart'
export {default as OrderListing} from './orders/OrderListing.js'
export {default as AddProductForm} from './AddProductForm'
export {default as UpdateProductForm} from './UpdateProductForm'
export {default as AllOrders} from './AllOrders'
export {default as EditOrderForm} from './EditOrderForm'
