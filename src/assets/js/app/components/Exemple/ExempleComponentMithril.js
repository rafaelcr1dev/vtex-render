/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import m from 'mithril';
import './style.scss';

export default function ComponentWithState() {
  var count = 0;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  return {
    view: function () {
      return m(
        'div',
        m('h2', 'Mithril exemple'),
        m('p', 'Count: ' + count),
        m(
          'button',
          {
            onclick: increment,
          },
          'Increment'
        ),
        m(
          'button',
          {
            onclick: decrement,
          },
          'Decrement'
        )
      );
    },
  };
}
