import { _decorator, Component, Node, AudioSource, assert, director } from "cc";
const { ccclass, property, executionOrder } = _decorator;
import { audioManager } from "./Singletons/audioManager";

@ccclass("AudioController")
export class AudioController extends Component {

  @property(AudioSource)
  _audioSource: AudioSource = null!

  onLoad () {
      const audioSource = this.node.getComponent(AudioSource)! ;
      assert(audioSource);
      this._audioSource = audioSource;
      // Declare the resident root node, which will not be destroyed in a scene switch. The target node must be the root node, otherwise it is invalid.
      director.addPersistRootNode(this.node);

      // Wrap the node in the manager.
      audioManager.instance.init(this._audioSource);
  }

  play() {
    // Play the music
    this._audioSource.play();
  }

  pause() {
    // Pause the music
    this._audioSource.pause();
  }
}
