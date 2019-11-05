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
    defaultBilling: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    defaultShipping: `${faker.address.countryCode()} ${faker.address.streetAddress()} ${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
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
    battleshipName: 'Warspite',
    stock: 0,
    description:
      'This ship has SEEN BATTLE ACTION and has real missiles that may go off at ANY MOMENT. NOT for the faint of heart.',
    price: 430000000,
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg',
    tags: ['British', 'battleship', 'gently used']
  },
  {
    status: true,
    battleshipName: 'U.S.S. Maine',
    stock: 1,
    description:
      'USS Main (ACR-1) was a U.S. Navy ship that sank in Havana Harbor. It has been recently restored to previous glory.',
    price: 4000000,
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg',
    tags: ['U.S.', 'cruiser', 'naval', 'retrofitted']
  },

  //Edge Cases TK
  // no photo
  {
    status: true,
    battleshipName: 'U.S.S. Indiana',
    stock: 10,
    description:
      'USS Indiana transported cows and corn for the troops. It still has corn. Yum! And ... a distinct smell.',
    price: 1000000,
    tags: ['U.S.', 'cruiser', 'naval', 'retrofitted']
  },
  // no stock given
  {
    status: false,
    battleshipName: 'Roma',
    description: 'Roma. What a ship. What a battle.',
    price: 10000007,
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg',
    tags: ['Italian', 'cruiser', 'naval', 'retrofitted']
  }
]

//order
const orderItems = [
  {
    itemId: Math.ceil(Math.random() * 102),
    qty: Math.ceil(Math.random() * 10)
  },
  {
    itemId: Math.ceil(Math.random() * 102),
    qty: Math.ceil(Math.random() * 10)
  },
  {
    itemId: Math.ceil(Math.random() * 102),
    qty: Math.ceil(Math.random() * 10)
  }
]

const orderStatus = [
  'in-cart',
  'payment-in-progress',
  'cancelled',
  'paid',
  'shipped',
  'delivered',
  'in-dispute',
  'completed'
][Math.round(Math.random() * 8)]

const dummyOrders = [
  //cancelled order
  {
    orderItems,
    status: 'cancelled'
  },

  //inCart
  {
    orderItems,
    status: 'in-cart'
  },

  //customer completing payment
  {
    orderItems,
    status: 'payment-in-progress'
  },

  //paid
  {
    orderItems,
    status: 'paid'
  },
  //shipped
  {
    orderItems,
    status: 'shipped'
  },

  //delivered
  {
    orderItems,
    status: 'delivered'
  },

  //in-dispute
  {
    orderItems,
    status: 'in-dispute'
  }
]

//reviews
const rating = [1, 2, 3, 4, 5][Math.ceil(Math.random() * 5)]

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
    let order1 = seededOrders[0]
    order1.setProducts(seededProducts)

    //Products have many reviews (review belongsTo product)
    let product1 = seededProducts[1]
    product1.setReviews(seededReviews)

    //fake products
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
        battleshipName:
          'U.S.S.' + faker.name.firstName() + faker.name.lastName(),
        stock: Math.round(Math.random() * 100),
        description: faker.lorem.text(),
        price: faker.random.number() / 100, // integer with two decimal places
        tags: addTags()
      }

      const order = {
        orderItems,
        status: orderStatus
      }

      const review = {
        description: faker.lorem.text(),
        rating
      }

      await User.create(user)
      await Product.create(product)
      await Order.create(order)
      await Review.create(review)
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
