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
            { name: 'bg', url: 'dayBG.jpg' }
        ],
            'static/img/content/',
            this.create.bind(this)
            );

    }

    create() {

        this.bg = new BG({ container: this });
        this.character = new Character({ container: this });

        this.addKeyboardStreams();

    }

    addKeyboardStreams() {

        game.keyup$   = Rx.Observable.fromEvent(document, 'keyup');
        game.keydown$ = Rx.Observable.fromEvent(document, 'keydown');

        this.addCustomStream('keyup', 'up');
        this.addCustomStream('keyup', 'right');
        this.addCustomStream('keydown', 'up');
        this.addCustomStream('keydown', 'right');

        game.keydown$.up$
            .subscribe(next => this.character.jump());

        game.keydown$.right$
            .subscribe(next => {
                this.character.run();
                this.bg.updateVelocity();
            });
        game.keyup$.right$
            .subscribe(next => {
                this.character.walk();
                this.bg.updateVelocity();
            });


    }

    addCustomStream(event$, name$) {
        game[`${event$}$`][`${name$}$`] = game[`${event$}$`]
            .map(event => event.key)
            .map(key => key.toLowerCase())
            .filter(lowerKey => lowerKey === `arrow${name$}`);
    }

}
