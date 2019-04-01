// nine card
(function(theme, $) {
    theme = theme || {};

    var initialized = false;

    var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var $ = function $(selector) {return document.querySelector(selector);};
    var $$ = function $$(selector) {return document.querySelectorAll(selector);};
    var tick = 0;

    function lerp(n1, n2, speed) {
        return (1 - speed) * n1 + speed * n2;
    }

    function angle(from, to) {
        return Math.atan2(
        to[1] - from[1],
        to[0] - from[0]);
    }

    function distance(from, to) {
        return Math.sqrt(
        Math.pow(to[0] - from[0], 2),
        Math.pow(to[1] - from[1], 2));
    }

    function distNorm(from, to, xMax, yMax) {
        return Math.sqrt(
        Math.pow((to[0] - from[0]) / xMax, 2),
        Math.pow((to[1] - from[1]) / yMax, 2));
    }

    Array.prototype.lerp = function (target, speed) {var _this = this;
        this.forEach(function (n, i) {return _this[i] = lerp(n, target[i], speed);});
    };var

    Frame = function () {
        function Frame(node) {_classCallCheck(this, Frame);
            this.node = node;
            this.scale = 1;
            this.maxScale = 1.25;
            this.rotation = [0, 0, 0];
            this.translation = [0, 0, 0];
            this.center = [0, 0];
            this.target = [
            0.5 * window.innerWidth,
            0.5 * window.innerHeight];

            this.padding = [
            0.5 * this.node.clientWidth,
            0.5 * this.node.clientHeight];

            this.focus = false;
            this.mouseover = false;
            this.distance = 0;
            this.node.addEventListener('mousemove', this.hover.bind(this));
            this.node.addEventListener('mouseleave', this.hover.bind(this));
            this.setCenter();
        }_createClass(Frame, [{ key: 'setCenter', value: function setCenter()
            {
                var rect = this.node.getBoundingClientRect();
                this.center[0] = rect.left + this.padding[0];
                this.center[1] = rect.top + this.padding[1];
                return this;
            } }, { key: 'setTarget', value: function setTarget(
            target) {
                this.target[0] = target[0];
                this.target[1] = target[1];
                return this;
            } }, { key: 'setDistance', value: function setDistance()
            {
                this.distNorm = distNorm(this.center, this.target, window.innerWidth, 0.5 * window.innerHeight);
                return this;
            } }, { key: 'translate', value: function translate()
            {
                this.translation.lerp([
                0,
                0,
                this.mouseover ? 300 : 200 - this.distNorm * 400],
                0.15);
                return this;
            } }, { key: 'rotate', value: function rotate()
            {
                var theta = angle(this.center, this.target);
                this.rotation.lerp([
                Math.sin(-theta) * 60 * this.distNorm,
                Math.cos(theta) * 90 * this.distNorm],
                0.15);
                return this;
            } }, { key: 'update', value: function update()
            {
                this.node.style.transform = '\n\t\t\ttranslate3d(' +
                this.translation[0] + 'px,' + this.translation[1] + 'px,' + this.translation[2] + 'px) \n\t\t\trotateX(' +
                this.rotation[0] + 'deg) rotateY(' + this.rotation[1] + 'deg)\n\t\t';

            } }, { key: 'hover', value: function hover(
            e) {
                this.mouseover = e.type === 'mousemove';
            } }]);return Frame;}();var

    Gallery = function () {
        function Gallery() {_classCallCheck(this, Gallery);
            this.container = $('.gallery');
            this.center = [
            0.5 * window.innerWidth,
            0.5 * window.innerHeight];

            this.mouse = this.center.slice(0);
            this.target = this.mouse.slice(0);
            this.container.addEventListener('mousemove', this.hover.bind(this));
            this.container.addEventListener('mouseleave', this.hover.bind(this));
            window.addEventListener('resize', this.resize.bind(this));
            this.initFrames();
            this.update();
        }_createClass(Gallery, [{ key: 'initFrames', value: function initFrames()
            {var _this2 = this;
                this.frames = [];
                $$('.frame').forEach(function (node) {return _this2.frames.push(new Frame(node));});
            } }, { key: 'resize', value: function resize()
            {
                this.center = [
                0.5 * window.innerWidth,
                0.5 * window.innerHeight];

                this.frames.forEach(function (frame) {return frame.setCenter();});
            } }, { key: 'hover', value: function hover(
            e) {
                this.mouseover = e.type === 'mousemove';
                this.target[0] = e.clientX;
                this.target[1] = e.clientY;
            } }, { key: 'update', value: function update()
            {var _this3 = this;
                this.mouse.lerp(
                this.mouseover ? this.target : this.center,
                0.125);

                this.frames.forEach(function (frame) {
                    frame.setTarget(_this3.mouse).
                    setDistance().
                    translate().
                    rotate().
                    update();
                });
                this.container.style.perspectiveOrigin = this.mouse[0] + 'px 50%';
                window.requestAnimationFrame(this.update.bind(this));
            } }]);return Gallery;}();

    var gallery = new Gallery();  
}).apply(this, [window.theme, jQuery]);

