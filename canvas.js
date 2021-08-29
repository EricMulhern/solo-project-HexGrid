
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');
// console.log(c);


// draw & color a rectangle
c.fillStyle = 'rgba(255, 1, 1, .4)';
c.fillRect(100, 100, 100, 100);
c.fillStyle = 'rgba(255, 1, 1, .7)';
c.fillRect(140, 140, 100, 100);
c.fillStyle = 'rgba(255, 120, 1, .85)';
c.fillRect(180, 180, 100, 100);

// drawing a line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 120);
c.lineTo(321, 444);
c.strokeStyle = "#fa34a3";
c.stroke();

// drawing an arc
c.beginPath(); // to separate from previous path
	// x, y, r, startangle (in rad), endangle, drawcounterclockwise
c.arc(300, 300, 30, 0, Math.PI*2, false);
c.strokeStyle = 'blue';
c.stroke();

for (let i = 0; i < 100; i++) {
	c.beginPath(); // to separate from previous path
	c.arc(7*i, .12*i*i - 3*i, 30, 0, Math.PI*2, false);
	c.strokeStyle = `rgba(${i*2.55}, ${i - i*2.55}, 0, .9)`;
	c.stroke();

}







