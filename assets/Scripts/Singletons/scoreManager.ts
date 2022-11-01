import { math } from "cc";
export class scoreManager {

    private static _instance: scoreManager;

    static get instance () {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new scoreManager();
        return this._instance;
    }

    private currentScore: number = 0;

    public getScore() {
        return this.currentScore;
    }

    public resetScore() {
        this.currentScore = 0;
    }

    public addScore(value: number) {
        this.currentScore += value;
        math.clamp(this.currentScore, 0, Number.MAX_SAFE_INTEGER);
        console.log("Score: " + this.currentScore);
    }

}