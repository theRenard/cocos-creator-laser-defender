import {
  _decorator,
  Component,
  EventKeyboard,
  input,
  Input,
  Node,
  KeyCode,
  v2,
} from "cc";
const { ccclass, property } = _decorator;
import { Player } from "./Player";

@ccclass("PlayerInput")
export class PlayerInput extends Component {
  player: Player;
  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  start() {
    this.player = this.node.getComponent(Player);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.moveLeft();
        break;
      case KeyCode.ARROW_RIGHT:
        this.moveRight();
        break;
      case KeyCode.ARROW_UP:
        this.moveUp();
        break;
      case KeyCode.ARROW_DOWN:
        this.moveDown();
        break;
      case KeyCode.SPACE:
        this.isFiring();
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
      case KeyCode.ARROW_RIGHT:
      case KeyCode.ARROW_UP:
      case KeyCode.ARROW_DOWN:
        this.stopMoving();
        break;
      case KeyCode.SPACE:
        this.isNotFiring();
        break

    }
  }


  moveLeft() {
    this.player.onMove(v2(-1, 0));
  }

  moveRight() {
    this.player.onMove(v2(1, 0));
  }

  moveUp() {
    this.player.onMove(v2(0, 1));
  }

  moveDown() {
    this.player.onMove(v2(0, -1));
  }

  stopMoving() {
    // this.player.onMove(v2(0, 0));
  }

  isFiring() {
    this.player.onFire(true);
  }

  isNotFiring() {
    this.player.onFire(false);
  }
}
