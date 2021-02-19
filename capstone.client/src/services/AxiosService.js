import Axios from 'axios'

let baseURLSetup = ''

// I was exploring the potential of using the site on the phone, but Auth0 restricts non-secure addresses. This code doesn't break anything; it's only setup in case we wanted to run https. - Danny
if (window.location.origin.includes('http://')) {
  baseURLSetup = window.location.origin.includes('localhost') ? 'http://localhost:3000' : window.location.origin.includes('192.168') ? 'http://192.168.0.31:3000' : ''
} else if (window.location.origin.includes('https://')) {
  baseURLSetup = window.location.origin.includes('localhost') ? 'https://localhost:3000' : window.location.origin.includes('192.168') ? 'https://192.168.0.31:3000' : ''
}

export const baseURL = baseURLSetup

export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const imageApi = Axios.create({
  baseURL: 'https://api.unsplash.com',
  timeout: 8000
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
