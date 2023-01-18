import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  const addNewName = (event) => {
    event.preventDefault()

    var index = persons.findIndex(person => person.name === newName)

    if(index === -1) {
      var newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
    else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const personsToShow = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} updateFilter={updateFilter} />

      <h2>Add New </h2>

      <PersonForm addNewName={addNewName} newName={newName} updateNewName={updateNewName} newNumber={newNumber} updateNewNumber={updateNewNumber}/>

      <h2>Numbers</h2>

      {personsToShow.map(person => <Persons key={person.id} person={person} />)}

    </div>
  )
}

export default App
