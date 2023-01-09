import { _decorator, Component, Node, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PowerUpFactory")
export class PowerUpFactory extends Component {
  @property({ type: Prefab }) powerUpPrefab: Prefab = null;

  onDestroy() {
    if (this.powerUpPrefab) {
      const node = instantiate(this.powerUpPrefab);
      node.parent = this.node.parent;
      node.setPosition(this.node.position);
    }
  }
}
