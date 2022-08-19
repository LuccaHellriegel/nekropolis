import { GameState } from "../model/GameState";
import { TypedSprite, SpriteType } from "../model/TypedSprite";

export function spawnAngel(gameState: GameState) {
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

export function updateAngelState(gameState: GameState) {
  //TODO: make it a wave behavior
  gameState.framesSinceLastAngelSpawn++;
  spawnAngel(gameState);
}
