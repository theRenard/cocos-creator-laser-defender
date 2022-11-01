import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Init')
export class Init extends Component {

    start () {
        director.loadScene('MainMenu');
    }
}

