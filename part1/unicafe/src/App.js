import { useState } from 'react'

const Button = (props) => {

  return (
  <>
    <button onClick ={props.handleClick}> {props.text} </button>
  </> )
}

const Statistics = (props) => {
  const total = props.good + props.bad + props.neutral
  const avg = ((props.good * 1) + (props.bad * 0) + (props.bad * -1)) / total
  const positivePercent = props.good / total

  if(total === 0) {
    return(
      <p>
        No Feedback given
      </p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={avg}/>
        <StatisticLine text="positive" value={positivePercent + " %"}/>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <p>
        <Button handleClick = {handleGood} text="Good"/>
        <Button handleClick = {handleNeutral} text="Neutral"/>
        <Button handleClick = {handleBad} text="Bad"/>
      </p>
      <>
        <Statistics good = {good} bad = {bad} neutral = {neutral} />
      </>
    </>
  )
}

export default App