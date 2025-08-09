import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exercises }) => (
        <Part key={name} name={name} exercises={exercises} />
      ))}
    </>
  );
};

export default Content;
