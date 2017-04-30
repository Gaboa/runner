import * as PIXI from 'pixi.js';
import p2 from 'p2';

import Tiles from '../tiles/tiles';

export default class BG extends PIXI.Container {

    constructor({
        container
    }) {
        super();
        this.container = container;
        this.container.addChild(this);

        this.back = new Tiles({
            container: this,
            amount: 5,
            velocity: 1.5,
            map: ['day', 'day', 'night', 'day', 'night', 'day', 'night', 'night', 'night', 'night']
        });

        this.middle = new Tiles({
            container: this,
            amount: 5,
            velocity: 2,
            map: ['night', 'day', 'night', 'day', 'day', 'night', 'day', 'night', 'night']
        });
        this.middle.y = 250;

        this.addGround();
    }

    addGround() {

        this.ground = new PIXI.Graphics();
        this.ground.beginFill(0x333333);
        this.ground.drawRect(0, 600, game.width, 100);
        this.ground.endFill();

        this.addPhysics();

        this.ground.position.x = this.boxBody.position[0];
        this.ground.position.y = this.boxBody.position[1];
        this.ground.rotation   = this.boxBody.angle;

        this.addChild(this.ground);

    }

    addPhysics() {

        this.boxShape = new p2.Box({ width: 200, height: 100 });
        this.boxBody = new p2.Body({
            mass: 10,
            position: [0, 2],
            angularVelocity: 1
        });
        this.boxBody.addShape(this.boxShape);
        game.world.addBody(this.boxBody);

    }

}
