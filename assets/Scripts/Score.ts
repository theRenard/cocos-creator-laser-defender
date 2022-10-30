import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { ScoreKeeper } from './ScoreKeeper';

@ccclass('Score')
export class Score extends Component {

    scoreKeeper: ScoreKeeper = null;
    @property score = 50;

    onLoad() {
        this.scoreKeeper = this.node.scene.getComponentInChildren(ScoreKeeper);
    }

    onDestroy() {
        this.scoreKeeper.addScore(this.score);
    }
}

