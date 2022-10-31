import { _decorator, Component, Node, Label, math, ProgressBar } from 'cc';
import { Health } from './Health';
import { ScoreKeeper } from './ScoreKeeper';
const { ccclass, property } = _decorator;



@ccclass('UI')
export class UI extends Component {


    @property({ group: { name: 'Health' }, type: ProgressBar }) healthSlider: ProgressBar = null;
    @property({ group: { name: 'Health' }, type: Node }) player: Node = null;
    @property({ group: { name: 'Score' }, type: Label }) scoreText: Label = null;

    playerHealth: Health;
    scoreKeeper: ScoreKeeper;


    onLoad() {
        this.playerHealth = this.player.getComponent(Health);
        this.scoreKeeper = this.node.scene.getComponentInChildren(ScoreKeeper);
    }

    start() {
        this.updateHealth();
        this.updateScore();
    }
    normalize(val: number, max = 100, min = 0) { return (val - min) / (max - min); }

    updateHealth() {
        const playerHealth = this.normalize(this.playerHealth.getHealth());
        this.healthSlider.progress = playerHealth;
    }

    updateScore() {
        this.scoreText.string = 'Score ' + this.scoreKeeper.getScore().toString().padStart(6, '0');
    }

    update(deltaTime: number) {
        this.updateHealth();
        this.updateScore();
    }
}

