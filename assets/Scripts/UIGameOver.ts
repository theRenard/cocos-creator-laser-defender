import { _decorator, Component, Node, Label } from 'cc';
import { ScoreKeeper } from './ScoreKeeper';
const { ccclass, property } = _decorator;

@ccclass('UIGameOver')
export class UIGameOver extends Component {

    scoreKeeper: ScoreKeeper;
    scoreLabel: Label = null;
    start() {
        this.scoreLabel = this.getComponent(Label);
        this.scoreKeeper = this.getComponent(ScoreKeeper);
    }

    update() {
        this.scoreLabel.string = this.scoreKeeper.getScore().toString().padStart(6, '0');
    }
}

