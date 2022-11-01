import { _decorator, Component, Node, Toggle } from "cc";
const { ccclass, property } = _decorator;
import { AudioControllerSingleton } from "./AudioControllerSingleton";

@ccclass("MusicToggle")
export class MusicToggle extends Component {
  audioController: AudioControllerSingleton;

  toggle: Toggle;

  onLoad() {
    this.audioController = AudioControllerSingleton.instance;
  }

  start() {
    this.toggle = this.getComponent(Toggle);

    if (!this.audioController) {
        this.toggle.interactable = false;
        console.log('No audioController instance');
        return;
    }

    this.toggle.isChecked = this.audioController._audioSource.playing;

  }

  toggleMusic() {
    if (this.toggle.isChecked) {
        if (!this.audioController._audioSource.playing) {
            this.audioController.play();
        }
    } else {
        this.audioController.pause();
    }
  }
}
