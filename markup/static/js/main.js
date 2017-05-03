import * as PIXI from 'pixi.js';
// import 'pixi-spine';

// import Game    from '../../components/game/game';
// import Preload from '../../components/preload/preload';

// new Game(1024, 768);
// new Preload();

import {
    Engine,
    Render,
    World,
    Bodies
} from 'matter-js';

var engine = Engine.create();
Engine.run(engine);

let game = new PIXI.Application(1000, 700);
document.body.appendChild(game.view);

let box = new PIXI.Graphics();
box.lineStyle(2, 0xffffff, 0.5);
box.drawRect(50, 0, 50, 50);
let box2 = new PIXI.Graphics();
box2.lineStyle(2, 0xffffff, 0.5);
box2.drawRect(57, -50, 50, 50);
// box.rotation = Math.PI * 0.25;
// box.pivot.set(box.width / 2, box.height / 2);

let ground = new PIXI.Graphics();
ground.lineStyle(2, 0xffffff, 0.5);
ground.drawRect(0, 250, 700, 100);

let boxBody = Bodies.rectangle(50, 0, 50, 50);
let box2Body = Bodies.rectangle(57, -50, 50, 50);
let groundBody = Bodies.rectangle(0, 250, 700, 50, { isStatic: true });

World.add(engine.world, [boxBody, box2Body, groundBody]);

game.stage.addChild(box, box2, ground);

game.ticker.add(() => {

    box.position.x = boxBody.position.x;
    box.position.y = boxBody.position.y;

    box2.position.x = box2Body.position.x;
    box2.position.y = box2Body.position.y;

    console.log(boxBody.angle);

});




// create an engine

// create a renderer
// var render = Render.create({
//     element: document.body,
//     engine: engine
// });

// create two boxes and a ground
// var boxB = Bodies.rectangle(450, 50, 80, 80);

// add all of the bodies to the world
// World.add(engine.world, [boxA, boxB, ground]);

// run the engine

// run the renderer
// Render.run(render);




// let stat = new PIXI.Graphics();
// stat.lineStyle(2, 0xffffff, 0.5);
// stat.drawRect(0, 340, 50, 50);

// let stat1 = new PIXI.Graphics();
// stat1.lineStyle(2, 0xffffff, 0.5);
// stat1.drawRect(0, 340, 50, 50);

// let stat2 = new PIXI.Graphics();
// stat2.lineStyle(2, 0xffffff, 0.5);
// stat2.drawRect(0, 340, 50, 50);

// let ground = new PIXI.Graphics();
// ground.lineStyle(2, 0xffffff, 0.5);
// ground.drawRect(0, 400, 500, 100);

// game.stage.addChild(box, ground, stat);

// // create an engine
// let engine = Engine.create();

// // create a renderer
// // let render = Render.create({
// //     element: document.body,
// //     engine
// // });

// // create two boxes and a ground
// let boxBody     = Bodies.rectangle(box.x, box.y, box.width, box.height);
// let statBody    = Bodies.rectangle(stat.x, stat.y, stat.width, stat.height);
// let stat1Body   = Bodies.rectangle(stat1.x, stat1.y, stat1.width, stat1.height, { isStatic: true } );
// let stat2Body   = Bodies.rectangle(stat2.x, stat2.y, stat2.width, stat2.height);
// let groundBody  = Bodies.rectangle(ground.x, ground.y, ground.width, ground.height, { isStatic: true });

// // add all of the bodies to the world
// World.add(engine.world, [boxBody, statBody, stat1Body, stat2Body, groundBody]);

// // run the engine
// Engine.run(engine);

// game.ticker.add(() => {
//     box.y = boxBody.position.y;
//     box.x = boxBody.position.x;

//     stat.y = statBody.position.y;
//     stat.x = statBody.position.x;

//     stat1.y = stat1Body.position.y;
//     stat1.x = stat1Body.position.x;

//     stat2.y = stat2Body.position.y;
//     stat2.x = stat2Body.position.x;

//     ground.y = groundBody.position.y;
//     ground.x = groundBody.position.x;
// });

// // run the renderer
// // Render.run(render);
