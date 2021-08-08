import React, { useState } from 'react';
import './style.scss';

interface ExempleComponentPropTypes {
  text: string;
  store?: {
    name: string;
  };
}

const ExempleComponent = ({ text, store }: ExempleComponentPropTypes) => {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <>
      <h2>React exemple</h2>
      <div>Count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
      <div>Text: {text}</div>
      <div>Store: {store?.name ?? 'Corebiz'}</div>
    </>
  );
};

const defaultProps: ExempleComponentPropTypes = {
  text: 'Default text prop',
};

ExempleComponent.defaultProps = defaultProps;

export default ExempleComponent;
