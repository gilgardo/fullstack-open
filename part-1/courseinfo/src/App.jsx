import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  const { name, parts } = course;

  const totExercises = parts.reduce(
    (tot, current) => tot + current.exercises,
    0
  );

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total tot={totExercises} />
    </div>
  );
};

export default App;
