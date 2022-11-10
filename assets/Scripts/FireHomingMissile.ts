import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FireHomingMissile')
export class FireHomingMissile extends Component {

    @property firingRate = 3;
    @property({ type: Prefab }) homingMissilePrefab: Prefab = null;

    interval: number;

    start () {
        this.interval = setInterval(() => {
            this.fireMissile();
        }, this.firingRate * 1000);
    }

    fireMissile() {
        const missile = instantiate(this.homingMissilePrefab);
        missile.parent = this.node.parent;
        missile.setPosition(this.node.getPosition());
    }

    onDestroy() {
        clearInterval(this.interval);
    }
}

