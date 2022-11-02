import {
  _decorator,
  Contact2DType,
  Component,
  Node,
  BoxCollider2D,
  Collider2D,
} from "cc";
import { Health } from "./Health";
const { ccclass, property } = _decorator;

@ccclass("PowerUp")
export class PowerUp extends Component {
  collider: BoxCollider2D = null;

  start() {
    this.collider = this.getComponent(BoxCollider2D);
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    const health = otherCollider.getComponent(Health);

    if (health != null) {
      health.fillHealth();
      setTimeout(() => {
        this.node.destroy();
      }, 0);
    }
  }

  update() {
    if (this.node.getPosition().y < -1000) {
      this.node.destroy();
    }
  }
}
