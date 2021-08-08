import m from 'mithril';
// import ExempleComponent from './components/Exemple/ExempleComponentMithril.js';
import ExempleComponent from './components/Exemple/ExempleComponentMithril.tsx';

if (document.getElementById('app'))
  m.mount(document.getElementById('app'), {
    view: function () {
      return m(ExempleComponent, {
        name: 'Mithril JSX exemple',
      });
    },
  });
