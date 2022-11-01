import { _decorator, Component, Node, AudioSource, assert, director } from "cc";
const { ccclass, property, executionOrder } = _decorator;

@ccclass("AudioControllerSingleton")
@executionOrder(-1)
export class AudioControllerSingleton extends Component {
  private static _instance: AudioControllerSingleton = null!;

  @property(AudioSource)
  public _audioSource: AudioSource = null!;

  public static get instance(): AudioControllerSingleton {
    return AudioControllerSingleton._instance;
  }

  protected onLoad() {
    if (AudioControllerSingleton._instance == null) {

      // Get the AudioSource component
      const audioSource = this.node.getComponent(AudioSource)!;
      // Check if it contains AudioSource, if not, output an error message
      assert(audioSource);
      // Assign the component to the global variable _audioSource
      this._audioSource = audioSource;

      AudioControllerSingleton._instance = this;

    } else {
      throw "Do not attach multiple instances of SingletonComponent on the scene.";
    }
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
