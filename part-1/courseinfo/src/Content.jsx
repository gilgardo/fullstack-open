const Content = ({ parts }) => {
  return (
    <>
      {parts.map(({ title, exercises }) => (
        <p key={title}>
          {title} {exercises}
        </p>
      ))}
    </>
  );
};

export default Content;
