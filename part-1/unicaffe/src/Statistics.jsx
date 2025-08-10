import StatisticsLine from "./StatisticsLine";
const Statistics = ({ data }) => {
  const entries = Object.entries(data);

  const updateValue = (key, value) => {
    if (key !== "positive") return value;
    return `${value} %`;
  };
  return (
    <>
      <h2>Statistics</h2>
      {data.all > 0 ? (
        <table>
          <tbody>
            {entries.map(([key, value]) => (
              <StatisticsLine
                key={key}
                text={key}
                value={updateValue(key, value)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p> No feedback given</p>
      )}
    </>
  );
};

export default Statistics;
