const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNewName}>
      <div>
        name: <input value={props.newName} onChange={props.updateNewName} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.updateNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
