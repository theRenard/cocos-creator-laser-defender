import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  RigidBody2D,
  Vec2,
  math,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Shooter")
export class Shooter extends Component {
  @property({ group: { name: 'General' }, type: Prefab }) projectilePrefab: Prefab = null;
  @property({ group: { name: 'General' }}) projectileSpeed: number = 50;
  @property({ group: { name: 'General' }}) projectileLifetime: number = 4;
  @property({ group: { name: 'General' }}) baseFiringRate: number = 4;
  @property({ group: { name: 'AI' }}) firingRateVariance: number = 0;
  @property({ group: { name: 'AI' }}) minimumFiringRate: number = 0.1;
  @property({ group: { name: 'AI' }}) useIA: boolean = false;
  public isFiring = false;
  canFire = true;
  fireInterval: number;
  factoryGenerator: Generator<Node, Node>;

  start() {
    if (this.useIA) {
      this.isFiring = true;
      this.fireInterval = setInterval(() => {
        this.fire();
      }, this.getRandomFireRate());
    }
    this.factoryGenerator = this.factory();
  }

  onDestroy() {
    if (this.useIA) {
      clearInterval(this.fireInterval);
    }
  }

  update(deltaTime: number) {
    this.fire();
  }

  *factory(): Generator<Node, Node> {
    while (true) {
      yield instantiate(this.projectilePrefab);
    }
  }

  public getRandomFireRate() {
    const spawnTime = math.randomRange(
      this.baseFiringRate - this.firingRateVariance,
      this.baseFiringRate + this.firingRateVariance
    );
    return math.clamp(spawnTime, this.minimumFiringRate, Number.MAX_VALUE);
  }

  fire() {
    if (this.isFiring && this.canFire) {
      this.canFire = false;
      setTimeout(() => {
        this.canFire = true;
      }, 1000 / this.baseFiringRate);

      // verify is the factory exists
      if (this.factoryGenerator) {
        const { value } = this.factoryGenerator.next();
        const projectile = value;
        projectile.setPosition(this.node.position);
        const rigidBody = projectile.getComponent(RigidBody2D);
        const speed = this.useIA ? -this.projectileSpeed : this.projectileSpeed;
        rigidBody.linearVelocity = new Vec2(0, speed);
        this.node.parent.addChild(projectile);
        setTimeout(() => {
          if (projectile.isValid) projectile.destroy();
        }, this.projectileLifetime * 1000);
      }
    }
  }
}
