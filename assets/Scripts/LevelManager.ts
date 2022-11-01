import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;
import { scoreManager } from './Singletons/scoreManager';

@ccclass('LevelManager')
export class LevelManager extends Component {

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
        director.pause();
    }
}

