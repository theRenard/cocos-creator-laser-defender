import {
  _decorator,
  Component,
  EventKeyboard,
  input,
  Input,
  Node,
  EventGamepad,
  KeyCode,
  v2,
  director,
} from "cc";
const { ccclass, property } = _decorator;
import { Player } from "./Player";

@ccclass("PlayerInput")
export class PlayerInput extends Component {
  @property gamepadDeadZone = 0.2;
  player: Player;
  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.GAMEPAD_INPUT, this.gamepadInput, this);
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
        break;
    }
  }

  gamepadInput(e: EventGamepad) {
    const gp = e.gamepad;
    const a = gp.buttonSouth.getValue();
    const { x, y } = gp.leftStick.getValue();
    if (a === 1) this.isFiring();
    if (a === 0) this.isNotFiring();
    if (x !== 0 || y !== 0) {
      const xDir = x > this.gamepadDeadZone || x < -this.gamepadDeadZone ? x : 0;
      const yDir = y > this.gamepadDeadZone || y < -this.gamepadDeadZone ? y : 0;
      this.player.onMove(v2(xDir, yDir));
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
