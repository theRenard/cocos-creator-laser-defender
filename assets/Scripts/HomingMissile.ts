import { _decorator, Component, Node, UITransform, RigidBody2D, Vec2, Vec3, v2 } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('HomingMissile')
@requireComponent(RigidBody2D)
export class HomingMissile extends Component {
    public target: Node = null;
    private rigidbody: RigidBody2D;

    public speed: number = 300;

    public rotateSpeed: number = 10;

    start() {
        this.acquireTarget();
        this.rigidbody = this.node.getComponent(RigidBody2D);
    }

    acquireTarget() {
        this.target = this.node.scene.getChildByPath('Canvas/ShipBoundaries/Player');
    }


    update(deltaTime: number) {

        console.log(this.node.scene.getChildByPath('Canvas/GameManager'));

        if (this.target) {

            const targetPosition = this.target.getWorldPosition();
            const direction = new Vec3(targetPosition.x - this.node.worldPosition.x, targetPosition.y - this.node.worldPosition.y, 0);

            direction.normalize();

            const newPosition = new Vec3();

            const rotateAmount = Vec3.cross(newPosition, direction, this.node.up).z;

            this.rigidbody.angularVelocity = -rotateAmount * this.rotateSpeed;

        }


        this.rigidbody.linearVelocity = new Vec2(this.node.up.x * this.speed * deltaTime, this.node.up.y * this.speed * deltaTime);

    }
}

