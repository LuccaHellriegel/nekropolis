import { GameState } from "../model/GameState";
import { TypedSprite, SpriteType } from "../model/TypedSprite";

export function spawnAngel(gameState: GameState) {
  //the update function is executed 60 times per second
  //so by waiting until === 3*60, we wait 3 seconds to spawn one angel
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
