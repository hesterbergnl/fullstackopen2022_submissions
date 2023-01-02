import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
