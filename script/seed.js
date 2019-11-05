const faker = require('faker')
const {db, User, Order, Product, Review} = require('./server/db')
const {green, red} = require('chalk')

///User
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const password = '12345'
const userStatus = ['admin', 'user'][Math.round(Math.random())]
const googleId = faker.random.uuid()
const facebookId = faker.random.uuid()
const billingAddress = {
  countryCode: address.countryCode(),
  streetAddress: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  zipCode: faker.address.zipCode()
}
const shippingAddress = {
  countryCode: address.countryCode(),
  streetAddress: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  zipCode: faker.address.zipCode()
}

const totalSeeds = 100
//user

const dummyUsers = [
  //admin dummy user
  {
    firstName,
    lastName,
    email,
    password,
    status: 'admin',
    googleId,
    facebookId,
    billingAddress,
    shippingAddress
  }

  //Edge Cases TK
]

//Product
const productStatus = ['Out of stock', 'Currently available'][
  Math.round(Math.random())
]
const battleshipName = 'U.S.S.' + firstName + lastName
const stock = Math.round(Math.Random() * 100)
const description = faker.lorem.text()
const price = '$' + Math.ceil(Math.random() * 100) + 'M'
const photo =
  'https://en.wikipedia.org/wiki/List_of_battleships_of_the_United_States_Navy#/media/File:USS_Texas_(1895-1911).jpg'
const tags = [
  [
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
  ][Math.round(Math.random())],
  [
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
  ][Math.round(Math.random())],
  [
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
  ][Math.round(Math.random())]
]

const dummyProducts = [
  //admin dummy user
  {
    status: 'Out of stock',
    battleshipName: 'Warspite',
    stock: 0,
    description:
      'This ship has SEEN BATTLE ACTION and has real missiles that may go off at ANY MOMENT. NOT for the faint of heart.',
    price: '$430M',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg',
    tags: ['British', 'battleship', 'gently used']
  },
  {
    status: 'Currently available',
    battleshipName: 'U.S.S. Maine',
    stock: 1,
    description:
      'USS Main (ACR-1) was a U.S. Navy ship that sank in Havana Harbor. It has been recently restored to previous glory.',
    price: '$4M',
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg',
    tags: ['U.S.', 'cruiser', 'naval', 'retrofitted']
  }

  //Edge Cases TK
]

//order
const orderItems = {
  itemId: Math.ceil(Math.random() * 102),
  qty: Math.ceil(Math.random() * 10)
}
const orderStatus = [
  'in-cart',
  'cancelled',
  'payment-in-progress',
  'paid',
  'shipped',
  'delivered',
  'in-dispute'
][Math.round(Math.random() * 5)]

// const cancelTime = faker.date.future()
// const paymentInProgressTime = faker.date.future()
// const paidTime = faker.date.future()
// const shippedTime = faker.date.future()
// const deliveredTime = faker.date.future()
// const inDisputeTime = faker.date.future()

const dummyOrders = [
  //cancelled order
  {
    orderItems,
    status: 'Cancelled'
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

const bigSeed = async () => {
  try {
    await database.sync({force: true})
    const dummyUsers = await Promise.all(
      dummyUsers.map(user => User.create(user))
    )
    const dummyProducts = await Promise.all(
      dummyProducts.map(product => Product.create(product))
    )
    const dummyOrders = await Promise.all(
      dummyOrders.map(order => Order.create(order))
    )

    //tk other models

    //fake users
    for (let i = 0; i < totalSeeds; i++) {
      const user = {
        firstName,
        lastName,
        email,
        password,
        status: userStatus,
        googleId,
        facebookId,
        billingAddress,
        shippingAddress
      }
      await User.create(user)
    }

    //fake products
    for (let i = 0; i < totalSeeds; i++) {
      const product = {
        status: productStatus,
        battleshipName,
        stock,
        description,
        price,
        photo,
        tags
      }
      await Product.create(product)
    }

    //fake orders
    for (let i = 0; i < totalSeeds; i++) {
      const order = {
        orderItems,
        status: orderStatus
      }
      await Order.create(product)
    }

    let totalUsers = totalSeeds + dummyUsers.length
    let totalProducts = totalSeeds + dummyProducts.length
    let totalOrders = totalSeeds + dummyOrders.length

    console.log(
      `Database seeded with ${totalUsers} users, ${totalProducts} products and ${totalOrders} orders`
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
