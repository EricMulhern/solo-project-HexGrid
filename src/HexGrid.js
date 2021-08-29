// recursively render a circle grid of hexagons

// r: distance from center of center hexagon. 
// each recursion will render 6 hexagons at a distance r * x from center, at 60° from each other
// r will always increase by r every recursion ??
// each recursion will be offset by n°
// 1st rec: offset = 0
//          r = 34
// 2nd rec: offset = 29.5°
//          r = 60
// 3rd rec: offset = 31°
//          r = 69.5
// 4th rec: 
//          r = 



//==================================================================

class HexNode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.nw = null;
    this.ne = null;
    this.w = null;
    this.e = null;
    this.sw = null;
    this.se = null;
  }

// generate a hexagonal grid of HexNode objects (as a nested array or object)
  // r = radius: number of nodes from edge to center (inclusive)
  /* ex. r = 3
          Node Node Node
       Node Node Node Node
     Node Node Node Node Node
       Node Node Node Node
          Node Node Node

          with indices:

      (y)          (x)
      --------------------
       2  |      -2  0  2
       1  |    -3  -1  1  3
       0  |  -4  -2  0  2  4
      -1  |    -3  -1  1  3
      -2  |      -2  0  2
  
  */
 
  static populateBoard(r) {
    const hexObj = {};
    let offset = 0;
    for (let i = 1; i <= r; i++) { 
      let y = i - r;
      offset--;
      const rowNeg = {};
      const rowPos = {};
      for (let j = 0; j <= 2 * i + 2 * r - 3; j += 2) {
        let x = j - r + offset + 2;
        rowNeg[x] = new HexNode(x, y); // replace empty str with new HexNode obj
        rowPos[x] = new HexNode(x, -y); // 
      }
      hexObj[y] = rowNeg;
      if (r - i !== 0) {
        hexObj[-y] = rowPos;
      }
    }
    // console.log(`r is: ${r}`);
    // console.log(`hexObj[0].length: ${Object.keys(hexObj[0]).length}. should be ${r*2-1}`);
    // console.log(`hexObj[-r-1].length: ${Object.keys(hexObj[-r+1]).length}. should be ${r}`);
    return hexObj;
  }

  // given a board of hexNodes, connect them to form a graph.
  static connectBoard(board) {
    // iterate thru rows of board. for each node,
    for (const rowI in board) {
      const row = board[rowI];
      for (const nodeI in row) {
        const node = row[nodeI];
        // if node at direction NW is in bounds, assign node at y+1, x-1 to property
        if (board[node.y+1] !== undefined && board[node.y+1][node.x-1] !== undefined) node.nw = board[node.y+1][node.x-1];
        // if node at direction NE is in bounds, assign node at y+1, x+1 to property
        if (board[node.y+1] !== undefined && board[node.y+1][node.x+1] !== undefined) node.ne = board[node.y+1][node.x+1];
        // if node at direction W  is in bounds, assign node at y,  x-2 to property
        if (board[node.y] !== undefined && row[node.x-2] !== undefined) node.w = board[node.y][node.x-2];
        // if node at direction E  is in bounds, assign node at y,  x+2 to property
        if (board[node.y] !== undefined && row[node.x+2] !== undefined) node.e = board[node.y][node.x+2];
        // if node at direction SW is in bounds, assign node at y-1, x-1 to property
        if (board[node.y-1] !== undefined && board[node.y-1][node.x-1] !== undefined) node.sw = board[node.y-1][node.x-1];
        // if node at direction SE is in bounds, assign node at y-1, x+1 to property
        if (board[node.y-1] !== undefined && board[node.y-1][node.x+1] !== undefined) node.se = board[node.y-1][node.x+1];
      }
    }
    return board;
  }

  // recursively traverse the board and invoke callback, passing in each node
  static animate(node, callback) {
    callback();

    if (node['nw']) setTimeout(this.animate.bind(this), 700, node['nw'], callback);
    if (node['nw']) setTimeout(this.animate.bind(this), 700, node['ne'], callback);
    if (node['w']) setTimeout(this.animate.bind(this), 700, node['w'], callback);
    if (node['e']) setTimeout(this.animate.bind(this), 700, node['e'], callback);
    if (node['sw']) setTimeout(this.animate.bind(this), 700, node['sw'], callback);
    if (node['se']) setTimeout(this.animate.bind(this), 700, node['se'], callback);

    
    // if node is present at directional prop, invoke animate passing in that node
    // if (node['nw']) this.animate(node['nw'], callback);
    // if (node['ne']) this.animate(node['ne'], callback);
    // if (node['w']) this.animate(node['w'], callback);
    // if (node['e']) this.animate(node['e'], callback);
    // if (node['sw']) this.animate(node['sw'], callback);
    // if (node['se']) this.animate(node['se'], callback);
  }

}
            
// const testHex = new HexNode('asdf');
// testHex.generateBoard(5);
// testHex.populateBoard(9);
// testHex.populateBoard(7);
// testHex.populateBoard(5);
// testHex.connectBoard(testHex.populateBoard(3));

export default HexNode;