import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, NavLink, matchPath, withRouter} from 'react-router-dom'
import {fetchAllOrders} from '../../store/allOrders'
import {Tab, Input, Pagination, Icon} from 'semantic-ui-react'
import querystring from 'query-string'
import OrderList from './OrderList'

const AllOrders = props => {
  const orders = useSelector(state => state.allOrders)
  //  const user = useSelector(state => state.user) // idea: display user info associated to order
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [])

  const panes = [
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders',
        exact: true,
        key: 'allOrders',
        icon: 'unordered list',
        content: 'All Orders'
      },
      render: () => {
        return (
          <Route exact path="/home/all-orders">
            <Tab.Pane>
              <OrderList orders={orders} all={true} />
            </Tab.Pane>
          </Route>
        )
      }
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders/paid',
        exact: true,
        key: 'paid',
        icon: 'money',
        content: `Paid`
      },
      render: () => {
        console.log('orders', orders)
        const paidOrders = orders.filter(order => {
          return order.status === 'paid'
        })
        console.log('paidOrders', paidOrders)
        return (
          <Route exact path="/home/all-orders/paid">
            <Tab.Pane>
              <OrderList orders={paidOrders} />
            </Tab.Pane>
          </Route>
        )
      }
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders/shipped',
        exact: true,
        key: 'shipped',
        icon: 'shipping fast',
        content: 'Shipped'
      },
      render: () => {
        const shippedOrders = orders.filter(order => order.status === 'shipped')
        return (
          <Route exact path="/home/all-orders/shipped">
            <Tab.Pane>
              <OrderList orders={shippedOrders} />
            </Tab.Pane>
          </Route>
        )
      }
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders/delivered',
        exact: true,
        key: 'delivered',
        icon: 'zip',
        content: 'Delivered'
      },
      render: () => {
        const deliveredOrders = orders.filter(
          order => order.status === 'delivered'
        )
        return (
          <Route exact path="/home/all-orders/delivered">
            <Tab.Pane>
              <OrderList orders={deliveredOrders} />
            </Tab.Pane>
          </Route>
        )
      }
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders/cancelled',
        exact: true,
        key: 'cancelled',
        icon: 'cancel',
        content: 'Cancelled'
      },
      render: () => {
        const cancelledOrders = orders.filter(
          order => order.status === 'cancelled'
        )
        return (
          <Route exact path="/home/all-orders/cancelled">
            <Tab.Pane>
              <OrderList orders={cancelledOrders} />
            </Tab.Pane>
          </Route>
        )
      }
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders/in-dispute',
        exact: true,
        key: 'in-dispute',
        icon: 'question circle outline',
        content: 'Disputed'
      },
      render: () => {
        const inDisputeOrders = orders.filter(
          order => order.status === 'in-dispute'
        )
        return (
          <Route exact path="/home/all-orders/in-dispute">
            <Tab.Pane>
              <OrderList orders={inDisputeOrders} />
            </Tab.Pane>
          </Route>
        )
      }
    },
    {
      menuItem: {
        as: NavLink,
        to: '/home/all-orders/completed',
        exact: true,
        key: 'completed',
        icon: 'check',
        content: 'Completed'
      },
      render: () => {
        const completedOrders = orders.filter(
          order => order.status === 'completed'
        )
        return (
          <Route exact path="/home/all-orders/completed">
            <Tab.Pane>
              <OrderList orders={completedOrders} />
            </Tab.Pane>
          </Route>
        )
      }
    }
  ]
  const activeIndex = panes.findIndex(pane => {
    return !!matchPath(window.location.pathname, {
      path: pane.menuItem.to,
      exact: false
    })
  })

  return (
    <Tab
      defaultActiveIndex={activeIndex}
      menu={{fluid: true, vertical: true, tabular: true}}
      panes={panes}
    />
  )
}

export default withRouter(AllOrders)
