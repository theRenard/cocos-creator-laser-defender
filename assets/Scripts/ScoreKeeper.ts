import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;
import { scoreManager } from './Singletons/scoreManager';

@ccclass('ScoreKeeper')
export class ScoreKeeper extends Component {

    scoreManager: scoreManager

    onLoad() {
        this.scoreManager = scoreManager.instance;
    }

    getScore() {
        return this.scoreManager.getScore();
    }

    resetScore() {
        this.scoreManager.resetScore(0);
    }

    addScore(value: number) {
        this.scoreManager.addScore(value);
    }

}

