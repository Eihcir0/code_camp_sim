import React from 'react';
import ReactDOM from 'react-dom';
import GameMain from './components/game_main.jsx';

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDOM.render(<GameMain />, document.getElementById('root'));
});
