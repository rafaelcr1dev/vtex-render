/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import * as mithrilProxy from 'mithril';
import Fragment from '../Fragment';

var m = mithrilProxy.default || mithrilProxy;

interface Attrs {
  name: string;
  initialValue: number;
}

interface State {
  count: number;
  increment(): void;
  decrement(): void;
}

const Counter: m.Component<Attrs, State> = {
  oninit({ state }) {
    state.count = 0;
    state.increment = () => {
      state.count++;
    };
    state.decrement = () => {
      state.count--;
    };
  },
  view({ attrs, state }) {
    return (
      <Fragment>
        <div className="counter">
          <span>
            name: {attrs.name}, count: {state.count}
          </span>
          <button onclick={state.increment}>+</button>
          <button onclick={state.decrement}>-</button>
        </div>
      </Fragment>
    );
  },
};

export default Counter;
