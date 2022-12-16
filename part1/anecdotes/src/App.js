import { useState } from 'react'

// General helper method that takes an array and returns
// index of highest value in the array
const indexOfMax = (array) => {
  if (array.length === 0) {
    return -1
  }

  var maxIndex = 0
  var max = array[0]

  for (var i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
      maxIndex = i
    }
  }
  
  return maxIndex
}

const DisplayAnecdote = (props) => {
  return (
    <>
      <p>
        {props.text}
      </p>
      <p>
        Votes: {props.votes}
      </p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const n = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(n).fill(0))

  const nextAction = () => {
    var next = Math.floor(Math.random() * n)
    setSelected(next)
  }

  var maxIndex = indexOfMax(Object.values(votes))

  const voteAction = () => {
    console.log(votes, "Voted!")
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <>
      <h1>
        Anecdote of the day
      </h1>
      <p>
        < DisplayAnecdote text={anecdotes[selected]} votes={votes[selected]} />
      </p>
      <p>
        <button onClick={voteAction}> Vote </button>
        <button onClick={nextAction}> Next Anecdote </button>
      </p>
      <h1>
        {console.log("Made it here")}
        Anecdote with most votes
      </h1>
      <p>
        {console.log(votes)}
        <DisplayAnecdote text={anecdotes[maxIndex]} votes={votes[maxIndex]}/>
      </p>
    </>
  )
}

export default App