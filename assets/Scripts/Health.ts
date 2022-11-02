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
import { LevelManager } from "./LevelManager";
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

  @property isPlayer = false;

  @property applyCameraShake: boolean = false;

  cameraShake: CameraShake;
  score: Score;

  levelManager: LevelManager;

  onLoad() {
    this.cameraShake = this.node.scene
      .getComponentInChildren(CameraComponent)
      .getComponent(CameraShake);
    this.levelManager = this.node.scene.getComponentInChildren(LevelManager);
    this.score = this.node.getComponent(Score);
    this._health = this.health;
  }

  start() {
    this.collider =
      this.getComponent(CircleCollider2D) || this.getComponent(BoxCollider2D);
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    const damageDealer = otherCollider.getComponent(DamageDealer);

    if (damageDealer != null) {
      this.takeDamage(damageDealer.getDamage());
      this.playHitEffect();
      this.shakeCamera();
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
  }

  public takeDamage(damage: number) {
    this.health -= damage;
    if (this.health <= 0) this.die();
  }

  die() {
    setTimeout(() => {
      this.playExplosionEffect();
      if (this?.node.isValid) this.node.destroy();
      if (this.score) this.score.addScore();
    });

    if (this.isPlayer) {
      setTimeout(this.levelManager.loadGameOverScene.bind(this), 4000);
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
