import { _decorator, Component, Node, instantiate, Prefab, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EnemyFactory")
export class EnemyFactory extends Component {
  @property(Prefab)
  wavePrefabs: Prefab[] = [];
  @property timeBetweenWave = 5;
  @property isLooping = false;
  factoryGenerator: Generator = null;

  currentWave: Node = null;

  start() {
    this.factoryGenerator = this.factory();
    this.spawnWave();
  }

  public getCurrentWave() {
    return this.currentWave;
  }

  *factory() {
    for (const wavePrefab of this.wavePrefabs) {
      yield instantiate(wavePrefab);
    }
  };

  spawnWave() {
    if (this.factoryGenerator) {
      const { value, done } = this.factoryGenerator.next();
      if (done) {
        console.log('endgame');
        if (this.isLooping) {
          this.factoryGenerator = this.factory();
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
