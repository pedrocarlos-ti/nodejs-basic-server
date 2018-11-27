const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(
  express.urlencoded({
    extended: false
  })
)
app.set('view engine', 'njk')

// Simple Middleware
const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  )

  return next()
}

const message = 'Hello World'

// Use Middleware in all routes
app.use(logMiddleware)

app.get('/', (req, res) => {
  res.render('home', {
    message
  })
})

// Format Query - GET /new?user=Pedro&idade=26
// Format Params - GET /new/:user
app.get('/new/:user', (req, res) => {
  const message = {
    hello: req.params.user
  }
  return res.json(message)
})

app.listen(3000, console.log('Running on port 3000'))
