import { GameState } from "../model/GameState";

export function initEvents(gameState: GameState) {
  document.addEventListener("mousemove", (event) => {
    gameState.mousePosition.x = event.clientX;
    gameState.mousePosition.y = event.clientY;
  });

  document.addEventListener("pointerdown", () => {
    gameState.fireQueue.push(gameState.canon.rotation);
  });
}
