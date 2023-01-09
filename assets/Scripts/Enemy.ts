import { _decorator, Component, Node, tween } from "cc";
const { ccclass, property } = _decorator;
import { WaveFactory } from "./WaveFactory";

@ccclass("Enemy")
export class Enemy extends Component {
  waveFactory: WaveFactory = null;
  waypoints: Node[] = [];
  waypointIndex = 0;

  start() {
    this.waveFactory = this.node.parent.getComponent(WaveFactory);
    this.waypoints = this.waveFactory.getWaypoints();
    this.node.setPosition(this.waypoints[this.waypointIndex].position);
    this.followPath();
  }

  followPath() {
    const pathAnimation = tween(this.node);
    for (let i = 1; i < this.waypoints.length; i++) {
      pathAnimation.to(
        this.waveFactory.getDuration(),
        {
          position: this.waypoints[i].position,
        },
        {
          onComplete: () => {
            if (i === this.waypoints.length - 1) {
              this.node.destroy();
            }
          },
        }
      );
    }

    pathAnimation.start();
  }
}
