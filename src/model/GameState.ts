import { Sprite } from "kontra";
import { Point } from "./Point";
import { TypedSprite } from "./TypedSprite";

export interface GameState {
  fireQueue: number[];
  mousePosition: Point;
  canvas: HTMLCanvasElement;
  sprites: TypedSprite[];
  crossHair: Sprite;
  canon: Sprite;
  framesSinceLastAngelSpawn: number;
}
