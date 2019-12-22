const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Evelyn Ralda'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Evelyn Ralda'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Evelyn Ralda',
    helpText: 'This is some helpful text',
  })
})

app.get('/weather', (req, res) => {
  const { place } = req.query

  if (!place) return res.send({
    error: 'Place is required',
  })

  geocode(place, (err, { latitude, longitude, location } = {}) => {
    if (err) return res.send({ error: err })

    forecast(latitude, longitude, (err, data) => {
      if (err) return res.send({ error: err })

      res.send({
        place,
        location,
        forecast: data,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Evelyn Ralda',
    errorMessage: 'Help article not found.',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Evelyn Ralda',
    errorMessage: 'Page not found',
  })
})

app.listen(port, () => {
  console.log('rocking on port', port)
})
