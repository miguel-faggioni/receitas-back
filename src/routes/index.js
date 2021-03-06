const { expressjwt: jwt } = require('express-jwt')
require('dotenv').config()
const isRevokedCallback = require('../services/jwt').isRevokedCallback

const middlewares = require('../middlewares')

const AuthRoute = require('./auth.route')
const HealthRoute = require('./health.route')
const RecipesRoute = require('./recipes.route')
const MyIngredientsRoute = require('./my-ingredients.route')
const IngredientsRoute = require('./ingredients.route')
const FeedbackRoute = require('./feedback.route')

module.exports = [
  {
    path: '/health',
    middleware: [],
    handler: HealthRoute,
  },
  {
    path: '/auth',
    middleware: [
      jwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevokedCallback,
      }).unless({
        path: [
          { url: '/auth/login', methods: ['POST'] },
          { url: '/auth/register', methods: ['POST'] },
        ],
      }),
    ],
    handler: AuthRoute,
  },
  {
    path: '/recipes',
    middleware: [],
    handler: RecipesRoute,
  },
  {
    path: '/ingredients',
    middleware: [],
    handler: IngredientsRoute,
  },
  {
    path: '/my-ingredients',
    middleware: [
      jwt({
        secret: process.env.SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevokedCallback,
      }),
    ],
    handler: MyIngredientsRoute,
  },
  {
    path: '/feedback',
    middleware: [],
    handler: FeedbackRoute,
  },
]
