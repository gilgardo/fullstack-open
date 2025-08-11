import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
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

export default Course;
