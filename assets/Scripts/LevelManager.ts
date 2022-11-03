import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import { scoreManager } from './Singletons/scoreManager';
import { levelManager } from './Singletons/levelManager';

@ccclass('LevelManager')
export class LevelManager extends Component {

    start () {
        levelManager.instance.start();
    }

    loadGameScene() {
        levelManager.instance.loadGameScene();
    }

    loadMainMenuScene() {
        levelManager.instance.loadMainMenuScene();
    }

    loadGameOverScene() {
        levelManager.instance.loadGameOverScene();
    }

    quitGame() {
        levelManager.instance.quitGame();
    }
}

