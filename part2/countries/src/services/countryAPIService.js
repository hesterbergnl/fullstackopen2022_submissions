import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/'
const baseUrlWeather = 'http://api.openweathermap.org/data/2.5/weather?q='

const api_key = process.env.REACT_APP_API_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeatherCity = (city) => {
    const request = axios.get(`${baseUrlWeather}${city}&appid=${api_key}`)
    return request.then(response => response.data)
}

const countryAPIService = {getAll, getWeatherCity}

export default countryAPIService
