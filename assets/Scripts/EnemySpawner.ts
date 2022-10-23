import { _decorator, Component, Node, instantiate, Prefab, math } from "cc";
const { ccclass, property } = _decorator;
import { WaveConfig } from "./WaveConfig";

@ccclass("EnemySpawner")
export class EnemySpawner extends Component {
  @property(Prefab)
  wavePrefabs: Prefab[] = [];
  @property timeBetweenWave = 5;

  start() {
    this.spawnWaves();
  }

  get currentWave() {
    return this.wavePrefabs[0];
  }

  public getCurrentWave() {
    return this.currentWave;
  }

  spawnWaves() {
    for (const wavePrefab of this.wavePrefabs) {
      const wave = instantiate(wavePrefab);
      console.log("instantiate Prefab", wavePrefab.name);
      wave.setParent(this.node);
    }
  }
}
