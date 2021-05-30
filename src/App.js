import { useRef, useState } from 'react';
import Component from './Component';
import { Context } from './context';
import './App.css';

function App() {
  const [a, setA] = useState(5);
  const [b, setB] = useState(12);
  const [sum, setSum] = useState(null);
  const [context, setContext] = useState('this comes from react');
  const componentRef = useRef();

  return (
    <Context.Provider value={context}>
      <h1>Im in Svelte</h1>
      <Component
        a={a}
        b={b}
        onAChange={setA}
        onBChange={setB}
        sum={sum}
        onSUMChange={setSum}
        ref={componentRef}
      />
      <hr />
      <h1>Im in React</h1>
      <div>a: {a}</div>
      <div>b: {b}</div>
      <div>sum: {sum}</div>
      <div>context: {context}</div>

      <input
        value={context}
        onChange={(event) => setContext(event.currentTarget.value)}
      />
      <button onClick={() => componentRef.current.reset()}>Reset</button>
      <button onClick={() => componentRef.current.random()}>Random</button>
      <button onClick={() => setA(a + 5)}>a+=5</button>
    </Context.Provider>
  );
}

export default App;
