import React, { Component } from 'react';
import { render } from 'react-dom';
import HexGridRender from './HexGridRender.jsx';

class App extends Component {
  render() {
    return (
      <HexGridRender />
    )
  }
}

render(<App />, document.querySelector('#root'));
