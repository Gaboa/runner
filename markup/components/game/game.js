import p2 from 'p2';

export default class Game extends PIXI.Application {
    constructor(width, height, options) {
        // Initialize
        super(width, height, options);
        document.body.appendChild(this.view);
        window.game = this;

        // Config
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;
        this.velocity = 1;

        // Resize handler
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        // Set 30 FPS
        this.ticker._tick = (time) => {
            this.ticker._requestId = null;

            if (time - this.ticker.lastTime > 30) {

                if (this.ticker.started) {
                    // Invoke listeners now
                    this.ticker.update(time);
                    // Listener side effects may have modified ticker state.
                    if (this.ticker.started && this.ticker._requestId === null) {
                        this.ticker._requestId = requestAnimationFrame(this.ticker._tick.bind(this));
                    }
                }

            } else {

                this.ticker._requestId = requestAnimationFrame(this.ticker._tick.bind(this));

            }

        };

        // Setup physics
        this.setupPhysics();

    }

    changeLevelTo(Level) {
        this.level = new Level();

        this.level.create && this.level.create();
        this.level.addListeners && this.level.addListeners();

        this.ticker.add(this.level.updateView, this.level);
    }

    resize() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        let scaleX = windowWidth / this.width;
        let scaleY = windowHeight / this.height;

        let scale = Math.min(scaleX, scaleY);
        this.scale = scale;
        this.view.style.transform = `scale(${scale}, ${scale})`;
    }

    preload(arr, baseUrl, onComplete) {
        if (baseUrl) {
            this.loader.baseUrl = baseUrl;
        }
        arr.forEach((element) => {
            this.loader.add(element);
        });
        this.loader.load(onComplete);
    }

    handleError(message) {
        console.warn('It is a error: ', message);
    }

    enterFullscreen(div = 'canvas') {
        let element = document.querySelector(div);
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }

    cancelFullscreen(div = 'canvas') {
        let element = document.querySelector(div);
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }

    setupPhysics() {

        this.world = new p2.World({
            gravity: [0, 50]
        });
        this.ticker.add(() => {
            this.world.step(1 / 60);
        });

    }

}
