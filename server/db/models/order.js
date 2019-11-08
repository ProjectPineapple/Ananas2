const Sequelize = require('sequelize')
const db = require('../db')
const OrderLineItem = require('./OrderLineItem')
const Product = require('./product')

const Order = db.define(
  'order',
  {
    status: {
      type: Sequelize.ENUM([
        'in-cart',
        'payment-in-progress',
        'paid',
        'shipped',
        'delivered',
        'cancelled',
        'in-dispute',
        'completed'
      ]),
      defaultValue: 'in-cart'
    },
    subtotal: {
      type: Sequelize.INTEGER, // in cents; X0000 <--> `$X00.00`
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    total: {
      // after tax & shipping & discount code, etc
      type: Sequelize.INTEGER,
      validate: {
        min: 0
      }
    },
    address: {
      // populate from user's shipping address during checkout
      type: Sequelize.STRING
    },
    cartTime: {
      // to delete
      // first item in the cart
      type: Sequelize.DATE,
      defaultValue: Date.now()
    },
    submittedTime: {
      // user submits order
      type: Sequelize.DATE
    },
    paymentTime: {
      // user's payment goes through
      type: Sequelize.DATE
    },
    cancelTime: {
      // if order is cancelled
      type: Sequelize.DATE
    },
    shipTime: {
      // when order ships
      type: Sequelize.DATE
    },
    deliveryTime: {
      // when order is delivered
      type: Sequelize.DATE
    },
    disputeTime: {
      // if order is disputed
      type: Sequelize.DATE
    },
    completedTime: {
      // when order is ALL DONE
      type: Sequelize.DATE
    }
    // include Product as lineItems ({ price: (at the time!), productId, qty }) , fk: userId
  }
  // {
  //   defaultScope: {
  //     include: [
  //       {
  //         model: OrderLineItem
  //       },
  //       {
  //         model: Product
  //       }
  //     ]
  //   }
  // }
)

// Method to add a line item to the OrderLineItem table that refers to this order
// NOTE THAT THIS RETURNS A PROMISE
Order.addLineItem = async (orderId, productId, quantity = 1) => {
  const product = Product.findByPk(productId)
  const newLineItem = OrderLineItem.create({
    quantity,
    priceAtPurchase: product.price,
    productId,
    orderId
  })
}

Order.addItemToOrder = async (orderId, productId) => {
  const orderLineItemToChange = await OrderLineItem.findOne({
    where: {orderId, productId}
  })
  if (!orderLineItemToChange) {
    Order.addLineItem(orderId, productId)
  } else {
    orderLineItemToChange.update({
      quantity: orderLineItemToChange.quantity + 1
    })
  }
}

// Method to add a line item to the OrderLineItem table that refers to this order
// NOTE THAT THIS RETURNS A PROMISE
Order.updateLineItem = async (
  orderId,
  productId,
  quantity,
  priceAtPurchase
) => {
  // try {
  const lineItemToUpdate = await OrderLineItem.update(
    {quantity, priceAtPurchase},
    {
      returning: true,
      where: {productId: productId, orderId: orderId}
    }
  )
  // )(function([rowsUpdated, [updatedLineItem]]) {
  //   return updatedLineItem
  // } catch (err) {
  //   // console.log('TCL: lineItemToUpdate', lineItemToUpdate)
  //   // return lineItemToUpdate
  //   console.error(err)
  //   return err
  // }
}

Order.deleteLineItem = async (orderId, productId) => {
  try {
    await OrderLineItem.destroy({where: {productId, orderId}})
  } catch (error) {
    console.error(error)
    return error
  }
}

Order.afterUpdate(order => {
  switch (order.status) {
    case 'payment-in-progress':
      order.paymentTime = Date.now()
      break
    case 'cancelled':
      order.cancelTime = Date.now()
      break
    case 'shipped':
      order.shipTime = Date.now()
      break
    case 'delivered':
      order.deliveryTime = Date.now()
      break
    case 'completed':
      order.completedTime = Date.now()
      break
    case 'in-dispute':
      order.disputeTime = Date.now()
      break
    default:
      break
  }
})

module.exports = Order
