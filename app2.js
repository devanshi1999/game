var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var x = 10, y=innerHeight - 10, dx, dy, radius=10, gravity = 0.25, angleDegree = 45, angleRadian, speed = 12;

angleRadian = angleDegree * (Math.PI / 180);
dx = Math.cos(angleRadian) * speed;
dy = -1 * Math.sin(angleRadian) * speed;

function animate(){
    requestAnimationFrame(animate);
 
    c.beginPath();
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.fillStyle = 'rgba(255,0,0,0.5)';
	c.fill();   console.log("hi");
  c.strokeStyle = "blue";
  c.stroke();
    x+= dx;
    y+= dy;
    dy+= gravity;
}

animate();
