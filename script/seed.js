const faker = require('faker')
const {db, User, Order, Product, Review} = require('../server/db')
const {green, red} = require('chalk')

//Fake user data variables
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const email = faker.internet.email()
const password = '12345'
const userStatus = ['admin', 'user'][Math.round(Math.random())]
const googleId = faker.random.uuid()
const facebookId = faker.random.uuid()
const billingAddress = {
  countryCode: faker.address.countryCode(),
  streetAddress: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  zipCode: faker.address.zipCode()
}
const shippingAddress = {
  countryCode: faker.address.countryCode(),
  streetAddress: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.stateAbbr(),
  zipCode: faker.address.zipCode()
}

const totalSeeds = 1
//user

const dummyUsers = [
  //admin dummy user
  {
    name: firstName + lastName,
    email: 'steve@steve.com',
    password,
    status: 'admin',
    googleId,
    facebookId,
    billingAddress,
    shippingAddress
  }

  //Edge Cases TK
  // guest user with cookie/jwt
  // user w/ email & pwd
  // user w/ google
  // user w/ facebook
]

//Product
/*const productStatus = ['Out of stock', 'Currently available'][
  Math.round(Math.random())
]*/
const productStatus = faker.random.boolean()
const battleshipName = 'U.S.S.' + firstName + lastName
const stock = Math.round(Math.random() * 100)
const description = faker.lorem.text()
const price = faker.random.number() / 100 // integer with two decimal places
const photo =
  'https://en.wikipedia.org/wiki/List_of_battleships_of_the_United_States_Navy#/media/File:USS_Texas_(1895-1911).jpg'
const tags = [
  // todo : no repetition
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
  // todo: price and status
  //admin dummy user
  {
    status: 'Out of stock',
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
    status: 'Currently available',
    battleshipName: 'U.S.S. Maine',
    stock: 1,
    description:
      'USS Main (ACR-1) was a U.S. Navy ship that sank in Havana Harbor. It has been recently restored to previous glory.',
    price: 4000000,
    photo:
      'https://upload.wikimedia.org/wikipedia/commons/c/c0/HMS_Warspite%2C_Indian_Ocean_1942.jpg',
    tags: ['U.S.', 'cruiser', 'naval', 'retrofitted']
  }

  //Edge Cases TK
  // no photo
  // no stock given
  // no price given
]

//order
const orderItems = {
  itemId: Math.ceil(Math.random() * 102),
  qty: Math.ceil(Math.random() * 10)
}
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
const reviewDescription = faker.lorem.text()
const rating = [1, 2, 3, 4, 5][Math.ceil(Math.random() * 5)]

const dummyReviews = [
  {
    description: reviewDescription,
    rating: 1
  },
  {
    description: reviewDescription,
    rating: 5
  }
]

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
        firstName,
        lastName,
        email,
        password,
        status: userStatus,
        googleId,
        facebookId,
        addresses: [billingAddress, shippingAddress]
      }

      const product = {
        status: productStatus,
        battleshipName,
        stock,
        description,
        price,
        photo,
        tags
      }

      const order = {
        orderItems,
        status: orderStatus
      }

      const review = {
        reviewDescription,
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
