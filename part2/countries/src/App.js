import { useState, useEffect } from 'react'
import countryAPIService from './services/countryAPIService.js'

const Country = ({country, showMethod }) => {
  return <div>{country.name.common} <button onClick={showMethod}>Show</button></div>
}

const Language = ({keys, language}) => {
  return <li> {language} </li>
}

const CountryDetails = ({country, weather, setWeather}) => {
  useEffect(() => {
      countryAPIService.getWeatherCity(country.capital)
        .then(weather => {
          setWeather(weather)
      }).catch(error => console.log(error))
  }, [country])

  if (country !== null) {
    const keys = Object.keys(country.languages)

    if (weather != null) {
      return (
      <div>
        <h2> {country.name.common} </h2>
        <p> Capital: {country.capital} </p>
        <p> Area: {country.area} </p>
        {console.log(keys)}
        <h3> Languages </h3>
        <ul> {keys.map(key => <Language key={key} language={country.languages[key]}/>)} </ul>
        {console.log(country.flags.png)}
        <img src={country.flags.png} alt='flag'/>

        <h3> Weather for {country.capital} </h3>
        <p> Temperature: {(Math.round((weather.main.temp - 273) * 100) / 100).toFixed(2)} C</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='icon'/>
        <p>Wind: {(Math.round((weather.wind.speed) * 100) / 100).toFixed(2)} m/s </p>

      </div>
      )
    }

    return <h2> {country.name.common} </h2>

  }
}

const Countries = ({countries, selectedCountry, setSelectedCountry, setWeather, weather}) => {
  const showMethod = (id) => {
    const foundCountry = countries.find(country => country.cca2 === id)
    console.log(foundCountry)
    setSelectedCountry(foundCountry)
    setWeather(null)
  }

  if (selectedCountry !== null) {
    return <CountryDetails country={selectedCountry} setWeather={setWeather} weather={weather}/>
  }

  if (countries.length === 1) {
    setSelectedCountry(countries[0])
    setWeather(null)
    // return <CountryDetails country={selectedCountry} setWeather={setWeather} weather={weather}/>
  }

  if (countries.length < 11) {
    if(selectedCountry != null) {
      setSelectedCountry(null)
    }
    return <> {countries.map(country => <Country key={country.cca2} country={country} showMethod={() => showMethod(country.cca2)}/>)} </>
  }

  return <> Too many matches, specify another filter </>

}

const Search = ({search, updateSearch}) => {
  return <input value={search} onChange={updateSearch} />
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryAPIService.getAll()
      .then(countryList => {
        setCountries(countryList)
      })
  }, [])

  const updateSearch = (event) => {
    console.log("I'm updating")
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const countriesToShow = (search === '') ? countries : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Search search={search} updateSearch={updateSearch} />
      <div>
        <Countries countries={countriesToShow} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} weather={weather} setWeather={setWeather}/>
      </div>

    </div>
  )
}

export default App
