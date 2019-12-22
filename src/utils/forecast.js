const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/7439d3a9f7365fc80c9ac1a99255fbc4/${lat},${long}?units=si`

  request({ url, json: true }, (error, { body }) => {
    if (error) callback('unable to connect to weather service!')
    else if (body.error) callback('unable to find location')
    else callback(null, (
      `It is currently ${body.currently.temperature}` +
      ` degrees out. The high today is ${body.daily.data[0].temperatureHigh},` +
      ` with a low of ${body.daily.data[0].temperatureLow}.` +
      ` There is a ${body.currently.precipProbability}% chance of rain.`
    ))
  })
}

module.exports = forecast
