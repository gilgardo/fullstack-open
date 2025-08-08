import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const App = () => {
  const course = "Half Stack application development";

  const parts = [
    { title: "Fundamentals of React", exercises: 10 },
    { title: "Using props to pass data", exercises: 7 },
    { title: "State of a component", exercises: 14 },
  ];
  const totExercises = parts.reduce(
    (tot, current) => tot + current.exercises,
    0
  );

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total tot={totExercises} />
    </div>
  );
};

export default App;
