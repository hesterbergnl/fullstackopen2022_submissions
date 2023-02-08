import { useState, useEffect } from 'react'
import countryAPIService from './services/countryAPIService.js'

const Country = ({country}) => {
  return <div> {country.name.common} </div>
}

const Language = ({keys, language}) => {
  return <li> {language} </li>
}

const CountryDetails = ({country}) => {
  var keys = Object.keys(country.languages)

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
    </div>
  )
}

const Countries = ({countries}) => {
  if (countries.length == 1) {
    return <CountryDetails country={countries[0]}/>
  }

  if (countries.length < 11) {
    return <> {countries.map(country => <Country key={country.cca2} country={country}/>)} </>
  }

  return <> Too many matches, specify another filter </>

}

const Search = ({search, updateSearch}) => {
  return <input value={search} onChange={updateSearch} />
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryAPIService.getAll()
      .then(countryList => {
        setCountries(countryList)
      })
  }, [])

  const updateSearch = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = (search === '') ? countries : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <Search search={search} updateSearch={updateSearch} />
      <div>
        <Countries countries={countriesToShow} />
      </div>

    </div>
  )
}

export default App
