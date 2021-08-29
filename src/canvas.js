const a = 2 * Math.PI / 6;
const RADIUS = 7;
const BOARD_RADIUS = 31;

// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

function drawHexagon(x, y, r, count, curNode) {
  // console.log(count)
  c.beginPath();
  for (var i = 0; i < 6; i++) {
    c.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i)); // to rotate nodes: swap sin & cos. 
    // to rotate grid, swap x and y (if so, to center, swap x and y of starting node relative to window dimensions)
  }
  c.closePath();
  const rand0 = Math.random();
  const rand1 = Math.random() * 55; 
  const rand2 = Math.random() * 125;
  const rand2i = Math.random() * 125;
  const rand3 = Math.random() * 255;
  const rand3i = 255 - rand3;

  c.fillStyle = `rgba(${rand1}, ${rand1+50}, ${rand1 + 200}, ${curNode.intensity})`; // blues
  // c.fillStyle = `rgba(${rand2 + 130}, ${20}, ${rand1 + 200}, ${curNode.intensity})`; // pinks
  // c.fillStyle = `rgba(${rand3i}, ${rand3}, ${rand1}, ${.5})`;
  // c.fillStyle = `rgba(${rand1 + 120 - count*7}, ${rand1}, ${rand1 + 80 + count*7}, ${rand0})`;
  // c.fillStyle = `rgba(${randR * count / 10 % 105}, ${randG + 200}, ${255 - count * 60 % 255}, ${randA})`; //turquoise
  // c.fillStyle = `rgba(${200 + rand1}, ${rand2}, ${rand2}, ${rand0}})`; //pinks
  c.fill();
  // c.stroke();
}

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
    this.visited = false;
    this.intensity = Math.random();
  }

  static lowestAdjacent = [];

  static populateBoard(r) {
    const hexObj = {};
    let offset = 0;
    for (let i = 1; i <= r; i++) { 
      let y = i - r;
      offset--;
      const rowNeg = {};
      const rowPos = {};
      const rowLength = 2*i + 2*r - 3;
      rowNeg.length = rowLength;
      rowPos.length = rowLength;
      for (let j = 0; j <= rowLength; j += 2) {
        let x = j - r + offset + 2;
        rowNeg[x] = new HexNode(x, y); // replace empty str with new HexNode obj
        rowPos[x] = new HexNode(x, -y); // 
      }
      hexObj[y] = rowNeg;
      if (r - i !== 0) {
        hexObj[-y] = rowPos;
      }
    }
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

  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async multiRecurse(node, callback, ms, count = 0) {
    const curRad = Math.floor(Math.random()*RADIUS) * 3;
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x;
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    callback(x, y, RADIUS, count, node);
    if (node.x === 6 && node.y === 6) console.log(count);
    // if node is present at directional prop, invoke recurse passing in that node
    if (node['nw'] && !node['nw'].visited) {
      node['nw'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['nw'], callback, ms, count+1);
    } // else 
    if (node['ne'] && !node['ne'].visited) {
      node['ne'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['ne'], callback, ms, count+1);
    } // else 
    if (node['w'] && !node['w'].visited) {
      node['w'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['w'], callback, ms, count+1);
    } // else  
    if (node['e'] && !node['e'].visited) {
      node['e'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['e'], callback, ms, count+1);
    } // else  
    if (node['sw'] && !node['sw'].visited) {
      node['sw'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['sw'], callback, ms, count+1);
    } // else  
    if (node['se'] && !node['se'].visited) {
      node['se'].visited = true;
      await node.timeout(ms);
      this.multiRecurse(node['se'], callback, ms, count+1);
    }
  }

  async singleRecurse(node, callback, ms, count = 0) {
    const curRad = Math.random() * 14 + 2;
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x;
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    // node.visited = true;
    callback(x, y, RADIUS, count, node);
    if (node.x === 6 && node.y === 6) console.log(count);
    // if node is present at directional prop, invoke recurse passing in that node
    if (node['nw'] && !node['nw'].visited) {
      node['nw'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['nw'], callback, ms, count+1);
    } else 
    if (node['ne'] && !node['ne'].visited) {
      node['ne'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['ne'], callback, ms, count+1);
    } else 
    if (node['w'] && !node['w'].visited) {
      node['w'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['w'], callback, ms, count+1);
    } else  
    if (node['e'] && !node['e'].visited) {
      node['e'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['e'], callback, ms, count+1);
    } else  
    if (node['sw'] && !node['sw'].visited) {
      node['sw'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['sw'], callback, ms, count+1);
    } else  
    if (node['se'] && !node['se'].visited) {
      node['se'].visited = true;
      await node.timeout(ms);
      this.singleRecurse(node['se'], callback, ms, count+1);
    }
  }

  async sprinkle(board, callback, ms, reps) { // randomly draw *reps* number of nodes
    for (let i = 0; i < reps; i++) {
      await this.timeout(ms);
      const curRad = Math.floor(Math.random()*12) * 3;
      let y = Math.floor(Math.random() * (BOARD_RADIUS * 2 - 1) -  BOARD_RADIUS + 1);
      let x = Math.floor(Math.random() * board[y].length - (board[y].length-1)/2);
      if (Math.abs(y % 2) !== Math.abs(x % 2)) { // make sure that if one is even, the other is too & vv
        x > 0 ? x-- : x++;
      }
      const curNode = board[y][x];
      curNode.visited = true;
      callback(curNode.x * Math.sqrt(3/4)*curRad + window.innerWidth/2, 
               curNode.y * (curRad+curRad/2) + window.innerHeight/2, curRad, reps, curNode);
    }
  }

  async trickle(node, callback, ms, count = 0) {
    const x = window.innerWidth/2 + Math.sqrt(3/4)*RADIUS*node.x;
    const y = window.innerHeight/2 + node.y*(RADIUS+RADIUS/2);
    // node.visited = true;
    callback(x, y, RADIUS, count, node);


    if (node['nw'] && !node['nw'].visited) {
      HexNode.lowestAdjacent.push()
    }  
    if (node['ne'] && !node['ne'].visited) {

    }  
    if (node['w'] && !node['w'].visited) {

    }   
    if (node['e'] && !node['e'].visited) {

    }   
    if (node['sw'] && !node['sw'].visited) {

    }   
    if (node['se'] && !node['se'].visited) {

    }

    node['se'].visited = true;
    await node.timeout(ms);
    this.trickle(node['se'], callback, ms, count+1);
  }

  async linear(hex) {
    let count = 0;
    while (true) {
      for (let row in hex) {
        for (let node in hex[row]) {
          await node.timeout(4);
          const curRad = Math.random() * 20 + 2;
          const curNode = hex[row][node];
          drawHexagon(window.innerWidth/2 + Math.sqrt(3/4)*curRad*curNode.x, window.innerHeight/2 + curNode.y*(curRad+curRad/2), curRad, count);
          count++;
        }
      }
    }
  }

}
            
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

