import * as PIXI from 'pixi.js';
import Rx from 'rxjs';

import BG from '../bg/bg';
import Character from '../character/character';

export default class Preload extends PIXI.Container {

    constructor() {
        super();
        game.level = this;
        game.stage.addChild(this);

        game.preload([
            { name: 'spine_boy', url: 'spineboy.json' },
            { name: 'girl', url: 'skeleton.json' },
            { name: 'day', url: 'dayBG.jpg' },
            { name: 'night', url: 'nightBG.jpg' }
        ],
            'static/img/content/',
            this.create.bind(this)
            );

    }

    create() {

        this.bg = new BG({ container: this });
        this.character = new Character({ container: this });
        this.girl = new Character({ container: this, name: 'girl' });
        this.girl.position.x = 500;

        this.girl.stateData.setMix('run', 'run2', 0.1);
        this.girl.stateData.setMix('run2', 'run', 0.1);
        this.girl.stateData.setMix('run', 'jump1', 0.1);
        this.girl.stateData.setMix('jump1', 'jump3', 0.1);
        this.girl.stateData.setMix('jump3', 'run', 0.1);

        setTimeout(() => {
            this.girl.state.setAnimation(0, 'jump1', false);
            this.girl.state.addAnimation(0, 'jump3', false, 0);
            this.girl.state.addAnimation(0, 'run', true, 0);
        }, 2000);

        this.addKeyboardStreams();

    }

    addKeyboardStreams() {

        game.keyup$   = Rx.Observable.fromEvent(document, 'keyup');
        game.keydown$ = Rx.Observable.fromEvent(document, 'keydown');

        this.addCustomStream('keyup', 'right');
        this.addCustomStream('keydown', 'up');
        this.addCustomStream('keydown', 'right');

        game.keydown$.up$
            .subscribe(next => this.character.jump());
        game.keydown$.right$
            .subscribe(next => this.character.run());
        game.keyup$.right$
            .subscribe(next => this.character.walk());


    }

    addCustomStream(event$, name$) {
        game[`${event$}$`][`${name$}$`] = game[`${event$}$`]
            .map(event => event.key)
            .map(key => key.toLowerCase())
            .filter(lowerKey => lowerKey === `arrow${name$}`);
    }

}
