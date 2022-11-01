import {
  _decorator,
  Component,
  Node,
  Vec2,
  Vec3,
  Camera,
  Canvas,
  math,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;
import { Shooter } from "./Shooter";
@ccclass("Player")
export class Player extends Component {
  @property
  moveSpeed = 100;
  rawInput: Vec3 = new Vec3();
  minBounds = new Vec2();
  maxBounds = new Vec2();

  shooter: Shooter = null;

  shipBoundaries: Node = null;

  onLoad() {
    this.shooter = this.node.getComponent(Shooter);
    this.shipBoundaries = this.node.parent;
    console.log(this.shipBoundaries);
  }

  start() {
    this.initBounds();
  }

  update(deltaTime: number) {
    this.move(deltaTime);
  }

  initBounds() {
    const transform = this.shipBoundaries.getComponent(UITransform);
    const { width, height } = transform.getBoundingBox();
    this.minBounds = new Vec2(0, 0);
    this.maxBounds = new Vec2(width, height);
  }

  private move(deltaTime: number) {
    const delta = new Vec3(
      this.rawInput.x * this.moveSpeed * deltaTime,
      this.rawInput.y * this.moveSpeed * deltaTime,
      0
    );
    const position = this.node.position;
    const clampedPosition = new Vec3(
      math.clamp(position.x, this.minBounds.x, this.maxBounds.x),
      math.clamp(position.y, this.minBounds.y, this.maxBounds.y),
      0
    );
    this.node.setPosition(
      clampedPosition.x + delta.x,
      clampedPosition.y + delta.y,
      clampedPosition.z + delta.z
    );
  }

  onMove(inputValue: Vec2) {
    console.log(inputValue);
    this.rawInput.set(inputValue.x, inputValue.y, 0);
  }

  onFire(inputValue: boolean) {
    this.shooter.isFiring = inputValue;
  }
}
