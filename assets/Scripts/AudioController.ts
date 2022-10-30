import { _decorator, Component, Node, AudioSource, assert } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("AudioController")
export class AudioController extends Component {

    @property(AudioSource)
    public _audioSource: AudioSource = null!

    onLoad () {
        // Get the AudioSource component
        const audioSource = this.node.getComponent(AudioSource)! ;
        // Check if it contains AudioSource, if not, output an error message
        assert(audioSource);
        // Assign the component to the global variable _audioSource
        this._audioSource = audioSource;
    }

    start () {
        // Your initialization goes here.
        this.play();
    }

    play () {
        // Play the music
        this._audioSource.play();
    }

    pause () {
        // Pause the music
        this._audioSource.pause();
    }
}