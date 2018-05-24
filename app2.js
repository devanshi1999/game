
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var x, y, sx, sy, speed = 8, angle = 45,rangle,t,range,maxheight,stop1=0;

var c = canvas.getContext('2d');


rangle = angle * Math.PI / 180 ;

sx = speed * Math.cos(rangle);
sy = speed * Math.sin(rangle);

range = (speed*speed*Math.sin(2*rangle)) * 10;
maxheight = innerHeight - range * Math.tan(rangle) / 4 ;


console.log(range, maxheight);

start();
function changeValue() {
   t+=2;
   x = sx * t;
   y = innerHeight - (sy * t -1);
   if(y<maxheight) {
   	var t1;
   	t1 =t;
    changevalue(t1);
    }
   
   c.beginPath();
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.arc(x, y, 10, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();

}

var timerInterval = null, timeinterval= null;
function start() {
  stop(); // stoping the previous counting (if any)
  t = 0;
  timerInterval = setInterval(changeValue, 1000);  
  timeinterval = setInterval(changevalue, 1000);
}
var stop = function() {
  clearInterval(timerInterval);
    clearInterval(timerinterval);

}

function changevalue(t1) { 
   while(t1!=0)
    {
    	t1-=0.5; t+=0.5;
    	x = sx * t;
        y = innerHeight - (sy * t1 -1);

        	     	 c.beginPath();
                      c.clearRect(0, 0, innerWidth, innerHeight);
                     c.arc(x, y, 10, 0, Math.PI * 2, false);
                    c.strokeStyle = "blue";
                    c.stroke();
        if(y>innerHeight || y < 0) {
        	     
        	      c.beginPath();
                      c.clearRect(0, 0, innerWidth, innerHeight);
                     c.arc(y, y, 10, 0, Math.PI * 2, false);
                    c.strokeStyle = "blue";
                    c.stroke();
   
        }
}
}

// function startGame() {
//     myGameArea.start();
//     myGamePiece = new component(10, "red", 10, myGameArea.canvas.height - 10);

// }

// function component(radius, color, x, y) {
//     this.radius = radius;
    
//     this.x = x; 
//     this.y = y; 
//     ctx = myGameArea.context;
//     ctx.fillStyle = color;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     ctx.strokeStyle = "blue";
//     ctx.stroke();
//     ctx.fill();
// }

// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//     }
// }

// startGame();

