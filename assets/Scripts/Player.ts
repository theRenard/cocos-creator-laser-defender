import { _decorator, Component, Node, Vec2, Vec3, Camera, Canvas, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  @property
  moveSpeed = 100;
  rawInput: Vec3 = new Vec3();
  minBounds = new Vec2(-385, -740);
  maxBounds = new Vec2(385, -210);


  start() {
    this.initBounds();
  }

  update(deltaTime: number) {
    this.move(deltaTime);
  }

  initBounds() {
    const camera = this.node.scene.getComponentInChildren(Camera);
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
    this.rawInput.set(inputValue.x, inputValue.y, 0);
  }
}
