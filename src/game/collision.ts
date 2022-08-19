import { Bullet } from "../model/Bullet";
import { Circle } from "../model/Cricle";
import { GameState } from "../model/GameState";
import { Rectangle } from "../model/Rectangle";
import { SpriteType } from "../model/TypedSprite";

export function isCollision(circle: Circle, rectangle: Rectangle): boolean {
  //TODO

  return false;
}

export function searchCollisions(gameState: GameState) {
  for (let sprite of gameState.sprites) {
    for (let sprite2 of gameState.sprites) {
      if (
        sprite.type === SpriteType.ANGEL &&
        sprite2.type === SpriteType.BULLET
      ) {
        const isACollision = isCollision(sprite2 as Bullet, sprite);
        if (isACollision) {
          //TODO: do something, kill angel
          console.log("Found collision: ", sprite2, sprite);
        }
      }
    }
  }
}
