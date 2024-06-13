import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  Button,
  Pizza,
  Counter,
  PlayPause,
  SelfDestory,
  ChangeLocale,
} from "./components/Button";
import { MyForm, MyForm3 } from "./components/Form";
import "./App.css";
import "./components/Button.css";

function App() {
  const [count, setCount] = useState(0);
  const [str, setStr] = useState("hekki");
  const fruits = ["apple", "boy", "cat"];
  return (
    <>
      <MyForm3></MyForm3>
      <MyForm></MyForm>
      <ChangeLocale></ChangeLocale>
      <SelfDestory></SelfDestory>
      <PlayPause></PlayPause>
      <Counter></Counter>
      <Pizza></Pizza>
      <button
        type="button"
        onClick={() => {
          setStr(str + Date.now());
        }}
      >
        <i>first button</i>
      </button>
      <div>
        string: {str} <br />
        number: {100} <br />
        boolean: {true} {false} <br />
        none: {null} {undefined} <br />
        sc: {false && "123"} {true && "8964"}
      </div>
      <Button>fuck</Button>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit}>{fruit}</li>
        ))}
      </ul>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
