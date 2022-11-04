import {
  _decorator,
  Component,
  Node,
  Collider2D,
  BoxCollider2D,
  CircleCollider2D,
  Contact2DType,
  Prefab,
  instantiate,
  CameraComponent,
  Camera,
} from "cc";
import { CameraShake } from "./CameraShake";
import { DamageDealer } from "./DamageDealer";
import { levelManager } from "./Singletons/levelManager";
import { Score } from "./Score";
const { ccclass, property } = _decorator;

@ccclass("Health")
export class Health extends Component {
  @property
  public health: number = 100;

  _health: number = 0;

  collider: CircleCollider2D | BoxCollider2D = null;

  @property({ type: Prefab })
  hitEffectPrefab: Prefab = null;

  @property({ type: Prefab })
  explosionEffectPrefab: Prefab = null;

  @property({ type: Prefab })
  smokeEffectPrefab: Prefab = null;

  smokeEffectInstance: Node = null;

  @property isPlayer = false;

  @property applyCameraShake: boolean = false;

  cameraShake: CameraShake;
  score: Score;

  onLoad() {
    this.cameraShake = this.node.scene
      .getComponentInChildren(CameraComponent)
      .getComponent(CameraShake);
    this.score = this.node.getComponent(Score);
    this._health = this.health;
  }

  start() {
    this.collider =
      this.getComponent(CircleCollider2D) || this.getComponent(BoxCollider2D);
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    this.instantiateSmokeEffect();
    this.stopSmokeEffect();
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    const damageDealer = otherCollider.getComponent(DamageDealer);

    if (damageDealer != null) {
      this.takeDamage(damageDealer.getDamage());
      this.playHitEffect();
      this.shakeCamera();
      if (!this.isPlayer) damageDealer.hit();
    }
  }

  public getHealth() {
    return this.health;
  }

  public setHealth(value: number) {
    this.health = value;
  }

  public fillHealth() {
    this.health = this._health;
    this.stopSmokeEffect();
  }

  public takeDamage(damage: number) {
    this.health -= damage;
    if (this.health <= this._health / 2) this.playSmokeEffect();
    if (this.health <= 0) this.die();
  }

  die() {
    console.log("die", this.node.name);
    setTimeout(() => {
      this.playExplosionEffect();
      if (this?.node.isValid) this.node.destroy();
      if (this.score) this.score.addScore();
    });

    if (this.isPlayer) {
      setTimeout(levelManager.instance.loadGameOverScene, 4000);
    }
  }

  instantiateSmokeEffect() {
    if (this.smokeEffectPrefab) {
      this.smokeEffectInstance = instantiate(this.smokeEffectPrefab);
      this.smokeEffectInstance.setParent(this.node);
      this.smokeEffectInstance.setPosition(0, 0, 0);
    }
  }

  playSmokeEffect() {
    if (this.smokeEffectInstance) {
      this.smokeEffectInstance.active = true;
    }
  }

  stopSmokeEffect() {
    if (this.smokeEffectInstance) {
      this.smokeEffectInstance.active = false;
    }
  }

  playExplosionEffect() {
    if (this.explosionEffectPrefab) {
      const node = instantiate(this.explosionEffectPrefab);
      node.parent = this.node.parent;
      node.setPosition(this.node.position);
    }
  }

  playHitEffect() {
    if (this.hitEffectPrefab) {
      const node = instantiate(this.hitEffectPrefab);
      node.parent = this.node.parent;
      node.setPosition(this.node.position);
    }
  }

  shakeCamera() {
    if (this.cameraShake && this.applyCameraShake) {
      this.cameraShake.play();
    }
  }
}
