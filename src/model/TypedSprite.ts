import { SpriteClass } from "kontra";

export class TypedSprite extends SpriteClass {
  public type: SpriteType = SpriteType.OTHER;
}
export enum SpriteType {
  ANGEL,
  BULLET,
  OTHER,
}
