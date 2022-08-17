import {
  init,
  Sprite,
  GameLoop,
  degToRad,
  GameObject,
  SpriteClass,
} from "kontra";

type Point = { x: number; y: number };

interface GameState {
  fireQueue: number[];
  mousePosition: Point;
  canvas: HTMLCanvasElement;
  sprites: TypedSprite[];
  crossHair: Sprite;
  canon: Sprite;
  framesSinceLastAngelSpawn: number;
}

enum SpriteType {
  ANGEL,
  BULLET,
  OTHER,
}
class TypedSprite extends SpriteClass {
  public type: SpriteType = SpriteType.OTHER;
}

function initEvents(gameState: GameState) {
  document.addEventListener("mousemove", (event) => {
    gameState.mousePosition.x = event.clientX;
    gameState.mousePosition.y = event.clientY;
  });

  document.addEventListener("pointerdown", (event) => {
    gameState.fireQueue.push(gameState.canon.rotation);
  });
}

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
  let { canvas } = init();

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

function angleBetweenPoints(p1: Point, p2: Point): number {
  return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
}

function shootBullet(gameState: GameState, shootingRotation: number) {
  const cos = Math.cos(shootingRotation);
  const sin = Math.sin(shootingRotation);
  const bullet = new TypedSprite({
    x: 100,
    y: 80,
    color: "green",
    radius: 10,
    width: 10,
    height: 10,
    render() {
      const context = this.context as CanvasRenderingContext2D;

      context.beginPath(); // start drawing a shape
      context.arc(0, 0, this.radius, 0, Math.PI * 2);
      context.fillStyle = "green";
      context.fill();
      context.stroke(); // outline the circle
    },
    // rotation: shootingRotation,
    dx: cos * 5,
    dy: sin * 5,
  });
  bullet.type = SpriteType.BULLET;

  gameState.sprites.push(bullet);
}

function spawnAngel(gameState: GameState) {
  if (gameState.framesSinceLastAngelSpawn === 3 * 60) {
    let angel = new TypedSprite({
      x: 1000,
      y: 80,
      color: "white",
      width: 20,
      height: 40,
      dx: -1,
    });
    angel.type = SpriteType.ANGEL;

    gameState.sprites.push(angel);
    gameState.framesSinceLastAngelSpawn = 0;
  }
}

// function isCollisionBetweenRectangles(r){

// }

let loop = GameLoop({
  update: function () {
    gameState.framesSinceLastAngelSpawn++;

    spawnAngel(gameState);
    console.log(gameState);

    gameState.sprites.forEach((s) => s.update());

    const crossHair = gameState.crossHair;
    crossHair.x = gameState.mousePosition.x - crossHair.width / 2;
    crossHair.y = gameState.mousePosition.y - crossHair.height / 2;

    const canon = gameState.canon;

    canon.rotation = degToRad(
      angleBetweenPoints(canon, gameState.mousePosition)
    );

    const lastFiringRotation = gameState.fireQueue.pop();
    if (lastFiringRotation) {
      shootBullet(gameState, lastFiringRotation);
    }

    for (let sprite of gameState.sprites) {
      for (let sprite2 of gameState.sprites) {
        if (
          sprite.type === SpriteType.ANGEL &&
          sprite2.type === SpriteType.BULLET
        ) {
        }
      }
    }
  },
  render: function () {
    gameState.sprites.forEach((s) => s.render());
  },
});

loop.start();
