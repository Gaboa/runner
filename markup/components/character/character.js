import * as PIXI from 'pixi.js';

export default class Character extends PIXI.spine.Spine {

    constructor({
        container,
        name = 'spine_boy'
    }) {
        super(game.loader.resources[`${name}`].spineData);
        this.container = container;
        this.container.addChild(this);

        this.x = 120;
        this.y = 600;
        this.scale.set(0.3);

        this.state.setAnimation(0, 'run', true);

        // this.stateData.setMix('walk', 'jump', 0.2);
        // this.stateData.setMix('jump', 'walk', 0.2);
        // this.stateData.setMix('run', 'walk', 0.2);
        // this.stateData.setMix('walk', 'run', 0.2);
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
