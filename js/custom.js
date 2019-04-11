

// This is just for demo purposes :
    // for (let i = 1; i < 110; i++) {
    //     (function (index) {
    //         setTimeout(function () { 
    //             mouse.x = 100 + i * 10;
    //             mouse.y = 100;
    //             drawCircles();
    //          }, i * 10);
    //     })(i);
    // }


// mouse canvas
(function(theme, $) {
	theme = theme || {};

	var initialized = false;

	var canvas_flower = document.querySelector('canvas');
    canvas_flower.height = window.innerHeight;
    canvas_flower.width = window.innerWidth;
    cvs = canvas_flower.getContext('2d');

    window.addEventListener('resize', function(){
        canvas_flower.height = window.innerHeight;
        canvas_flower.width = window.innerWidth;

        initCanvas();
    })

    var mouse = {
        x: undefined,
        y: undefined,
        YorN: 0
    }
    window.addEventListener('mousemove',
        function (event) {
            mouse.x = event.x;
            mouse.y = event.y;
            if (mouse.YorN === 20) {
                drawCircles();
                mouse.YorN = 0;
            }
            mouse.YorN += 1
        }
    )
    window.addEventListener("touchmove", 
        function (event) {
            let touch = event.touches[0];
            mouse.x = touch.clientX;
            mouse.y = touch.clientY;
            drawCircles();
        }
    )

    function Circle(x, y, radius, vx, vy, rgb, opacity, birth, life){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minRadius = radius;
        this.vx = vx;
        this.vy = vy;
        this.birth = birth;
        this.life = life;
        this.opacity = opacity;

        this.draw = function() {
            cvs.beginPath();
            cvs.arc(this.x, this.y, this.radius, Math.PI * 2, false);
            cvs.fillStyle = 'rgba(' + rgb +','+ this.opacity +')';
            cvs.fill();
        }

        this.update = function(){
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.vx = -this.vx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.vy = -this.vy;
            }

            this.x += this.vx;
            this.y += this.vy;

            this.opacity = 1- (((frame - this.birth) * 1) / this.life);

            if (frame > this.birth + this.life){
                for (let i = 0; i < circleArray.length; i++){
                    if (this.birth == circleArray[i].birth && this.life == circleArray[i].life){
                        circleArray.splice(i, 1);
                        break;
                    }
                }
            } else{
                this.draw();
            }
        }

    }

    var circleArray = [];

    function initCanvas() {
        circleArray = [];
    }

    var colorArray = [
        '6,60,133',
        '195,14,34',
        '255,255,255'
    ]

    function drawCircles(){
        for (let i = 0; i < 6; i++) {
            let radius = Math.floor(Math.random() * 4) / 2;
            let vx = (Math.random() * 2) - 1;
            let vy = (Math.random() * 2) - 1;
            let spawnFrame = frame;
            let rgb = colorArray[Math.floor(Math.random() * colorArray.length)];
            let life = 100;
            circleArray.push(new Circle(mouse.x, mouse.y, radius, vx, vy, rgb, 1, spawnFrame, life));
        }
    }

    var frame = 0;
    function animate() {
        requestAnimationFrame(animate);
        frame += 1;
        cvs.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < circleArray.length; i++ ){
            circleArray[i].update();
        }
    }

    initCanvas();
    animate();
}).apply(this, [window.theme, jQuery]);

// bubbles
(function(theme, $) {
	theme = theme || {};

	var initialized = false;

	function initparticles() {
        bubbles();
    }
    function bubbles() {
        $.each($(".particletext.bubbles"), function() {
            var bubblecount = ($(this).width() / 50) * 10;
            for (var i = 0; i <= bubblecount; i++) {
                var size = ($.rnd(40, 80) / 10);
                $(this).append('<span class="particle" style="top:' + $.rnd(20, 80) + '%; left:' + $.rnd(0, 95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0, 30) / 10) + 's;"></span>')
            }
        })
    }
    jQuery.rnd = function(m, n) {
        m = parseInt(m);
        n = parseInt(n);
        return Math.floor(Math.random() * (n - m + 1)) + m
    }
    initparticles();

}).apply(this, [window.theme, jQuery]);

// card
(function(theme, $) {
	theme = theme || {};

	var initialized = false;

	$(".project").hover3d({
        selector: ".project__card"
    });

}).apply(this, [window.theme, jQuery]);
