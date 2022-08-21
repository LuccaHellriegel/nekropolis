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

function removeSprite(spriteToRemove: TypedSprite, gameState: GameState) {
  gameState.sprites = gameState.sprites.filter(newSprite => newSprite !== spriteToRemove);
}

export function searchCollisions(gameState: GameState) {
  for (let spriteAngel of gameState.sprites) {
    for (let spriteBullet of gameState.sprites) {
      if (
          spriteAngel.type === SpriteType.ANGEL &&
        spriteBullet.type === SpriteType.BULLET
      ) {
        //for some reason the Sprite-class does not have "radius", so we need to force conversion
        const isACollision = isCollision(spriteBullet as unknown as Circle, spriteAngel);
        if (isACollision) {
          removeSprite(spriteAngel, gameState);
          removeSprite(spriteBullet, gameState);
        }
      }
    }
  }
}
