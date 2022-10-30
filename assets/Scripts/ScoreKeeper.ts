import { _decorator, Component, Node, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreKeeper')
export class ScoreKeeper extends Component {

    private currentScore: number = 0;
    start() {

    }

    public getScore() {
        return this.currentScore;
    }

    public resetScore(value: number) {
        this.currentScore = 0;
    }

    public addScore(value: number) {
        this.currentScore += value;
        math.clamp(this.currentScore, 0, Number.MAX_SAFE_INTEGER);
        console.log("Score: " + this.currentScore);
    }

    update(deltaTime: number) {

    }
}

