import { _decorator, Component, Node, instantiate, Prefab, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemySpawner")
export class EnemySpawner extends Component {
  @property(Prefab)
  wavePrefabs: Prefab[] = [];
  @property timeBetweenWave = 5;
  spawnerIterator = null;

  start() {
    this.spawnerIterator = this.spawner();
    this.spawnWave();
  }

  get currentWave() {
    return this.wavePrefabs[0];
  }

  public getCurrentWave() {
    return this.currentWave;
  }

  spawner = function* () {
    for (const wavePrefab of this.wavePrefabs) {
      yield instantiate(wavePrefab);
    }
  };

  spawnWave() {
    const { value, done } = this.spawnerIterator.next();
    if (done) {
      console.log('endgame');
      return;
    }
    if (value) {
      value.setParent(this.node);
      setTimeout(() => {
        this.spawnWave();
      }, this.timeBetweenWave * 1000);
    }
  }
}
