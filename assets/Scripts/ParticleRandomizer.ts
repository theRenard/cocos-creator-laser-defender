import { _decorator, Component, Node, ParticleSystem2D, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ParticleRandomizer')
export class ParticleRandomizer extends Component {
    particleSystem2D: ParticleSystem2D | null = null;

    @property({ type: [SpriteFrame] })
    spriteFrames: SpriteFrame[] = [];

    interval: number

    start() {
        this.particleSystem2D = this.node.getComponent(ParticleSystem2D);
        this.assignRandomSpriteFrame();
        // this.interval = setInterval(this.assignRandomSpriteFrame.bind(this), 100)
    }

    assignRandomSpriteFrame() {
        if (this.particleSystem2D) {
            const randomIndex = Math.floor(Math.random() * this.spriteFrames.length);
            this.particleSystem2D.spriteFrame = this.spriteFrames[randomIndex];
        }
    }

    onDestroy() {
        clearInterval(this.interval);
    }

}

