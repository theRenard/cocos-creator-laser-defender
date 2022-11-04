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
            const isPlayer = this.node.name === 'Player';
            if (this?.node.isValid && !isPlayer) this.node.destroy();
        });
    }

}

