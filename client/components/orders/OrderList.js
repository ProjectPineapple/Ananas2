import React from 'react'
import {Pagination, Icon, Header, Segment} from 'semantic-ui-react'
import OrderModal from './OrderModal'
import {parse, stringify} from 'query-string'
import {NavLink, matchPath} from 'react-router-dom'
import {withRouter} from 'react-router'

const OrderList = props => {
  const {all, orders} = props
  console.log(orders)
  //  const whichTab = props.match.path
  //  console.log(whichTab)

  //  const handlePageChange = (event, data) => {
  //    console.log('hi')
  /*    const queryObject = parse(location.search)
    console.log(queryObject)
    queryObject.page = data
    const queryParams = stringify(queryObject)
    history.push(`/orders/${whichTab}?${queryParams}`)*/
  //  }
  //  const currentPage = parse(location.search).page || 1

  return orders.length ? (
    <div>
      {/* <Pagination
          defaultActivePage={1}
          prevItem={{content: <Icon name="angle left" />, icon: true}}
          nextItem={{content: <Icon name="angle right" />, icon: true}}
          totalPages={Math.ceil(orders.length / 10)}
          onPageChange={handlePageChange}
	  /> */}
      {orders.map(order => (
        <div key={order.id} className="listing-orders">
          <div className="order-name">
            <h3>
              Order #{order.id + ' '} -- {' ' + order.OrderLineItems.length}{' '}
              items
            </h3>
          </div>
          <div className="order-status">
            {all ? (
              <span
                className={
                  order.status === 'cancelled' || order.status === 'in-dispute'
                    ? 'redtext'
                    : 'greentext'
                }
              >
                Status: {order.status}{' '}
              </span>
            ) : null}
          </div>
          <div>
            <OrderModal order={order} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Segment placeholder>
      <Header icon>
        <Icon name="pdf file outline" />
        No orders match these characteristics. <br />Think this is incorrect?{' '}
        <NavLink to="/customerservice">Contact Us</NavLink>
      </Header>
    </Segment>
  )
}

export default withRouter(OrderList)