$('.levelTab span').on('click', function() {
    var levelText = '';
    var levelIndex = 8 - $(this).index() + 1
    $('.level .levelImg div:nth-child(3)').css('height', 10 * levelIndex + '%')
    if (levelIndex === 9) {
        levelText = '<strong>B1-C1 </strong>主要以延续宝贝本能闭气反射能力、熟悉适应水、有辅助传递和潜水、放松仰漂、坐立入水，以及锻炼宝贝五指分化及手眼协调能力，初步培养宝贝音乐感知能力。'
    } else if (levelIndex === 8) {
        levelText = '<strong>B2-C2 </strong>主要以锻炼宝贝主动踢腿意识和能力、潜水长短漂浮、精细动作、俯仰转换、站立入水，以及培养宝贝双手配合能力，认知能力，模仿能力以及音乐节奏感为主。'
    } else if (levelIndex === 7) {
        levelText = '<strong>B3-C3 </strong>主要以呼吸控制、主动潜水，抓边上岸、在水中无辅助的推进、滑行、站立跳水、建立规则和秩序感等练习，以及社会交往，语言表达，逻辑思维能力培养以及独立、自信、胆量为主。'
    } else if (levelIndex === 6) {
        levelText = '<strong>B4-C4 </strong>主要以鼓励孩子连续独立的呼吸控制、主动踢腿游进能力、独立俯仰转换、安全自救能力、为水训课打下坚实的基础练习，以及注重团队协作，独立自主，应急反应能力，四肢协调以及社会认知能力培养。'
    } else if (levelIndex === 5) {
        levelText = '<strong>W1 </strong>主要以锻炼孩子连续呼吸换气能力、扶板踢腿游进、有辅助划手练习、独立俯仰转换、跳水出发练习，勇于挑战，建立秩序感，扩展想象力、认知力、记忆力。'
    } else if (levelIndex === 4) {
        levelText = '<strong>W2 </strong>主要以锻炼孩子自由泳独立游进、转头呼吸换气、独立池底取物、仰泳初步练习，培养独立思考，主动学习，解决问题的能力。'
    } else if (levelIndex === 3) {
        levelText = '<strong>W3 </strong>主要以自由泳独立配合游进、仰泳独立配合游进、蛙泳初步练习、标准的出发转身，建立目标感、安全感，勇于挑战的能力。'
    } else if (levelIndex === 2) {
        levelText = '<strong>W4 </strong>主要以四种泳姿独立配合游进、增加游进距离和提高游进速度、比赛标准的跳水出发和转身技术，锻炼意志力。'
    }
    $('.level .wordInside').html(levelText)
})

$('.gallery>.frame').on('mouseenter', function() {
    var lessonText = '';
    if ($(this).index() === 0) {
        lessonText = '<strong style="color: #063c85; font-size: 24px;">一星级</strong><br>能够适应脸上及眼睛有水，有主动踢腿地意识，可以适应周围环境，放松地躺在妈妈肩上，与父母发展正向依附关系，独立完成抓放到指定位置，听音乐进行简单律动。'
    } else if ($(this).index() === 1) {
        lessonText = '<strong style="color: #063c85; font-size: 24px;">二星级</strong><br>轻松潜水2s，仰泳时适应耳朵没入水中，听从指令坐立入水，会帮妈妈擦脸，与家长配合默契，认识身体五官和3到4种颜色或形状，进行简单的动作模仿。'
    } else if ($(this).index() === 2) {
        lessonText = '<strong style="color: #063c85; font-size: 24px;">三星级</strong><br>放松状态下潜水漂浮3s，独立跳入水中，转身抓边上岸，借助面条放松漂浮在水面上，跳水自信且勇敢，懂得和他人分享，理解简单的生活常识，认识数字1'
    } else if ($(this).index() === 3) {
        lessonText = '<strong style="color: #063c85; font-size: 24px;">四星级</strong><br>独立完成俯仰转换，有连续呼吸控制，在无辅助的情况下独立踢腿游进3m，有辅助情况下扶板踢腿与呼吸配合游进10m，有初步独立能力，接受输赢，能够独立完成指定任务。'
    } else if ($(this).index() === 4) {
        lessonText = '<strong style="color: #DD9366; font-size: 24px;">铜牌</strong><br>脚踩池底连续的呼吸换气10次，再无辅助的情况下，手拿扶板踢腿游进10m，无辅助划手配合游进6m独立在水面上仰漂5s，有团队合作意识，遵守纪律，有规则感和秩序感。'
    } else if ($(this).index() === 5) {
        lessonText = '<strong style="color: #949698; font-size: 24px;">银牌</strong><br>无辅助的情况下自由泳游进20m，仰配合游进20m，独立池底取物，有独立思考和解决问题的能力，会主动学习。'
    } else if ($(this).index() === 6) {
        lessonText = '<strong style="color: #C3B69C; font-size: 24px;">金牌</strong><br>无辅助情况下，独立自由泳完整配合游进40m，仰泳配合游进40m,蛙泳整体配合游进40m.爱生活，享受游泳，善于表达自己和展示自己，学习与目标感。'
    } else if ($(this).index() === 7) {
        lessonText = '<strong style="color: #75C0EB; font-size: 24px;">奖杯</strong><br>四种泳姿独立游进各40米，标准的出发和转身技术，享受快乐，玩转泳池。'
    } else if ($(this).index() === 8) {
        lessonText = '<strong style="color: #6D6F71; font-size: 24px;">结业证书</strong><br>送给即将毕业的每一位宝贝，感谢这一路得信任与陪伴，我们要让学习成为一种习惯。让运动成为一种生活方式，继续享受生活。'
    }
    $('.gallery-container+p').html(lessonText)
})