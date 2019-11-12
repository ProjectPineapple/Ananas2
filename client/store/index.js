import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import checkout from './checkout'
import viewCart from './viewCart'
import allProducts from './allProducts'
import singleProduct from './singleProduct'
import lineItem from './lineItem'
import addProduct from './addProduct'
// import allReviews from './reviews'
import userOrders from './userOrders'
import allOrders from './allOrders'
import allReviews from './reviews'
import addAReview from './addReview'
import userReviews from './userReviews'
import totalItems from './totalItems'
import singleOrder from './singleOrder.js'
import {reducer as formReducer} from 'redux-form'
import allUsers from './allUsers'
import addUser from './addUser'

const reducer = combineReducers({
  allProducts,
  allOrders,
  singleProduct,
  user,
  userOrders,
  checkout,
  viewCart,
  lineItem,
  addProduct,
  allReviews,
  addAReview,
  userReviews,
  totalItems,
  singleOrder,
  form: formReducer,
  allUsers,
  addUser
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
