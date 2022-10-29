import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraShake')
export class CameraShake extends Component {

    shakeDuration: number = 0.5;
    shakeMagnitude: number = 10;
    angleMagnitude: number = 1;

    shakeCamera: boolean = false;
    initialPosition: Node['position'] = null;

    start() {
        this.initialPosition = this.node.getPosition();
    }

    update(dt: number) {
        if (this.shakeCamera) {
            this.shake();
        }
    }

    play() {
        this.shakeCamera = true;
        this.scheduleOnce(() => {
            this.shakeCamera = false;
            this.node.setPosition(this.initialPosition);
            this.node.angle = 0;
        }, this.shakeDuration);
    }

    shake() {
        const x = math.randomRange(-this.shakeMagnitude, this.shakeMagnitude);
        const y = math.randomRange(-this.shakeMagnitude, this.shakeMagnitude);
        const rotation = math.randomRange(-this.angleMagnitude, this.angleMagnitude);
        this.node.setPosition(this.initialPosition.x + x, this.initialPosition.y + y);
        this.node.angle = rotation;
    }
}

