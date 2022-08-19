import { GameState } from "../model/GameState";
import { TypedSprite, SpriteType } from "../model/TypedSprite";

export function shootBullet(gameState: GameState, shootingRotation: number) {
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
      //this render function is inserted into the TypedSprite, but the typing is not understanding that "this" is the TypeSprite
      const context = (this as TypedSprite).context;
      context.beginPath(); // start drawing a shape
      context.arc(0, 0, this.radius, 0, Math.PI * 2);
      context.fillStyle = "green";
      context.fill();
      context.stroke(); // outline the circle
    },
    dx: cos * 5,
    dy: sin * 5,
  });
  bullet.type = SpriteType.BULLET;

  gameState.sprites.push(bullet);
}
