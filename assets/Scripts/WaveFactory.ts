import {
  _decorator,
  math,
  Component,
  Node,
  Prefab,
  instantiate,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("WaveFactory")
export class WaveFactory extends Component {
  @property(Prefab) enemyPrefabs: Prefab[] = [];
  @property(Prefab) pathPrefab: Prefab = null;
  pathInstance: Node;
  @property duration: number = 0.5;
  @property timeBetweenSpawns = 0.5;
  @property spawnTimeVariance = 0.3;
  @property minimumSpawnTime = 0.1;
  factoryGenerator: Generator = null;

  start() {
    console.log("start", this.node.name);
    this.pathInstance = instantiate(this.pathPrefab);
    this.factoryGenerator = this.factory();
    this.spawnEnemy();
  }

  public getRandomSpawnTime() {
    const spawnTime = math.randomRange(
      this.timeBetweenSpawns - this.spawnTimeVariance,
      this.timeBetweenSpawns + this.spawnTimeVariance
    );
    return math.clamp(spawnTime, this.minimumSpawnTime, Number.MAX_VALUE);
  }

  public getEnemyCount(): number {
    return this.enemyPrefabs.length;
  }

  public getEnemyPrefab(index: number): Prefab {
    return this.enemyPrefabs[index];
  }

  public getStartingWaypoint() {
    return this.pathInstance;
  }

  public getWaypoints() {
    const waypoints = [];
    for (let i = 0; i < this.pathInstance.children.length; i++) {
      waypoints.push(this.pathInstance.children[i]);
    }
    return waypoints;
  }

  public getDuration(): number {
    return this.duration;
  }

  *factory() {
    const enemyCount = this.getEnemyCount();
    for (let i = 0; i < enemyCount; i++) {
      const enemyPrefab = this.getEnemyPrefab(i);
      yield instantiate(enemyPrefab);
    }
  };

  spawnEnemy() {
    if (this.factoryGenerator) {
      const { value, done } = this.factoryGenerator.next();
      if (done) {
        console.log('end wave of enemies');
        return;
      }
      if (value) {
        value.setParent(this.node);
        value.setPosition(this.getStartingWaypoint().position);
        setTimeout(() => {
          this.spawnEnemy();
        }, this.getRandomSpawnTime() * 1000);
      }
    }
  }
}
