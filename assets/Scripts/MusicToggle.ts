import { _decorator, Component, Node, Toggle } from "cc";
const { ccclass, property } = _decorator;
import { audioManager } from "./Singletons/audioManager";

@ccclass("MusicToggle")
export class MusicToggle extends Component {

  toggle: Toggle;

  start() {
    this.toggle = this.getComponent(Toggle);

    if (!audioManager.instance.isInit) {
        this.toggle.interactable = false;
        console.log('No audioController instance');
        return;
    }

    this.toggle.isChecked = audioManager.instance.playing;

  }

  toggleMusic() {
    if (this.toggle.isChecked) {
        if (!audioManager.instance.playing) {
            audioManager.instance.playMusic();
        }
    } else {
        audioManager.instance.pauseMusic();
    }
  }
}
