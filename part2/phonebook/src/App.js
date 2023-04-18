import { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService.js'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorFlag, setErrorFlag] = useState(true)

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(personsList => {
        console.log('promise fulfilled')
        setPersons(personsList)
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

    const p = persons.find(person => person.name === newName)

    if(typeof p === "undefined") {
      var newPerson = {
        name: newName,
        number: newNumber,
      }

      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorFlag(false)
          setErrorMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorFlag(true)
          setErrorMessage(
            `${error.response.data.error}`
          )
        })
    }
    else {
      const id = p.id

      if (p.number === newNumber) {
        alert(`${newName} exists in the phonebook with the number ${newNumber}, no changes made`)
      }
      else {
        if (window.confirm(`${newName} exists in the phonebook, update phone number with ${newNumber}?`)) {

          const updatedPerson = {...p, number: newNumber}

          console.log(updatedPerson)

          personService.update(p.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(per => per.id !== id ? per : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorFlag(true)
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
          })
        }
      }
    }
  }

  const personsToShow = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deleteMeMethod = (id) => {
    console.log(`need to delete: ${id}`)

    const lostSoul = persons.find(person => person.id === id)

    if(window.confirm(`Continue to delete ${lostSoul.name}?`)) {
      personService.deleteItem(id)
      .then(deletedItem => {
        // console.log(deletedItem)
        const oneLessPersons = persons.filter(person => person.id !== id)
        setPersons(oneLessPersons)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} updateFilter={updateFilter} />

      <h2>Add New </h2>

      <Notification message={errorMessage} errorFlag={errorFlag}/>

      <PersonForm addNewName={addNewName} newName={newName} updateNewName={updateNewName} newNumber={newNumber} updateNewNumber={updateNewNumber}/>

      <h2>Numbers</h2>

      {personsToShow.map(person => <Persons key={person.id} person={person} deleteMethod={() => deleteMeMethod(person.id)}/>)}

    </div>
  )
}

export default App
