import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {NavBar, AllProducts, ProductListing} from './index'
import store from '../store/index'

render(
  <Provider store={store}>
    <Router>
      <NavBar />
      <Switch>
        {/* //Anyone */}
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={ProductListing} />

        {/* //Auth User */}
        {/* //Admin */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
