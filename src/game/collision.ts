import { Circle } from "../model/Cricle";
import { GameState } from "../model/GameState";
import { Rectangle } from "../model/Rectangle";
import {SpriteType, TypedSprite} from "../model/TypedSprite";

export function isCollision(circle: Circle, rectangle: Rectangle): boolean {
  let circleRadiusX = circle.x + circle.radius;
  let circleRadiusY = circle.y + circle.radius;
  return rectangle.x <= circleRadiusX && rectangle.y <= circleRadiusY
      && (circle.x - rectangle.x) <= circle.radius
      && Math.abs(rectangle.y - circleRadiusY) <= rectangle.height;
}

function killAngel(angel: TypedSprite, gameState: GameState) {
  gameState.sprites = gameState.sprites.filter(newSprite => newSprite !== angel);
}

function killBullet(bullet: TypedSprite, gameState: GameState) {
  gameState.sprites = gameState.sprites.filter(newSprite => newSprite !== bullet);
}

export function searchCollisions(gameState: GameState) {
  for (let sprite of gameState.sprites) {
    for (let sprite2 of gameState.sprites) {
      if (
        sprite.type === SpriteType.ANGEL &&
        sprite2.type === SpriteType.BULLET
      ) {
        //for some reason the Sprite-class does not have "radius", so we need to force conversion
        const isACollision = isCollision(sprite2 as unknown as Circle, sprite);
        if (isACollision) {
          killAngel(sprite, gameState);
          killBullet(sprite2, gameState);
        }
      }
    }
  }
}
