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

@ccclass("WaveConfig")
export class WaveConfig extends Component {
  @property(Prefab) enemyPrefabs: Prefab[] = [];
  @property(Prefab) pathPrefab: Prefab = null;
  path: Node;
  @property duration: number = 0.5;
  @property timeBetweenSpawns = 0.5;
  @property spawnTimeVariance = 0.3;
  @property minimumSpawnTime = 0.1;

  start() {
    console.log("start", this.node.name);
    this.path = instantiate(this.pathPrefab);
    this.spawnEnemies();
  }

  public getRandomSpawnTime(wave: WaveConfig) {
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
    console.log("this.path", this.path);
    return this.path;
  }

  public getWaypoints() {
    const waypoints = [];
    for (let i = 0; i < this.path.children.length; i++) {
      waypoints.push(this.path.children[i]);
    }
    return waypoints;
  }

  public getDuration(): number {
    return this.duration;
  }

  spawnEnemies() {
      const enemyCount = this.getEnemyCount();
      for (let i = 0; i < enemyCount; i++) {
        const enemyPrefab = this.getEnemyPrefab(i);
        const enemy = instantiate(enemyPrefab);
        enemy.parent = this.node; // EnemySpawner
        enemy.setPosition(this.getStartingWaypoint().position);
    }
  }
}
