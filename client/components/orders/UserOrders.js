import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserOrders, resetUserOrders} from '../../store/userOrders'
import {Segment, Item, Tab} from 'semantic-ui-react'
import OrderList from './OrderList'

const UserOrders = ({history}) => {
  const orders = useSelector(state => state.userOrders)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserOrders(user.id))
    return () => {
      dispatch(resetUserOrders())
    }
  }, [])

  const panes = [
    {
      menuItem: {
        key: 'allOrders',
        icon: 'unordered list',
        content: 'All Orders'
      },
      render: () => {
        const allOrders = orders.filter(order => order.status !== 'in-cart')
        return (
          <Tab.Pane>
            <OrderList history={history} orders={allOrders} all={true} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'paid',
        icon: 'money',
        content: `Paid Orders`
      },
      render: () => {
        const paidOrders = orders.filter(order => order.status === 'paid')
        return (
          <Tab.Pane>
            <OrderList orders={paidOrders} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'shipped',
        icon: 'shipping fast',
        content: 'Shipped'
      },
      render: () => {
        const shippedOrders = orders.filter(order => order.status === 'shipped')
        return (
          <Tab.Pane>
            <OrderList orders={shippedOrders} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'delivered',
        icon: 'zip',
        content: 'Delivered'
      },
      render: () => {
        const deliveredOrders = orders.filter(
          order => order.status === 'delivered'
        )
        return (
          <Tab.Pane>
            <OrderList orders={deliveredOrders} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'cancelled',
        icon: 'cancel',
        content: 'Cancelled'
      },
      render: () => {
        const cancelledOrders = orders.filter(
          order => order.status === 'cancelled'
        )
        return (
          <Tab.Pane>
            <OrderList orders={cancelledOrders} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'in-dispute',
        icon: 'question circle outline',
        content: 'Disputed'
      },
      render: () => {
        const inDisputeOrders = orders.filter(
          order => order.status === 'in-dispute'
        )
        return (
          <Tab.Pane>
            <OrderList orders={inDisputeOrders} />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'completed',
        icon: 'check',
        content: 'Completed'
      },
      render: () => {
        const completedOrders = orders.filter(
          order => order.status === 'completed'
        )
        return (
          <Tab.Pane>
            <OrderList orders={completedOrders} />
          </Tab.Pane>
        )
      }
    }
  ]

  return (
    <Tab menu={{fluid: true, vertical: true, tabular: true}} panes={panes} />
  )
}

export default UserOrders