const hex = HexNode.populateBoard(BOARD_RADIUS);
HexNode.connectBoard(hex);
console.log(hex);
// hex[0][0].multiRecurse(hex[0][0], drawHexagon, 50);
// hex[0][0].multiRecurse(hex[-7][21], drawHexagon, 50);
hex[0][0].sprinkle(hex, drawHexagon, 4, Infinity);
// hex[0][0].singleRecurse(hex[0][0], drawHexagon, 20);
// hex[0][0].trickle(hex[0][0], drawHexagon, 4);
// hex[0][0].linear(hex);

  








// // draw & color a rectangle
// c.fillStyle = 'rgba(255, 1, 1, .4)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(255, 1, 1, .7)';
// c.fillRect(140, 140, 100, 100);
// c.fillStyle = 'rgba(255, 120, 1, .85)';
// c.fillRect(180, 180, 100, 100);

// drawing a line
// c.beginPath();
// c.moveTo(650, 300);
// c.lineTo(900, 120);
// c.lineTo(921, 444);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// // drawing an arc
// c.beginPath(); // to separate from previous path
// 	// x, y, r, startangle (in rad), endangle, drawcounterclockwise
// c.arc(300, 300, 30, 0, Math.PI*2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (let i = 0; i < 100; i++) {
// 	c.beginPath(); // to separate from previous path
// 	c.arc(7*i, .12*i*i - 3*i, 30, 0, Math.PI*2, false);
// 	c.strokeStyle = `rgba(${i*2.55}, ${i - i*2.55}, 0, .9)`;
// 	c.stroke();

// }