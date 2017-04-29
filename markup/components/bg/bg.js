import * as PIXI from 'pixi.js';
import { TimelineLite } from 'gsap';

export default class BG extends PIXI.Container {

    constructor({
        container
    }) {
        super();
        this.container = container;
        this.container.addChild(this);

        this.addBG();
        this.addGround();
        this.addParalax();
    }

    addBG() {

        this.bg1 = new PIXI.Sprite(PIXI.utils.TextureCache.bg);
        this.bg2 = new PIXI.Sprite(PIXI.utils.TextureCache.bg);
        this.bg2.x = this.bg1.width;
        this.addChild(this.bg1, this.bg2);

    }

    addGround() {

        this.ground = new PIXI.Graphics();
        this.ground.beginFill(0x333333);
        this.ground.drawRect(0, 600, game.width, game.height);
        this.ground.endFill();

        this.addChild(this.ground);

    }

    addParalax() {
        this.timeline = new TimelineLite();
        this.addTween();
    }

    addTween() {
        this.timeline.set(this.bg1, {x: 0});
        this.timeline.to(this.bg1, 10, {
            x: -this.bg1.width * 0.5,
            ease: Power0.easeNone,
            onComplete: () => this.addTween()
        });
        this.timeline.timeScale(game.velocity);
    }

    updateVelocity() {
        this.timeline.timeScale(game.velocity);
    }

}
