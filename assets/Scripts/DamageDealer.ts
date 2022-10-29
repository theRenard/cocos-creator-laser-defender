import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DamageDealer')
export class DamageDealer extends Component {
    @property
    public damage: number = 10;

    public getDamage () {
        return this.damage;
    }

    public hit () {
        setTimeout(() => {
            if (this?.node.isValid) this.node.destroy();
        }, 0)
    }

}

