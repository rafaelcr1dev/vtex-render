import React from 'react';
import ReactDOM from 'react-dom';
import ExempleComponent from './components/Exemple/ExempleComponentReact.tsx';

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<ExempleComponent />, wrapper) : false;
