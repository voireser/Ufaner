// var value = sessionStorage.getItem("key");console.log(value)
// if(value === null) {
// sessionStorage.setItem("key", 1); 
var _LoadingHtml = '<canvas id="load"></canvas>';  
document.write(_LoadingHtml);  

canvas = document.getElementById("load");
ctx = canvas.getContext("2d");
w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;
window.onresize = function() {
	w = ctx.canvas.width = window.innerWidth;
	h = ctx.canvas.height = window.innerHeight;
};

parts = [];
emitCount = 1;
textSize = 30;
glowSize = 20;
pullRadius = 50;
maxTime = 5000;
minTime = 3000;
spawnRate = 300;
limitDots = 100;
trailSize = 0.9;
cmpx = -pullRadius;
cmpy = -pullRadius;

function create() {
	if (parts.length < limitDots) {
		for (i = 0; emitCount > i; i++) {
			parts.push({
				x: Math.random() * w,
				y: -textSize,
				vx: Math.random() * 4 - 2,
				vy: Math.random() * 2 - 1,
				ts: Date.now(),
				tl: Math.random() * (maxTime - minTime) + minTime,
				h: Math.random() * (320 - 170) + 170
			});
		}
	}
}

function draw() {
	for (i = 0; parts.length > i; i++) {
		var dif = (Date.now() - parts[i].ts) / parts[i].tl;
		var pct = 1 - (Math.round(dif * 100) / 100);

		ctx.beginPath();
		ctx.strokeStyle = "hsla(0,0%,100%," + pct + ")";
		ctx.lineWidth = textSize / 4;
		ctx.fillStyle = "hsla(" + parts[i].h + ", 100%, 50%, " + pct + ")";
		ctx.shadowColor = "hsla(" + parts[i].h + ", 100%, 50%, " + pct + ")";
		ctx.shadowBlur = glowSize;
		ctx.font = "bold " + textSize + "px sans-serif";
		ctx.strokeText("100", parts[i].x - (textSize), parts[i].y + (textSize / 2));
		ctx.fillText("100", parts[i].x - (textSize), parts[i].y + (textSize / 2));
		ctx.closePath();
	}

	ctx.beginPath();
	ctx.strokeStyle = "hsla(0,0%,100%,1)";
	ctx.arc(cmpx, cmpy, pullRadius, 0, Math.PI * 2);
	//ctx.stroke();
	ctx.closePath();
}

function physics() {
	for (i = 0; parts.length > i; i++) {
		if (parts[i].y + (textSize / 2) >= h) {
			parts[i].vy = -parts[i].vy * 0.8; /*Damping*/
			parts[i].y = h - textSize;
			parts[i].vx *= 0.8; /*Traction*/
		}
		parts[i].vy += 0.2; /*Gravity*/
		parts[i].x += parts[i].vx;
		parts[i].y += parts[i].vy;

		if (dist(parts[i].x, parts[i].y, cmpx, cmpy) < pullRadius) {
			parts[i].vx = (cmpx - parts[i].x) / 7;
			parts[i].vy = (cmpy - parts[i].y) / 7;
		}
	}
}

function lifeTime() {
	for (i = 0; parts.length > i; i++) {
		if (parts[i].ts + parts[i].tl < Date.now()) {
			parts.splice(i, 1);
		}
	}
}

function clearCanvas() {
	ctx.shadowBlur = 0;
	ctx.fillStyle = "rgba(0,0,0," + Math.abs(trailSize - 1) + ")"
	ctx.rect(0, 0, w, h);
	ctx.fill();
}

function dist(x1, y1, x2, y2) {
	var a = x1 - x2;
	var b = y1 - y2;
	return Math.sqrt(a * a + b * b);
}

function render() {
	clearCanvas();
	draw();
	physics();
	lifeTime();
}

document.onmousemove = function(e) {
	cmpx = e.clientX;
	cmpy = e.clientY;
};
document.ontouchmove = function(e) {
	cmpx = e.changedTouches[0].pageX;
	cmpy = e.changedTouches[0].pageY;
}

setInterval(create, spawnRate);
setInterval(render, 17);

canvas.onmouseleave = function() {
	cmpx = -pullRadius;
	cmpy = -pullRadius;
}

document.onreadystatechange = completeLoading;
  
function completeLoading() {  
    if (document.readyState == "complete") {  
        var loadingMask = document.getElementById('load');  
        loadingMask.className = 'disappear';
        setTimeout(function disappear(){
            loadingMask.parentNode.removeChild(loadingMask); 
        }, 500)
    }  
}  