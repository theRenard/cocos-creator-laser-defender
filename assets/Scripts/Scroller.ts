import { _decorator, Component, Node, Vec3, UITransform, instantiate, Vec2, math, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Scroller')
export class Scroller extends Component {
    nodeHeight: number = 0;
    bottomNode: Node = null;
    upperNode: Node = null;
    topYPosition: number;
    bottomTPosition: number;
    restartYPosition = 0;
    @property scrollSpeed: number = 100;
    invertedPosition = false;
    start() {
        if (!this.node.replicated) {
            this.nodeHeight = this.node.getComponent(UITransform).height;
            this.bottomNode = this.node;
            this.upperNode = this.clone();

            this.topYPosition = this.upperNode.getPosition().y;
            this.bottomTPosition = this.bottomNode.getPosition().y - this.nodeHeight;
            this.restartYPosition = -this.nodeHeight;
        }
    }

    clone() {
        const clone = instantiate(this.node);
        clone.replicated = true;
        const clonePosition = new Vec3(this.node.position.x, this.node.position.y + this.node.getComponent(UITransform).height);
        clone.parent = this.node.parent;
        clone.setPosition(clonePosition);
        return clone;
    }

    scrollBackground(deltaTime: number) {
        const upperNodeNewPosition = this.upperNode.position.y - this.scrollSpeed * deltaTime;
        const gap = this.invertedPosition ? this.nodeHeight : - this.nodeHeight;
        const bottomNodeNewPosition = upperNodeNewPosition + gap;

        if (upperNodeNewPosition < this.restartYPosition) {
            this.upperNode.setPosition(new Vec3(0, this.topYPosition, 0));
            this.invertedPosition = false;
        } else {
            this.upperNode.setPosition(new Vec3(0, upperNodeNewPosition));
        }

        if (bottomNodeNewPosition < this.restartYPosition) {
            this.bottomNode.setPosition(new Vec3(0, this.topYPosition, 0));
            this.invertedPosition = true;
        } else {
            this.bottomNode.setPosition(new Vec3(0, bottomNodeNewPosition, 0));
        }

    }

    update(deltaTime: number) {
        if (!this.node.replicated) {
            this.scrollBackground(deltaTime);
        }
    }
}

