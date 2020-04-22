import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import {Navbar} from './components'
import Routes from './routes'
import {fetchCart} from './store/viewCart.js'

const App = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCart())
  }, [])
  return (
    <div>
      <Navbar {...props} />
      <Routes />
    </div>
  )
}

export default App
