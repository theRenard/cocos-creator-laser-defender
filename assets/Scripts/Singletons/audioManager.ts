import { AudioClip, AudioSource, assert, warn, clamp01, resources } from "cc";
export class audioManager {

    private static _instance: audioManager;
    private static _audioSource?: AudioSource;

    static get instance () {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new audioManager();
        return this._instance;
    }

    /**Manager initialization*/
    init (audioSource: AudioSource) {
        audioManager._audioSource = audioSource;
    }

    get isInit () {
        return !!audioManager._audioSource;
    }

    get playing () {
        return audioManager._audioSource!.playing;
    }

      /**
     * Play music
     * @param {Boolean} loop Whether to loop
     */
    playMusic (loop: boolean = true) {
        const audioSource = audioManager._audioSource!
        assert(audioSource, 'AudioManager not inited!');

        audioSource.loop = loop;
        if (!audioSource.playing) {
            audioSource.play();
        }
    }

    pauseMusic () {
        const audioSource = audioManager._audioSource!
        assert(audioSource, 'AudioManager not inited!');

        if (audioSource.playing) {
            audioSource.pause();
        }
    }

    // Set the music volume
    setMusicVolume (flag: number) {
        const audioSource = audioManager._audioSource!
        assert(audioSource, 'AudioManager not inited!');

        flag = clamp01(flag);
        audioSource.volume = flag;
    }

}