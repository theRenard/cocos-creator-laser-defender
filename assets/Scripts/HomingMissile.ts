import {
  _decorator,
  Component,
  Node,
  UITransform,
  RigidBody2D,
  Vec2,
  Vec3,
  v2,
} from "cc";
import { EnemySpawner } from "./EnemySpawner";
const { ccclass, property, requireComponent } = _decorator;

@ccclass("HomingMissile")
@requireComponent(RigidBody2D)
export class HomingMissile extends Component {
  public target: Node = null;
  private rigidbody: RigidBody2D;
  public speed: number = 600;
  public rotateSpeed: number = 1;
  private enemySpawner: EnemySpawner;

  start() {
    this.rigidbody = this.node.getComponent(RigidBody2D);
    this.enemySpawner = this.node.scene.getComponentInChildren(EnemySpawner);
    this.acquireTarget();
  }

  acquireTarget() {
    const wave = this.enemySpawner.getCurrentWave();
    this.target =
      (wave && wave.children && wave.children[0]) || null;
      console.log(this.target);
  }

  testBoundaries() {
    if (
      this.node.worldPosition.y > 2000 ||
      this.node.worldPosition.y < -200 ||
      this.node.worldPosition.x > 1000 ||
      this.node.worldPosition.x < -200
    ) {
      this.node.destroy();
    }
  }

  followTarget(deltaTime: number) {

    if (!this.target) {
        this.acquireTarget();
        return;
    }

    if (!this.target.active) {
        this.acquireTarget();
        return;
    }

    if (this.target) {
      const targetPosition = this.target.getWorldPosition();
      const direction = new Vec3(
        targetPosition.x - this.node.worldPosition.x,
        targetPosition.y - this.node.worldPosition.y,
        0
      );

      direction.normalize();
      const newPosition = new Vec3();
      const rotateAmount = Vec3.cross(newPosition, direction, this.node.up).z;
      this.rigidbody.angularVelocity = -rotateAmount * this.rotateSpeed;

    }
    this.rigidbody.linearVelocity = new Vec2(
      this.node.up.x * this.speed * deltaTime,
      this.node.up.y * this.speed * deltaTime
    );
  }

  update(deltaTime: number) {
    this.testBoundaries();
    this.followTarget(deltaTime);
  }
}
