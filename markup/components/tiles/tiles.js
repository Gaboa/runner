import * as PIXI from 'pixi.js';
import { TimelineLite, Power0 } from 'gsap';

export default class Tiles extends PIXI.Container {

    constructor({
        container,
        amount,
        map,
        velocity = 1,
        autoStart = true
    }) {

        super();
        this.container = container;
        this.container.addChild(this);

        this.map = map;
        this.amount = amount;
        this.velocity = velocity;

        this.addItems();

        autoStart && this.start();

    }

    addItems() {

        this.items = [];

        for (let i = 0; i < this.amount; i++) {

            this.tile = new PIXI.Sprite(PIXI.utils.TextureCache[this.map[0]]);
            this.tile.scale.set(0.1);

            this.tile.x = i * this.tile.width;
            this.tile.index = i;

            this.items.push(this.tile);
            this.addChild(this.tile);
            this.switchTexture(this.tile);

        }

    }

    switchTexture(tile) {

        if (this.map[tile.index]) {
            tile.texture = PIXI.utils.TextureCache[`${this.map[tile.index]}`];
        }

    }

    switchTile() {

        let first = this.items.shift();
        let last = this.items[this.items.length - 1];

        first.x = last.x + this.tile.width;
        first.index = last.index + 1;

        this.items.push(first);
        this.switchTexture(first);

    }

    setMap(newMap) {

        this.map = newMap;

    }

    start() {

        this.timeline = new TimelineLite();

        this.addTween();

        game.ticker.add(() => {
            this.update();
        });

    }

    addTween() {

        this.timeline.to(this, 10, {
            x: `-=${this.tile.width}`,
            ease: Power0.easeNone,
            onComplete: () => {
                this.switchTile();
                this.addTween();
            }
        });
        this.timeline.timeScale(game.velocity * this.velocity);

    }

    update() {

        this.timeline.timeScale(game.velocity * this.velocity);

    }

}
