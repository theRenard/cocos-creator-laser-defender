import { _decorator, Component, Node, Vec3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Scroller')
export class Scroller extends Component {
    firstNode: Node = null;
    secondNode: Node = null;
    topPosition: number;
    bottomPosition: number;

    @property scrollSpeed: number = 100;
    start() {
        this.firstNode = this.node.children[0];
        this.secondNode = this.node.children[1];

        this.topPosition = this.firstNode.getPosition().y;

        this.bottomPosition = this.secondNode.getPosition().y - this.secondNode.getComponent(UITransform).height;

        console.log(this.topPosition, this.bottomPosition);


    }

    scrollBackground(deltaTime: number) {
        const firstNodeNewPosition = this.firstNode.position.y - this.scrollSpeed * deltaTime;
        const secondNodeNewPosition = this.secondNode.position.y - this.scrollSpeed * deltaTime;

        if (firstNodeNewPosition < this.bottomPosition) {
            this.firstNode.setPosition(new Vec3(0, this.topPosition, 0));
        } else {
            this.firstNode.setPosition(new Vec3(0, firstNodeNewPosition, 0));
        }

        if (secondNodeNewPosition < this.bottomPosition) {
            this.secondNode.setPosition(this.secondNode.position.x, this.topPosition);
        } else {
            this.secondNode.setPosition(this.secondNode.position.x, secondNodeNewPosition);
        }
    }

    update(deltaTime: number) {
        this.scrollBackground(deltaTime);
    }
}

