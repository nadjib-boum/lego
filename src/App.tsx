import { lego, useLego, useLegoValue } from "./lego";

const legoCounter = lego(0);
const legoDouble = lego((get) => get(legoCounter) * 2);
const legoData = lego(() =>
  fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    res.json()
  )
);

function Counter() {
  const [count, setCount] = useLego(legoCounter);
  const double = useLegoValue(legoDouble);
  const data = useLegoValue(legoData);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {double}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h3>Data</h3>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>This Is Counter</h1>
      <Counter />
    </div>
  );
}

export default App;
