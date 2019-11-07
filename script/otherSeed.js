const faker = require('faker')
const {db, User, Order, Product, Review} = require('../server/db')
const {green, red} = require('chalk')

const totalSeeds = 100

//dummy users
const dummyUsers = [
  //admin dummy user
  {
    name: faker.name.firstName() + faker.name.lastName(),
    email: 'steve@steve.com',
    password: '12345',
    status: 'admin',
    googleId: faker.random.uuid(),
    facebookId: faker.random.uuid(),
    defaultBillingAddress: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    defaultShippingAddress: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    addresses: [this.defaultBillingAddress, this.defaultShippingAddress]
  }

  //Edge Cases TK
  // guest user with cookie/jwt
  // user w/ email & pwd
  // user w/ google
  // user w/ facebook
]

const dummyProducts = [
  //admin dummy user
  {
    status: false,
    name: 'Warspite',
    stock: 0,
    description:
      'This ship has SEEN BATTLE ACTION and has real missiles that may go off at ANY MOMENT. NOT for the faint of heart.',
    price: 430000000,
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg'
    ],
    tags: ['British', 'battleship', 'gently used']
  },
  {
    status: true,
    name: 'U.S.S. Maine',
    stock: 1,
    description:
      'USS Main (ACR-1) was a U.S. Navy ship that sank in Havana Harbor. It has been recently restored to previous glory.',
    price: 4000000,
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg'
    ],
    tags: ['U.S.', 'cruiser', 'naval', 'retrofitted']
  },

  //Edge Cases TK
  // no photo
  {
    status: true,
    name: 'U.S.S. Indiana',
    stock: 10,
    description:
      'USS Indiana transported cows and corn for the troops. It still has corn. Yum! And ... a distinct smell.',
    price: 1000000,
    tags: ['U.S.', 'cruiser', 'naval', 'retrofitted']
  },
  // no stock given
  {
    status: false,
    name: 'Roma',
    description: 'Roma. What a ship. What a battle.',
    price: 10000007,
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg'
    ],
    tags: ['Italian', 'cruiser', 'naval', 'retrofitted']
  }
]

//order

const dummyOrders = [
  //cancelled order
  {
    status: 'in-cart',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  },

  //inCart
  {
    status: 'cancelled',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  },

  //customer completing payment
  {
    status: 'payment-in-progress',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  },

  //paid
  {
    status: 'paid',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  },
  //shipped
  {
    status: 'shipped',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  },

  //delivered
  {
    status: 'delivered',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  },

  //in-dispute
  {
    status: 'in-dispute',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  }
]

//reviews

const dummyReviews = [
  {
    description: faker.lorem.text(),
    rating: 1
  },
  {
    description: faker.lorem.text(),
    rating: 5
  }
]

const smallSeed = async () => {
  try {
    await db.sync({force: true})
    const seededUsers = await Promise.all(
      dummyUsers.map(user => User.create(user))
    )
    const seededProducts = await Promise.all(
      dummyProducts.map(product => Product.create(product))
    )
    const seededOrders = await Promise.all(
      dummyOrders.map(order => Order.create(order))
    )
    const seededReviews = await Promise.all(
      dummyReviews.map(review => Review.create(review))
    )

    //Associations
    //User has many orders (orders belongsTo user)
    let admin = seededUsers[0]
    await admin.setOrders(seededOrders)

    //User has many reviews (reviews belongTo user)
    let nonAdmin = seededUsers[0]
    await nonAdmin.setReviews(seededReviews)

    //Order has many products (products belongTo order)
    let order1 = seededOrders[0]
    await Order.addLineItem(1, 1, 3)
    await Order.addLineItem(1, 2, 5)
    await Order.addLineItem(1, 4, 1)
    await Order.addLineItem(1, 3, 6)

    //Products have many reviews (review belongsTo product)
    let product1 = seededProducts[1]
    await product1.setReviews(seededReviews)

    let totalUsers = dummyUsers.length
    let totalProducts = dummyProducts.length
    let totalOrders = dummyOrders.length
    let totalReviews = dummyReviews.length

    console.log(
      `Database seeded with ${totalUsers} users, ${totalProducts} products, ${totalOrders} orders and ${totalReviews} reviews. Wahoo!`
    )
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = smallSeed

if (require.main === module) {
  smallSeed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red(err))
      db.close()
    })
}
