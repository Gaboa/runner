import * as PIXI from 'pixi.js';

export default class Character extends PIXI.spine.Spine {

    constructor({
        container
    }) {
        super(game.loader.resources.spine_boy.spineData);
        this.container = container;
        this.container.addChild(this);

        this.x = 120;
        this.y = 600;
        this.scale.set(0.3);

        this.state.setAnimation(0, 'walk', true);
    }

    jump() {
        if (this.checkState('jump')) return;

        this.state.setAnimation(0, 'jump', false);
        this.state.addAnimation(0, 'walk', true, 0);
    }

    run() {
        if (this.checkState('run', 'jump')) return;

        this.state.setAnimation(0, 'run', true);

        game.velocity = 2;
    }

    walk() {
        if (this.checkState('walk', 'jump')) return;

        this.state.setAnimation(0, 'walk', true);

        game.velocity = 1;
    }

    checkState(...states) {
        let result = false;
        states.forEach(state => {
            if (this.state.getCurrent(0).animation.name === state) {
                result = true;
            }
        });
        return result;
    }

}
