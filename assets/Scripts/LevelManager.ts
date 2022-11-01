import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class LevelManager extends Component {

    loadGameScene() {
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
        director.end();
    }
}

