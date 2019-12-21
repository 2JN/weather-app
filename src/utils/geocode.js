const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiMmoiLCJhIjoiY2p3ZGlpMWxxMTZwaTN6bzZ1YjkwZDRqZCJ9.9Me_gKNB8LNsrCD7J8U_6g`

  request({ url, json: true }, (err, res) => {
    if (err) callback('Unable to connect to location service!')
    else if (res.body.features.length === 0) callback('Unable to find location. Try another search')
    else {
      const {
        center: [longitude, latitude],
        place_name: location,
      } = res.body.features[0]

      callback(null, {
        latitude,
        longitude,
        location
      })
    }
  })
}

module.exports = geocode
