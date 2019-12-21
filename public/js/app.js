const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

const weatherRequest = async (place) => {
  try {
    const res = await fetch(`http://localhost:3000/weather?place=${place}`)
    const {location, forecast, error} = await res.json()

    if (error) throw new Error(error)

    message1.textContent = location
    message2.textContent = forecast
  } catch(err) {
    message1.textContent = err
  }
}

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  message1.textContent = 'loading'
  message2.textContent = ''

  const location = search.value;
  weatherRequest(location)
})
