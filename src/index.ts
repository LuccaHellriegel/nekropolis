import { init, GameLoop, degToRad } from "kontra";
import { initEvents } from "./game/events";
import { GameState } from "./model/GameState";
import { TypedSprite, SpriteType } from "./model/TypedSprite";
import { spawnAngel, updateAngelState } from "./game/angels";
import {
  updateCrosshairPosition,
  updateCanonRotation,
  updateFiringQueue,
} from "./game/player";
import { searchCollisions } from "./game/collision";

function initDefaultSprites(gameState: GameState) {
  let crossHair = new TypedSprite({
    x: 0,
    y: 0,
    color: "yellow",
    width: 40,
    height: 40,
  });

  const canon = new TypedSprite({
    x: 100,
    y: 80,
    color: "lightblue",
    width: 40,
    height: 20,
    rotation: degToRad(180),
  });

  gameState.sprites.push(crossHair, canon);
  gameState.canon = canon;
  gameState.crossHair = crossHair;
}

function initGame() {
  //kontra init
  let { canvas } = init();

  //fullscreen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const gameState: GameState = {
    fireQueue: [],
    mousePosition: { x: 0, y: 0 },
    canvas,
    sprites: [],
    crossHair: null as any,
    canon: null as any,
    framesSinceLastAngelSpawn: 0,
  };

  initDefaultSprites(gameState);
  initEvents(gameState);

  return gameState;
}

const gameState = initGame();

let loop = GameLoop({
  //executed 60 times per second
  update: function () {
    console.log(gameState);

    gameState.sprites.forEach((s) => s.update());

    updateAngelState(gameState);
    updateCrosshairPosition(gameState);
    updateCanonRotation(gameState);
    updateFiringQueue(gameState);

    searchCollisions(gameState);
  },
  render: function () {
    gameState.sprites.forEach((s) => s.render());
  },
});

loop.start();
