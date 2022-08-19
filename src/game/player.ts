import { degToRad } from "kontra";
import { shootBullet } from "./bullets";
import { angleBetweenPoints } from "./math";
import { GameState } from "../model/GameState";

export function updateCrosshairPosition(gameState: GameState) {
  const crossHair = gameState.crossHair;
  crossHair.x = gameState.mousePosition.x - crossHair.width / 2;
  crossHair.y = gameState.mousePosition.y - crossHair.height / 2;
}

export function updateCanonRotation(gameState: GameState) {
  const canon = gameState.canon;
  canon.rotation = degToRad(angleBetweenPoints(canon, gameState.mousePosition));
}

export function updateFiringQueue(gameState: GameState) {
  const lastFiringRotation = gameState.fireQueue.pop();
  if (lastFiringRotation) {
    shootBullet(gameState, lastFiringRotation);
  }
}
