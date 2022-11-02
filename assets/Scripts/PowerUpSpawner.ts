import { _decorator, Component, Node, Prefab, instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PowerUpSpawner")
export class PowerUpSpawner extends Component {
  @property({ type: Prefab }) powerUpPrefab: Prefab = null;

  onDestroy() {
    if (this.powerUpPrefab) {
      const node = instantiate(this.powerUpPrefab);
      node.parent = this.node.parent;
      node.setPosition(this.node.position);
    }
  }
}
