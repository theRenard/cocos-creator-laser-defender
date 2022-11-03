import { _decorator, Component, Node, instantiate, Prefab, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemySpawner")
export class EnemySpawner extends Component {
  @property(Prefab)
  wavePrefabs: Prefab[] = [];
  @property timeBetweenWave = 5;
  @property isLooping = false;
  spawnerGenerator: Generator = null;

  currentWave: Node = null;

  start() {
    this.spawnerGenerator = this.spawner();
    this.spawnWave();
  }

  public getCurrentWave() {
    return this.currentWave;
  }

  *spawner() {
    for (const wavePrefab of this.wavePrefabs) {
      yield instantiate(wavePrefab);
    }
  };

  spawnWave() {
    if (this.spawnerGenerator) {
      const { value, done } = this.spawnerGenerator.next();
      if (done) {
        console.log('endgame');
        if (this.isLooping) {
          this.spawnerGenerator = this.spawner();
          this.spawnWave();
        }
        return;
      }
      if (value) {
        value.setParent(this.node);
        this.currentWave = value;
        setTimeout(() => {
          this.spawnWave();
        }, this.timeBetweenWave * 1000);
      }
    }
  }
}
