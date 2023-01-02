const Course = ({ course }) => {
  return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
}

const Header = ({ course }) => <h1>{course}</h1>

//This method works by setting the accumulator to initial value (0)
//Then iterating throught the array and doing the function defined (accumulator + part.exercises)
//This will sum quantity of all exercises starting with the initial value of 0
const Total = ({ parts }) =>
<p><b>Number of exercises {
  parts.reduce(
    (accumulator, part) => accumulator + part.exercises, 0
  )}
</b>
</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

// Map each part from the list into a part component.  Add a unique key to each per react requirements
const Content = ({ parts }) =>
  <>
    {parts.map(part=><Part key={part.id} part={part}/>)}
  </>

export default Course
