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

        this.ground      = new PIXI.Graphics();
        this.ground.box  = new p2.Box({ width: game.view.width, height: game.view.height * 0.3 });
        this.ground.body = new p2.Body({
            mass: 500,
            position: [game.view.width * 0.5, 200]
        });

        this.ground.beginFill(0x333333);
        this.ground.drawRect(0, 0, this.ground.box.width, this.ground.box.height);
        this.ground.endFill();
        this.ground.pivot.set(this.ground.width * 0.5, this.ground.height * 0.5);

        this.ground.body.addShape(this.ground.box);
        game.world.addBody(this.ground.body);
        this.addChild(this.ground);

        game.ticker.add(() => {
            this.updateGround();
        });

        this.plane = new PIXI.Graphics();
        this.plane.shape = new p2.Plane({
            angle: 90
        });
        this.plane.body  = new p2.Body({
            position: [500, 600]
        });
        this.plane.lineStyle(4, 0xffd900, 1);
        this.plane.moveTo(0, this.plane.body.position[1]);
        this.plane.lineTo(game.view.width, this.plane.body.position[1]);

        this.plane.body.addShape(this.plane.shape);
        game.world.addBody(this.plane.body);
        this.addChild(this.plane);

    }

    updateGround() {

        this.ground.position.x = this.ground.body.position[0];
        this.ground.position.y = this.ground.body.position[1];
        this.ground.rotation   = this.ground.body.angle;

    }

}
