const faker = require('faker')
const {db, User, Order, Product, Review} = require('../server/db')
const {green, red} = require('chalk')

const totalSeeds = 100

//dummy users
const dummyUsers = [
  //admin dummy user
  {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: 'steve@steve.com',
    password: '12345',
    status: 'admin',
    googleId: faker.random.uuid(),
    facebookId: faker.random.uuid(),
    defaultBillingAddress: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    defaultShippingAddress: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    addresses: [this.defaultBilling, this.defaultShipping]
  },

  {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: 'linda@linda.com',
    password: '12345',
    status: 'user',
    googleId: faker.random.uuid(),
    facebookId: faker.random.uuid(),
    defaultBillingAddress: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    defaultShippingAddress: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    addresses: [this.defaultBilling, this.defaultShipping]
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
    stock: 5,
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
  //inCart
  {
    status: 'in-cart',
    subtotal: 100000,
    total: 110000,
    address: '1010 Binary Lane, CPU AR 60657'
  },

  //cancelled order
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
    description: 'Very Fetching.',
    stars: 1
  },
  {
    description: 'Best Boat Bar None.',
    stars: 5
  }
]

function addTags() {
  let categories = [
    'WWI',
    'WWII',
    '305 mm',
    'France',
    'French',
    'naval',
    'heavy cruiser',
    'Russian',
    'destroyer',
    'U.S.',
    'British',
    'steel',
    'retrofitted',
    'light aircraft carrier',
    'battleship',
    'gently used',
    'fixer upper'
  ]

  let myTags = []

  let numTags = Math.ceil(Math.random() * 5)
  for (let i = 0; i < numTags; i++) {
    myTags.push(categories[Math.floor(Math.random() * categories.length)])
  }

  return myTags
}

const bigSeed = async () => {
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
    admin.addOrder(seededOrders[0])

    //User has many reviews (reviews belongTo user)
    let nonAdmin = seededUsers[0]
    nonAdmin.setReviews(seededReviews)

    //Order has many products (products belongTo order)
    await Order.addItemToOrder(3, 1)
    await Order.addItemToOrder(3, 2)
    await Order.addItemToOrder(3, 3)
    await Order.addItemToOrder(3, 3)
    await Order.addItemToOrder(3, 3)
    await Order.addItemToOrder(3, 3)
    await Order.addItemToOrder(3, 3)

    //Products have many reviews (review belongsTo product)
    let product1 = seededProducts[1]
    product1.setReviews(seededReviews)

    //fake products created at large
    for (let i = 0; i < totalSeeds; i++) {
      const user = {
        name: faker.name.firstName() + faker.name.lastName(),
        email: faker.internet.email(),
        password: '12345',
        status: ['admin', 'user', 'guest'][Math.round(Math.random())],
        googleId: faker.random.uuid(),
        facebookId: faker.random.uuid(),
        defaultBilling: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        defaultShipping: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        addresses: [this.defaultBilling, this.defaultShipping]
      }

      const product = {
        status: faker.random.boolean(),
        name: 'U.S.S.' + faker.name.firstName() + ' ' + faker.name.lastName(),
        stock: Math.round(Math.random() * 100),
        description: faker.lorem.text(),
        price: faker.random.number(),
        tags: addTags()
      }

      const tempnumber = faker.random.number()
      const order = {
        status: [
          'in-cart',
          'payment-in-progress',
          'cancelled',
          'paid',
          'shipped',
          'delivered',
          'in-dispute',
          'completed'
        ][Math.floor(Math.random() * 8)],
        subtotal: tempnumber,
        total: Math.round(tempnumber * 1.25),
        address: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`
      }

      const review = {
        description: faker.lorem.text(),
        stars: [1, 2, 3, 4, 5][Math.ceil(Math.random() * 5)]
      }

      await Promise.all([
        User.create(user),
        Product.create(product),
        Order.create(order),
        Review.create(review)
      ])
    }

    let totalUsers = totalSeeds + dummyUsers.length
    let totalProducts = totalSeeds + dummyProducts.length
    let totalOrders = totalSeeds + dummyOrders.length
    let totalReviews = totalSeeds + dummyReviews.length

    console.log(
      `Database seeded with ${totalUsers} users, ${totalProducts} products, ${totalOrders} orders and ${totalReviews} reviews. Wahoo!`
    )
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = bigSeed

if (require.main === module) {
  bigSeed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red(err))
      db.close()
    })
}
