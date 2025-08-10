const Buttons = ({ actions, handleDispatch }) => {
  return (
    <>
      {actions.map((action) => (
        <button key={action} onClick={() => handleDispatch(action)}>
          {action}
        </button>
      ))}
    </>
  );
};

export default Buttons;
