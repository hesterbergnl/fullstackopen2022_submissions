const Persons = ({person, deleteMethod}) => {
  return <div> {person.name} {person.number} <button onClick={deleteMethod}>Delete</button></div>
}

export default Persons
