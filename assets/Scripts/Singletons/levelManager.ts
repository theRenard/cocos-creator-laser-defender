import { math, director } from "cc";
import { scoreManager } from "./scoreManager";

export class levelManager {

    private static _instance: levelManager;

    static get instance () {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new levelManager();
        return this._instance;
    }

    start () {
        director.preloadScene('Game');
    }

    loadGameScene() {
        scoreManager.instance.resetScore();
        director.loadScene('Game');
    }

    loadMainMenuScene() {
        director.loadScene('MainMenu');
    }

    loadGameOverScene() {
        director.loadScene('GameOver');
    }

    quitGame() {
        console.log('quit game');
        // director.pause();
    }

}