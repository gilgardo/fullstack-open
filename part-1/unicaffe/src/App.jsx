import { useReducer } from "react";
import Buttons from "./Buttons";
import Statistics from "./Statistics";
import Title from "./Title";

const feedbackValues = { good: 1, neutral: 0, bad: -1 };

function reducer(state, { type }) {
  if (!(type in feedbackValues)) return state;
  return { ...state, [type]: state[type] + 1 };
}

export default function App() {
  const [counts, dispatch] = useReducer(reducer, {
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const all = Object.values(counts).reduce((sum, val) => sum + val, 0);
  const feedbackValue = Object.entries(counts).reduce(
    (sum, [key, val]) => sum + val * feedbackValues[key],
    0
  );
  const average = all > 0 ? feedbackValue / all : 0;
  const positive = all > 0 ? (counts.good * 100) / all : 0;
  const actions = Object.keys(feedbackValues);

  return (
    <>
      <Title />
      <Buttons
        actions={actions}
        handleDispatch={(type) => dispatch({ type })}
      />
      <Statistics data={{ ...counts, all, average, positive }} />
    </>
  );
}
