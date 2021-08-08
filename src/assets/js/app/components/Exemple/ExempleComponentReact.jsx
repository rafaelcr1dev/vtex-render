import React, { useState } from 'react';
import './style.scss';

const ExempleComponent = ({ text }) => {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <>
      <h2>React exemple</h2>
      <div>
        Count {text}: {count}
      </div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </>
  );
};

ExempleComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ExempleComponent;
