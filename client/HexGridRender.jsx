import React, { Component } from 'react';
import HexNodeRender from './HexNodeRender';
import HexGrid from '../HexGrid.js';

class HexGridRender extends Component {
  constructor() {
    const board = HexGrid.connectBoard(HexGrid.populateBoard(5));    
    
  }
}

export default HexGridRender;