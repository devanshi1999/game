var canvas = document.querySelector('canvas');
var body = document.querySelector('body');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

body.width = window.innerWidth;
body.height = window.innerHeight;


var c = canvas.getContext('2d');

var x = 150, y=innerHeight - 50, dx, dy, radius=10, gravity = 0.25, angleRadian, speed = 17, slope, flag = true, count1 =0, count2 = 0, player1 = true, player2 = false, hitOn, winner;

var score1 = 0, score2 = 0;

var lineX, lineY, circleX, circleY;
draw();
canvas.addEventListener('mousemove', function(e) {
	    lineX = e.clientX;
	    lineY = e.clientY;
	    
	    if(player1 == true && count1<10) {
	        c.beginPath();
	        c.strokeStyle = "black";
	        c.clearRect(0, 0, innerWidth, innerHeight);
	        c.moveTo(150, innerHeight-50);
	        c.lineTo(lineX, lineY);
	        c.stroke();}
	    else if(count2<10) {
	    	c.beginPath();
	        c.strokeStyle = "black";
	        c.clearRect(0, 0, innerWidth, innerHeight);
	    	c.moveTo(1300, innerHeight-50);
	        c.lineTo(lineX, lineY);
	        c.stroke();
	    }
	    draw();
});


canvas.addEventListener('click', function(e1) {
	    circleX = e1.clientX;
	    circleY = e1.clientY;
	    if(player1 == true ) {
	        slope = (innerHeight - 50 - circleY)/ (circleX - 150);
	        angleRadian = Math.atan(slope);
	        x = 150; y=innerHeight - 50;
	        dx = Math.cos(angleRadian) * speed;
	    }
	    else {
            slope = (innerHeight - 50 - circleY)/ (1300 - circleX);
	        angleRadian = Math.atan(slope);
	        x = 1300; y=innerHeight-50;
	        dx = -1*Math.cos(angleRadian) * speed;
	    }
        dy = -1 * Math.sin(angleRadian) * speed;
        if(count1<10 || count2<10) {
        flag = true;}

	    findPlayer(); scoreDisplay();
	   
        
});


function animate1(){
    if(flag==true) {
    requestAnimationFrame(animate1);
    }
    c.beginPath();
    c.clearRect(0, 0, innerWidth, innerHeight);
	draw();
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
	c.fillStyle = 'rgba(255,0,0,0.5)';
	c.fill();  
    c.strokeStyle = "blue";
    c.stroke();
    x+= dx;
    y+= dy;
    dy+= gravity; 
    if(hit() == true) {
    	flag = false;
    	
    	if(hitOn == 2) {
	    	score1++;
	    }
	    else {
	    	score2++;
	    }
	    
    }
    if(crash() == true) {
    	flag = false;
    }
    if(y>innerHeight) {
     flag = false;
     
    }
    
}


//finding which player's turn is next
function findPlayer() {
	if(player1 == true) {
	    	count1++;
	    	player1 = false;
	    	player2 = true;
	    }
	    else {
	    	count2++;
	    	player1 = true;
	    	player2 = false;
	    }
}


//drawing tanks and mountain
function draw() {
	    
	    
	    c.beginPath();
	    c.moveTo(600, innerHeight);
	    c.lineTo(700,600);
	    c.lineTo(800, innerHeight);
	    c.lineTo(600, innerHeight);
	    c.stroke(); c.fillStyle = "green"; 
	    c.fill();
	    c.fillStyle = "black";
	    c.fillRect(100, innerHeight-50, 50, 300);
	    c.fillRect(1300, innerHeight-50, 50, 300)
	    c.font = '40px Arial';
	    c.fillStyle = 'white';
	    c.fillText("1", 115, innerHeight-7);
	    c.fillText("2", 1315, innerHeight-7);
	    c.font = '50px Arial';
	    c.fillStyle = 'purple';
	    c.fillText('Score',200, 100);
	    c.fillText('Score',1200,100);
	    if((score1 % 2 == 0 || score1 ==0 ) && (score2 % 2==0 || score2 == 0)) {
	    c.fillText(score1, 250, 200);
	    c.fillText(score2, 1250, 200);
	}
}

canvas.addEventListener('click', animate1);


//checking if missile crashes with mountain
function crash() {
    var c1x, c1y, e1x, e1y, k, len, c2x, c2y, e2x, e2;
    if(player1 == false) {
    c1x = x - 700;
    c1y = y - 600;
    e1x = 600 - 700;
    e1y = innerHeight - 600;

    k = c1x*e1x + c1y*e1y;
    
    if(k > 0) {
  len = Math.sqrt(e1x*e1x + e1y*e1y);
  k = k/len;

  if(k < len) {
    if(Math.sqrt(c1x*c1x + c1y*c1y - k*k) <= 10) {
      return true;
  }
  }
}
}
  else {
  	c2x = x - 700;
    c2y = y - 600;
    e2x = 800 - 700;
    e2y = innerHeight - 600;

    k = c2x*e2x + c2y*e2y;

    if(k > 0) {
  len = Math.sqrt(e2x*e2x + e2y*e2y);
  k = k/len;

  if(k < len) {
    if(Math.sqrt(c2x*c2x + c2y*c2y - k*k) <= 10) {
      return true;
  }
  }
}
  }
}

//checking if missile hits tanks
function hit() {
	var x1, y1, d;
	if(player1 == false) {
        x1 = 1325 - x;
        y1 = innerHeight - 25 - y;
        d = Math.sqrt(x1*x1 + y1*y1);
        if(d <= (10 + 25 * Math.sqrt(2))) {
        	hitOn = 2;
        	return true;
        }
	}
	else {
		x1 = 125 - x;
		y1 = innerHeight - 25 -y;
	    d = Math.sqrt(x1*x1 + y1*y1);
	    if(d <= (10 + 25 * Math.sqrt(2))) {
        	hitOn = 1;
        	return true;
        }

	}
}

function scoreDisplay() {
	console.log(count2);
	if(count1 == 10 && count2 == 10) {
	    	if(score1>score2) {
	    		winner = 1;
	    	}
	    	else if(score2>score1) {
	    		winner = 2;
	    	}
	    	else {
	    		winner = 0;
	    	}
	    	var result = document.getElementById('scores');
	    	var btn = document.getElementById('restart');
            result.style.visibility = 'visible';
            if(winner!=0) {
	    	result.innerHTML="winner is tank"+winner; btn.style.visibility = 'visible'; 
	    }
	    else {
	    	result.innerHTML="draw game"; btn.style.visibility = 'visible'; 
	    }
	    }
}




